import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SelfLogo } from "../components/SelfLogo";
import { PRODUCTS } from "../data/products";
import { ProductImage } from "../components/ProductImage";
import {
  SproutIcon as SproutIconSust,
  RecycleIcon as RecycleIconSust,
  GlobeIcon as GlobeIconSust,
  DropletIcon as DropletIconSust,
  HandshakeIcon as HandshakeIconSust,
  FlaskIcon as FlaskIconSust,
} from "../components/WellnessIcons";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, ease: "easeOut" as const },
};

export const PrivacyPage: React.FC = () => (
  <div className="pt-[140px] max-w-4xl mx-auto px-6 lg:px-10 py-20">
    <h1 className="font-display text-5xl mb-8">Privacy Policy</h1>
    <p className="text-[#777777] mb-10">Last updated: January 2026</p>
    <div className="space-y-8 text-[#777777] leading-relaxed">
      {[
        { h: "1. Introduction", p: "At SELF Wellness ('we', 'us', 'our'), we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit selfwellness.co or make a purchase." },
        { h: "2. Information We Collect", p: "We collect information you provide directly (name, email, address, payment details) and automatically (browser type, IP address, browsing behavior via cookies)." },
        { h: "3. How We Use Your Information", p: "To process orders, communicate about purchases, send wellness content (with consent), personalize your experience, and comply with legal obligations." },
        { h: "4. Sharing & Disclosure", p: "We never sell your data. We share only with trusted service providers (payment processors, shipping partners) and as required by law." },
        { h: "5. Cookies & Tracking", p: "We use cookies to enhance functionality, analyze site traffic, and personalize content. You may opt out via your browser settings." },
        { h: "6. Data Security", p: "We employ industry-standard encryption, secure servers, and regular audits to protect your information." },
        { h: "7. Your Rights", p: "You may access, correct, or delete your personal data at any time. Contact us at privacy@selfwellness.co." },
        { h: "8. Changes", p: "We may update this policy periodically. Continued use of the site constitutes acceptance of any changes." },
      ].map((s, i) => (
        <div key={i}>
          <h2 className="font-display text-2xl text-[#1c1c1c] mb-3">{s.h}</h2>
          <p>{s.p}</p>
        </div>
      ))}
    </div>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="pt-[140px] max-w-4xl mx-auto px-6 lg:px-10 py-20">
    <h1 className="font-display text-5xl mb-8">Terms & Conditions</h1>
    <p className="text-[#777777] mb-10">Last updated: January 2026</p>
    <div className="space-y-8 text-[#777777] leading-relaxed">
      {[
        { h: "1. Agreement to Terms", p: "By accessing and using SELF Wellness, you agree to be bound by these Terms. If you disagree, please refrain from using the site." },
        { h: "2. Products & Pricing", p: "All prices are listed in USD and converted to local currencies using real-time exchange rates. Prices may change without notice." },
        { h: "3. Orders & Payment", p: "Orders are subject to acceptance. We accept Razorpay, Stripe, and PayPal. Payment is processed securely at checkout." },
        { h: "4. Shipping", p: "Free shipping on orders above $50. Delivery times vary by region. We are not responsible for customs delays." },
        { h: "5. Returns", p: "Unopened products may be returned within 30 days for a full refund. Opened skincare cannot be returned unless defective." },
        { h: "6. Intellectual Property", p: "All content, logos, and designs are the property of SELF Wellness and protected under applicable law." },
        { h: "7. Limitation of Liability", p: "SELF Wellness is not liable for indirect, incidental, or consequential damages arising from use of the site or products." },
        { h: "8. Governing Law", p: "These Terms are governed by the laws of India. Any disputes will be resolved in Mumbai jurisdiction." },
      ].map((s, i) => (
        <div key={i}>
          <h2 className="font-display text-2xl text-[#1c1c1c] mb-3">{s.h}</h2>
          <p>{s.p}</p>
        </div>
      ))}
    </div>
  </div>
);

