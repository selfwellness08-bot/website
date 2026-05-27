import React, { createContext, useContext, useEffect, useState } from "react";
// Context for cart, wishlist, and currency conversion

export interface CartItem {
  id: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  wishlist: string[];
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem("self_cart") || "[]"); } catch { return []; }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("self_wishlist") || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("self_cart", JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem("self_wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = (id: string, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { id, quantity: qty }];
    });
  };

  const removeFromCart = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const updateQuantity = (id: string, qty: number) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, qty) } : i));
  const clearCart = () => setItems([]);
  const toggleWishlist = (id: string) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const cartCount = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, wishlist, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};

interface CurrencyContextType {
  currency: string;
  setCurrency: (c: string) => void;
  convert: (usd: number) => number;
  symbol: string;
  format: (usd: number) => string;
}

const RATES: Record<string, { rate: number; symbol: string; name: string }> = {
  USD: { rate: 1, symbol: "$", name: "US Dollar" },
  INR: { rate: 83.25, symbol: "₹", name: "Indian Rupee" },
  AED: { rate: 3.67, symbol: "د.إ", name: "UAE Dirham" },
  GBP: { rate: 0.79, symbol: "£", name: "British Pound" },
  EUR: { rate: 0.92, symbol: "€", name: "Euro" },
  SAR: { rate: 3.75, symbol: "﷼", name: "Saudi Riyal" },
  SGD: { rate: 1.35, symbol: "S$", name: "Singapore Dollar" },
  AUD: { rate: 1.52, symbol: "A$", name: "Australian Dollar" },
  CAD: { rate: 1.36, symbol: "C$", name: "Canadian Dollar" },
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<string>(() => {
    return localStorage.getItem("self_currency") || "USD";
  });

  useEffect(() => { localStorage.setItem("self_currency", currency); }, [currency]);

  // Auto-detect region
  useEffect(() => {
    if (localStorage.getItem("self_currency")) return;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const locale = navigator.language || "";
    let detected = "USD";
    if (locale.toLowerCase().startsWith("en-in") || tz.includes("Calcutta") || tz.includes("Kolkata")) detected = "INR";
    else if (tz.includes("Dubai") || locale.toLowerCase().includes("ae")) detected = "AED";
    else if (locale.toLowerCase().startsWith("en-gb")) detected = "GBP";
    else if (locale.toLowerCase().startsWith("en-au")) detected = "AUD";
    else if (locale.toLowerCase().startsWith("en-ca")) detected = "CAD";
    setCurrency(detected);
  }, []);

  const convert = (usd: number) => {
    const rate = RATES[currency]?.rate ?? 1;
    return Math.round(usd * rate * 100) / 100;
  };

  const symbol = RATES[currency]?.symbol ?? "$";

  const format = (usd: number) => `${symbol}${convert(usd).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, symbol, format }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be inside CurrencyProvider");
  return ctx;
};

export const CURRENCY_OPTIONS = Object.entries(RATES).map(([code, data]) => ({ code, ...data }));
