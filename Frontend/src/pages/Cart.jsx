import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeItem, updateQuantity, getTotal, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!user || user.role !== 'customer') {
      alert('Must be logged in as customer');
      return;
    }

    const orderItems = cartItems.map(item => ({
      menu_item_id: item.menu_item_id,
      quantity: item.quantity
    }));

    try {
      const response = await axios.post('http://localhost:3000/api/v1/orders/placeOrder', {
        orderItems
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        clearCart();
        alert('Order placed successfully!');
        navigate('/menu');
      }
    } catch (error) {
      alert('Failed to place order: ' + (error.response?.data?.message || error.message));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            🛒
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some items from the menu to get started.</p>
          <Link to="/menu" className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {cartItems.map((item) => (
            <div key={item.menu_item_id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  {(item.image_url || item.imageurl) ? (
                    <img
                      src={item.image_url || item.imageurl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="text-xl">🍽️</span>
                  )}

                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => updateQuantity(item.menu_item_id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.menu_item_id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                <button 
                  onClick={() => removeItem(item.menu_item_id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-orange-600">${getTotal().toFixed(2)}</span>
          </div>
          {user && user.role === 'customer' ? (
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-orange-700 transition duration-200"
            >
              Place Order
            </button>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-2">Please log in as customer to place order</p>
              <Link to="/customerlogin" className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
