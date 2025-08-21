import React from 'react';
import { 
  Clock, 
  Book, 
  RotateCcw, 
  Users, 
  Home,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  pendingCount, 
  borrowedCount,
  onLogout 
}) => {
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      count: null,
      countColor: null
    },
    { 
      id: 'pending', 
      label: 'Pending Requests', 
      icon: Clock, 
      count: pendingCount, 
      countColor: 'red' 
    },
    { 
      id: 'borrowed', 
      label: 'Borrowed Books', 
      icon: Book, 
      count: borrowedCount, 
      countColor: 'orange' 
    },
    { 
      id: 'returns', 
      label: 'Return History', 
      icon: RotateCcw,
      count: null,
      countColor: null
    },
    { 
      id: 'inventory', 
      label: 'Book Inventory', 
      icon: Users,
      count: null,
      countColor: null
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: BarChart3,
      count: null,
      countColor: null
    }
  ];

  const supportItems = [
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings
    },
    { 
      id: 'help', 
      label: 'Help & Support', 
      icon: HelpCircle
    }
  ];

  const getCountColorClass = (color) => {
    const colorMap = {
      red: 'bg-red-100 text-red-800',
      orange: 'bg-orange-100 text-orange-800',
      green: 'bg-green-100 text-green-800',
      blue: 'bg-blue-100 text-blue-800'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-64 bg-white rounded-lg shadow-sm mr-6 p-4 flex flex-col h-[calc(100vh-8rem)]">
      {/* Library Brand */}
      <div className="mb-8 px-3">
        <div className="flex items-center">
          <Book className="h-8 w-8 text-blue-600 mr-2" />
          <div>
            <h2 className="text-lg font-bold text-gray-900">Library System</h2>
            <p className="text-xs text-gray-500">Librarian Portal</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1">
        <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Main Menu
        </p>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              {item.label}
              
              {item.count !== null && item.count > 0 && (
                <span className={`ml-auto text-xs rounded-full px-2 py-1 ${getCountColorClass(item.countColor)}`}>
                  {item.count > 99 ? '99+' : item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Support Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Support
        </p>
        
        <nav className="space-y-1">
          {supportItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="w-full flex items-center px-3 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
              >
                <Icon className="mr-3 h-5 w-5 text-gray-400" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Section */}
      <div className="mt-auto pt-6">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-3 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200 group"
        >
          <LogOut className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-600" />
          Logout
        </button>
      </div>

      {/* User Info Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="px-3">
          <p className="text-xs text-gray-600">Logged in as:</p>
          <p className="text-sm font-medium text-gray-900 truncate">Librarian</p>
          <p className="text-xs text-gray-500">Last login: Today</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;