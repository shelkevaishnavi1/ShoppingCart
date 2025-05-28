import React, { useState } from 'react';
import { User, Package, LogOut, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { getUserOrders } = useOrders();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  
  // Get user orders
  const orders = user ? getUserOrders(user.id) : [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real app, this would update the user profile
    // For this demo, we just toggle the editing state
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <User className="mr-2" size={20} />
                Personal Information
              </h2>
              {!isEditing ? (
                <button 
                  onClick={handleEdit}
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleSave}
                    className="text-green-600 hover:text-green-800 flex items-center text-sm"
                  >
                    <Save size={16} className="mr-1" />
                    Save
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="text-red-600 hover:text-red-800 flex items-center text-sm"
                  >
                    <X size={16} className="mr-1" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{user?.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{user?.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Type
                </label>
                <p className="text-gray-900">{user?.isAdmin ? 'Administrator' : 'Customer'}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <LogOut size={18} className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-6">
              <Package className="mr-2" size={20} />
              Order History
            </h2>

            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getOrderStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Package size={40} className="mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
                <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                <button 
                  onClick={() => navigate('/search')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;