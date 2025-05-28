import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <ShoppingCart className="mr-2" />
              <span className="text-xl font-bold">ShopHub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for quality products with excellent customer service and fast shipping.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search?category=Electronics" className="text-gray-400 hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/search?category=Clothing" className="text-gray-400 hover:text-white transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/search?category=Home & Kitchen" className="text-gray-400 hover:text-white transition-colors">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link to="/search?category=Sports & Outdoors" className="text-gray-400 hover:text-white transition-colors">
                  Sports & Outdoors
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0 text-gray-400" />
                <span className="text-gray-400">
                  123 Shopping Street, E-Commerce City, EC 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0 text-gray-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0 text-gray-400" />
                <span className="text-gray-400">support@shophub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;