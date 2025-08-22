import React, { useState } from 'react';
import { Book, RefreshCw } from 'lucide-react';

const BorrowedBooks = ({ books, onReturn, loading, onRefresh }) => {
  const [returningId, setReturningId] = useState(null);

  const handleReturn = async (logId, condition) => {
    setReturningId(logId);
    await onReturn(logId, condition);
    setReturningId(null);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">📚 Currently Borrowed Books</h2>
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

  if (books.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">📚 Currently Borrowed Books</h2>
        <div className="text-center py-8 text-gray-500">
          <Book className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p>No books currently borrowed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">📚 Currently Borrowed Books</h2>
        <button
          onClick={onRefresh}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        {books.map(log => (
          <div key={log.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{log.book_title}</h3>
                <p className="text-sm text-gray-600">
                  Borrowed by: <span className="font-medium">{log.reader_name}</span> 
                  • ID: {log.reader_id}
                </p>
                <p className="text-xs text-gray-500">
                  Borrowed Date: {new Date(log.borrowed_date).toLocaleDateString()}
                </p>
                {log.due_date && (
                  <p className={`text-xs ${
                    new Date(log.due_date) < new Date() 
                      ? 'text-red-600' 
                      : 'text-gray-500'
                  }`}>
                    Due Date: {new Date(log.due_date).toLocaleDateString()}
                    {new Date(log.due_date) < new Date() && ' (Overdue)'}
                  </p>
                )}
              </div>
              
              <div className="ml-4">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleReturn(log.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                  disabled={returningId === log.id}
                  className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                  defaultValue=""
                >
                  <option value="" disabled>Mark as Returned</option>
                  <option value="excellent">Excellent Condition</option>
                  <option value="good">Good Condition</option>
                  <option value="fair">Fair Condition</option>
                  <option value="poor">Poor Condition</option>
                  <option value="damaged">Damaged</option>
                </select>
                {returningId === log.id && (
                  <div className="text-xs text-gray-500 mt-1">Processing...</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowedBooks;
