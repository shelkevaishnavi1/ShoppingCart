import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { products as initialProducts } from '../data/products';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getFeaturedProducts: () => Product[];
  searchProducts: (query: string, filters?: ProductFilters) => Product[];
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Load products from localStorage if available
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error('Failed to parse products from localStorage:', error);
        localStorage.removeItem('products');
      }
    } else {
      // Initialize localStorage with the default products
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: (Math.max(...products.map(p => parseInt(p.id)), 0) + 1).toString()
    };
    
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  const searchProducts = (query: string, filters?: ProductFilters) => {
    let filteredProducts = products;
    
    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.description.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Apply additional filters if provided
    if (filters) {
      if (filters.category) {
        filteredProducts = filteredProducts.filter(product => 
          product.category === filters.category
        );
      }
      
      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product => 
          product.price >= filters.minPrice!
        );
      }
      
      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product => 
          product.price <= filters.maxPrice!
        );
      }
      
      if (filters.minRating !== undefined) {
        filteredProducts = filteredProducts.filter(product => 
          product.rating >= filters.minRating!
        );
      }
    }
    
    return filteredProducts;
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      getFeaturedProducts,
      searchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};