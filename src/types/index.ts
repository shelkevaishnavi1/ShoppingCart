export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
  image: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}