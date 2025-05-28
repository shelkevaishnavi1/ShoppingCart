import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, CartItem } from '../types';

interface OrderContextType {
  orders: Order[];
  addOrder: (userId: string, items: CartItem[], shippingAddress: Order['shippingAddress']) => Order;
  getUserOrders: (userId: string) => Order[];
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on initial render
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Failed to parse orders from localStorage:', error);
        localStorage.removeItem('orders');
      }
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (userId: string, items: CartItem[], shippingAddress: Order['shippingAddress']) => {
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: (Math.max(...orders.map(o => parseInt(o.id)), 0) + 1).toString(),
      userId,
      items,
      total,
      status: 'pending',
      date: new Date().toISOString(),
      shippingAddress
    };
    
    setOrders([...orders, newOrder]);
    return newOrder;
  };

  const getUserOrders = (userId: string) => {
    return orders.filter(order => order.userId === userId);
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      getUserOrders,
      getOrderById,
      updateOrderStatus
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};