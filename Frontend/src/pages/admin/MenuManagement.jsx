import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const [categories, setCategories] = useState([]);
  const [editForm, setEditForm] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenu();
    fetchCategories();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/menu/getMenu');
      setMenuItems(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch menu');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/category/getCategories');
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  };

  const updateStock = async (menu_item_id) => {
    setUpdating(prev => ({...prev, [menu_item_id]: true}));
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/menu/updatemenuitem/${menu_item_id}`, {
        quantity: editForm.quantity
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMenu(); // Refresh list
      setEditForm(null);
    } catch (error) {
      alert('Update failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setUpdating(prev => ({...prev, [menu_item_id]: false}));
    }
  };

  const editStock = (item) => {
    setEditForm({ menu_item_id: item.menu_item_id, quantity: item.quantity });
  };

  const deleteMenuItem = async (menu_item_id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/menu/deletemenuitem/${menu_item_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMenu(); // Refresh list
      alert('Item deleted');
    } catch (error) {
      alert('Delete failed: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading menu...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button 
              onClick={() => navigate('/admin')}
              className="text-gray-500 hover:text-gray-700 mr-4 text-lg"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-gray-900 inline">Menu Management</h1>
          </div>
          <a 
            href="/admin/addmenuitem" 
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            + Add New Item
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {menuItems.map((item) => (
                  <tr key={item.menu_item_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img src={item.image_url || '/vite.svg'} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.category_name}</td>
                    <td className="px-6 py-4">
                      {editForm && editForm.menu_item_id === item.menu_item_id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="0"
                            value={editForm.quantity}
                            onChange={(e) => setEditForm({...editForm, quantity: parseInt(e.target.value) || 0})}
                            className="w-20 p-1 border rounded focus:ring-orange-500"
                          />
                          <div className="space-x-1">
                            <button
                              onClick={() => updateStock(item.menu_item_id)}
                              disabled={updating[item.menu_item_id]}
                              className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditForm(null)}
                              className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          item.quantity === 0 ? 'bg-red-100 text-red-800' : item.quantity < 10 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {item.quantity}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${parseFloat(item.price).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                      <button
                        onClick={() => editStock(item)}
                        disabled={updating[item.menu_item_id]}
                        className="text-indigo-600 hover:text-indigo-900 mr-3 disabled:opacity-50"
                      >
                        Edit Stock
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete ${item.name}?')) {
                            deleteMenuItem(item.menu_item_id);
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                        disabled={updating[item.menu_item_id]}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {menuItems.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No menu items yet. <a href="/admin/addmenuitem" className="text-orange-600 hover:underline font-medium">Add first item</a></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
