import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminPortal = () => {
  const { user, logout } = useAuth();

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard & Orders', icon: '📊' },
    { path: '/admin/addmenuitem', label: 'Add Menu Item', icon: '🍽️' },
    { path: '/admin/menumanagement', label: 'Manage Stock', icon: '📦' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Admin Portal
              </h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="group p-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:from-orange-50 hover:to-yellow-50"
              >
                <div className="text-3xl mb-4">{link.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition">{link.label}</h3>
                <p className="text-gray-500 text-sm">Quick access to admin tools</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center text-gray-500 text-lg">
          <p>Need help? All admin functions protected and logged.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
