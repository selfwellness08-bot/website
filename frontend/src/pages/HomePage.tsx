import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductImage } from "../components/ProductImage";
import { PRODUCTS, CATEGORIES, TESTIMONIALS, BUNDLES } from "../data/products";
import { useCurrency } from "../context/StoreContexts";
import {
  LeafIcon, SparkIcon, DiamondIcon, LotusIcon,
  SoapIcon, WavesIcon, SparklesIcon, FlowerIcon, StarIcon,
  GiftIcon, HandshakeIcon, UsersIcon, HeartIcon,
  DropletIcon, FlaskIcon, RecycleIcon, SproutIcon, GlobeIcon, CheckIcon,
} from "../components/WellnessIcons";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

export const HomePage: React.FC = () => {
  const { format } = useCurrency();
  const featured = PRODUCTS.filter(p => p.badge).slice(0, 4);
  const bestsellers = PRODUCTS.filter(p => !p.badge || p.badge === "Bestseller").slice(0, 4);

  return (
    <div className="pt-[140px]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-140px)] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-lifestyle.jpg" alt="SELF Luxury Wellness Brand" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#f8f8f5]/90 via-[#f8f8f5]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8f8f5] via-[#f8f8f5]/70 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-12 gap-12 items-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-3 bg-[#0d4b3e]/8 border border-[#0d4b3e]/15 px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ff7a00] animate-ping" />
              <p className="text-[#0d4b3e] text-xs tracking-[0.25em] uppercase font-semibold">
                SELF · Strength • Energy • Lifestyle • Fulfilment
              </p>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-[#1c1c1c] mb-6">
              Luxury Begins <span className="font-script text-[#ff7a00] font-normal">Within.</span>
            </h1>

            <div className="space-y-4 text-base md:text-lg text-[#555555] font-light leading-relaxed max-w-2xl mb-8">
              <p className="font-medium text-[#1c1c1c]">
                At <strong className="font-semibold text-[#0d4b3e]">SELF</strong>, we believe the most important relationship you will ever have is the one with yourself.
              </p>
              <p>
                In a world where we constantly celebrate others, we often forget to celebrate ourselves. SELF was created to change that.
              </p>
              <p>
                Every handcrafted product is a reminder to pause, breathe, nourish, and appreciate the person you see in the mirror.
              </p>
              <p>
                Our products are thoughtfully handcrafted using natural ingredients, beautifully presented in handcrafted silk-woven gift boxes inspired by India's rich heritage. Every gift is more than a product—it's an experience of love, gratitude, and wellness.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#0d4b3e]/10 mb-8 max-w-xl shadow-sm">
              <p className="text-xs text-[#ff7a00] uppercase tracking-[0.2em] font-semibold mb-2">Our Promise to You</p>
              <p className="text-sm italic text-[#1c1c1c]">
                "Whether you're gifting yourself or someone you care about, every SELF creation carries one simple message: <strong>You matter. You are worthy. You deserve to feel loved—every single day.</strong>"
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-[#0d4b3e] tracking-wider uppercase">
                <span>Gift Wellness.</span> · <span>Gift Love.</span> · <span className="text-[#ff7a00]">Gift SELF.</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="magnetic-btn bg-[#ff7a00] hover:bg-[#ff9a33] text-white px-9 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-semibold shadow-lg shadow-[#ff7a00]/25">
                Shop Now
              </Link>
              <Link to="/shop" className="magnetic-btn border-2 border-[#0d4b3e] text-[#0d4b3e] hover:bg-[#0d4b3e] hover:text-white px-9 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-semibold transition-colors">
                Explore Collection
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap gap-6 text-xs text-[#777777] tracking-[0.15em] uppercase font-medium">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#0d4b3e]" /> Handmade with Love</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#0d4b3e]" /> 100% Natural Ingredients</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#0d4b3e]" /> Made in India</span>
            </div>
          </motion.div>

          {/* Floating product visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:block lg:col-span-5 relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff7a00]/15 via-[#0d4b3e]/5 to-transparent animate-slow-spin" />
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 right-6 w-52 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
              >
                <ProductImage variant="serum" alt="Handmade Natural Skincare" className="h-full w-full" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-6 left-6 w-56 h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
              >
                <ProductImage variant="soap" alt="Luxury Handmade Soaps" className="h-full w-full" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full overflow-hidden shadow-2xl border-8 border-[#f8f8f5]"
              >
                <ProductImage variant="hair" alt="Natural Body Care" className="h-full w-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR PHILOSOPHY */}
      <section className="py-28 px-6 lg:px-10 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#ff7a00] text-xs tracking-[0.35em] uppercase font-semibold mb-3">Our Core Belief</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1c1c1c] mb-4">
              Our <span className="font-script text-[#ff7a00] font-normal">Philosophy</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#ff7a00] mx-auto mb-8" />
            <h3 className="font-display text-3xl md:text-4xl text-[#0d4b3e] max-w-2xl mx-auto">
              You Are Important.
            </h3>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <motion.div {...fadeUp} className="lg:col-span-6 space-y-6">
              <div className="bg-[#f8f8f5] p-8 rounded-3xl border border-[#0d4b3e]/10 space-y-4">
                <p className="text-lg font-light text-[#555555]">
                  Before you become a parent...
                </p>
                <p className="text-lg font-light text-[#555555]">
                  Before you become a leader...
                </p>
                <p className="text-lg font-light text-[#555555]">
                  Before you become a caregiver...
                </p>
                <div className="pt-2">
                  <p className="font-display text-3xl font-semibold text-[#ff7a00]">
                    You are YOU.
                  </p>
                </div>
              </div>

              <div className="bg-[#0d4b3e] text-white p-8 rounded-3xl shadow-xl space-y-4">
                <h4 className="font-display text-2xl text-[#ff7a00]">Self-care is not selfish.</h4>
                <p className="text-white/80 font-light leading-relaxed">
                  It is the foundation of every meaningful relationship and every successful journey.
                </p>
                <p className="text-white/90 font-light leading-relaxed">
                  When you nurture yourself, you become stronger, happier, healthier, and more capable of giving your best to the world.
                </p>
                <div className="pt-3 border-t border-white/15">
                  <p className="text-base italic text-[#f8f8f5]">
                    "Because true luxury isn't expensive. It's making time for yourself."
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="lg:col-span-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { letter: "S", word: "Strength", desc: "Inner resilience rooted in ancient Indian botanicals and conscious living." },
                  { letter: "E", word: "Energy", desc: "Vibrant vitality nurtured by pure natural ingredients and daily care." },
                  { letter: "L", word: "Lifestyle", desc: "Elevating daily routines into sacred, mindful self-care rituals." },
                  { letter: "F", word: "Fulfilment", desc: "A deeper sense of well-being, inner peace, and timeless elegance." },
                ].map((pillar) => (
                  <div
                    key={pillar.letter}
                    className="p-6 bg-white border border-[#0d4b3e]/10 rounded-2xl hover:border-[#ff7a00]/40 transition-colors shadow-sm"
                  >
                    <div className="font-display text-4xl font-bold text-[#ff7a00] mb-2">{pillar.letter}</div>
                    <h5 className="font-display text-xl text-[#0d4b3e] mb-2">{pillar.word}</h5>
                    <p className="text-xs text-[#777777] leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. FOUNDER'S VISION */}
      <section className="py-28 px-6 lg:px-10 bg-gradient-to-br from-[#0d4b3e] via-[#09382e] to-[#0d4b3e] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff7a00]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#ff7a00] text-xs tracking-[0.35em] uppercase font-semibold mb-3">Our Purpose & Journey</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-6">
              Founder's <span className="font-script text-[#ff7a00] font-normal">Vision</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#ff7a00] mx-auto" />
          </motion.div>

          <motion.div {...fadeUp} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/10 space-y-6 leading-relaxed font-light text-lg">
            <p className="text-xl sm:text-2xl text-[#ff7a00] font-display">
              SELF was born from a simple yet powerful belief:
            </p>
            <blockquote className="text-2xl sm:text-3xl font-display italic text-white pl-6 border-l-2 border-[#ff7a00]">
              "The world teaches us to gift everyone except ourselves. We are here to change that."
            </blockquote>
            <p className="text-white/85">
              Our vision is to create a movement where self-love becomes a lifestyle and wellness becomes a daily ritual. Every product we craft is made with passion, purpose, and authenticity.
            </p>
            <p className="text-white/85">
              We choose natural ingredients, handcrafted processes, sustainable packaging, and timeless elegance because we believe wellness should feel personal.
            </p>
            <p className="text-white/85">
              Our mission is to inspire individuals, families, and organisations to embrace conscious living through meaningful gifting.
            </p>
            
            <div className="pt-6 border-t border-white/15">
              <p className="text-xl font-display text-[#ff7a00] mb-3">
                At SELF, gifting isn't about occasions. It's about appreciation. It's about gratitude.
              </p>
              <p className="text-white font-medium text-lg mb-4">
                It's about saying: <span className="text-[#ff7a00] underline font-script text-2xl font-normal">"You deserve this."</span>
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-white/90">
                <span className="px-4 py-2 bg-white/10 rounded-full">To yourself.</span>
                <span className="px-4 py-2 bg-white/10 rounded-full">To your loved ones.</span>
                <span className="px-4 py-2 bg-white/10 rounded-full">To everyone who makes life beautiful.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="py-28 px-6 lg:px-10 bg-[#f8f8f5]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#ff7a00] text-xs tracking-[0.35em] uppercase font-semibold mb-3">What We Offer</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1c1c1c] mb-4">
              Bespoke Wellness <span className="font-script text-[#ff7a00] font-normal">Services</span>
            </h2>
            <p className="text-[#777777] max-w-xl mx-auto text-base font-light">
              From personal daily rituals to grand corporate gifting, experience the luxury of Indian heritage and handcrafted care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: GiftIcon,
                title: "Personal Wellness Gifting",
                desc: "Bespoke self-care hampers and daily wellness rituals tailored to nurture your mind, body, and soul. Perfect for personal pampering.",
                cta: "Explore Personal Gifts",
              },
              {
                icon: SparklesIcon,
                title: "Luxury Gift Hampers",
                desc: "Signature handcrafted gift boxes wrapped in authentic Indian silk-woven fabrics. Created for unforgettable, cherished moments.",
                cta: "View Hampers",
              },
              {
                icon: HandshakeIcon,
                title: "Corporate Gifting",
                desc: "Elevate business relationships with premium artisanal wellness hampers and corporate employee appreciation gift boxes.",
                cta: "Corporate Enquiry",
              },
              {
                icon: DiamondIcon,
                title: "Customized Gift Boxes",
                desc: "Tailored selections of handmade soaps, botanical oils, and herbal skincare curated according to your specific desire.",
                cta: "Customize Box",
              },
              {
                icon: LotusIcon,
                title: "Festive Collections",
                desc: "Celebrate Indian heritage and seasonal joy with handcrafted luxury gift sets filled with love and auspicious natural ingredients.",
                cta: "Discover Festive",
              },
              {
                icon: UsersIcon,
                title: "Bulk & Event Gifting",
                desc: "Memorable favours and bespoke luxury gift hampers for weddings, milestones, conferences, and grand celebrations.",
                cta: "Request Quote",
              },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="luxury-card bg-white rounded-3xl p-8 border border-[#0d4b3e]/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0d4b3e]/8 flex items-center justify-center mb-6">
                    <service.icon className="w-6 h-6 text-[#0d4b3e]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-2xl text-[#1c1c1c] mb-3">{service.title}</h3>
                  <p className="text-sm text-[#666666] font-light leading-relaxed mb-8">{service.desc}</p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-semibold text-[#ff7a00] hover:text-[#0d4b3e] transition-colors"
                >
                  <span>{service.cta}</span>
                  <span>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRODUCTS RANGE SECTION */}
      <section className="py-28 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#ff7a00] text-xs tracking-[0.35em] uppercase font-semibold mb-3">Pure Natural Ingredients</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1c1c1c] mb-4">
              Handcrafted Product <span className="font-script text-[#ff7a00] font-normal">Collection</span>
            </h2>
            <p className="text-[#777777] max-w-2xl mx-auto text-base font-light">
              Explore our range of natural body care, organic skincare, and silk-woven gift boxes crafted with passion in India.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Handmade Luxury Soaps", desc: "Cold-processed botanical bars enriched with saffron, raw milk, and essential oils.", cat: "soap" },
              { name: "Natural Face & Body Care", desc: "Nourishing formulations designed for deep skin hydration and cellular renewal.", cat: "skincare" },
              { name: "Essential Wellness Oils", desc: "Pure Ayurvedic herb-infused oils like Bhringraj & Amla for hair & scalp vitality.", cat: "hair" },
              { name: "Herbal Skincare", desc: "Potent serums and creams with Vitamin C, ferulic acid, and pure antioxidants.", cat: "skincare" },
              { name: "Facial Toners", desc: "Revitalizing floral mists that restore pH balance and instant radiant glow.", cat: "skincare" },
              { name: "Body Washes", desc: "Silk-smooth cleansing gels infused with rose petals, cucumber, and pure aloe vera.", cat: "gel" },
              { name: "Gift Hampers", desc: "Curated collections combining skincare, soaps, and wellness essentials for gifting.", cat: "scrub" },
              { name: "Luxury Silk-Woven Gift Boxes", desc: "Handcrafted Indian silk packaging that turns every wellness gift into a keepsake.", cat: "soap" },
            ].map((pRange, i) => (
              <motion.div
                key={pRange.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group bg-[#f8f8f5] rounded-3xl p-6 border border-[#0d4b3e]/8 hover:border-[#ff7a00]/30 hover:bg-white transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                    <ProductImage variant={pRange.cat as any} alt={pRange.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-display text-xl text-[#1c1c1c] mb-2">{pRange.name}</h3>
                  <p className="text-xs text-[#777777] leading-relaxed mb-4">{pRange.desc}</p>
                </div>
                <Link to="/shop" className="text-xs font-semibold text-[#0d4b3e] group-hover:text-[#ff7a00] uppercase tracking-wider">
                  Explore Range →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SHOWCASE */}
      <section className="py-24 px-6 lg:px-10 bg-[#f8f8f5]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <p className="text-[#ff7a00] text-xs tracking-[0.35em] uppercase font-semibold mb-2">Curated Skincare</p>
              <h2 className="font-display text-4xl md:text-5xl text-[#1c1c1c]">Featured Luxury Products</h2>
            </div>
            <Link to="/shop" className="link-underline text-[#0d4b3e] text-xs tracking-[0.2em] uppercase font-semibold">
              View All Products →
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE SELF */}
      <section className="py-28 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#ff7a00] text-xs tracking-[0.35em] uppercase font-semibold mb-3">Purity & Integrity</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1c1c1c] mb-4">
              Why Choose <span className="font-script text-[#ff7a00] font-normal">SELF</span>
            </h2>
            <p className="text-[#777777] max-w-xl mx-auto text-base font-light">
              Crafted without compromise. Built on authenticity, heritage, and genuine care for your well-being.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HeartIcon, text: "Handmade with Love", desc: "Every bar and batch is thoughtfully handcrafted in small artisanal quantities." },
              { icon: LeafIcon, text: "Natural Ingredients", desc: "Pure botanical oils, herbs, and cold-pressed extracts directly from nature." },
              { icon: FlaskIcon, text: "Zero Harsh Chemicals", desc: "100% free from parabens, sulfates, synthetic toxins, and artificial fillers." },
              { icon: RecycleIcon, text: "Sustainable Packaging", desc: "Eco-friendly recyclable materials and plastic-free conscious presentation." },
              { icon: GiftIcon, text: "Premium Gifting Experience", desc: "Handcrafted silk-woven gift boxes inspired by rich Indian artistry." },
              { icon: SparklesIcon, text: "Thoughtfully Curated", desc: "Formulated specifically to bring balance to strength, energy, and lifestyle." },
              { icon: GlobeIcon, text: "Made in India", desc: "Honoring centuries-old Indian heritage and Ayurvedic wellness traditions." },
              { icon: SproutIcon, text: "Crafted with Passion", desc: "Driven by purpose to ensure every individual feels loved and valued." },
            ].map((feat, i) => (
              <motion.div
                key={feat.text}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group bg-[#f8f8f5] p-7 rounded-3xl border border-[#0d4b3e]/8 hover:border-[#ff7a00]/40 hover:shadow-xl hover:shadow-[#0d4b3e]/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#ff7a00]/10 border border-[#ff7a00]/15 flex items-center justify-center mb-5 text-[#ff7a00] group-hover:scale-105 group-hover:bg-[#ff7a00] group-hover:text-white transition-all duration-300 shadow-sm">
                    <feat.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-lg text-[#1c1c1c] font-semibold mb-2.5 flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0d4b3e]/10 text-[#0d4b3e] flex items-center justify-center shrink-0 group-hover:bg-[#0d4b3e] group-hover:text-white transition-colors duration-300">
                      <CheckIcon className="w-3 h-3" strokeWidth={2.5} />
                    </span>
                    <span>{feat.text}</span>
                  </h3>
                  <p className="text-xs text-[#777777] leading-relaxed font-light">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="py-24 px-6 lg:px-10 bg-[#f8f8f5]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-[#ff7a00] text-xs tracking-[0.35em] uppercase font-semibold mb-3">Customer Favorites</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#1c1c1c]">Bestseller Collection</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 px-6 lg:px-10 bg-[#0d4b3e] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[#ff7a00] text-xs tracking-[0.35em] uppercase font-semibold mb-3">The SELF Community</p>
            <h2 className="font-display text-4xl md:text-6xl text-white">Kind Words</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
              >
                <div className="flex gap-1 mb-4 text-[#ff7a00]">
                  {[1, 2, 3, 4, 5].map(n => <StarIcon key={n} className="w-4 h-4" filled={true} />)}
                </div>
                <p className="text-white/90 text-base leading-relaxed mb-6 font-light italic">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white text-sm">{t.name}</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">{t.location}</div>
                  </div>
                  <div className="text-xs text-[#ff7a00]">{t.handle}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT HIGHLIGHT SECTION */}
      <section className="py-28 px-6 lg:px-10 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp} className="bg-[#f8f8f5] rounded-3xl p-8 sm:p-14 border border-[#0d4b3e]/10 shadow-sm">
            <p className="text-[#ff7a00] text-xs tracking-[0.35em] uppercase font-semibold mb-4">Connect With Us</p>
            <h2 className="font-display text-4xl sm:text-5xl text-[#1c1c1c] mb-6">
              We'd Love to Hear <span className="font-script text-[#ff7a00] font-normal">From You</span>
            </h2>
            <p className="text-[#555555] text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-8">
              Whether you're looking for the perfect gift, customised hampers, corporate gifting solutions, or simply want to know more about SELF, we're here to help.
            </p>
            
            <div className="bg-white rounded-2xl p-6 border border-[#0d4b3e]/10 max-w-xl mx-auto mb-8 space-y-2">
              <p className="font-display text-2xl text-[#0d4b3e] font-semibold">
                SELF – Strength • Energy • Lifestyle • Fulfilment
              </p>
              <p className="text-xs text-[#ff7a00] uppercase tracking-[0.25em] font-semibold">
                Luxury Begins Within
              </p>
              <p className="text-sm italic text-[#555555] pt-2">
                "The greatest gift you'll ever receive is the one you give yourself."
              </p>
            </div>

            <p className="text-[#1c1c1c] font-display text-2xl mb-8">
              Let's begin your wellness journey together.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="magnetic-btn bg-[#0d4b3e] hover:bg-[#156150] text-white px-9 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-semibold shadow-lg">
                Contact Our Team
              </Link>
              <a href="https://wa.me/+917550231549" target="_blank" rel="noopener noreferrer" className="magnetic-btn border border-[#0d4b3e] text-[#0d4b3e] hover:bg-[#0d4b3e] hover:text-white px-9 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-semibold transition-colors">
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. INSTAGRAM RITUAL GALLERY */}
      <section className="py-24 px-6 lg:px-10 bg-[#f8f8f5]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-[#ff7a00] text-xs tracking-[0.35em] uppercase font-semibold mb-2">Follow @selfwellness</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#1c1c1c]">Share Your Self-Care Ritual</h2>
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
                <ProductImage variant={variant as any} alt="SELF Wellness Ritual" className="h-full w-full" />
                <div className="absolute inset-0 bg-[#0d4b3e]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
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
  const variantMap: Record<string, any> = {
    soap: "soap",
    "daily-essentials": "daily-essentials",
    skincare: "skincare",
    "lip-care": "lip-care",
    hampers: "hampers",
  };
  return (
    <Link to={`/product/${product.id}`} className="group block product-card bg-white rounded-3xl overflow-hidden shadow-sm">
      <div className="aspect-[3/4] relative overflow-hidden">
        <ProductImage src={product.images[0]} variant={variantMap[product.category]} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.badge && (
          <div className="absolute top-4 left-4 bg-[#ff7a00] text-white text-[10px] font-semibold tracking-wider px-3 py-1.5 rounded-full uppercase">
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
          <span className="font-display text-lg text-[#0d4b3e] font-semibold">{format(product.priceUSD)}</span>
          <div className="flex items-center gap-1 text-xs text-[#ff7a00]">
            <StarIcon className="w-3 h-3" filled={true} />
            <span className="font-medium">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
