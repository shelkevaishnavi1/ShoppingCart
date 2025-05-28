import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Lock, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract redirect param from URL
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Handle login
      const success = login(formData.email, formData.password);
      if (success) {
        navigate(redirectTo === 'cart' ? '/cart' : `/${redirectTo}`);
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } else {
      // Handle registration
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      
      const success = register(formData.name, formData.email, formData.password);
      if (success) {
        navigate(redirectTo === 'cart' ? '/cart' : `/${redirectTo}`);
      } else {
        setError('Email already exists. Please try logging in instead.');
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-24 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 py-4">
          <h2 className="text-center text-2xl font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h2>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label htmlFor="name\" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {!isLogin && (
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLogin ? (
                  <>
                    <LogIn size={18} className="mr-2" />
                    Sign In
                  </>
                ) : (
                  <>
                    <UserPlus size={18} className="mr-2" />
                    Create Account
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleForm}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-600">
            By {isLogin ? 'signing in' : 'creating an account'}, you agree to our{' '}
            <Link to="#" className="font-medium text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="#" className="font-medium text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;