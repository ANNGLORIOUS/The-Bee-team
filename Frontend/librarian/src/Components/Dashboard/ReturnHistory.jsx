import React from 'react';
import { RotateCcw, RefreshCw } from 'lucide-react';

const ReturnHistory = ({ books, loading, onRefresh }) => {
  const getConditionBadge = (condition) => {
    const conditionStyles = {
      excellent: 'bg-green-100 text-green-800',
      good: 'bg-blue-100 text-blue-800',
      fair: 'bg-yellow-100 text-yellow-800',
      poor: 'bg-orange-100 text-orange-800',
      damaged: 'bg-red-100 text-red-800'
    };

    return conditionStyles[condition] || 'bg-gray-100 text-gray-800';
  };

  const getConditionLabel = (condition) => {
    const labels = {
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor',
      damaged: 'Damaged'
    };

    return labels[condition] || condition;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">🔄 Return History</h2>
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
        <h2 className="text-lg font-medium text-gray-900 mb-4">🔄 Return History</h2>
        <div className="text-center py-8 text-gray-500">
          <RotateCcw className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p>No return history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">🔄 Return History</h2>
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
                  Returned by: <span className="font-medium">{log.reader_name}</span>
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-1">
                  <span>Borrowed: {new Date(log.borrowed_date).toLocaleDateString()}</span>
                  <span>Returned: {new Date(log.return_date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="ml-4">
                <span className={`px-2 py-1 text-xs rounded-full ${getConditionBadge(log.condition)}`}>
                  {getConditionLabel(log.condition)}
                </span>
              </div>
            </div>
            
            {log.notes && (
              <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                <strong>Notes:</strong> {log.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReturnHistory;