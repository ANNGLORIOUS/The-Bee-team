import React from 'react';
import { BookOpen, User, Bell } from 'lucide-react';

const Header = ({ currentUser, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Library Management System</h1>
              <p className="text-sm text-gray-600">Librarian Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-700 block">{currentUser.name}</span>
                  <span className="text-xs text-gray-500 block">{currentUser.role}</span>
                </div>
              </div>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <button
                onClick={onLogout}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;