export const TrackOrderPage: React.FC = () => {
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState<null | { status: string; steps: { label: string; done: boolean }[] }>(null);

  const handleTrack = () => {
    if (!orderId) return;
    setTracking({
      status: "In Transit",
      steps: [
        { label: "Order Placed", done: true },
        { label: "Processing", done: true },
        { label: "Shipped", done: true },
        { label: "Out for Delivery", done: false },
        { label: "Delivered", done: false },
      ],
    });
  };

  return (
    <div className="pt-[140px]">
      <section className="py-24 px-6 lg:px-10 bg-gradient-to-b from-[#0d4b3e] to-[#0d4b3e]/90 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">Track Your Ritual</p>
          <h1 className="font-display text-5xl md:text-6xl">Order Tracking</h1>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 lg:px-10 py-20">
        <div className="flex gap-3 mb-10">
          <input
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            placeholder="Enter order number (e.g. SELF-12345)"
            className="flex-1 border-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none rounded-full px-6 py-4"
          />
          <button onClick={handleTrack} className="bg-[#ff7a00] hover:bg-[#ff9a33] text-white px-8 py-4 rounded-full tracking-wider uppercase text-sm font-medium">
            Track
          </button>
        </div>

        {tracking && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-10 border border-[#0d4b3e]/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs text-[#777777] tracking-wider uppercase">Order Status</p>
                <p className="font-display text-2xl text-[#0d4b3e]">{tracking.status}</p>
              </div>
              <span className="text-3xl">📦</span>
            </div>

            <div className="space-y-6">
              {tracking.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step.done ? "bg-[#ff7a00] text-white" : "bg-[#f8f8f5] text-[#777777]"}`}>
                      {step.done ? "✓" : i + 1}
                    </div>
                    {i < tracking.steps.length - 1 && <div className={`w-[2px] flex-1 my-2 ${step.done ? "bg-[#ff7a00]" : "bg-[#f8f8f5]"}`} />}
                  </div>
                  <div className="pb-6 pt-1">
                    <p className={`font-medium ${step.done ? "text-[#1c1c1c]" : "text-[#777777]"}`}>{step.label}</p>
                    {step.done && <p className="text-xs text-[#777777]">Completed</p>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export const JournalPage: React.FC = () => {
  const posts = [
    { title: "The Morning Ritual That Changed Everything", category: "Rituals", read: "6 min", excerpt: "How a five-minute skincare practice can rewire your relationship with yourself.", image: "serum" },
    { title: "Decoding Ingredients: What 'Clean' Really Means", category: "Ingredients", read: "8 min", excerpt: "A transparent look at our ingredient philosophy and sourcing standards.", image: "soap" },
    { title: "Balance in Motion: Yoga + Skincare", category: "Lifestyle", read: "5 min", excerpt: "The ancient intersection of physical movement and mindful self-care.", image: "scrub" },
    { title: "Ayurveda 101: Ancient Wisdom, Modern Skin", category: "Education", read: "10 min", excerpt: "How 5000-year-old principles are shaping today's most effective skincare.", image: "hair" },
    { title: "The Science of Scent & Mood", category: "Wellness", read: "7 min", excerpt: "Why your favorite fragrance is more than just a pleasant smell.", image: "gel" },
    { title: "Sustainable Beauty: Beyond the Buzzword", category: "Sustainability", read: "9 min", excerpt: "Real commitment vs. greenwashing — how to spot the difference.", image: "soap" },
  ];

  return (
    <div className="pt-[140px]">
      <section className="py-32 px-6 lg:px-10 bg-gradient-to-b from-[#0d4b3e] to-[#0d4b3e]/90 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">Stories & Wisdom</p>
          <h1 className="font-display text-5xl md:text-7xl">
            The <span className="font-script text-[#ff7a00] font-normal">Journal</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto mt-6 text-lg font-light">
            Rituals, ingredients, and quiet wisdom for the modern wellness seeker.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6">
                <ProductImage variant={post.image as any} alt={post.title} className="h-full w-full group-hover:scale-105 transition-transform duration-700" />
              </div>
              <p className="text-[#ff7a00] text-xs tracking-[0.25em] uppercase mb-2">{post.category}</p>
              <h3 className="font-display text-2xl mb-3 group-hover:text-[#ff7a00] transition-colors">{post.title}</h3>
              <p className="text-[#777777] text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <p className="text-xs tracking-wider uppercase text-[#777777]">{post.read} read →</p>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export const SustainabilityPage: React.FC = () => (
  <div className="pt-[140px]">
    <section className="py-32 px-6 lg:px-10 bg-gradient-to-b from-[#0d4b3e] to-[#0d4b3e]/90 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20"><img src="/images/hero-lifestyle.jpg" className="w-full h-full object-cover" alt="" /></div>
      <div className="relative max-w-5xl mx-auto text-center">
        <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">Our Commitment</p>
        <h1 className="font-display text-5xl md:text-7xl">
          Sustainability <span className="font-script text-[#ff7a00] font-normal">First</span>
        </h1>
      </div>
    </section>

    <section className="max-w-5xl mx-auto px-6 lg:px-10 py-32">
      <motion.div {...fadeUp} className="text-center mb-20">
        <p className="text-[#777777] text-lg leading-relaxed max-w-3xl mx-auto">
          We believe true luxury leaves no trace. Every decision we make — from sourcing to shipping — 
          is guided by respect for our planet and its people.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { Icon: SproutIconSust, t: "Sustainably Sourced", d: "90% of our ingredients come from certified organic, fair-trade farms across India, Morocco, and Brazil." },
          { Icon: RecycleIconSust, t: "Circular Packaging", d: "Recyclable glass, post-consumer recycled paper, and compostable mailers. Zero virgin plastic." },
          { Icon: GlobeIconSust, t: "Carbon Conscious", d: "We offset 100% of shipping emissions and aim for net-zero operations by 2028." },
          { Icon: DropletIconSust, t: "Water Stewardship", d: "Waterless formulations and closed-loop manufacturing save thousands of liters per batch." },
          { Icon: HandshakeIconSust, t: "Fair Partnerships", d: "Direct-trade relationships ensure fair wages and empower women-led farming communities." },
          { Icon: FlaskIconSust, t: "Clean Science", d: "No parabens, sulfates, phthalates, or 1,400+ other questionable ingredients. Ever." },
        ].map((item, i) => (
          <motion.div
            key={item.t}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group relative bg-white rounded-3xl p-8 border border-[#0d4b3e]/8 hover:border-[#0d4b3e]/0 hover:bg-[#0d4b3e] hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 cursor-default overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0d4b3e]/3 group-hover:opacity-0 transition-opacity rounded-3xl pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-[#0d4b3e]/8 group-hover:bg-white/15 flex items-center justify-center mb-6 transition-colors duration-500">
              <item.Icon className="w-5 h-5 text-[#0d4b3e] group-hover:text-[#ff7a00] transition-colors duration-500" strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-xl mb-3 group-hover:text-white transition-colors duration-500">{item.t}</h3>
            <p className="text-[#777777] group-hover:text-[#f8f8f5]/75 leading-relaxed text-sm transition-colors duration-500">{item.d}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <SelfLogo showFull className="w-80 mx-auto" />
        <p className="font-script text-3xl text-[#ff7a00] mt-6">Stay balanced with the earth.</p>
      </div>
    </section>
  </div>
);

export const IngredientsPage: React.FC = () => {
  const ingredients = [
    { name: "Saffron", origin: "Kashmir, India", benefit: "Brightens, evens tone", color: "bg-[#ff7a00]/10" },
    { name: "Bhringraj", origin: "Uttar Pradesh, India", benefit: "Strengthens hair roots", color: "bg-[#0d4b3e]/10" },
    { name: "Bulgarian Rose", origin: "Rose Valley, Bulgaria", benefit: "Soothes, balances pH", color: "bg-pink-100" },
    { name: "Himalayan Salt", origin: "Punjab, Pakistan", benefit: "Mineral detox", color: "bg-rose-100" },
    { name: "Arabica Coffee", origin: "Chikmagalur, India", benefit: "Exfoliates, firms", color: "bg-amber-100" },
    { name: "Amla", origin: "Tamil Nadu, India", benefit: "Vitamin C, anti-aging", color: "bg-lime-100" },
    { name: "Aloe Vera", origin: "Rajasthan, India", benefit: "Cooling hydration", color: "bg-green-100" },
    { name: "Shea Butter", origin: "Ghana, West Africa", benefit: "Deep moisture", color: "bg-yellow-100" },
  ];
  return (
    <div className="pt-[140px]">
      <section className="py-32 px-6 lg:px-10 bg-gradient-to-b from-[#0d4b3e] to-[#0d4b3e]/90 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">Transparent Sourcing</p>
          <h1 className="font-display text-5xl md:text-7xl">
            Ingredient <span className="font-script text-[#ff7a00] font-normal">Philosophy</span>
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-32">
        <motion.div {...fadeUp} className="grid md:grid-cols-4 gap-8 mb-20">
          {[
            { n: "98%", l: "Natural Origin" },
            { n: "0", l: "Harmful Chemicals" },
            { n: "60+", l: "Countries Sourced" },
            { n: "100%", l: "Ethically Sourced" },
          ].map(s => (
            <div key={s.l} className="text-center p-6 border-t border-[#ff7a00]/30">
              <div className="font-display text-4xl text-[#0d4b3e] mb-2">{s.n}</div>
              <div className="text-xs tracking-[0.2em] uppercase text-[#777777]">{s.l}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ingredients.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`${ing.color} rounded-3xl p-6 border border-[#0d4b3e]/10`}
            >
              <h3 className="font-display text-xl mb-2">{ing.name}</h3>
              <p className="text-xs text-[#ff7a00] tracking-wider uppercase mb-3">{ing.origin}</p>
              <p className="text-sm text-[#777777]">{ing.benefit}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-[#f8f8f5] rounded-3xl p-12 text-center">
          <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">Our Promise</p>
          <h3 className="font-display text-3xl md:text-4xl mb-6">What we'll never put in our products</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {["Parabens", "Sulfates (SLS/SLES)", "Phthalates", "Synthetic Fragrances", "Mineral Oil", "Formaldehyde", "Triclosan", "Animal-derived Ingredients"].map(x => (
              <span key={x} className="px-5 py-2 bg-white rounded-full text-sm text-[#1c1c1c] border border-[#0d4b3e]/10 line-through decoration-[#ff7a00]">{x}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const SAMPLE_ORDERS = [
  { id: "SELF-10234", customer: "Priya R.", email: "priya@email.com", items: 3, total: "$124", status: "Delivered", date: "24 May 2026", city: "Mumbai" },
  { id: "SELF-10233", customer: "Zayn K.", email: "zayn@email.com", items: 2, total: "$89", status: "Shipped", date: "23 May 2026", city: "Dubai" },
  { id: "SELF-10232", customer: "Emma T.", email: "emma@email.com", items: 5, total: "$210", status: "Processing", date: "22 May 2026", city: "London" },
  { id: "SELF-10231", customer: "Aarav P.", email: "aarav@email.com", items: 1, total: "$56", status: "Delivered", date: "21 May 2026", city: "Bangalore" },
  { id: "SELF-10230", customer: "Fatima R.", email: "fatima@email.com", items: 4, total: "$178", status: "In Transit", date: "20 May 2026", city: "Riyadh" },
  { id: "SELF-10229", customer: "Mei L.", email: "mei@email.com", items: 2, total: "$92", status: "Delivered", date: "19 May 2026", city: "Singapore" },
  { id: "SELF-10228", customer: "Rajan S.", email: "rajan@email.com", items: 3, total: "$136", status: "Shipped", date: "18 May 2026", city: "Delhi" },
];

const SAMPLE_CUSTOMERS = [
  { name: "Priya R.", email: "priya@email.com", orders: 8, spent: "$862", city: "Mumbai", joined: "Jan 2025" },
  { name: "Emma T.", email: "emma@email.com", orders: 5, spent: "$540", city: "London", joined: "Mar 2025" },
  { name: "Zayn K.", email: "zayn@email.com", orders: 4, spent: "$380", city: "Dubai", joined: "Feb 2025" },
  { name: "Aarav P.", email: "aarav@email.com", orders: 6, spent: "$624", city: "Bangalore", joined: "Nov 2024" },
  { name: "Fatima R.", email: "fatima@email.com", orders: 3, spent: "$290", city: "Riyadh", joined: "Apr 2025" },
  { name: "Mei L.", email: "mei@email.com", orders: 7, spent: "$720", city: "Singapore", joined: "Dec 2024" },
];

const INITIAL_COUPONS = [
  { code: "SELF20", type: "percent", value: 20, uses: 142, limit: 500, active: true, expiry: "31 Dec 2026" },
  { code: "WELCOME15", type: "percent", value: 15, uses: 89, limit: 200, active: true, expiry: "30 Jun 2026" },
  { code: "FLAT10", type: "flat", value: 10, uses: 34, limit: 100, active: false, expiry: "01 Jun 2026" },
  { code: "FREESHIP", type: "shipping", value: 0, uses: 201, limit: 1000, active: true, expiry: "31 Dec 2026" },
];

const NEWSLETTER_SUBS = [
  { email: "wellness@gmail.com", date: "24 May 2026", source: "Homepage" },
  { email: "priya.sharma@yahoo.in", date: "23 May 2026", source: "Popup" },
  { email: "emma.t@outlook.com", date: "22 May 2026", source: "Footer" },
  { email: "zaynk@icloud.com", date: "21 May 2026", source: "Checkout" },
  { email: "mei.liu@gmail.com", date: "20 May 2026", source: "Homepage" },
  { email: "rajan.s@hotmail.com", date: "19 May 2026", source: "Footer" },
];

const STATUS_COLORS: Record<string, string> = {
  "Delivered":   "bg-[#0d4b3e]/10 text-[#0d4b3e]",
  "Shipped":     "bg-[#ff7a00]/10 text-[#ff7a00]",
  "In Transit":  "bg-blue-50 text-blue-600",
  "Processing":  "bg-[#777777]/10 text-[#777777]",
};

export const AdminPage: React.FC = () => {
  type AdminTab = "dashboard" | "products" | "orders" | "customers" | "coupons" | "subscribers";
  const [tab, setTab] = useState<AdminTab>("dashboard");
  const [orderSearch, setOrderSearch] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [orderStatuses, setOrderStatuses] = useState<Record<string, string>>(
    Object.fromEntries(SAMPLE_ORDERS.map(o => [o.id, o.status]))
  );
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);
  const [newCoupon, setNewCoupon] = useState({ code: "", type: "percent", value: 0, limit: 100, expiry: "" });
  const [showCouponForm, setShowCouponForm] = useState(false);

  const revenue = 128400;
  const ordersCount = 1248;
  const customersCount = 3892;
  const stockLow = PRODUCTS.filter(p => p.stock < 25).length;

  const monthlyData = [42, 58, 47, 76, 62, 88, 71, 94, 65, 89, 74, 102];
  const maxVal = Math.max(...monthlyData);

  const categoryRevenue = [
    { label: "Skincare", pct: 38, color: "#ff7a00" },
    { label: "Hair Care", pct: 26, color: "#0d4b3e" },
    { label: "Soaps", pct: 20, color: "#ff9a33" },
    { label: "Scrubs", pct: 16, color: "#156150" },
  ];

  const TABS: { key: AdminTab; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "products", label: "Products" },
    { key: "orders", label: "Orders" },
    { key: "customers", label: "Customers" },
    { key: "coupons", label: "Coupons" },
    { key: "subscribers", label: "Subscribers" },
  ];

  const filteredOrders = SAMPLE_ORDERS.filter(o =>
    o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customer.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const filteredCustomers = SAMPLE_CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  return (
    <div className="pt-[140px] min-h-screen bg-[#f8f8f5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl">Admin Dashboard</h1>
            <p className="text-[#777777] text-sm mt-1">SELF Wellness · May 2026</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all ${
                  tab === t.key
                    ? "bg-[#0d4b3e] text-white shadow-lg shadow-[#0d4b3e]/20"
                    : "bg-white text-[#1c1c1c] hover:bg-[#0d4b3e]/5 border border-[#0d4b3e]/10"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard */}
        {tab === "dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { l: "Total Revenue", v: `$${revenue.toLocaleString()}`, sub: "+12% vs last month", c: "#0d4b3e" },
                { l: "Total Orders", v: ordersCount.toLocaleString(), sub: "+8% vs last month", c: "#ff7a00" },
                { l: "Customers", v: customersCount.toLocaleString(), sub: "+24 this week", c: "#0d4b3e" },
                { l: "Low Stock", v: stockLow, sub: `${stockLow} products need restock`, c: "#ff7a00" },
              ].map(m => (
                <div key={m.l} className="bg-white rounded-2xl p-5 border-l-4 shadow-sm" style={{ borderLeftColor: m.c }}>
                  <p className="text-[10px] text-[#777777] tracking-[0.2em] uppercase mb-1">{m.l}</p>
                  <p className="font-display text-3xl mb-1" style={{ color: m.c }}>{m.v}</p>
                  <p className="text-[10px] text-[#777777]">{m.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
              {/* Revenue chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl">Monthly Revenue</h3>
                  <span className="text-xs text-[#0d4b3e] bg-[#0d4b3e]/8 px-3 py-1 rounded-full">2026</span>
                </div>
                <div className="h-52 flex items-end gap-1.5">
                  {monthlyData.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                      <div
                        className="w-full bg-gradient-to-t from-[#ff7a00] to-[#ff9a33] rounded-t-lg transition-all group-hover:from-[#0d4b3e] group-hover:to-[#156150]"
                        style={{ height: `${(h / maxVal) * 100}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 text-[10px] text-[#777777] tracking-widest uppercase">
                  {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => <span key={m}>{m[0]}</span>)}
                </div>
              </div>

              {/* Category split */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-display text-xl mb-6">Revenue by Category</h3>
                <div className="space-y-4">
                  {categoryRevenue.map(c => (
                    <div key={c.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-[#1c1c1c] font-medium">{c.label}</span>
                        <span className="text-[#777777]">{c.pct}%</span>
                      </div>
                      <div className="h-2 bg-[#f8f8f5] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${c.pct}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: c.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-[#0d4b3e]/10">
                  <h4 className="text-xs text-[#777777] tracking-wider uppercase mb-3">Top Products</h4>
                  <div className="space-y-3">
                    {PRODUCTS.slice(0, 3).map(p => (
                      <div key={p.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <ProductImage src={p.images[0]} variant={p.category as any} alt="" className="h-full w-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{p.name}</p>
                          <p className="text-[10px] text-[#777777]">{p.stock} in stock</p>
                        </div>
                        <p className="text-xs font-semibold text-[#0d4b3e]">${p.priceUSD}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Low stock alerts */}
            {PRODUCTS.filter(p => p.stock < 25).length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-[#ff7a00]">
                <h3 className="font-display text-lg mb-4 text-[#ff7a00]">Low Stock Alerts</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {PRODUCTS.filter(p => p.stock < 25).map(p => (
                    <div key={p.id} className="flex items-center gap-3 p-3 bg-[#ff7a00]/5 rounded-xl">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <ProductImage src={p.images[0]} variant={p.category as any} alt="" className="h-full w-full" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">{p.name}</p>
                        <p className="text-[10px] text-[#ff7a00] font-semibold">{p.stock} left</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Products */}
        {tab === "products" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-b border-[#0d4b3e]/8">
              <h3 className="font-display text-xl">All Products ({PRODUCTS.length})</h3>
              <button className="bg-[#ff7a00] hover:bg-[#ff9a33] text-white px-5 py-2.5 rounded-full text-xs tracking-wider uppercase font-medium transition-colors">
                + Add Product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-[#f8f8f5] text-[10px] text-[#777777] tracking-[0.15em] uppercase">
                  <tr>
                    <th className="text-left px-5 py-3">Product</th>
                    <th className="text-left px-5 py-3">Category</th>
                    <th className="text-left px-5 py-3">Price</th>
                    <th className="text-left px-5 py-3">Stock</th>
                    <th className="text-left px-5 py-3">Rating</th>
                    <th className="text-right px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map(p => (
                    <tr key={p.id} className="border-t border-[#0d4b3e]/5 hover:bg-[#f8f8f5] transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
                            <ProductImage src={p.images[0]} variant={p.category as any} alt="" className="h-full w-full" />
                          </div>
                          <span className="text-sm font-medium">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 capitalize text-sm text-[#777777]">{p.category}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#0d4b3e]">${p.priceUSD}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                          p.stock < 25 ? "bg-[#ff7a00]/10 text-[#ff7a00]" : "bg-[#0d4b3e]/10 text-[#0d4b3e]"
                        }`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm text-[#ff7a00] font-medium">★ {p.rating}</span>
                      </td>
                      <td className="px-5 py-3.5 text-right space-x-3">
                        <button className="text-[#0d4b3e] text-xs hover:underline font-medium">Edit</button>
                        <button className="text-[#ff7a00] text-xs hover:underline font-medium">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Orders */}
        {tab === "orders" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-5">
                <h3 className="font-display text-xl">Orders ({SAMPLE_ORDERS.length})</h3>
                <input
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  placeholder="Search orders or customers…"
                  className="border border-[#0d4b3e]/15 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#ff7a00] w-full sm:w-64"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-[#f8f8f5] text-[10px] text-[#777777] tracking-[0.15em] uppercase">
                    <tr>
                      <th className="text-left px-5 py-3">Order ID</th>
                      <th className="text-left px-5 py-3">Customer</th>
                      <th className="text-left px-5 py-3">Date</th>
                      <th className="text-left px-5 py-3">Items</th>
                      <th className="text-left px-5 py-3">Total</th>
                      <th className="text-left px-5 py-3">Status</th>
                      <th className="text-right px-5 py-3">Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(o => (
                      <tr key={o.id} className="border-t border-[#0d4b3e]/5 hover:bg-[#f8f8f5] transition-colors">
                        <td className="px-5 py-3.5 text-sm font-mono font-medium text-[#0d4b3e]">{o.id}</td>
                        <td className="px-5 py-3.5">
                          <p className="text-sm font-medium">{o.customer}</p>
                          <p className="text-[10px] text-[#777777]">{o.city}</p>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-[#777777]">{o.date}</td>
                        <td className="px-5 py-3.5 text-sm">{o.items} item{o.items > 1 ? "s" : ""}</td>
                        <td className="px-5 py-3.5 text-sm font-semibold">{o.total}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${STATUS_COLORS[orderStatuses[o.id]] ?? "bg-gray-100 text-gray-600"}`}>
                            {orderStatuses[o.id]}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <select
                            value={orderStatuses[o.id]}
                            onChange={e => setOrderStatuses(prev => ({ ...prev, [o.id]: e.target.value }))}
                            className="text-xs border border-[#0d4b3e]/15 rounded-full px-3 py-1.5 focus:outline-none focus:border-[#ff7a00] bg-white cursor-pointer"
                          >
                            {["Processing", "Shipped", "In Transit", "Delivered", "Cancelled"].map(s => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredOrders.length === 0 && (
                  <p className="text-center py-10 text-[#777777] text-sm">No orders match your search.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Customers */}
        {tab === "customers" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#0d4b3e]/8 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
              <h3 className="font-display text-xl">Customers ({SAMPLE_CUSTOMERS.length})</h3>
              <input
                value={customerSearch}
                onChange={e => setCustomerSearch(e.target.value)}
                placeholder="Search customers…"
                className="border border-[#0d4b3e]/15 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#ff7a00] w-full sm:w-64"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-[#f8f8f5] text-[10px] text-[#777777] tracking-[0.15em] uppercase">
                  <tr>
                    <th className="text-left px-5 py-3">Customer</th>
                    <th className="text-left px-5 py-3">Location</th>
                    <th className="text-left px-5 py-3">Orders</th>
                    <th className="text-left px-5 py-3">Total Spent</th>
                    <th className="text-left px-5 py-3">Member Since</th>
                    <th className="text-right px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map(c => (
                    <tr key={c.email} className="border-t border-[#0d4b3e]/5 hover:bg-[#f8f8f5] transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#0d4b3e]/10 flex items-center justify-center text-[#0d4b3e] font-display text-base flex-shrink-0">
                            {c.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{c.name}</p>
                            <p className="text-[10px] text-[#777777]">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-[#777777]">{c.city}</td>
                      <td className="px-5 py-3.5 text-sm font-medium">{c.orders}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#0d4b3e]">{c.spent}</td>
                      <td className="px-5 py-3.5 text-xs text-[#777777]">{c.joined}</td>
                      <td className="px-5 py-3.5 text-right">
                        <button className="text-[#0d4b3e] text-xs hover:underline font-medium">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Coupons */}
        {tab === "coupons" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-[#0d4b3e]/8 flex items-center justify-between">
                <h3 className="font-display text-xl">Discount Codes</h3>
                <button
                  onClick={() => setShowCouponForm(!showCouponForm)}
                  className="bg-[#ff7a00] hover:bg-[#ff9a33] text-white px-5 py-2.5 rounded-full text-xs tracking-wider uppercase font-medium transition-colors"
                >
                  + New Coupon
                </button>
              </div>

              {showCouponForm && (
                <div className="p-5 bg-[#f8f8f5] border-b border-[#0d4b3e]/8">
                  <p className="text-sm font-medium mb-4 text-[#0d4b3e]">Create New Coupon</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    <input
                      value={newCoupon.code}
                      onChange={e => setNewCoupon(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                      placeholder="COUPON CODE"
                      className="border border-[#0d4b3e]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff7a00] font-mono uppercase"
                    />
                    <select
                      value={newCoupon.type}
                      onChange={e => setNewCoupon(p => ({ ...p, type: e.target.value }))}
                      className="border border-[#0d4b3e]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff7a00]"
                    >
                      <option value="percent">Percentage Off</option>
                      <option value="flat">Flat Amount Off</option>
                      <option value="shipping">Free Shipping</option>
                    </select>
                    <input
                      type="number"
                      value={newCoupon.value}
                      onChange={e => setNewCoupon(p => ({ ...p, value: +e.target.value }))}
                      placeholder="Value"
                      className="border border-[#0d4b3e]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff7a00]"
                    />
                    <input
                      type="number"
                      value={newCoupon.limit}
                      onChange={e => setNewCoupon(p => ({ ...p, limit: +e.target.value }))}
                      placeholder="Usage limit"
                      className="border border-[#0d4b3e]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff7a00]"
                    />
                    <button
                      onClick={() => {
                        if (!newCoupon.code) return;
                        setCoupons(prev => [...prev, { ...newCoupon, uses: 0, active: true, expiry: newCoupon.expiry || "31 Dec 2026" }]);
                        setNewCoupon({ code: "", type: "percent", value: 0, limit: 100, expiry: "" });
                        setShowCouponForm(false);
                      }}
                      className="bg-[#0d4b3e] hover:bg-[#156150] text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
                    >
                      Create
                    </button>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-[#f8f8f5] text-[10px] text-[#777777] tracking-[0.15em] uppercase">
                    <tr>
                      <th className="text-left px-5 py-3">Code</th>
                      <th className="text-left px-5 py-3">Type</th>
                      <th className="text-left px-5 py-3">Value</th>
                      <th className="text-left px-5 py-3">Usage</th>
                      <th className="text-left px-5 py-3">Expires</th>
                      <th className="text-left px-5 py-3">Status</th>
                      <th className="text-right px-5 py-3">Toggle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map(c => (
                      <tr key={c.code} className="border-t border-[#0d4b3e]/5 hover:bg-[#f8f8f5] transition-colors">
                        <td className="px-5 py-3.5 font-mono text-sm font-bold text-[#0d4b3e]">{c.code}</td>
                        <td className="px-5 py-3.5 text-sm text-[#777777] capitalize">{c.type === "percent" ? "% Off" : c.type === "flat" ? "$ Off" : "Free Ship"}</td>
                        <td className="px-5 py-3.5 text-sm font-semibold">
                          {c.type === "percent" ? `${c.value}%` : c.type === "flat" ? `$${c.value}` : "Free"}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-16 bg-[#0d4b3e]/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#0d4b3e] rounded-full"
                                style={{ width: `${Math.min((c.uses / c.limit) * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs text-[#777777]">{c.uses}/{c.limit}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-[#777777]">{c.expiry}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${c.active ? "bg-[#0d4b3e]/10 text-[#0d4b3e]" : "bg-[#777777]/10 text-[#777777]"}`}>
                            {c.active ? "Active" : "Paused"}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => setCoupons(prev => prev.map(x => x.code === c.code ? { ...x, active: !x.active } : x))}
                            className={`text-xs font-medium hover:underline ${c.active ? "text-[#ff7a00]" : "text-[#0d4b3e]"}`}
                          >
                            {c.active ? "Pause" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Subscribers */}
        {tab === "subscribers" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div className="grid grid-cols-3 gap-4">
              {[
                { l: "Total Subscribers", v: "2,481" },
                { l: "This Month", v: "+184" },
                { l: "Open Rate", v: "38%" },
              ].map(m => (
                <div key={m.l} className="bg-white rounded-2xl p-5 shadow-sm text-center">
                  <p className="text-[10px] text-[#777777] tracking-[0.2em] uppercase mb-1">{m.l}</p>
                  <p className="font-display text-3xl text-[#0d4b3e]">{m.v}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-[#0d4b3e]/8 flex items-center justify-between">
                <h3 className="font-display text-xl">Recent Subscribers</h3>
                <button className="border border-[#0d4b3e]/20 text-[#0d4b3e] px-5 py-2.5 rounded-full text-xs tracking-wider uppercase font-medium hover:bg-[#0d4b3e]/5 transition-colors">
                  Export CSV
                </button>
              </div>
              <table className="w-full">
                <thead className="bg-[#f8f8f5] text-[10px] text-[#777777] tracking-[0.15em] uppercase">
                  <tr>
                    <th className="text-left px-5 py-3">Email</th>
                    <th className="text-left px-5 py-3">Date</th>
                    <th className="text-left px-5 py-3">Source</th>
                    <th className="text-right px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {NEWSLETTER_SUBS.map(s => (
                    <tr key={s.email} className="border-t border-[#0d4b3e]/5 hover:bg-[#f8f8f5] transition-colors">
                      <td className="px-5 py-3.5 text-sm font-medium">{s.email}</td>
                      <td className="px-5 py-3.5 text-xs text-[#777777]">{s.date}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] bg-[#0d4b3e]/8 text-[#0d4b3e] font-medium">{s.source}</span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button className="text-[#ff7a00] text-xs hover:underline font-medium">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Email note */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#ff7a00]/20">
              <p className="text-sm font-semibold text-[#0d4b3e] mb-2">Connect Email Provider</p>
              <p className="text-sm text-[#777777] mb-4">
                To send automated welcome emails, order confirmations, and newsletters, connect Brevo or Resend.
                Add your API key to the environment variables and the email system will activate.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#f8f8f5] rounded-xl text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#ff7a00]" />
                  <span className="font-mono text-xs">BREVO_API_KEY</span>
                  <span className="text-[#777777] text-xs">— not set</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#f8f8f5] rounded-xl text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#ff7a00]" />
                  <span className="font-mono text-xs">RESEND_API_KEY</span>
                  <span className="text-[#777777] text-xs">— not set</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const QuizPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const questions = [
    { q: "What's your primary skin concern?", opts: ["Dryness", "Acne / Blemishes", "Dullness", "Aging / Fine Lines"] },
    { q: "How would you describe your skin type?", opts: ["Oily", "Dry", "Combination", "Sensitive"] },
    { q: "What time of day do you prefer your ritual?", opts: ["Morning", "Evening", "Both"] },
    { q: "What's your wellness priority?", opts: ["Glow", "Balance", "Anti-aging", "Hydration"] },
  ];
  const recommendation = PRODUCTS[0];

  return (
    <div className="pt-[140px] min-h-screen flex items-center py-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 w-full">
        {step < questions.length ? (
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4 text-center">Question {step + 1} of {questions.length}</p>
            <div className="w-full bg-[#0d4b3e]/10 h-1 rounded-full mb-12">
              <div className="bg-[#ff7a00] h-1 rounded-full transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-center mb-12">{questions[step].q}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {questions[step].opts.map(opt => (
                <button
                  key={opt}
                  onClick={() => setStep(step + 1)}
                  className="p-6 bg-white rounded-2xl border-2 border-[#0d4b3e]/10 hover:border-[#ff7a00] transition-all text-left font-display text-xl"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center bg-white rounded-3xl p-12">
            <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">Your Personal Ritual</p>
            <h2 className="font-display text-4xl mb-4">We recommend</h2>
            <div className="max-w-sm mx-auto my-8 aspect-[3/4] rounded-3xl overflow-hidden">
              <ProductImage src={recommendation.images[0]} variant={recommendation.category as any} alt="" className="h-full w-full" />
            </div>
            <h3 className="font-display text-2xl">{recommendation.name}</h3>
            <p className="text-[#777777] italic mb-6">{recommendation.shortDesc}</p>
            <Link to={`/product/${recommendation.id}`} className="bg-[#ff7a00] hover:bg-[#ff9a33] text-white px-10 py-4 rounded-full tracking-wider uppercase text-sm font-medium inline-block transition-all">
              Add to Ritual
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};
