import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, Gift } from "lucide-react";
import { useCart, useCurrency } from "../context/StoreContexts";
import { useUI } from "../context/UIContext";
import { PRODUCTS } from "../data/products";
import { ProductImage } from "./ProductImage";

const FREE_SHIPPING_THRESHOLD = 50;

const variantMap: Record<string, "soap" | "serum" | "scrub" | "hair" | "gel" | "daily-essentials" | "skincare" | "lip-care" | "hampers"> = {
  soap: "soap", "daily-essentials": "daily-essentials", skincare: "skincare", "lip-care": "lip-care", hampers: "hampers",
};

export const CartDrawer: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const { format } = useCurrency();
  const { cartOpen, closeCart } = useUI();

  const cartProducts = items.map(item => ({
    ...item,
    product: PRODUCTS.find(p => p.id === item.id),
  })).filter(i => i.product);

  const subtotalUSD = cartProducts.reduce(
    (acc, i) => acc + (i.product!.priceUSD * i.quantity),
    0
  );
  const shippingUSD = subtotalUSD >= FREE_SHIPPING_THRESHOLD ? 0 : 10;
  const totalUSD = subtotalUSD + shippingUSD;
  const progressPct = Math.min((subtotalUSD / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingUSD = Math.max(FREE_SHIPPING_THRESHOLD - subtotalUSD, 0);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            onClick={closeCart}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[95] w-full max-w-md bg-[#f8f8f5] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#0d4b3e]/10 bg-white">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#0d4b3e]" strokeWidth={1.5} />
                <h2 className="font-display text-xl text-[#1c1c1c]">Your Cart</h2>
                {items.length > 0 && (
                  <span className="text-xs bg-[#ff7a00] text-white rounded-full px-2 py-0.5 font-medium">
                    {items.reduce((a, i) => a + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full hover:bg-[#f8f8f5] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping progress bar */}
            {items.length > 0 && (
              <div className="px-6 py-3 bg-white border-b border-[#0d4b3e]/10">
                {remainingUSD > 0 ? (
                  <p className="text-xs text-[#777777] mb-2">
                    Add <span className="font-semibold text-[#0d4b3e]">{format(remainingUSD)}</span> more for free shipping
                  </p>
                ) : (
                  <p className="text-xs text-[#0d4b3e] font-semibold mb-2 flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5" /> You've unlocked free shipping!
                  </p>
                )}
                <div className="h-1.5 bg-[#0d4b3e]/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#0d4b3e] to-[#ff7a00] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 px-6 space-y-3">
              {cartProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-[#0d4b3e]/6 flex items-center justify-center">
                    <ShoppingBag className="w-9 h-9 text-[#0d4b3e]/40" strokeWidth={1} />
                  </div>
                  <div>
                    <p className="font-display text-2xl text-[#1c1c1c] mb-2">Your cart is empty</p>
                    <p className="text-sm text-[#777777]">Discover our wellness rituals</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="bg-[#ff7a00] hover:bg-[#ff9a33] text-white px-8 py-3 rounded-full text-sm tracking-wider uppercase transition-colors"
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                <>
                  <AnimatePresence>
                    {cartProducts.map(({ product, quantity, id }) => (
                      <motion.div
                        key={id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm"
                      >
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#f8f8f5]">
                          <ProductImage
                            src={product!.images[0]}
                            variant={variantMap[product!.category] ?? "serum"}
                            alt={product!.name}
                            className="h-full w-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-2 mb-1">
                            <p className="text-sm font-medium text-[#1c1c1c] line-clamp-2 leading-snug">
                              {product!.name}
                            </p>
                            <button
                              onClick={() => removeFromCart(id)}
                              className="text-[#777777] hover:text-red-500 transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-[#777777] mb-3 capitalize">{product!.category}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 border border-[#0d4b3e]/15 rounded-full">
                              <button
                                onClick={() => quantity > 1 ? updateQuantity(id, quantity - 1) : removeFromCart(id)}
                                className="w-7 h-7 flex items-center justify-center hover:text-[#ff7a00] transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                              <button
                                onClick={() => updateQuantity(id, quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center hover:text-[#ff7a00] transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="font-display text-base text-[#0d4b3e] font-semibold">
                              {format(product!.priceUSD * quantity)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <button
                    onClick={clearCart}
                    className="text-xs text-[#777777] hover:text-red-500 transition-colors flex items-center gap-1 mt-2"
                  >
                    <Trash2 className="w-3 h-3" /> Clear cart
                  </button>
                </>
              )}
            </div>

            {/* Footer */}
            {cartProducts.length > 0 && (
              <div className="border-t border-[#0d4b3e]/10 bg-white px-6 py-5 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[#777777]">
                    <span>Subtotal</span>
                    <span>{format(subtotalUSD)}</span>
                  </div>
                  <div className="flex justify-between text-[#777777]">
                    <span>Shipping</span>
                    <span className={shippingUSD === 0 ? "text-[#0d4b3e] font-medium" : ""}>
                      {shippingUSD === 0 ? "Free" : format(shippingUSD)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t border-[#0d4b3e]/10">
                    <span>Total</span>
                    <span className="text-[#0d4b3e] font-display text-lg">{format(totalUSD)}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full bg-[#ff7a00] hover:bg-[#ff9a33] text-white py-4 rounded-full text-sm tracking-[0.15em] uppercase font-medium transition-colors shadow-lg shadow-[#ff7a00]/25"
                >
                  Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={closeCart}
                  className="flex items-center justify-center w-full text-[#0d4b3e] text-sm hover:text-[#ff7a00] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
