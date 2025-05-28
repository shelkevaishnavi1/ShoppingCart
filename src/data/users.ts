import { User } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    isAdmin: true
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    isAdmin: false
  }
];