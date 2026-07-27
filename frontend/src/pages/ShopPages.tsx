import React, { useMemo, useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, CATEGORIES, type Category } from "../data/products";
import { ProductImage } from "../components/ProductImage";
import { useCart, useCurrency } from "../context/StoreContexts";
import { useUI } from "../context/UIContext";
import { useToast } from "../context/ToastContext";
import { ProductCard } from "./HomePage";
import {
  GiftIcon as GiftIconShop,
  LeafIcon as LeafIconShop,
  PawIcon as PawIconShop,
  RecycleIcon as RecycleIconShop,
  StarIcon as StarIconShop,
} from "../components/WellnessIcons";

export const ShopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = (searchParams.get("cat") as Category) || "all";
  const [activeCategory, setActiveCategory] = useState<Category | "all">(initialCategory);
  const [sortBy, setSortBy] = useState<"featured" | "low" | "high" | "rating">("featured");

  useEffect(() => { setActiveCategory((searchParams.get("cat") as Category) || "all"); }, [searchParams]);

  const filtered = useMemo(() => {
    let list = activeCategory === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);
    if (sortBy === "low") list = [...list].sort((a, b) => a.priceUSD - b.priceUSD);
    if (sortBy === "high") list = [...list].sort((a, b) => b.priceUSD - a.priceUSD);
    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, sortBy]);

  return (
    <div className="pt-[140px]">
      {/* Hero */}
      <section className="py-24 px-6 lg:px-10 bg-gradient-to-b from-[#0d4b3e] to-[#0d4b3e]/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/hero-lifestyle.jpg" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">The Collection</p>
          <h1 className="font-display text-5xl md:text-7xl mb-6">
            Shop <span className="font-script text-[#ff7a00] font-normal">Rituals</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg font-light">
            Each product, a carefully composed ritual. Each ingredient, a quiet intention.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[140px] z-30 bg-[#f8f8f5]/95 backdrop-blur-md border-b border-[#0d4b3e]/10 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 scrollbar-hide">
            {["all", ...CATEGORIES.map(c => c.id)].map(cat => {
              const label = cat === "all" ? "All" : CATEGORIES.find(c => c.id === cat)!.name;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm tracking-wider uppercase transition-all ${
                    activeCategory === cat
                      ? "bg-[#ff7a00] text-white"
                      : "bg-white text-[#1c1c1c] hover:bg-[#0d4b3e] hover:text-white border border-[#0d4b3e]/10"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs tracking-wider uppercase text-[#777777]">Sort</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-white border border-[#0d4b3e]/10 rounded-full px-4 py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#777777]">
            <p className="font-display text-2xl mb-2">No products found</p>
            <p className="text-sm">Try a different category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"benefits" | "ingredients" | "usage">("benefits");
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const { format } = useCurrency();
  const { openCart } = useUI();
  const { toast } = useToast();
  const [added, setAdded] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!product) {
    return (
      <div className="pt-[140px] min-h-screen text-center py-40">
        <p className="font-display text-3xl mb-4">Product not found</p>
        <Link to="/shop" className="text-[#ff7a00] underline">Return to Shop</Link>
      </div>
    );
  }

  const inWishlist = wishlist.includes(product.id);
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const variantMap: Record<string, any> = {
    soap: "soap",
    "daily-essentials": "daily-essentials",
    skincare: "skincare",
    "lip-care": "lip-care",
    hampers: "hampers",
  };

  const handleAdd = () => {
    addToCart(product.id, qty);
    setAdded(true);
    toast(`${product.name} added to cart`, "success");
    setTimeout(() => { setAdded(false); openCart(); }, 600);
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    toast(
      wishlist.includes(product.id) ? "Removed from wishlist" : `${product.name} saved to wishlist`,
      wishlist.includes(product.id) ? "info" : "success"
    );
  };

  return (
    <div className="pt-[140px]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 text-sm text-[#777777]">
        <Link to="/" className="hover:text-[#ff7a00]">Home</Link> /{" "}
        <Link to="/shop" className="hover:text-[#ff7a00]">Shop</Link> /{" "}
        <Link to={`/shop?cat=${product.category}`} className="hover:text-[#ff7a00] capitalize">{product.category}</Link> /{" "}
        <span className="text-[#1c1c1c]">{product.name}</span>
      </div>

      {/* Product section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20 grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-sm mb-4"
          >
            <ProductImage src={product.images[selectedImg]} variant={variantMap[product.category]} alt={product.name} className="h-full w-full" />
          </motion.div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(i)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImg === i ? "border-[#ff7a00]" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <ProductImage src={img} variant={variantMap[product.category]} alt="" className="h-full w-full" />
              </button>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          {product.badge && (
            <span className="inline-block bg-[#ff7a00] text-white text-[10px] tracking-wider px-3 py-1.5 rounded-full uppercase mb-4">
              {product.badge}
            </span>
          )}
          <p className="text-xs text-[#ff7a00] tracking-[0.25em] uppercase mb-3">{product.category}</p>
          <h1 className="font-display text-4xl md:text-5xl text-[#1c1c1c] mb-4">{product.name}</h1>
          <p className="text-[#777777] italic mb-6">{product.shortDesc}</p>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-[#ff7a00]">{[1,2,3,4,5].map(n => <StarIconShop key={n} className="w-4 h-4" filled={true} />)}</div>
            <span className="text-sm text-[#777777]">{product.rating} · {product.reviews.length} reviews</span>
          </div>

          <div className="font-display text-4xl text-[#0d4b3e] mb-8">{format(product.priceUSD)}</div>

          <p className="text-[#777777] leading-relaxed mb-8">{product.description}</p>

          <div className="mb-8 p-6 bg-white rounded-2xl border border-[#0d4b3e]/10">
            <div className="text-xs tracking-[0.2em] uppercase text-[#777777] mb-3">Skin/Hair Compatibility</div>
            <p className="text-[#1c1c1c]">{product.compatibility}</p>
          </div>

          <div className="mb-8">
            <div className="text-xs tracking-[0.2em] uppercase text-[#777777] mb-3">Quantity</div>
            <div className="inline-flex items-center border border-[#0d4b3e]/20 rounded-full">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 text-xl text-[#1c1c1c] hover:text-[#ff7a00]">−</button>
              <span className="w-12 text-center font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-12 h-12 text-xl text-[#1c1c1c] hover:text-[#ff7a00]">+</button>
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAdd}
              className="flex-1 bg-[#ff7a00] hover:bg-[#ff9a33] text-white py-4 rounded-full tracking-wider uppercase text-sm font-medium transition-all shadow-lg shadow-[#ff7a00]/20"
            >
              {added ? "✓ Added" : "Add to Cart"}
            </button>
            <button
              onClick={handleWishlist}
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${
                inWishlist ? "border-[#ff7a00] text-[#ff7a00] bg-[#ff7a00]/10" : "border-[#0d4b3e]/20 text-[#1c1c1c] hover:border-[#ff7a00] hover:text-[#ff7a00]"
              }`}
            >
              <svg className="w-5 h-5" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>

          {/* Bundles */}
          {product.bundles && (
            <div className="mb-8 p-6 bg-gradient-to-br from-[#ff7a00]/10 to-[#0d4b3e]/5 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <GiftIconShop className="w-5 h-5 text-[#ff7a00]" strokeWidth={1.5} />
                <span className="text-sm font-medium tracking-wider uppercase">Bundle & Save</span>
              </div>
              {product.bundles.map(b => (
                <div key={b.name} className="text-sm text-[#1c1c1c]">
                  <span className="font-medium">{b.name}</span> — save <span className="text-[#ff7a00] font-semibold">{b.discount}%</span>
                </div>
              ))}
            </div>
          )}

          {/* Trust */}
          <div className="grid grid-cols-3 gap-4 text-xs text-[#777777]">
            <div className="flex items-center gap-1.5"><LeafIconShop className="w-4 h-4 text-[#0d4b3e]" strokeWidth={1.5} />Vegan</div>
            <div className="flex items-center gap-1.5"><PawIconShop className="w-4 h-4 text-[#0d4b3e]" strokeWidth={1.5} />Cruelty-free</div>
            <div className="flex items-center gap-1.5"><RecycleIconShop className="w-4 h-4 text-[#0d4b3e]" strokeWidth={1.5} />Sustainable</div>
          </div>
        </motion.div>
      </section>

      {/* Tabs: Benefits / Ingredients / Usage */}
      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-20">
        <div className="flex gap-2 border-b border-[#0d4b3e]/10 mb-8 overflow-x-auto">
          {(["benefits", "ingredients", "usage"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 text-sm tracking-[0.2em] uppercase transition-all whitespace-nowrap ${
                activeTab === tab ? "text-[#ff7a00] border-b-2 border-[#ff7a00]" : "text-[#777777] hover:text-[#1c1c1c]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {activeTab === "benefits" && (
              <div className="grid md:grid-cols-2 gap-4">
                {product.benefits.map(b => (
                  <div key={b} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-[#0d4b3e]/10">
                    <span className="text-2xl text-[#ff7a00]">✦</span>
                    <p className="text-[#1c1c1c]">{b}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "ingredients" && (
              <div className="flex flex-wrap gap-3">
                {product.ingredients.map(ing => (
                  <div key={ing} className="px-5 py-3 bg-white rounded-full border border-[#0d4b3e]/10 text-sm">
                    <span className="text-[#ff7a00] mr-2">✦</span>{ing}
                  </div>
                ))}
              </div>
            )}
            {activeTab === "usage" && (
              <ol className="space-y-3">
                {product.usage.map((u, i) => (
                  <li key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-[#0d4b3e]/10">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ff7a00] text-white flex items-center justify-center text-sm font-semibold">{i + 1}</span>
                    <p className="text-[#1c1c1c] pt-1">{u}</p>
                  </li>
                ))}
              </ol>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 lg:px-10 py-20 border-t border-[#0d4b3e]/10">
          <h3 className="font-display text-3xl mb-10">Customer Reviews</h3>
          <div className="space-y-4">
            {product.reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#0d4b3e]/10">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-[#777777]">{r.date} {r.verified && "· Verified"}</div>
                  </div>
                  <div className="flex text-[#ff7a00]">{Array.from({length: r.rating}).map((_, n) => <StarIconShop key={n} className="w-3.5 h-3.5" filled={true} />)}</div>
                </div>
                <p className="text-[#777777] italic">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 border-t border-[#0d4b3e]/10">
          <h3 className="font-display text-3xl mb-10 text-center">You May Also Love</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Sticky mobile Add to Cart bar */}
      <AnimatePresence>
        {stickyVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-16 left-0 right-0 z-[80] md:hidden px-4 pb-2"
          >
            <div className="bg-white rounded-2xl shadow-2xl shadow-black/15 border border-[#0d4b3e]/10 p-3 flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                <ProductImage
                  src={product.images[0]}
                  variant={variantMap[product.category] as "soap" | "serum" | "scrub" | "hair" | "gel"}
                  alt={product.name}
                  className="h-full w-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[#1c1c1c] truncate">{product.name}</p>
                <p className="text-sm font-display text-[#0d4b3e] font-semibold">{format(product.priceUSD)}</p>
              </div>
              <button
                onClick={handleAdd}
                className="bg-[#ff7a00] hover:bg-[#ff9a33] text-white px-5 py-3 rounded-xl text-xs tracking-wider uppercase font-medium transition-colors shadow-lg shadow-[#ff7a00]/20 whitespace-nowrap"
              >
                {added ? "✓ Added" : "Add to Cart"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
