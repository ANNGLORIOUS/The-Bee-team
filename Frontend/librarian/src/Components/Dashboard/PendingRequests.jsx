import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const PendingRequests = ({ requests, books, onApprove, onReject, loading, onRefresh }) => {
  const [rejectingId, setRejectingId] = useState(null);

  const handleReject = async (requestId) => {
    setRejectingId(requestId);
    const reason = prompt('Please provide a reason for rejection:') || 'No reason provided';
    if (reason) {
      await onReject(requestId, reason);
    }
    setRejectingId(null);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">📥 Pending Book Requests</h2>
          <RefreshCw className="h-5 w-5 text-gray-400 animate-spin" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">📥 Pending Book Requests</h2>
        <div className="text-center py-8 text-gray-500">
          <Clock className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p>No pending requests</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">📥 Pending Book Requests</h2>
        <button
          onClick={onRefresh}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        {requests.map(request => {
          const book = books.find(b => b.id === request.book_id);
          const availableQuantity = book?.quantity || 0;
          const isOutOfStock = availableQuantity === 0;

          return (
            <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{request.book_title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      !isOutOfStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {availableQuantity} in stock
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Requested by: <span className="font-medium">{request.reader_name}</span> 
                    • ID: {request.reader_id}
                  </p>
                  <p className="text-xs text-gray-500">
                    Request Date: {new Date(request.request_date).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => onApprove(request.id)}
                    disabled={isOutOfStock}
                    className={`px-3 py-1 rounded text-sm font-medium flex items-center ${
                      !isOutOfStock
                        ? 'bg-green-100 text-green-700 hover:bg-green-200 transition-colors'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {!isOutOfStock ? 'Approve' : 'Out of Stock'}
                  </button>
                  
                  <button
                    onClick={() => handleReject(request.id)}
                    disabled={rejectingId === request.id}
                    className="px-3 py-1 rounded text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors flex items-center disabled:opacity-50"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    {rejectingId === request.id ? 'Rejecting...' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PendingRequests;