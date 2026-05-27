import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductImage } from "../components/ProductImage";
import { PRODUCTS, CATEGORIES, TESTIMONIALS, BUNDLES } from "../data/products";
import { useCurrency } from "../context/StoreContexts";
import {
  LeafIcon, SparkIcon, DiamondIcon, LotusIcon,
  SoapIcon, WavesIcon, SparklesIcon, FlowerIcon, StarIcon,
} from "../components/WellnessIcons";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.9, ease: "easeOut" as const },
};

export const HomePage: React.FC = () => {
  const { format } = useCurrency();
  const featured = PRODUCTS.filter(p => p.badge).slice(0, 4);
  const bestsellers = PRODUCTS.filter(p => !p.badge || p.badge === "Bestseller").slice(0, 4);

  return (
    <div className="pt-[140px]">
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-140px)] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/images/hero-lifestyle.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#f8f8f5]/85 via-[#f8f8f5]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8f8f5] via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-2 gap-12 items-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-6 font-medium">
              Strength · Energy · Lifestyle · Fulfillment
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-[#1c1c1c] mb-8">
              Thoughtfully<br />
              Made For <span className="font-script text-[#ff7a00] font-normal">You</span>
            </h1>
            <p className="text-lg md:text-xl text-[#777777] font-light leading-relaxed max-w-xl mb-10">
              Premium wellness essentials crafted for strength, energy, lifestyle & fulfillment.
              A calm, conscious ritual — for the modern soul.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="magnetic-btn bg-[#ff7a00] hover:bg-[#ff9a33] text-white px-10 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-medium shadow-lg shadow-[#ff7a00]/20">
                Shop Now
              </Link>
              <Link to="/shop" className="magnetic-btn border-2 border-[#0d4b3e] text-[#0d4b3e] hover:bg-[#0d4b3e] hover:text-white px-10 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-medium transition-colors">
                Explore Collection
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap gap-8 text-xs text-[#777777] tracking-[0.15em] uppercase">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#0d4b3e]" /> Cruelty Free</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#0d4b3e]" /> 100% Vegan</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#0d4b3e]" /> Sustainably Sourced</span>
            </div>
          </motion.div>

          {/* Floating product visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff7a00]/10 to-transparent animate-slow-spin" />
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 w-48 h-60 rounded-3xl overflow-hidden shadow-2xl"
              >
                <ProductImage variant="serum" alt="" className="h-full w-full" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-10 left-10 w-56 h-56 rounded-3xl overflow-hidden shadow-2xl"
              >
                <ProductImage variant="soap" alt="" className="h-full w-full" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full overflow-hidden shadow-2xl border-8 border-[#f8f8f5]"
              >
                <ProductImage variant="hair" alt="" className="h-full w-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 PILLARS OF SELF */}
      <section className="py-32 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-20">
            <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">Our Philosophy</p>
            <h2 className="font-display text-4xl md:text-6xl text-[#1c1c1c] mb-6">The Four Pillars of <span className="font-script text-[#ff7a00] font-normal">SELF</span></h2>
            <p className="text-[#777777] max-w-2xl mx-auto text-lg font-light">
              Every ritual, every product, every ingredient — guided by the four principles that shape a balanced life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {([
              { letter: "S", word: "Strength", Icon: LeafIcon, desc: "Inner resilience rooted in ancient botanicals and modern science." },
              { letter: "E", word: "Energy", Icon: SparkIcon, desc: "Vibrant vitality from nature's most potent, life-giving ingredients." },
              { letter: "L", word: "Lifestyle", Icon: DiamondIcon, desc: "Daily rituals that elevate the ordinary into something extraordinary." },
              { letter: "F", word: "Fulfillment", Icon: LotusIcon, desc: "A deeper sense of well-being, harmony, and quiet self-love." },
            ] as const).map((pillar, i) => (
              <motion.div
                key={pillar.letter}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="group relative bg-white border border-[#0d4b3e]/8 rounded-3xl p-8 hover:bg-[#0d4b3e] hover:-translate-y-2 hover:shadow-[0_24px_60px_-12px_rgba(13,75,62,0.35)] transition-all duration-600 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff7a00]/3 via-transparent to-[#0d4b3e]/3 group-hover:opacity-0 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="font-display font-bold text-[#ff7a00] mb-5 text-5xl leading-none group-hover:scale-105 transition-transform duration-500 origin-left">
                    {pillar.letter}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#0d4b3e]/8 group-hover:bg-white/15 flex items-center justify-center mb-6 transition-colors duration-500">
                    <pillar.Icon className="w-5 h-5 text-[#0d4b3e] group-hover:text-[#ff7a00] transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl text-[#1c1c1c] group-hover:text-white transition-colors duration-500 mb-3 tracking-wide">
                    {pillar.word}
                  </h3>
                  <p className="text-[#777777] group-hover:text-[#f8f8f5]/70 text-sm leading-relaxed transition-colors duration-500">
                    {pillar.desc}
                  </p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-tl from-[#ff7a00]/8 to-transparent group-hover:from-[#ff7a00]/20 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STAY BALANCED PHILOSOPHY */}
      <section className="py-32 px-6 lg:px-10 bg-gradient-to-br from-[#f8f8f5] via-white to-[#f8f8f5] relative overflow-hidden">
        {/* Decorative leaves */}
        <svg className="absolute top-10 left-10 w-40 h-40 text-[#ff7a00]/10" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C 10 30, 10 70, 50 90 C 50 50, 90 30, 50 10 Z" />
        </svg>
        <svg className="absolute bottom-10 right-10 w-56 h-56 text-[#0d4b3e]/5 rotate-45" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C 10 30, 10 70, 50 90 C 50 50, 90 30, 50 10 Z" />
        </svg>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp}>
            {/* Leaves icon */}
            <div className="flex justify-center mb-8">
              <svg viewBox="0 0 100 60" className="w-24 h-14">
                <path d="M50 5 C 10 15, 10 45, 50 55 C 50 30, 90 15, 50 5 Z" fill="#ff7a00" />
                <path d="M50 5 C 90 15, 90 45, 50 55 C 50 30, 10 15, 50 5 Z" fill="#0d4b3e" opacity="0.8" />
              </svg>
            </div>
            <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-6">Our Wellness Philosophy</p>
            <h2 className="font-display text-5xl md:text-7xl text-[#1c1c1c] mb-8 leading-tight">
              <span className="font-script text-[#ff7a00] font-normal">Stay</span> balanced
            </h2>
            <p className="text-xl md:text-2xl text-[#777777] font-light leading-relaxed max-w-3xl mx-auto mb-12">
              True wellness is not a destination — it is a daily practice. A gentle rhythm of mindful choices, 
              nourishing rituals, and quiet moments of gratitude. We craft for the balance within.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { n: "98%", l: "Natural Ingredients" },
                { n: "0", l: "Harmful Chemicals" },
                { n: "100%", l: "Cruelty-Free" },
              ].map(stat => (
                <div key={stat.l} className="py-6 border-t border-[#ff7a00]/30">
                  <div className="font-display text-4xl text-[#0d4b3e] mb-2">{stat.n}</div>
                  <div className="text-xs tracking-[0.2em] uppercase text-[#777777]">{stat.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">Shop by Ritual</p>
            <h2 className="font-display text-4xl md:text-6xl text-[#1c1c1c]">Curated Collections</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {CATEGORIES.map((cat, i) => {
              const variants: Record<string, "soap" | "gel" | "scrub" | "hair" | "serum"> = {
                soap: "soap", gel: "gel", scrub: "scrub", hair: "hair", skincare: "serum",
              };
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                >
                  <Link
                    to={`/shop?cat=${cat.id}`}
                    className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
                  >
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <ProductImage variant={variants[cat.id]} alt={cat.name} className="h-full w-full" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d4b3e]/60 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="mb-2">
                          {cat.id === "soap" && <SoapIcon className="w-6 h-6 text-white/90" strokeWidth={1.5} />}
                          {cat.id === "gel" && <WavesIcon className="w-6 h-6 text-white/90" strokeWidth={1.5} />}
                          {cat.id === "scrub" && <SparklesIcon className="w-6 h-6 text-white/90" strokeWidth={1.5} />}
                          {cat.id === "hair" && <LeafIcon className="w-6 h-6 text-white/90" strokeWidth={1.5} />}
                          {cat.id === "skincare" && <FlowerIcon className="w-6 h-6 text-white/90" strokeWidth={1.5} />}
                        </div>
                        <h3 className="font-display text-xl mb-1">{cat.name}</h3>
                        <p className="text-xs text-white/80">{cat.desc}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-32 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">Editor's Choice</p>
              <h2 className="font-display text-4xl md:text-6xl text-[#1c1c1c]">Featured Products</h2>
            </div>
            <Link to="/shop" className="link-underline text-[#0d4b3e] text-sm tracking-[0.2em] uppercase font-medium">
              View All →
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BUNDLES */}
      <section className="py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">Curated Rituals</p>
            <h2 className="font-display text-4xl md:text-6xl text-[#1c1c1c]">Signature Bundles</h2>
            <p className="text-[#777777] mt-4">Thoughtfully paired. Beautifully priced.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {BUNDLES.map((bundle, i) => (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <ProductImage src={bundle.image} alt={bundle.name} className="h-full w-full" />
                  <div className="absolute top-4 right-4 bg-[#ff7a00] text-white text-xs tracking-wider px-3 py-1.5 rounded-full">
                    SAVE 15%
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl text-[#1c1c1c] mb-2">{bundle.name}</h3>
                  <p className="text-[#777777] text-sm mb-6">{bundle.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display text-2xl text-[#0d4b3e]">{format(bundle.priceUSD)}</span>
                    </div>
                    <Link to="/shop" className="text-[#ff7a00] text-sm tracking-wider font-medium hover:underline">
                      SHOP BUNDLE →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="py-32 px-6 lg:px-10 bg-[#f8f8f5]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">Loved by thousands</p>
            <h2 className="font-display text-4xl md:text-6xl text-[#1c1c1c]">Bestsellers</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 px-6 lg:px-10 bg-[#0d4b3e] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">The SELF Family</p>
            <h2 className="font-display text-4xl md:text-6xl text-white">Kind Words</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
              >
                <div className="flex gap-0.5 mb-4 text-[#ff7a00]">
                  {[1,2,3,4,5].map(n => <StarIcon key={n} className="w-4 h-4" filled={true} />)}
                </div>
                <p className="text-white/90 text-lg leading-relaxed mb-6 font-light italic">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">{t.name}</div>
                    <div className="text-xs text-white/50 tracking-wider uppercase">{t.location}</div>
                  </div>
                  <div className="text-xs text-[#ff7a00]">{t.handle}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM FEED */}
      <section className="py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">Follow @selfwellness</p>
            <h2 className="font-display text-4xl md:text-6xl text-[#1c1c1c]">Share Your Ritual</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["soap", "serum", "scrub", "hair", "gel", "soap", "serum", "scrub"].map((variant, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="aspect-square relative group overflow-hidden rounded-2xl cursor-pointer"
              >
                <ProductImage variant={variant as any} alt="" className="h-full w-full" />
                <div className="absolute inset-0 bg-[#0d4b3e]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export const ProductCard: React.FC<{ product: typeof PRODUCTS[number] }> = ({ product }) => {
  const { format } = useCurrency();
  const variantMap: Record<string, "soap" | "serum" | "scrub" | "hair" | "gel"> = {
    soap: "soap", gel: "gel", scrub: "scrub", hair: "hair", skincare: "serum",
  };
  return (
    <Link to={`/product/${product.id}`} className="group block product-card bg-white rounded-3xl overflow-hidden shadow-sm">
      <div className="aspect-[3/4] relative overflow-hidden">
        <ProductImage src={product.images[0]} variant={variantMap[product.category]} alt={product.name} className="h-full w-full" />
        {product.badge && (
          <div className="absolute top-4 left-4 bg-[#ff7a00] text-white text-[10px] tracking-wider px-3 py-1.5 rounded-full uppercase">
            {product.badge}
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-[#1c1c1c] text-white px-4 py-2 rounded-full text-xs tracking-wider uppercase">Sold Out</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="text-xs text-[#777777] tracking-[0.15em] uppercase mb-2">{product.category}</div>
        <h3 className="font-display text-lg text-[#1c1c1c] mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg text-[#0d4b3e]">{format(product.priceUSD)}</span>
          <div className="flex items-center gap-1 text-xs text-[#ff7a00]">
            <StarIcon className="w-3 h-3" filled={true} />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
