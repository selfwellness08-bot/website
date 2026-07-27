import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SelfLogo } from "../components/SelfLogo";
import { useCurrency } from "../context/StoreContexts";
import { useCart } from "../context/StoreContexts";
import { PRODUCTS } from "../data/products";
import { ProductImage } from "../components/ProductImage";
import {
  EyeIcon as EyeIconV,
  GemIcon as GemIconV,
  FlaskIcon as FlaskIconV,
  LeafIcon as LeafIconV,
  HeartIcon as HeartIconV,
  UsersIcon as UsersIconV,
  EnvelopeIcon as EnvelopeIconC,
  PhoneIcon as PhoneIconC,
  LocationIcon as LocationIconC,
  MessageIcon as MessageIconC,
} from "../components/WellnessIcons";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, ease: "easeOut" as const },
};

export const AboutPage: React.FC = () => (
  <div className="pt-[140px]">
    <section className="py-32 px-6 lg:px-10 bg-gradient-to-b from-[#0d4b3e] to-[#0d4b3e]/90 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20"><img src="/images/hero-lifestyle.jpg" className="w-full h-full object-cover" alt="" /></div>
      <div className="relative max-w-5xl mx-auto text-center">
        <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">Our Story</p>
        <h1 className="font-display text-5xl md:text-7xl mb-6">
          About <span className="font-script text-[#ff7a00] font-normal">SELF</span>
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto text-lg font-light">
          Born from a quiet belief that self-care is the deepest form of self-respect.
        </p>
      </div>
    </section>

    <section className="max-w-5xl mx-auto px-6 lg:px-10 py-32">
      <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-16 items-center">
        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
          <img src="/images/hero-lifestyle.jpg" className="w-full h-full object-cover" alt="Our story" />
        </div>
        <div>
          <p className="text-[#ff7a00] text-sm tracking-[0.3em] uppercase mb-6">The Beginning</p>
          <h2 className="font-display text-4xl mb-6">A brand built on the belief that you matter.</h2>
          <p className="text-[#777777] leading-relaxed mb-4">
            SELF Wellness was born in 2021 from a simple, unwavering truth: the ritual of caring for oneself is sacred.
            In a world that constantly demands more, we believed the most radical act of all was turning inward — gently, intentionally.
          </p>
          <p className="text-[#777777] leading-relaxed mb-4">
            Every product is a carefully composed ritual. Every ingredient, a quiet intention. We source from small farms,
            honor ancient botanical wisdom, and craft with the patience of true artisans.
          </p>
          <p className="text-[#777777] leading-relaxed">
            Our name stands for the four principles that shape a balanced life:
            <strong className="text-[#0d4b3e]"> Strength, Energy, Lifestyle, Fulfillment.</strong>
          </p>
        </div>
      </motion.div>
    </section>

    {/* Values */}
    <section className="bg-white py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">What We Believe</p>
          <h2 className="font-display text-4xl md:text-6xl">Our Values</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { t: "Radical Transparency", d: "Every ingredient. Every source. Every decision — laid bare.", Icon: EyeIconV },
            { t: "Slow Craftsmanship", d: "Small batches. Handmade. Never rushed. Always intentional.", Icon: GemIconV },
            { t: "Gentle Science", d: "Ancient wisdom meets modern research. Potent yet kind.", Icon: FlaskIconV },
            { t: "Earth First", d: "Sustainable sourcing, recyclable packaging, carbon-conscious.", Icon: LeafIconV },
            { t: "Inclusive Wellness", d: "Beautiful formulations for every skin, every story.", Icon: HeartIconV },
            { t: "Community", d: "A family of souls who choose balance, together.", Icon: UsersIconV },
          ].map((v, i) => (
            <motion.div
              key={v.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative bg-white rounded-3xl p-8 border border-[#0d4b3e]/8 hover:border-[#0d4b3e]/0 hover:bg-[#0d4b3e] hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 cursor-default overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#ff7a00]/3 group-hover:opacity-0 transition-opacity rounded-3xl pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-[#ff7a00]/10 group-hover:bg-white/15 flex items-center justify-center mb-6 transition-colors duration-500">
                <v.Icon className="w-5 h-5 text-[#ff7a00] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl mb-3 group-hover:text-white transition-colors duration-500">{v.t}</h3>
              <p className="text-[#777777] group-hover:text-[#f8f8f5]/80 transition-colors duration-500 leading-relaxed text-sm">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-[#f8f8f5] py-32 px-6 lg:px-10 text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-6">Thank You</p>
        <h2 className="font-display text-4xl md:text-6xl mb-8">
          For being part of the <span className="font-script text-[#ff7a00] font-normal">SELF</span> family.
        </h2>
        <p className="text-[#777777] text-lg leading-relaxed mb-10">
          Stay balanced. Stay radiant. Stay you.
        </p>
        <div className="w-64 mx-auto">
          <SelfLogo showFull className="w-full" />
        </div>
      </div>
    </section>
  </div>
);

export const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);
  return (
    <div className="pt-[140px]">
      <section className="py-32 px-6 lg:px-10 bg-gradient-to-b from-[#0d4b3e] to-[#0d4b3e]/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><img src="/images/hero-lifestyle.jpg" className="w-full h-full object-cover" alt="SELF Wellness Contact" /></div>
        <div className="relative max-w-5xl mx-auto text-center space-y-4">
          <p className="text-[#ff7a00] text-xs tracking-[0.35em] uppercase font-semibold">Get In Touch</p>
          <h1 className="font-display text-5xl md:text-7xl font-light">
            We'd Love to Hear <span className="font-script text-[#ff7a00] font-normal">From You</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-base font-light leading-relaxed">
            Whether you're looking for the perfect gift, customised hampers, corporate gifting solutions, or simply want to know more about SELF, we're here to help.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-24 grid lg:grid-cols-2 gap-16">
        <motion.div {...fadeUp} className="space-y-8">
          <div>
            <h2 className="font-display text-4xl text-[#1c1c1c] mb-3">SELF</h2>
            <p className="text-xs text-[#ff7a00] tracking-[0.25em] uppercase font-semibold mb-2">
              Strength • Energy • Lifestyle • Fulfilment
            </p>
            <p className="font-script text-3xl text-[#0d4b3e] font-normal mb-6">
              Luxury Begins Within
            </p>
            <blockquote className="bg-[#f8f8f5] border-l-4 border-[#ff7a00] p-5 rounded-r-2xl italic text-[#555555] text-base mb-6">
              "The greatest gift you'll ever receive is the one you give yourself."
            </blockquote>
            <p className="text-[#0d4b3e] font-display text-2xl font-semibold">
              Let's begin your wellness journey together.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { Icon: EnvelopeIconC, l: "Email", v: "hello@selfwellness.in" },
              { Icon: PhoneIconC, l: "Phone", v: "+91 7550231549" },
              { Icon: LocationIconC, l: "Studio", v: "Mumbai · New Delhi · Bengaluru" },
              { Icon: MessageIconC, l: "WhatsApp Concierge", v: "Chat 24/7 for Custom Hampers" },
            ].map(c => (
              <div key={c.l} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-[#0d4b3e]/10 hover:border-[#ff7a00]/40 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#0d4b3e]/8 flex items-center justify-center flex-shrink-0">
                  <c.Icon className="w-4 h-4 text-[#0d4b3e]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs text-[#777777] tracking-wider uppercase font-medium">{c.l}</div>
                  <div className="text-[#1c1c1c] font-medium text-sm">{c.v}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          {...fadeUp}
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-[#0d4b3e]/10 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs tracking-wider uppercase text-[#777777] mb-2 block font-medium">First Name *</label>
              <input required className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent transition-colors text-sm" />
            </div>
            <div>
              <label className="text-xs tracking-wider uppercase text-[#777777] mb-2 block font-medium">Last Name</label>
              <input className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent transition-colors text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs tracking-wider uppercase text-[#777777] mb-2 block font-medium">Email Address *</label>
            <input type="email" required className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent transition-colors text-sm" />
          </div>
          <div>
            <label className="text-xs tracking-wider uppercase text-[#777777] mb-2 block font-medium">Service / Enquiry Type</label>
            <select className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent text-sm">
              <option>Personal Wellness Gifting</option>
              <option>Luxury Gift Hampers</option>
              <option>Corporate Gifting</option>
              <option>Customized Gift Boxes</option>
              <option>Festive Collections</option>
              <option>Bulk & Event Gifting</option>
              <option>General Enquiry</option>
            </select>
          </div>
          <div>
            <label className="text-xs tracking-wider uppercase text-[#777777] mb-2 block font-medium">Message *</label>
            <textarea required rows={4} placeholder="Tell us about your wellness or gifting requirements..." className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent resize-none text-sm placeholder:text-[#999999]" />
          </div>
          <button type="submit" className="w-full bg-[#ff7a00] hover:bg-[#ff9a33] text-white py-4 rounded-full tracking-wider uppercase text-xs font-semibold shadow-lg shadow-[#ff7a00]/25 transition-all">
            {sent ? "✓ Message Sent Successfully" : "Begin Your Wellness Journey"}
          </button>
        </motion.form>
      </section>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "Are your products cruelty-free?", a: "Absolutely. Every SELF product is 100% cruelty-free, vegan-friendly, and never tested on animals. We are certified by PETA and Leaping Bunny." },
    { q: "What is your shipping policy?", a: "Complimentary shipping on all orders above $50 (or equivalent). Standard delivery takes 3-7 business days globally. Express options available at checkout." },
    { q: "Do you offer international shipping?", a: "Yes — we ship to over 60 countries. Prices automatically convert to your local currency using real-time exchange rates." },
    { q: "How do I track my order?", a: "Once shipped, you'll receive an email with a tracking link. You can also track anytime from the Track Order page using your order number." },
    { q: "What is your return policy?", a: "Unopened products may be returned within 30 days for a full refund. Due to hygiene reasons, opened skincare cannot be returned unless defective." },
    { q: "Are your products suitable for sensitive skin?", a: "Most of our formulations are dermatologically tested and suitable for sensitive skin. Check each product's compatibility section for specific guidance." },
    { q: "Do you test on animals?", a: "Never. We are proud to be cruelty-free and vegan-certified across our entire range." },
    { q: "What payment methods do you accept?", a: "We accept Razorpay (UPI, Cards, Wallets, Net Banking), Stripe, PayPal, and major credit/debit cards worldwide." },
  ];
  return (
    <div className="pt-[140px]">
      <section className="py-32 px-6 lg:px-10 bg-gradient-to-b from-[#0d4b3e] to-[#0d4b3e]/90 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-4">Questions & Answers</p>
          <h1 className="font-display text-5xl md:text-7xl">Frequently Asked</h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 lg:px-10 py-32">
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#0d4b3e]/10 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-display text-lg pr-4">{f.q}</span>
                <span className={`text-2xl text-[#ff7a00] transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`grid transition-all ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-[#777777] leading-relaxed">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart } = useCart();
  const { format } = useCurrency();

  const cartItems = items.map(item => ({
    ...item,
    product: PRODUCTS.find(p => p.id === item.id),
  })).filter(item => item.product);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product!.priceUSD * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="pt-[140px] min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-5xl mb-4">Your cart is empty</h1>
          <p className="text-[#777777] mb-8">Begin your wellness ritual.</p>
          <Link to="/shop" className="bg-[#ff7a00] hover:bg-[#ff9a33] text-white px-10 py-4 rounded-full tracking-wider uppercase text-sm font-medium inline-block transition-all">
            Shop Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[140px] max-w-7xl mx-auto px-6 lg:px-10 py-20">
      <h1 className="font-display text-5xl mb-12">Your <span className="font-script text-[#ff7a00] font-normal">Cart</span></h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-5 flex gap-5 border border-[#0d4b3e]/10">
              <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                <ProductImage src={item.product!.images[0]} variant={item.product!.category as any} alt="" className="h-full w-full" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg">{item.product!.name}</h3>
                    <p className="text-xs text-[#777777] uppercase tracking-wider">{item.product!.category}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-[#777777] hover:text-[#ff7a00] text-xs uppercase tracking-wider">Remove</button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="inline-flex items-center border border-[#0d4b3e]/20 rounded-full">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-9 h-9">−</button>
                    <span className="w-9 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-9 h-9">+</button>
                  </div>
                  <div className="font-display text-xl text-[#0d4b3e]">{format(item.product!.priceUSD * item.quantity)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#f8f8f5] rounded-3xl p-8 h-fit sticky top-[160px]">
          <h3 className="font-display text-2xl mb-6">Order Summary</h3>
          <div className="space-y-3 pb-6 border-b border-[#0d4b3e]/10">
            <div className="flex justify-between text-sm"><span>Subtotal</span><span>{format(subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span>Shipping</span><span>{shipping === 0 ? "FREE" : format(shipping)}</span></div>
            {shipping > 0 && <p className="text-xs text-[#ff7a00]">Add {format(50 - subtotal)} for free shipping</p>}
          </div>
          <div className="flex justify-between pt-6 mb-6">
            <span className="font-medium">Total</span>
            <span className="font-display text-2xl text-[#0d4b3e]">{format(total)}</span>
          </div>
          <Link to="/checkout" className="block w-full bg-[#ff7a00] hover:bg-[#ff9a33] text-white text-center py-4 rounded-full tracking-wider uppercase text-sm font-medium transition-all">
            Proceed to Checkout
          </Link>
          <Link to="/shop" className="block text-center mt-4 text-xs tracking-wider uppercase text-[#777777] hover:text-[#ff7a00]">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export const CheckoutPage: React.FC = () => {
  const { items, clearCart } = useCart();
  const { format } = useCurrency();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const [info, setInfo] = useState({ email: "", firstName: "", lastName: "", phone: "", newsletter: false });
  const [addr, setAddr] = useState({ address: "", city: "", state: "", postal: "", country: "India" });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const cartItems = items.map(item => ({
    ...item,
    product: PRODUCTS.find(p => p.id === item.id),
  })).filter(item => item.product);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product!.priceUSD * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SELF10") setDiscount(subtotal * 0.1);
    else if (coupon.toUpperCase() === "WELLNESS20") setDiscount(subtotal * 0.2);
    else alert("Invalid coupon");
  };

  const handlePlaceOrder = async () => {
    if (!info.email || !info.firstName) { alert("Please fill in your information"); setStep(1); return; }
    setPlacing(true);
    try {
      const res = await fetch("https://website-production-1b16.up.railway.app/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: `${info.firstName} ${info.lastName}`.trim(),
          customerEmail: info.email,
          customerPhone: info.phone,
          address: addr,
          items: cartItems.map(i => ({ id: i.id, name: i.product!.name, quantity: i.quantity, priceUsd: i.product!.priceUSD })),
          subtotalUsd: subtotal,
          shippingUsd: shipping,
          totalUsd: total - discount,
          paymentMethod,
          couponCode: discount > 0 ? coupon : undefined,
          discountUsd: discount,
        }),
      });
      if (res.ok) {
        const order = await res.json() as { id: number };
        setOrderId(order.id);
        clearCart();
        if (info.newsletter) {
          await fetch("/api/newsletter/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: info.email }) });
        }
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-[140px] min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Nothing to checkout</h1>
          <Link to="/shop" className="text-[#ff7a00] underline">Shop now</Link>
        </div>
      </div>
    );
  }

  if (orderId) {
    return (
      <div className="pt-[140px] min-h-screen flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#0d4b3e]/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✓</span>
          </div>
          <p className="text-[#ff7a00] text-sm tracking-[0.35em] uppercase mb-2">Order Confirmed</p>
          <h1 className="font-display text-4xl mb-3">Thank you!</h1>
          <p className="text-[#777777] mb-2">Your order <span className="font-mono font-medium text-[#0d4b3e]">#{orderId}</span> has been placed.</p>
          <p className="text-[#777777] text-sm mb-8">We'll send updates to <span className="font-medium">{info.email}</span></p>
          <div className="flex flex-col gap-3">
            <Link to="/track" className="bg-[#0d4b3e] text-white py-3.5 rounded-full tracking-wider uppercase text-sm font-medium">Track Order</Link>
            <Link to="/shop" className="border border-[#0d4b3e]/20 text-[#0d4b3e] py-3.5 rounded-full tracking-wider uppercase text-sm font-medium">Continue Shopping</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-[140px] max-w-7xl mx-auto px-6 lg:px-10 py-20">
      {/* Steps */}
      <div className="flex justify-center gap-3 mb-16">
        {["Information", "Shipping", "Payment"].map((s, i) => (
          <button key={s} onClick={() => setStep((i + 1) as any)} className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm tracking-wider uppercase ${step >= i + 1 ? "bg-[#0d4b3e] text-white" : "bg-[#f8f8f5] text-[#777777]"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step > i + 1 ? "bg-[#ff7a00]" : "bg-[#777777]/30"}`}>
              {step > i + 1 ? "✓" : i + 1}
            </span>
            <span className="hidden md:inline">{s}</span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl p-10 border border-[#0d4b3e]/10 space-y-5">
              <h2 className="font-display text-3xl mb-6">Contact Information</h2>
              <input value={info.email} onChange={e => setInfo(p => ({ ...p, email: e.target.value }))} placeholder="Email *" type="email" className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent" />
              <div className="grid md:grid-cols-2 gap-4">
                <input value={info.firstName} onChange={e => setInfo(p => ({ ...p, firstName: e.target.value }))} placeholder="First Name *" className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent" />
                <input value={info.lastName} onChange={e => setInfo(p => ({ ...p, lastName: e.target.value }))} placeholder="Last Name" className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent" />
              </div>
              <input value={info.phone} onChange={e => setInfo(p => ({ ...p, phone: e.target.value }))} placeholder="Phone" type="tel" className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent" />
              <div className="flex items-center gap-2 text-sm pt-3">
                <input type="checkbox" id="newsletter" checked={info.newsletter} onChange={e => setInfo(p => ({ ...p, newsletter: e.target.checked }))} className="accent-[#ff7a00]" />
                <label htmlFor="newsletter" className="text-[#777777]">Keep me updated on wellness rituals & exclusive offers</label>
              </div>
              <button onClick={() => { if (!info.email || !info.firstName) { alert("Please fill in email and first name"); return; } setStep(2); }} className="w-full bg-[#ff7a00] hover:bg-[#ff9a33] text-white py-4 rounded-full tracking-wider uppercase text-sm font-medium mt-4 transition-all">
                Continue to Shipping
              </button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl p-10 border border-[#0d4b3e]/10 space-y-5">
              <h2 className="font-display text-3xl mb-6">Shipping Address</h2>
              <input value={addr.address} onChange={e => setAddr(p => ({ ...p, address: e.target.value }))} placeholder="Address" className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent" />
              <div className="grid md:grid-cols-3 gap-4">
                <input value={addr.city} onChange={e => setAddr(p => ({ ...p, city: e.target.value }))} placeholder="City" className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent" />
                <input value={addr.state} onChange={e => setAddr(p => ({ ...p, state: e.target.value }))} placeholder="State" className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent" />
                <input value={addr.postal} onChange={e => setAddr(p => ({ ...p, postal: e.target.value }))} placeholder="Postal Code" className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent" />
              </div>
              <select value={addr.country} onChange={e => setAddr(p => ({ ...p, country: e.target.value }))} className="w-full border-b-2 border-[#0d4b3e]/20 focus:border-[#ff7a00] outline-none py-3 bg-transparent">
                <option>India</option>
                <option>United Arab Emirates</option>
                <option>United Kingdom</option>
                <option>United States</option>
                <option>Singapore</option>
              </select>
              <div className="bg-[#f8f8f5] rounded-2xl p-5 mt-6">
                <div className="text-sm font-medium mb-3">Shipping Method</div>
                <label className="flex items-center justify-between p-3 bg-white rounded-xl cursor-pointer">
                  <span className="flex items-center gap-3"><input type="radio" name="ship" defaultChecked className="accent-[#ff7a00]" /> Standard (5-7 days)</span>
                  <span>{shipping === 0 ? "FREE" : format(shipping)}</span>
                </label>
                <label className="flex items-center justify-between p-3 bg-white rounded-xl mt-2 cursor-pointer">
                  <span className="flex items-center gap-3"><input type="radio" name="ship" className="accent-[#ff7a00]" /> Express (2-3 days)</span>
                  <span>{format(shipping + 15)}</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(1)} className="px-8 py-4 border-2 border-[#0d4b3e]/20 rounded-full tracking-wider uppercase text-sm">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 bg-[#ff7a00] hover:bg-[#ff9a33] text-white py-4 rounded-full tracking-wider uppercase text-sm font-medium transition-all">
                  Continue to Payment
                </button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl p-10 border border-[#0d4b3e]/10 space-y-5">
              <h2 className="font-display text-3xl mb-6">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { id: "cod", name: "Cash on Delivery", desc: "Pay when your order arrives", logo: null },
                  { id: "razorpay", name: "Razorpay", desc: "UPI, Cards, Wallets, Net Banking", logo: "/images/razorpay-logo.png" },
                  { id: "stripe", name: "Stripe", desc: "International credit & debit cards", logo: "/images/stripe-logo.png" },
                ].map(p => (
                  <label key={p.id} className={`flex items-center gap-4 p-5 bg-[#f8f8f5] rounded-2xl cursor-pointer border-2 transition-all ${paymentMethod === p.id ? "border-[#ff7a00]" : "border-transparent hover:border-[#ff7a00]/30"}`}>
                    <input type="radio" name="pay" checked={paymentMethod === p.id} onChange={() => setPaymentMethod(p.id)} className="accent-[#ff7a00]" />
                    {p.logo && <img src={p.logo} alt={p.name} className="h-6 w-auto" />}
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-[#777777]">{p.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="w-full bg-[#ff7a00] hover:bg-[#ff9a33] disabled:opacity-50 text-white py-4 rounded-full tracking-wider uppercase text-sm font-medium transition-all mt-6 shadow-lg shadow-[#ff7a00]/30"
              >
                {placing ? "Placing order…" : `Place Order — ${format(total - discount)}`}
              </button>
              <p className="text-xs text-center text-[#777777]">By placing your order, you agree to our Terms & Privacy Policy</p>
            </motion.div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-[#f8f8f5] rounded-3xl p-8 h-fit sticky top-[160px]">
          <h3 className="font-display text-2xl mb-6">Your Order</h3>
          <div className="space-y-3 pb-6 border-b border-[#0d4b3e]/10">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <ProductImage src={item.product!.images[0]} variant={item.product!.category as any} alt="" className="h-full w-full" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#ff7a00] text-white text-xs flex items-center justify-center">{item.quantity}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{item.product!.name}</div>
                  <div className="text-xs text-[#777777]">{format(item.product!.priceUSD * item.quantity)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="my-6">
            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 bg-white border border-[#0d4b3e]/20 rounded-full px-5 py-2.5 text-sm"
              />
              <button onClick={applyCoupon} className="bg-[#0d4b3e] text-white px-5 py-2.5 rounded-full text-sm">Apply</button>
            </div>
            <p className="text-xs text-[#777777] mt-2">Try SELF10 or WELLNESS20</p>
          </div>

          <div className="space-y-2 pb-6 border-b border-[#0d4b3e]/10 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{format(subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "FREE" : format(shipping)}</span></div>
            {discount > 0 && <div className="flex justify-between text-[#ff7a00]"><span>Discount</span><span>-{format(discount)}</span></div>}
          </div>
          <div className="flex justify-between pt-6">
            <span className="font-medium">Total</span>
            <span className="font-display text-2xl text-[#0d4b3e]">{format(total - discount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
