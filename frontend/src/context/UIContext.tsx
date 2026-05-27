import React, { createContext, useContext, useState } from "react";

interface UIContextType {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const UIContext = createContext<UIContextType | null>(null);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <UIContext.Provider value={{ cartOpen, openCart: () => setCartOpen(true), closeCart: () => setCartOpen(false) }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be inside UIProvider");
  return ctx;
};
