import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ShoppingBag, Heart, User, BookOpen, CheckCircle } from "lucide-react";
import { useCart, useCurrency, CURRENCY_OPTIONS } from "../context/StoreContexts";
import { useUI } from "../context/UIContext";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/journal", label: "Journal" },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/contact", label: "Contact" },
];

export const Navbar: React.FC = () => {
  const { cartCount } = useCart();
  const { currency, setCurrency, symbol } = useCurrency();
  const { openCart } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCurrencyOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#f8f8f5]/90 backdrop-blur-lg shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]" : "bg-transparent"
        }`}
      >
        {/* Announcement bar */}
        <div className="bg-[#0d4b3e] text-[#f8f8f5] text-xs tracking-[0.25em] py-2.5 px-4 text-center font-light">
          COMPLIMENTARY SHIPPING ON ORDERS ABOVE $50 · THOUGHTFULLY MADE FOR YOU
        </div>

        <nav className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center"
            aria-label="SELF Wellness home"
          >
            <img
              src="/images/self-logo.png"
              alt="SELF Wellness"
              className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`link-underline text-sm font-medium tracking-wide uppercase transition-colors ${
                    location.pathname === link.to ? "text-[#ff7a00]" : "text-[#1c1c1c] hover:text-[#ff7a00]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Currency switcher */}
            <div className="relative">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-full border border-[#0d4b3e]/20 hover:border-[#ff7a00] transition-colors"
              >
                <span>{symbol}</span>
                <span>{currency}</span>
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none"><path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
              <AnimatePresence>
                {currencyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#0d4b3e]/10 overflow-hidden"
                  >
                    {CURRENCY_OPTIONS.map(c => (
                      <button
                        key={c.code}
                        onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-[#f8f8f5] transition-colors ${
                          currency === c.code ? "text-[#ff7a00] font-semibold" : "text-[#1c1c1c]"
                        }`}
                      >
                        <span>{c.name}</span>
                        <span className="text-[#777777]">{c.symbol} {c.code}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Link to="/shop" className="p-2 rounded-full hover:bg-[#0d4b3e]/5 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </Link>

            {/* Cart */}
            <button onClick={openCart} className="relative p-2 rounded-full hover:bg-[#0d4b3e]/5 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff7a00] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#f8f8f5] lg:hidden"
            style={{ paddingTop: 132 }}
          >
            <ul className="flex flex-col items-center gap-8 px-6">
              {NAV_LINKS.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-display text-3xl text-[#1c1c1c] hover:text-[#ff7a00] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-6 pt-6 border-t border-[#0d4b3e]/10 w-full">
                <div className="flex flex-wrap justify-center gap-3">
                  {CURRENCY_OPTIONS.map(c => (
                    <button
                      key={c.code}
                      onClick={() => setCurrency(c.code)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        currency === c.code ? "bg-[#ff7a00] text-white" : "bg-white text-[#1c1c1c] border border-[#0d4b3e]/20"
                      }`}
                    >
                      {c.symbol} {c.code}
                    </button>
                  ))}
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const FooterNewsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    const existing = JSON.parse(localStorage.getItem("self_subscribers") || "[]") as string[];
    if (!existing.includes(email)) {
      localStorage.setItem("self_subscribers", JSON.stringify([...existing, email]));
    }
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 border-b border-[#f8f8f5]/10">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[#ff7a00] text-sm tracking-[0.3em] uppercase mb-4">Join the SELF Family</p>
        <h3 className="font-display text-4xl md:text-5xl mb-6">Stay balanced with our rituals.</h3>
        <p className="text-[#f8f8f5]/70 mb-8">Receive early access, wellness wisdom, and exclusive offers.</p>
        <AnimatePresence mode="wait">
          {subscribed ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-3 bg-white/10 rounded-full px-8 py-4 max-w-md mx-auto"
            >
              <CheckCircle className="w-5 h-5 text-[#ff7a00]" />
              <span className="text-[#f8f8f5] text-sm">You're in the SELF family! Check your inbox.</span>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3.5 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#ff7a00]"
              />
              <button
                type="submit"
                className="bg-[#ff7a00] hover:bg-[#ff9a33] text-white rounded-full px-8 py-3.5 text-sm font-medium tracking-wider transition-colors"
              >
                SUBSCRIBE
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0d4b3e] text-[#f8f8f5] mt-32">
      {/* Newsletter */}
      <FooterNewsletter />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5 space-y-4">
          <div className="mb-2 w-48 bg-white/95 rounded-2xl p-3 inline-block shadow-xl">
            <img
              src="/images/self-logo.png"
              alt="SELF Wellness"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <h3 className="font-display text-3xl font-semibold text-white">
            SELF
          </h3>
          <p className="text-xs text-[#ff7a00] uppercase tracking-[0.25em] font-semibold">
            Strength • Energy • Lifestyle • Fulfilment
          </p>
          <p className="font-script text-2xl text-[#f8f8f5]/90 font-normal">
            Luxury Begins Within
          </p>
          
          <div className="pt-2 text-sm text-[#f8f8f5]/80 space-y-1 font-light">
            <p className="font-medium text-white">Gift Yourself. Gift Wellness. Gift Happiness.</p>
            <p className="italic text-xs text-[#f8f8f5]/70 pt-1">
              "Because how you treat yourself becomes the standard for how the world treats you."
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            {["Instagram", "Facebook", "Pinterest", "YouTube"].map(social => (
              <a key={social} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff7a00] flex items-center justify-center transition-colors text-xs">
                {social[0]}
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-xs tracking-[0.2em] uppercase mb-5 text-[#ff7a00] font-semibold">Shop</h4>
          <ul className="space-y-3 text-sm text-[#f8f8f5]/80">
            <li><Link to="/shop" className="hover:text-[#ff7a00]">All Products</Link></li>
            <li><Link to="/shop?cat=soap" className="hover:text-[#ff7a00]">Luxury Soaps</Link></li>
            <li><Link to="/shop?cat=scrub" className="hover:text-[#ff7a00]">Body Scrubs</Link></li>
            <li><Link to="/shop?cat=skincare" className="hover:text-[#ff7a00]">Skin Care</Link></li>
            <li><Link to="/shop?cat=hair" className="hover:text-[#ff7a00]">Hair Care</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-xs tracking-[0.2em] uppercase mb-5 text-[#ff7a00] font-semibold">Explore</h4>
          <ul className="space-y-3 text-sm text-[#f8f8f5]/80">
            <li><Link to="/about" className="hover:text-[#ff7a00]">Our Story</Link></li>
            <li><Link to="/journal" className="hover:text-[#ff7a00]">Journal</Link></li>
            <li><Link to="/sustainability" className="hover:text-[#ff7a00]">Sustainability</Link></li>
            <li><Link to="/ingredients" className="hover:text-[#ff7a00]">Ingredients</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs tracking-[0.2em] uppercase mb-5 text-[#ff7a00] font-semibold">Support & Gifting</h4>
          <ul className="space-y-3 text-sm text-[#f8f8f5]/80">
            <li><Link to="/contact" className="hover:text-[#ff7a00]">Corporate Gifting</Link></li>
            <li><Link to="/contact" className="hover:text-[#ff7a00]">Custom Gift Hampers</Link></li>
            <li><Link to="/track" className="hover:text-[#ff7a00]">Track Order</Link></li>
            <li><Link to="/faq" className="hover:text-[#ff7a00]">FAQ</Link></li>
            <li><Link to="/privacy" className="hover:text-[#ff7a00]">Privacy & Terms</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 border-t border-[#f8f8f5]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#f8f8f5]/60">
        <p>© 2026 SELF Wellness. Strength • Energy • Lifestyle • Fulfilment. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span>Razorpay</span>
          <span>Stripe</span>
          <span>PayPal</span>
          <span>UPI</span>
        </div>
      </div>
    </footer>
  );
};

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const t = setTimeout(onComplete, 2400);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[100] bg-[#f8f8f5] flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-[min(86vw,520px)]"
      >
        <img
          src="/images/self-logo.png"
          alt="SELF Wellness"
          className="w-full drop-shadow-[0_18px_40px_rgba(13,75,62,0.18)]"
          loading="eager"
        />
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-[1px] bg-[#ff7a00] mt-10 mx-auto max-w-xs"
        />
      </motion.div>
    </motion.div>
  );
};

export const WhatsAppButton: React.FC = () => (
  <a
    href="https://wa.me/+917550231549?text=Hello%20SELF%20Wellness!"
    target="_blank"
    rel="noopener"
    className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-40 w-13 h-13 md:w-14 md:h-14 rounded-full bg-[#25D366] hover:scale-110 transition-transform shadow-xl flex items-center justify-center text-white"
    aria-label="Chat on WhatsApp"
  >
    <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  </a>
);

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { cartCount } = useCart();
  const { openCart } = useUI();

  const links = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/shop", icon: BookOpen, label: "Shop" },
    { to: "/shop", icon: Heart, label: "Wishlist" },
    { to: "/about", icon: User, label: "About" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-lg border-t border-[#0d4b3e]/10 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {links.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to && label !== "Wishlist";
          return (
            <Link
              key={label}
              to={to}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                active ? "text-[#ff7a00]" : "text-[#777777] hover:text-[#1c1c1c]"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={active ? 2 : 1.5} />
              <span className="text-[10px] tracking-wide">{label}</span>
            </Link>
          );
        })}
        <button
          onClick={openCart}
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-[#777777] hover:text-[#1c1c1c] transition-colors relative"
        >
          <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute top-1.5 right-2.5 bg-[#ff7a00] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] tracking-wide">Cart</span>
        </button>
      </div>
    </nav>
  );
};
