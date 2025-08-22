<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\BorrowRequest;
use App\Models\BookLog;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class BorrowRequestController extends Controller
{
    /**
     * Get all requests (with optional filtering)
     * GET /api/requests
     */
    public function allRequests(Request $request): JsonResponse
    {
        $query = BorrowRequest::with(['user:id,name,email,contact', 'book:id,title,author,isbn']);

        // Filter by status if provided
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by user if provided
        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by book if provided
        if ($request->has('book_id')) {
            $query->where('book_id', $request->book_id);
        }

        // Date range filter
        if ($request->has('from_date')) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }

        if ($request->has('to_date')) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        $requests = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json([
            'status' => 'success',
            'data' => $requests
        ]);
    }

    /**
     * Get a specific request details
     * GET /api/requests/:id
     */
    public function show($id): JsonResponse
    {
        try {
            $request = BorrowRequest::with([
                'user:id,name,email,contact',
                'book:id,title,author,isbn,category'
            ])->findOrFail($id);

            return response()->json([
                'status' => 'success',
                'data' => $request
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Request not found'
            ], 404);
        }
    }

    /**
     * View pending requests
     * GET /api/requests?status=pending
     */
    public function index(Request $request): JsonResponse
    {
        $status = $request->query('status', 'pending');
        
        $requests = BorrowRequest::with(['user:id,name,email,contact', 'book:id,title,author,isbn'])
            ->where('status', $status)
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'status' => 'success',
            'message' => 'Requests retrieved successfully',
            'data' => $requests
        ]);
    }

   /**
     * Approve a borrow request
     * POST /api/requests/:id/approve
     */
    public function approve(Request $request, $id): JsonResponse
    {
        try {
            DB::beginTransaction();

            $borrowRequest = BorrowRequest::with(['book', 'user'])->findOrFail($id);

            // Check if request is still pending
            if ($borrowRequest->status !== 'pending') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Request has already been processed'
                ], 400);
            }

            $book = $borrowRequest->book;
            
            // Check if book has available copies
            if ($book->available <= 0) {
                // Auto-reject if no copies available
                $borrowRequest->update([
                    'status' => 'rejected',
                    'rejection_reason' => 'No copies available - automatically rejected'
                ]);

                // Create book log entry for auto-rejection
                BookLog::create([
                    'action' => 'request_rejected',
                    'timestamp' => now(),
                    'actor_id' => Auth::id(),
                    'book_id' => $book->id
                ]);

                DB::commit();

                return response()->json([
                    'status' => 'error',
                    'message' => 'Request automatically rejected - no copies available',
                    'data' => [
                        'available_copies' => $book->available,
                        'request_status' => 'rejected'
                    ]
                ], 400);
            }
            
            // Calculate due date (default 14 days from now)
            $dueDate = $request->input('due_days', 14);
            $borrowedAt = now();
            $dueAt = $borrowedAt->copy()->addDays($dueDate);

            // Update borrow request
            $borrowRequest->update([
                'status' => 'approved',
                'borrowed_at' => $borrowedAt,
                'due_at' => $dueAt
            ]);

            // Decrement available copies by 1
            $book->decrement('available');
            
            // Refresh the book model to get updated available count
            $book->refresh();

            // Create book log entry
            BookLog::create([
                'action' => 'borrowed',
                'timestamp' => $borrowedAt,
                'actor_id' => Auth::id(),
                'book_id' => $book->id
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Request approved successfully',
                'data' => [
                    'request' => $borrowRequest->load(['user:id,name,email', 'book:id,title,author']),
                    'remaining_copies' => $book->available,
                    'due_date' => $dueAt->toDateString()
                ]
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to approve request: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reject a borrow request
     * POST /api/requests/:id/reject
     */
    public function reject(Request $request, $id): JsonResponse
    {
        $request->validate([
            'reason' => 'nullable|string|max:500'
        ]);

        try {
            $borrowRequest = BorrowRequest::with(['book', 'user'])->findOrFail($id);

            // Check if request is still pending
            if ($borrowRequest->status !== 'pending') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Request has already been processed'
                ], 400);
            }

            // Update borrow request
            $borrowRequest->update([
                'status' => 'rejected',
                'rejection_reason' => $request->input('reason')
            ]);

            // Create book log entry
            BookLog::create([
                'action' => 'request_rejected',
                'timestamp' => now(),
                'actor_id' => Auth::id(),
                'book_id' => $borrowRequest->book_id
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Request rejected successfully',
                'data' => $borrowRequest->load(['user:id,name,email', 'book:id,title,author'])
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to reject request: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Handle book return
     * POST /api/requests/:id/return
     */
    public function returnBook(Request $request, $id): JsonResponse
    {
        $request->validate([
            'condition' => 'required|in:good,fair,damaged,lost',
            'notes' => 'nullable|string|max:500'
        ]);

        try {
            DB::beginTransaction();

            $borrowRequest = BorrowRequest::with(['book', 'user'])->findOrFail($id);

            // Check if request is approved and not yet returned
            if ($borrowRequest->status !== 'approved') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Request must be approved to process return'
                ], 400);
            }

            if ($borrowRequest->returned_at) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Book has already been returned'
                ], 400);
            }

            $returnedAt = now();
            $condition = $request->input('condition');
            $notes = $request->input('notes');

            // Update borrow request - mark as returned
            $borrowRequest->update([
                'returned_at' => $returnedAt,
                'status' => 'returned'
            ]);

            // Increase book availability by 1
            $book = $borrowRequest->book;
            $book->increment('available');
            
            // Refresh the book model to get updated available count
            $book->refresh();

            // Update inventory condition if damaged or lost
            if ($condition === 'damaged' || $condition === 'lost') {
                $inventory = $book->inventory;
                if ($inventory) {
                    $inventory->update(['condition' => $condition]);
                }
                
                // If book is lost, don't increment availability (since it's not really returned)
                if ($condition === 'lost') {
                    $book->decrement('available'); // Remove the increment we added above
                    $book->refresh();
                }
            }

            // Check if return is overdue
            $isOverdue = $borrowRequest->due_at && $returnedAt->gt($borrowRequest->due_at);
            $daysOverdue = $isOverdue ? $returnedAt->diffInDays($borrowRequest->due_at) : 0;

            // Create book log entry - mark returned
            $actorId = Auth::id();
            if (!$actorId) {
                throw new \Exception('User not authenticated');
            }

            BookLog::create([
                'action' => 'returned',
                'timestamp' => $returnedAt,
                'actor_id' => $actorId,
                'book_id' => $book->id
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Book returned successfully',
                'data' => [
                    'request' => $borrowRequest->load(['user:id,name,email', 'book:id,title,author']),
                    'return_condition' => $condition,
                    'return_notes' => $notes,
                    'overdue' => $isOverdue,
                    'days_overdue' => $daysOverdue,
                    'available_copies' => $book->available,
                    'returned_at' => $returnedAt->toDateTimeString()
                ]
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to process return: ' . $e->getMessage()
            ], 500);
        }
    }
}


