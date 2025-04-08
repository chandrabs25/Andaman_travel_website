"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import * as jose from 'jose';

// Define types for our context
type UserRole = 'admin' | 'user' | 'vendor';

interface User {
  id: string;
  name?: string;
  email?: string;
  role?: UserRole;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

// Define response types for better type safety
interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    id: string | number;
    email: string;
    first_name?: string;
    last_name?: string;
    role?: string;
  };
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    id: string | number;
  };
}

// Create the context
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => false,
  logout: () => {},
  register: async () => false,
});

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // Verify token and extract user data
          try {
            // Simple validation - in production you'd want to verify the signature
            const payload = jose.decodeJwt(token);
            
            if (payload && payload.exp && payload.exp * 1000 > Date.now()) {
              setUser({
                id: payload.sub as string,
                name: payload.name as string,
                email: payload.email as string,
                role: payload.role as UserRole,
              });
            } else {
              // Token expired
              localStorage.removeItem('auth_token');
              setUser(null);
            }
          } catch (error) {
            console.error('Error parsing token:', error);
            localStorage.removeItem('auth_token');
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json() as LoginResponse;

      if (data.success && data.data) {
        // Create a simple JWT token
        const secret = new TextEncoder().encode(
          'your-secret-key-replace-in-production'
        );
        
        const token = await new jose.SignJWT({
          sub: data.data.id.toString(),
          name: `${data.data.first_name || ''} ${data.data.last_name || ''}`.trim(),
          email: data.data.email,
          role: data.data.role || 'user',
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('24h')
          .sign(secret);

        localStorage.setItem('auth_token', token);
        
        setUser({
          id: data.data.id.toString(),
          name: `${data.data.first_name || ''} ${data.data.last_name || ''}`.trim(),
          email: data.data.email,
          role: (data.data.role as UserRole) || 'user',
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    router.push('/');
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json() as RegisterResponse;
      return data.success;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const value = {
    isAuthenticated: !!user,
    isLoading,
    user,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
