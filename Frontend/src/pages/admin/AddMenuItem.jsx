import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMenuItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    quantity: '',
    price: ''
  });
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/category/getCategories');
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category_id', formData.category_id);
    data.append('quantity', formData.quantity);
    data.append('price', formData.price);
    if (image) data.append('image', image);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/menu/addmenuitem', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Menu item added successfully!');
      setFormData({ name: '', category_id: '', quantity: '', price: '' });
      setImage(null);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => navigate('/admin')}
              className="text-gray-500 hover:text-gray-700 mr-4"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900 flex-1">Add New Menu Item</h1>
          </div>

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.includes('successfully') ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'
            } border`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g. Cheese Burger"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="12.99"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Item Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              {image && <p className="text-sm text-gray-500 mt-1">{image.name}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding Menu Item...' : 'Add Menu Item'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMenuItem;
