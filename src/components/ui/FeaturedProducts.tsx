import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { useProducts } from '../../context/ProductContext';

const FeaturedProducts: React.FC = () => {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="mt-2 text-gray-600">Check out our most popular items</p>
          </div>
          <Link 
            to="/search"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            View all products
            <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No featured products found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;