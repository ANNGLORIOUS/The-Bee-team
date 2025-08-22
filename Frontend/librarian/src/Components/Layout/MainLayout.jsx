import React, { useState, useEffect, useCallback } from 'react';
import Header from '../Dashboard/Header';
import Sidebar from '../Dashboard/SideBar';
import PendingRequests from '../Dashboard/PendingRequests';
import BorrowedBooks from '../Dashboard/BorrowedBooks';
import ReturnHistory from '../Dashboard/ReturnHistory';
import BookInventory from '../Dashboard/BookInventory';
import { useApiState } from '../../Hooks/UseApi';
import api from '../../Services/api';

const MainLayout = ({ currentUser, token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('pending');

  const booksState = useApiState([]);
  const requestsState = useApiState([]);
  const bookLogsState = useApiState([]);

  // ✅ Proper useCallback so eslint won't whine about deps
  const loadInitialData = useCallback(async () => {
    try {
      await Promise.all([
        booksState.execute(api.getBooks, token),
        requestsState.execute(api.getRequests, token),
        bookLogsState.execute(api.getBookLogs, token)
      ]);
    } catch (error) {
      console.error('Failed to load initial data:', error);
    }
  }, [token, booksState, requestsState, bookLogsState]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const refreshData = () => {
    loadInitialData();
  };

  const handleApproveRequest = async (requestId) => {
    try {
      await api.approveRequest(token, requestId);
      refreshData();
    } catch (error) {
      alert('Failed to approve request');
    }
  };

  const handleRejectRequest = async (requestId, reason = '') => {
    try {
      await api.rejectRequest(token, requestId, reason);
      refreshData();
    } catch (error) {
      alert('Failed to reject request');
    }
  };

  const handleBookReturn = async (logId, condition) => {
    try {
      await api.returnBook(token, logId, condition);
      refreshData();
    } catch (error) {
      alert('Failed to process return');
    }
  };

  const pendingRequests = requestsState.data?.filter(r => r.status === 'pending') || [];
  const borrowedBooks = bookLogsState.data?.filter(l => !l.return_date) || [];
  const returnedBooks = bookLogsState.data?.filter(l => l.return_date) || [];

  if (booksState.loading || requestsState.loading || bookLogsState.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            pendingCount={pendingRequests.length}
            borrowedCount={borrowedBooks.length}
            onLogout={onLogout}
          />

          <div className="flex-1">
            {activeTab === 'pending' && (
              <PendingRequests
                requests={pendingRequests}
                books={booksState.data || []}
                onApprove={handleApproveRequest}
                onReject={handleRejectRequest}
                loading={requestsState.loading}
              />
            )}

            {activeTab === 'borrowed' && (
              <BorrowedBooks
                books={borrowedBooks}
                onReturn={handleBookReturn}
                loading={bookLogsState.loading}
              />
            )}

            {activeTab === 'returns' && (
              <ReturnHistory
                books={returnedBooks}
                loading={bookLogsState.loading}
              />
            )}

            {activeTab === 'inventory' && (
              <BookInventory
                // books={booksState.data || []}
                loading={booksState.loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
