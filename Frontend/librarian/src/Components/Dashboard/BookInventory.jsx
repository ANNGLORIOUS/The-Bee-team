import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, Plus, Edit } from 'lucide-react';

const BookInventory = ({ books, loading, onRefresh }) => {
  const [editingBook, setEditingBook] = useState(null);
  const [editForm, setEditForm] = useState({ quantity: '' });

  const handleEdit = (book) => {
    setEditingBook(book.id);
    setEditForm({ quantity: book.quantity.toString() });
  };

  const handleSave = async (bookId) => {
    // You'll need to implement the API call to update book quantity
    console.log('Save book:', bookId, editForm);
    setEditingBook(null);
  };

  const handleCancel = () => {
    setEditingBook(null);
    setEditForm({ quantity: '' });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">📖 Book Inventory</h2>
          <RefreshCw className="h-5 w-5 text-gray-400 animate-spin" />
        </div>
        <div className="grid gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border rounded-lg p-4 flex items-center justify-between animate-pulse">
              <div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">📖 Book Inventory</h2>
        <div className="flex space-x-2">
          <button
            onClick={onRefresh}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            title="Refresh"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          <button className="p-2 text-green-600 hover:text-green-700 transition-colors">
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="grid gap-4">
        {books.map(book => (
          <div key={book.id} className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{book.title}</h3>
              <p className="text-sm text-gray-600">by {book.author}</p>
              <p className="text-xs text-gray-500">ISBN: {book.isbn || 'N/A'}</p>
            </div>
            
            <div className="flex items-center space-x-3">
              {editingBook === book.id ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={editForm.quantity}
                    onChange={(e) => setEditForm({ quantity: e.target.value })}
                    className="w-20 px-2 py-1 border rounded text-sm"
                    min="0"
                  />
                  <button
                    onClick={() => handleSave(book.id)}
                    className="text-green-600 hover:text-green-700"
                  >
                    ✓
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-red-600 hover:text-red-700"
                  >
                    ✗
                  </button>
                </div>
              ) : (
                <>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    book.quantity > 0 
                      ? book.quantity > 5 
                        ? 'bg-green-100 text-green-800'
                        : book.quantity > 2
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {book.quantity === 0 ? 'Out of Stock' : `${book.quantity} Available`}
                  </span>
                  
                  <button
                    onClick={() => handleEdit(book)}
                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    title="Edit Quantity"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  
                  {book.quantity === 0 && (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {books.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No books in inventory</p>
        </div>
      )}
    </div>
  );
};

export default BookInventory;
