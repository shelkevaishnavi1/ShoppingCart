import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ui/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/product/:id" element={<ProductDetailsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                      <ProtectedRoute requireAdmin>
                        <AdminPage />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </main>
                <Footer />
              </div>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;