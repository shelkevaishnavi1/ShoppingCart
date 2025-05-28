import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  
  const [shippingInfo, setShippingInfo] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'US'
  });

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login?redirect=cart');
      return;
    }
    
    // Add the order
    addOrder(
      user!.id,
      cart,
      shippingInfo
    );
    
    // Clear the cart
    clearCart();
    
    // Redirect to confirmation
    navigate('/profile');
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        {cart.length > 0 && (
          <button 
            onClick={clearCart}
            className="text-sm text-red-600 hover:text-red-800 flex items-center"
          >
            <Trash2 size={16} className="mr-1" />
            Clear Cart
          </button>
        )}
      </div>

      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cart.map(item => (
                  <div key={item.product.id} className="p-6 flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="sm:w-24 sm:h-24 flex-shrink-0 mb-4 sm:mb-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="sm:ml-6 flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            <Link to={`/product/${item.product.id}`} className="hover:text-blue-600 transition-colors">
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                        </div>
                        <p className="mt-2 sm:mt-0 text-lg font-medium text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      {/* Quantity and Remove */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:text-gray-900"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1 text-gray-700">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:text-gray-900"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-sm text-red-600 hover:text-red-800 flex items-center"
                        >
                          <Trash2 size={16} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-lg font-medium text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>

              {isAuthenticated ? (
                <form onSubmit={handleCheckout} className="mt-6 space-y-4">
                  <h3 className="font-medium text-gray-900">Shipping Information</h3>
                  
                  <div>
                    <label htmlFor="street" className="block text-sm text-gray-700 mb-1">Street Address</label>
                    <input 
                      type="text" 
                      id="street"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={shippingInfo.street}
                      onChange={(e) => setShippingInfo({...shippingInfo, street: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm text-gray-700 mb-1">City</label>
                      <input 
                        type="text" 
                        id="city"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm text-gray-700 mb-1">State</label>
                      <input 
                        type="text" 
                        id="state"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="zip" className="block text-sm text-gray-700 mb-1">ZIP Code</label>
                      <input 
                        type="text" 
                        id="zip"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={shippingInfo.zip}
                        onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm text-gray-700 mb-1">Country</label>
                      <select 
                        id="country"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={shippingInfo.country}
                        onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                        required
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Place Order
                    <ArrowRight size={18} className="ml-2" />
                  </button>
                </form>
              ) : (
                <div className="mt-6">
                  <Link 
                    to="/login?redirect=cart"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Login to Checkout
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <ShoppingBag size={24} className="text-gray-500" />
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            to="/search"
            className="inline-flex items-center px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;