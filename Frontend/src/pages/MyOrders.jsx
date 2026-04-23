import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const MyOrders = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/orders/myorders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, token]);

  if (loading) return <div className="text-center py-10">Loading orders...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              📦
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <Link to="/menu" className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700">
              Order Now
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div key={order.order_id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Order #{order.order_id}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">Date: {new Date(order.order_date).toLocaleDateString()}</p>
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total: ${order.total_bill}</span>
                  <span className="text-sm text-gray-500">Items: {order.items_count || 0}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
