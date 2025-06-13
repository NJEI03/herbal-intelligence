import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Assuming AuthContext is in the same directory
import { doc, getFirestore, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import app from '../lib/firebase'; // Assuming `app` is your initialized Firebase app
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  loadingCart: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const { toast } = useToast();
  const db = getFirestore(app);

  const cartRef = user ? doc(db, 'carts', user.uid) : null;

  useEffect(() => {
    if (user && cartRef) {
      setLoadingCart(true);
      const unsubscribe = onSnapshot(cartRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCartItems(data.items || []);
        } else {
          setCartItems([]);
          // Create a new cart document if it doesn't exist
          setDoc(cartRef, { items: [] }).catch(console.error);
        }
        setLoadingCart(false);
      }, (error) => {
        console.error("Error fetching cart:", error);
        toast({
          title: "Error",
          description: "Failed to load cart. Please try again later.",
          variant: "destructive",
        });
        setLoadingCart(false);
      });

      return () => unsubscribe();
    } else {
      setCartItems([]); // Clear cart if user logs out
      setLoadingCart(false);
    }
  }, [user]);

  // Function to save cart items to Firestore
  const saveCartToFirestore = async (items: CartItem[]) => {
    if (cartRef) {
      try {
        await updateDoc(cartRef, { items });
      } catch (error) {
        console.error("Error saving cart to Firestore:", error);
        toast({
          title: "Error",
          description: "Failed to save cart data.",
          variant: "destructive",
        });
      }
    }
  };

  const addToCart = (product: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      let newItems;
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
      saveCartToFirestore(newItems);
      return newItems;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      saveCartToFirestore(newItems);
      return newItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0); // Remove if quantity drops to 0
      saveCartToFirestore(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    saveCartToFirestore([]);
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    loadingCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 