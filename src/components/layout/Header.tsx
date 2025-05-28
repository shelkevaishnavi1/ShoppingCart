import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { getCartCount } = useCart();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
            <ShoppingCart className="mr-2" />
            <span>ShopHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/search" className="text-gray-700 hover:text-blue-600 transition-colors">
              Products
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button type="submit" className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors">
              Search
            </button>
          </form>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                  <User size={24} className="mr-1" />
                  <span>Account</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Profile
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <User size={24} className="mr-1" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <button type="submit" className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors">
                Search
              </button>
            </form>
            
            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/search" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/cart" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart ({getCartCount()})
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout} 
                    className="text-left text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;