import { useState, useEffect, useCallback } from "react";

export interface CartItem {
  title: string;
  price: string;
  image: string;
  category: string;
  quantity: number;
}

const CART_KEY = "store-cart";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
  }, []);

  const addToCart = useCallback(
    (product: { title: string; price: string; image: string; category: string }) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.title === product.title);
        let next: CartItem[];
        if (existing) {
          next = prev.map((item) =>
            item.title === product.title
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          next = [...prev, { ...product, quantity: 1 }];
        }
        writeCart(next);
        return next;
      });
    },
    []
  );

  const removeFromCart = useCallback((title: string) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.title !== title);
      writeCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((title: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => {
      const next = prev.map((item) =>
        item.title === title ? { ...item, quantity } : item
      );
      writeCart(next);
      return next;
    });
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, addToCart, removeFromCart, updateQuantity, totalItems };
}
