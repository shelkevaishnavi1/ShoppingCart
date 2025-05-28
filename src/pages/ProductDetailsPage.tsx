import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft, CheckCircle, Shield, TruckIcon } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ui/ProductCard';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);

  // Get product details
  const product = getProductById(id!);

  // Find similar products (same category)
  useEffect(() => {
    if (product) {
      const similar = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
      
      setSimilarProducts(similar);
    }
  }, [product, products]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setIsAdded(true);
      
      // Reset added status after 3 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 3000);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-medium text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/search"
            className="inline-flex items-center px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li className="text-gray-500">/</li>
          <li>
            <Link to="/search" className="text-gray-500 hover:text-blue-600 transition-colors">
              Products
            </Link>
          </li>
          <li className="text-gray-500">/</li>
          <li>
            <Link 
              to={`/search?category=${encodeURIComponent(product.category)}`} 
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              {product.category}
            </Link>
          </li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-700 font-medium truncate">{product.name}</li>
        </ol>
      </nav>

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">{product.rating} out of 5</span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {/* If we had original price, we could show discount here */}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Stock */}
            <div className="mb-6">
              <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 
                  ? `In Stock (${product.stock} available)` 
                  : 'Out of Stock'}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="flex items-center mb-6">
              <div className="mr-4">
                <label htmlFor="quantity" className="block text-sm text-gray-700 mb-1">Quantity</label>
                <input 
                  type="number" 
                  id="quantity"
                  min="1"
                  max={product.stock}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              <div className="flex-1">
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || isAdded}
                  className={`w-full py-3 px-4 rounded-md flex items-center justify-center transition-colors ${
                    isAdded 
                      ? 'bg-green-600 text-white' 
                      : product.stock === 0 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle size={18} className="mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
              <button className="ml-4 p-3 border border-gray-300 rounded-md text-gray-600 hover:text-red-600 hover:border-red-600 transition-colors">
                <Heart size={20} />
              </button>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 pt-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Satisfaction Guarantee</h4>
                    <p className="text-sm text-gray-500">30-day money back guarantee</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <TruckIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
                    <p className="text-sm text-gray-500">On orders over $50</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;