import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { useProducts, ProductFilters } from '../context/ProductContext';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const { searchProducts, products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProductFilters>({});
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  // Set price range
  const priceRange = {
    min: Math.min(...products.map(product => product.price)),
    max: Math.max(...products.map(product => product.price))
  };

  // Get search params from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Get search query
    const queryParam = params.get('q');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
    
    // Get category filter
    const categoryParam = params.get('category');
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
    
    // Apply filters
    handleSearch();
  }, [location.search]);

  // Apply search and filters
  useEffect(() => {
    handleSearch();
  }, [searchQuery, filters]);

  const handleSearch = () => {
    const results = searchProducts(searchQuery, filters);
    setFilteredProducts(results);
  };

  const handleCategoryChange = (category: string) => {
    if (filters.category === category) {
      // If already selected, unselect it
      const { category: _, ...restFilters } = filters;
      setFilters(restFilters);
    } else {
      // Otherwise select it
      setFilters({ ...filters, category });
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setFilters(prev => ({ ...prev, [type === 'min' ? 'minPrice' : 'maxPrice']: value }));
    }
  };

  const handleRatingChange = (minRating: number) => {
    if (filters.minRating === minRating) {
      // If already selected, unselect it
      const { minRating: _, ...restFilters } = filters;
      setFilters(restFilters);
    } else {
      // Otherwise select it
      setFilters({ ...filters, minRating });
    }
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        
        {/* Mobile Filter Toggle */}
        <button 
          className="md:hidden flex items-center space-x-2 text-gray-600"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={20} />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`md:w-1/4 md:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Filter size={18} className="mr-2" />
                Filters
              </h2>
              {Object.keys(filters).length > 0 && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Search */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Search</h3>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      checked={filters.category === category}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={filters.minPrice || ''}
                  onChange={(e) => handlePriceChange(e, 'min')}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={filters.maxPrice || ''}
                  onChange={(e) => handlePriceChange(e, 'max')}
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center">
                    <input
                      id={`rating-${rating}`}
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      checked={filters.minRating === rating}
                      onChange={() => handleRatingChange(rating)}
                    />
                    <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1">& Up</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="md:w-3/4">
          {/* Active Filters */}
          {Object.keys(filters).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.category && (
                <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                  Category: {filters.category}
                  <button onClick={() => handleCategoryChange(filters.category!)} className="ml-2">
                    <X size={14} />
                  </button>
                </div>
              )}
              
              {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
                <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                  Price: {filters.minPrice !== undefined ? `$${filters.minPrice}` : '$0'} - 
                  {filters.maxPrice !== undefined ? `$${filters.maxPrice}` : 'Any'}
                  <button 
                    onClick={() => setFilters(({ minPrice, maxPrice, ...rest }) => rest)}
                    className="ml-2"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              
              {filters.minRating !== undefined && (
                <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                  Rating: {filters.minRating}+ Stars
                  <button 
                    onClick={() => handleRatingChange(filters.minRating!)}
                    className="ml-2"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              {searchQuery && <span> for "{searchQuery}"</span>}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <button 
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;