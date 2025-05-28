import React from 'react';
import Banner from '../components/ui/Banner';
import FeaturedProducts from '../components/ui/FeaturedProducts';
import { ShoppingBag, Truck, CreditCard, LifeBuoy } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Banner */}
      <Banner 
        title="Quality Products for Every Need"
        subtitle="Discover our curated collection of premium products at competitive prices with fast shipping."
        ctaText="Shop Now"
        ctaLink="/search"
      />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Shop by Category</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Electronics */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Electronics Category"
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">Electronics</h3>
                  <a 
                    href="/search?category=Electronics" 
                    className="inline-block text-white text-sm font-medium border-b-2 border-white hover:border-blue-400 transition-colors"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>

            {/* Clothing */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Clothing Category"
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">Clothing</h3>
                  <a 
                    href="/search?category=Clothing" 
                    className="inline-block text-white text-sm font-medium border-b-2 border-white hover:border-blue-400 transition-colors"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>

            {/* Home & Kitchen */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.pexels.com/photos/3662136/pexels-photo-3662136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Home & Kitchen Category"
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">Home & Kitchen</h3>
                  <a 
                    href="/search?category=Home & Kitchen" 
                    className="inline-block text-white text-sm font-medium border-b-2 border-white hover:border-blue-400 transition-colors"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>

            {/* Sports & Outdoors */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Sports & Outdoors Category"
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">Sports & Outdoors</h3>
                  <a 
                    href="/search?category=Sports & Outdoors" 
                    className="inline-block text-white text-sm font-medium border-b-2 border-white hover:border-blue-400 transition-colors"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Why Shop With Us</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            We provide the best shopping experience with quality products and excellent service
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free Shipping */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Truck className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders over $50</p>
            </div>

            {/* Easy Returns */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <ShoppingBag className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30 day return policy for all items</p>
            </div>

            {/* Secure Payments */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <CreditCard className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Multiple secure payment options</p>
            </div>

            {/* 24/7 Support */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <LifeBuoy className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-blue-100 mb-6">
              Get updates on new products, special offers, and exclusive discounts.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none"
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;