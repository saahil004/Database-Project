import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', address: '', username: '', email: '', password: '', contact: '' });
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/admin/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch orders');
    }
  };

  const handleRegisterCustomer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/v1/admin/registercustomer', newCustomer, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Customer registered!');
      setNewCustomer({ name: '', address: '', username: '', email: '', password: '', contact: '' });
    } catch (error) {
      alert('Registration failed: ' + error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
<div className="flex items-center justify-between mb-8">
  <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
<div className="space-x-4">
    <a href="/admin/addmenuitem" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition">
      + Add Menu Item
    </a>
    <a href="/admin/menumanagement" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
      Manage Stock
    </a>
  </div>
</div>

        {/* Register Customer Form */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Register New Customer</h2>
          <form onSubmit={handleRegisterCustomer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Name"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={newCustomer.address}
              onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={newCustomer.username}
              onChange={(e) => setNewCustomer({...newCustomer, username: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newCustomer.password}
              onChange={(e) => setNewCustomer({...newCustomer, password: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
            <input
              type="tel"
              placeholder="Contact"
              value={newCustomer.contact}
              onChange={(e) => setNewCustomer({...newCustomer, contact: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition md:col-span-1"
            >
              {loading ? 'Registering...' : 'Register Customer'}
            </button>
          </form>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">All Orders</h2>
            <button onClick={fetchOrders} className="ml-4 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition ml-auto">
              Refresh
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.order_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.order_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer_name} ({order.customer_contact})</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-600">${parseFloat(order.total_bill).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.order_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {orders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No orders yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
