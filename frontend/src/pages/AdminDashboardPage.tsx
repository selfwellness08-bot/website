import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api/client";

/* ─── Toast ──────────────────────────────────────────────────────────────── */
type ToastType = "success" | "error" | "info";
interface Toast { id: number; msg: string; type: ToastType; }

let _toastId = 0;
let _addToast: ((msg: string, type?: ToastType) => void) | null = null;

const toast = (msg: string, type: ToastType = "error") => _addToast?.(msg, type);
const toastOk = (msg: string) => toast(msg, "success");

const TOAST_ICONS = {
  success: "M20 6L9 17l-5-5",
  error:   "M18 6L6 18M6 6l12 12",
  info:    "M12 16v-4m0-4h.01",
};
const TOAST_COLORS = {
  success: "bg-emerald-600",
  error:   "bg-red-600",
  info:    "bg-[#0d4b3e]",
};

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timerRefs = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    _addToast = (msg, type = "error") => {
      const id = ++_toastId;
      setToasts(prev => [...prev, { id, msg, type }]);
      timerRefs.current[id] = setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
        delete timerRefs.current[id];
      }, 3500);
    };
    return () => { _addToast = null; };
  }, []);

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.22 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-white text-sm font-medium pointer-events-auto max-w-xs ${TOAST_COLORS[t.type]}`}
          >
            <span className="shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d={TOAST_ICONS[t.type]} />
              </svg>
            </span>
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

/* ─── Confirm Dialog ─────────────────────────────────────────────────────── */
interface ConfirmState { msg: string; resolve: (v: boolean) => void; }
let _showConfirm: ((msg: string) => Promise<boolean>) | null = null;

const inlineConfirm = (msg: string): Promise<boolean> =>
  _showConfirm ? _showConfirm(msg) : Promise.resolve(window.confirm(msg));

const ConfirmDialog: React.FC = () => {
  const [state, setState] = useState<ConfirmState | null>(null);

  useEffect(() => {
    _showConfirm = (msg) => new Promise<boolean>(resolve => setState({ msg, resolve }));
    return () => { _showConfirm = null; };
  }, []);

  const answer = (v: boolean) => { state?.resolve(v); setState(null); };

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4"
          >
            <p className="text-gray-800 font-medium mb-1">Are you sure?</p>
            <p className="text-gray-500 text-sm mb-6">{state.msg}</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => answer(false)} className="px-5 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={() => answer(true)} className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─── types ─────────────────────────────────────────────────────────────── */
interface Analytics {
  totalOrders: number; totalRevenue: number; totalProducts: number;
  totalSubscribers: number;
  statusBreakdown: { status: string; count: number }[];
  recentOrders: Order[]; lowStockProducts: Product[];
}
interface Product {
  id: string; name: string; category: string; priceUsd: string;
  inStock: boolean; stock: number; badge: string | null; featured: boolean; images: string[];
}
interface Order {
  id: number; customerName: string; customerEmail: string; customerPhone: string;
  totalUsd: string; status: string; createdAt: string; paymentMethod: string;
  items: { id: string; name: string; quantity: number; priceUsd: number }[];
}
interface Subscriber { id: number; email: string; subscribedAt: string; }
interface Coupon {
  id: number; code: string; discountType: string; discountValue: string;
  minOrderUsd: string; maxUsage: number | null; usageCount: number;
  active: boolean; expiresAt: string | null; createdAt: string;
}

type Tab = "dashboard" | "products" | "orders" | "subscribers" | "coupons" | "settings";

/* ─── icons ─────────────────────────────────────────────────────────────── */
const Icon = ({ d, size = 20 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const Icons = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  products:  "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  orders:    "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  subscribers:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  coupons:   "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z",
  settings:  "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z",
  logout:    "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  check:     "M20 6L9 17l-5-5",
  plus:      "M12 5v14M5 12h14",
  trash:     "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  eye:       "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  eyeOff:   "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24 M1 1l22 22",
  save:      "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8 M7 3v5h8",
  star:      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  trend:     "M22 7l-8.5 8.5-5-5L1 17",
  revenue:   "M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
};

const STATUS_COLORS: Record<string, string> = {
  pending:    "bg-amber-50 text-amber-700 border-amber-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  shipped:    "bg-indigo-50 text-indigo-700 border-indigo-200",
  delivered:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled:  "bg-red-50 text-red-700 border-red-200",
};

/* ─── reusable card ──────────────────────────────────────────────────────── */
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-gray-100 ${className}`}>{children}</div>
);

const StatCard = ({ label, value, icon, gradient, sub }: { label: string; value: string | number; icon: string; gradient: string; sub?: string }) => (
  <Card className="p-6 overflow-hidden relative">
    <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 ${gradient}`} />
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 ${gradient}`}>
      <Icon d={Icons[icon as keyof typeof Icons] || Icons.dashboard} size={18} />
    </div>
    <p className="text-xs text-gray-400 tracking-[0.15em] uppercase mb-1">{label}</p>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
    {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
  </Card>
);

/* ─── password input ─────────────────────────────────────────────────────── */
const SecretInput = ({ label, name, value, onChange, placeholder }: { label: string; name: string; value: string; onChange: (n: string, v: string) => void; placeholder?: string }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={e => onChange(name, e.target.value)}
          placeholder={placeholder || "••••••••"}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm pr-10 outline-none focus:border-[#ff7a00] focus:bg-white transition-all"
        />
        <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <Icon d={show ? Icons.eyeOff : Icons.eye} size={15} />
        </button>
      </div>
    </div>
  );
};

const FieldInput = ({ label, name, value, onChange, placeholder, type = "text" }: { label: string; name: string; value: string; onChange: (n: string, v: string) => void; placeholder?: string; type?: string }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(name, e.target.value)}
      placeholder={placeholder}
      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00] focus:bg-white transition-all"
    />
  </div>
);

/* ════════════════════════════════════════════════════════════════════════════
   SETTINGS TAB
══════════════════════════════════════════════════════════════════════════════ */
const SettingsTab = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    api.get<Record<string, string>>("/admin/settings").then(setSettings).catch(() => {});
  }, []);

  const set = (k: string, v: string) => setSettings(prev => ({ ...prev, [k]: v }));

  const saveGroup = async (groupKey: string, keys: string[]) => {
    setSaving(groupKey);
    const payload: Record<string, string> = {};
    for (const k of keys) payload[k] = settings[k] ?? "";
    try {
      await api.put("/admin/settings", payload);
      setSaved(groupKey);
      setTimeout(() => setSaved(null), 2500);
    } catch { toast("Failed to save settings"); }
    finally { setSaving(null); }
  };

  const SaveBtn = ({ groupKey, keys }: { groupKey: string; keys: string[] }) => (
    <button
      onClick={() => saveGroup(groupKey, keys)}
      disabled={saving === groupKey}
      className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all bg-[#0d4b3e] text-white hover:bg-[#0a3d32] disabled:opacity-60"
    >
      {saved === groupKey ? <><Icon d={Icons.check} size={14} /> Saved!</> : saving === groupKey ? "Saving…" : <><Icon d={Icons.save} size={14} /> Save</>}
    </button>
  );

  const SectionCard = ({ title, icon, desc, groupKey, keys, children }: { title: string; icon: string; desc: string; groupKey: string; keys: string[]; children: React.ReactNode }) => (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0d4b3e]/10 flex items-center justify-center text-[#0d4b3e]">
            <Icon d={Icons[icon as keyof typeof Icons] || Icons.settings} size={17} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
            <p className="text-xs text-gray-400">{desc}</p>
          </div>
        </div>
        <SaveBtn groupKey={groupKey} keys={keys} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </Card>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-gray-800">Settings</h2>
        <p className="text-sm text-gray-400">Configure your store, integrations and API keys. All data is stored securely in your database.</p>
      </div>

      {/* Store Settings */}
      <SectionCard title="Store Settings" icon="dashboard" desc="General store configuration" groupKey="store"
        keys={["store_name","store_tagline","announcement_bar","announcement_active","free_shipping_threshold","whatsapp_number","support_email"]}>
        <FieldInput label="Store Name" name="store_name" value={settings.store_name ?? ""} onChange={set} placeholder="SELF Wellness" />
        <FieldInput label="Tagline" name="store_tagline" value={settings.store_tagline ?? ""} onChange={set} placeholder="Thoughtfully Made for You" />
        <div className="md:col-span-2">
          <FieldInput label="Announcement Bar Text" name="announcement_bar" value={settings.announcement_bar ?? ""} onChange={set} placeholder="Free shipping on orders over ₹999 · Use code SELF10 for 10% off" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Announcement Bar Active</label>
          <select value={settings.announcement_active ?? "true"} onChange={e => set("announcement_active", e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00]">
            <option value="true">Enabled</option>
            <option value="false">Disabled</option>
          </select>
        </div>
        <FieldInput label="Free Shipping Threshold (USD)" name="free_shipping_threshold" value={settings.free_shipping_threshold ?? ""} onChange={set} placeholder="50" type="number" />
        <FieldInput label="WhatsApp Number" name="whatsapp_number" value={settings.whatsapp_number ?? ""} onChange={set} placeholder="+91 98765 43210" />
        <FieldInput label="Support Email" name="support_email" value={settings.support_email ?? ""} onChange={set} placeholder="support@selfwellness.com" />
      </SectionCard>

      {/* Razorpay */}
      <SectionCard title="Razorpay" icon="revenue" desc="Payment gateway for Indian customers" groupKey="razorpay"
        keys={["razorpay_key_id","razorpay_key_secret","razorpay_webhook_secret"]}>
        <div className="md:col-span-2 p-3 bg-amber-50 rounded-xl text-xs text-amber-700 flex items-start gap-2">
          <span>⚠️</span>
          <span>Get your API keys from <strong>dashboard.razorpay.com → Settings → API Keys</strong>. Use Test keys for development, Live keys for production.</span>
        </div>
        <FieldInput label="Key ID" name="razorpay_key_id" value={settings.razorpay_key_id ?? ""} onChange={set} placeholder="rzp_test_xxxxxxxxxxxx" />
        <SecretInput label="Key Secret" name="razorpay_key_secret" value={settings.razorpay_key_secret ?? ""} onChange={set} placeholder="Your secret key" />
        <SecretInput label="Webhook Secret" name="razorpay_webhook_secret" value={settings.razorpay_webhook_secret ?? ""} onChange={set} placeholder="Webhook verification secret" />
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Mode</label>
          <select value={settings.razorpay_mode ?? "test"} onChange={e => set("razorpay_mode", e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00]">
            <option value="test">Test Mode</option>
            <option value="live">Live Mode</option>
          </select>
        </div>
      </SectionCard>

      {/* Cloudinary */}
      <SectionCard title="Cloudinary" icon="products" desc="Image hosting & transformation CDN" groupKey="cloudinary"
        keys={["cloudinary_cloud_name","cloudinary_api_key","cloudinary_api_secret","cloudinary_upload_preset"]}>
        <div className="md:col-span-2 p-3 bg-blue-50 rounded-xl text-xs text-blue-700 flex items-start gap-2">
          <span>ℹ️</span>
          <span>Get credentials from <strong>cloudinary.com → Dashboard</strong>. Create an unsigned upload preset for client-side uploads.</span>
        </div>
        <FieldInput label="Cloud Name" name="cloudinary_cloud_name" value={settings.cloudinary_cloud_name ?? ""} onChange={set} placeholder="your-cloud-name" />
        <FieldInput label="API Key" name="cloudinary_api_key" value={settings.cloudinary_api_key ?? ""} onChange={set} placeholder="123456789012345" />
        <SecretInput label="API Secret" name="cloudinary_api_secret" value={settings.cloudinary_api_secret ?? ""} onChange={set} />
        <FieldInput label="Upload Preset (unsigned)" name="cloudinary_upload_preset" value={settings.cloudinary_upload_preset ?? ""} onChange={set} placeholder="self_wellness_uploads" />
      </SectionCard>

      {/* SMTP / Email */}
      <SectionCard title="Email / SMTP" icon="subscribers" desc="Transactional emails — order confirmations, newsletters" groupKey="smtp"
        keys={["smtp_host","smtp_port","smtp_user","smtp_pass","smtp_from_name","smtp_from_email"]}>
        <div className="md:col-span-2 p-3 bg-purple-50 rounded-xl text-xs text-purple-700 flex items-start gap-2">
          <span>📧</span>
          <span>Use <strong>Gmail SMTP</strong> (smtp.gmail.com / port 587) with an App Password, or any SMTP service like SendGrid / Mailgun.</span>
        </div>
        <FieldInput label="SMTP Host" name="smtp_host" value={settings.smtp_host ?? ""} onChange={set} placeholder="smtp.gmail.com" />
        <FieldInput label="SMTP Port" name="smtp_port" value={settings.smtp_port ?? ""} onChange={set} placeholder="587" type="number" />
        <FieldInput label="SMTP Username" name="smtp_user" value={settings.smtp_user ?? ""} onChange={set} placeholder="you@gmail.com" />
        <SecretInput label="SMTP Password / App Password" name="smtp_pass" value={settings.smtp_pass ?? ""} onChange={set} />
        <FieldInput label="From Name" name="smtp_from_name" value={settings.smtp_from_name ?? ""} onChange={set} placeholder="SELF Wellness" />
        <FieldInput label="From Email" name="smtp_from_email" value={settings.smtp_from_email ?? ""} onChange={set} placeholder="no-reply@selfwellness.com" />
      </SectionCard>

      {/* Social / Meta */}
      <SectionCard title="Social & Meta" icon="star" desc="Social links & SEO meta tags" groupKey="social"
        keys={["instagram_url","facebook_url","youtube_url","meta_description","og_image_url"]}>
        <FieldInput label="Instagram URL" name="instagram_url" value={settings.instagram_url ?? ""} onChange={set} placeholder="https://instagram.com/selfwellness" />
        <FieldInput label="Facebook URL" name="facebook_url" value={settings.facebook_url ?? ""} onChange={set} placeholder="https://facebook.com/selfwellness" />
        <FieldInput label="YouTube URL" name="youtube_url" value={settings.youtube_url ?? ""} onChange={set} placeholder="https://youtube.com/@selfwellness" />
        <div className="md:col-span-2">
          <FieldInput label="Meta Description (SEO)" name="meta_description" value={settings.meta_description ?? ""} onChange={set} placeholder="SELF Wellness – Thoughtfully Made for You. Luxury artisan soaps, body gels, scrubs & more." />
        </div>
        <div className="md:col-span-2">
          <FieldInput label="OG Image URL (social share preview)" name="og_image_url" value={settings.og_image_url ?? ""} onChange={set} placeholder="https://..." />
        </div>
      </SectionCard>
    </motion.div>
  );
};

/* ════════════════════════════════════════════════════════════════════════════
   COUPONS TAB
══════════════════════════════════════════════════════════════════════════════ */
const CouponsTab = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: "", discountType: "percent", discountValue: "", minOrderUsd: "0", maxUsage: "", expiresAt: "" });
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    try { const d = await api.get<Coupon[]>("/admin/coupons"); setCoupons(d); }
    catch { /* ignore */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = async () => {
    if (!form.code || !form.discountValue) return toast("Code and discount value required");
    setCreating(true);
    try {
      await api.post("/admin/coupons", { ...form, maxUsage: form.maxUsage ? Number(form.maxUsage) : null });
      setForm({ code: "", discountType: "percent", discountValue: "", minOrderUsd: "0", maxUsage: "", expiresAt: "" });
      setShowForm(false);
      await load();
    } catch (e: any) { toast(e?.message || "Failed to create coupon"); }
    finally { setCreating(false); }
  };

  const toggle = async (id: number, active: boolean) => {
    try { await api.put(`/admin/coupons/${id}`, { active }); await load(); } catch { toast("Failed to update coupon"); }
  };

  const remove = async (id: number) => {
    if (!await inlineConfirm("This coupon will be permanently deleted.")) return;
    try { await api.delete(`/admin/coupons/${id}`); await load(); } catch { toast("Failed to delete coupon"); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Discount Coupons</h2>
          <p className="text-sm text-gray-400">Create and manage coupon codes for your store</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7a00] text-white text-sm font-medium hover:bg-[#e06e00] transition-colors">
          <Icon d={Icons.plus} size={15} /> New Coupon
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Card className="p-6">
              <h3 className="font-semibold text-gray-700 mb-5">Create New Coupon</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Coupon Code *</label>
                  <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} placeholder="SAVE20" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono outline-none focus:border-[#ff7a00] uppercase" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Discount Type</label>
                  <select value={form.discountType} onChange={e => setForm(f => ({ ...f, discountType: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00]">
                    <option value="percent">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Discount Value *</label>
                  <input type="number" value={form.discountValue} onChange={e => setForm(f => ({ ...f, discountValue: e.target.value }))} placeholder={form.discountType === "percent" ? "10" : "5.00"} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Min Order ($)</label>
                  <input type="number" value={form.minOrderUsd} onChange={e => setForm(f => ({ ...f, minOrderUsd: e.target.value }))} placeholder="0" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Max Usage (blank = unlimited)</label>
                  <input type="number" value={form.maxUsage} onChange={e => setForm(f => ({ ...f, maxUsage: e.target.value }))} placeholder="Unlimited" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Expires At (optional)</label>
                  <input type="date" value={form.expiresAt} onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00]" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={create} disabled={creating} className="px-6 py-2.5 rounded-xl bg-[#0d4b3e] text-white text-sm font-medium hover:bg-[#0a3d32] disabled:opacity-60 transition-colors">
                  {creating ? "Creating…" : "Create Coupon"}
                </button>
                <button onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-[#ff7a00] border-t-transparent rounded-full animate-spin" /></div>
      ) : coupons.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#ff7a00]/10 text-[#ff7a00] flex items-center justify-center mx-auto mb-4">
            <Icon d={Icons.coupons} size={24} />
          </div>
          <p className="text-gray-500 font-medium">No coupons yet</p>
          <p className="text-sm text-gray-400 mt-1">Create your first discount code to attract customers</p>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-[10px] text-gray-400 tracking-[0.12em] uppercase">
              <tr>
                {["Code","Type","Value","Min Order","Usage","Expires","Status",""].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coupons.map(c => (
                <tr key={c.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-semibold text-[#0d4b3e]">{c.code}</td>
                  <td className="px-5 py-3.5 capitalize text-gray-500">{c.discountType}</td>
                  <td className="px-5 py-3.5 font-semibold text-[#ff7a00]">
                    {c.discountType === "percent" ? `${c.discountValue}%` : `$${Number(c.discountValue).toFixed(2)}`}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{Number(c.minOrderUsd) > 0 ? `$${Number(c.minOrderUsd).toFixed(0)}` : "—"}</td>
                  <td className="px-5 py-3.5 text-gray-500">{c.usageCount}{c.maxUsage ? ` / ${c.maxUsage}` : ""}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : "Never"}</td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => toggle(c.id, !c.active)} className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all ${c.active ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200" : "bg-red-50 text-red-700 border-red-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"}`}>
                      {c.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button onClick={() => remove(c.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Icon d={Icons.trash} size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </motion.div>
  );
};

/* ════════════════════════════════════════════════════════════════════════════
   MAIN DASHBOARD
══════════════════════════════════════════════════════════════════════════════ */
export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [orderSearch, setOrderSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [addingProduct, setAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "", category: "soap", priceUsd: "", shortDesc: "", description: "",
    stock: "100", badge: "", inStock: true, featured: false,
    ingredients: "", benefits: "", images: "",
  });
  const adminEmail = localStorage.getItem("admin_email") || "admin";

  const checkAuth = useCallback(async () => {
    try { await api.get("/auth/admin/me"); }
    catch { navigate("/admin"); }
  }, [navigate]);

  const loadAnalytics = useCallback(async () => {
    try { setAnalytics(await api.get<Analytics>("/analytics")); } catch { /* ignore */ }
  }, []);

  const loadProducts = useCallback(async () => {
    try { setProducts(await api.get<Product[]>("/products")); } catch { /* ignore */ }
  }, []);

  const loadOrders = useCallback(async () => {
    try { setOrders(await api.get<Order[]>("/orders/admin/all")); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    checkAuth().then(async () => {
      setLoading(true);
      await Promise.all([loadAnalytics(), loadProducts(), loadOrders()]);
      setLoading(false);
    });
  }, [checkAuth, loadAnalytics, loadProducts, loadOrders]);

  useEffect(() => {
    if (tab === "subscribers" && subscribers.length === 0) {
      api.get<Subscriber[]>("/newsletter/subscribers").then(setSubscribers).catch(() => {});
    }
  }, [tab, subscribers.length]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    navigate("/admin");
  };

  const updateOrderStatus = async (id: number, status: string) => {
    try {
      await api.put(`/orders/admin/${id}`, { status });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      await loadAnalytics();
    } catch { toast("Failed to update order status"); }
  };

  const toggleProductStock = async (id: string, inStock: boolean) => {
    try {
      await api.put(`/products/${id}`, { inStock });
      setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock } : p));
    } catch { toast("Failed to update product"); }
  };

  const toggleProductFeatured = async (id: string, featured: boolean) => {
    try {
      await api.put(`/products/${id}`, { featured });
      setProducts(prev => prev.map(p => p.id === id ? { ...p, featured } : p));
    } catch { toast("Failed to update product"); }
  };

  const updateProductBadge = async (id: string, badge: string) => {
    try {
      await api.put(`/products/${id}`, { badge: badge || null });
      setProducts(prev => prev.map(p => p.id === id ? { ...p, badge: badge || null } : p));
    } catch { toast("Failed to update badge"); }
  };

  const setNP = (k: string, v: string | boolean) => setNewProduct(prev => ({ ...prev, [k]: v }));

  const createProduct = async () => {
    if (!newProduct.name.trim()) return toast("Product name is required");
    if (!newProduct.priceUsd || isNaN(Number(newProduct.priceUsd))) return toast("Valid price is required");
    setAddingProduct(true);
    try {
      const slug = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const payload = {
        id: `prod-${slug}-${Date.now()}`,
        name: newProduct.name.trim(),
        category: newProduct.category,
        priceUsd: newProduct.priceUsd,
        shortDesc: newProduct.shortDesc.trim(),
        description: newProduct.description.trim() || newProduct.shortDesc.trim(),
        stock: Number(newProduct.stock) || 100,
        inStock: newProduct.inStock,
        featured: newProduct.featured,
        badge: newProduct.badge || null,
        ingredients: newProduct.ingredients ? newProduct.ingredients.split(",").map(s => s.trim()).filter(Boolean) : [],
        benefits: newProduct.benefits ? newProduct.benefits.split(",").map(s => s.trim()).filter(Boolean) : [],
        images: newProduct.images ? newProduct.images.split(",").map(s => s.trim()).filter(Boolean) : [],
        usage: [],
        compatibility: "",
        rating: "4.5",
        reviews: [],
      };
      await api.post("/products", payload);
      await Promise.all([loadProducts(), loadAnalytics()]);
      setNewProduct({ name: "", category: "soap", priceUsd: "", shortDesc: "", description: "", stock: "100", badge: "", inStock: true, featured: false, ingredients: "", benefits: "", images: "" });
      setShowAddProduct(false);
    } catch (e: any) { toast(e?.message || "Failed to create product"); }
    finally { setAddingProduct(false); }
  };

  const deleteProduct = async (id: string) => {
    if (!await inlineConfirm("This product will be permanently deleted and cannot be recovered.")) return;
    try {
      await api.delete(`/products/${id}`);
      await Promise.all([loadProducts(), loadAnalytics()]);
    } catch { toast("Failed to delete product"); }
  };

  const filteredOrders = orders.filter(o =>
    o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase()) ||
    String(o.id).includes(orderSearch)
  );

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const TABS: { key: Tab; label: string; icon: string; badge?: number }[] = [
    { key: "dashboard",   label: "Dashboard",   icon: "dashboard" },
    { key: "products",    label: "Products",    icon: "products",    badge: products.length },
    { key: "orders",      label: "Orders",      icon: "orders",      badge: orders.filter(o => o.status === "pending").length || undefined },
    { key: "subscribers", label: "Subscribers", icon: "subscribers" },
    { key: "coupons",     label: "Coupons",     icon: "coupons" },
    { key: "settings",    label: "Settings",    icon: "settings" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1a14] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#ff7a00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/40 text-sm tracking-widest uppercase">Loading</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f4] flex">
      <ToastContainer />
      <ConfirmDialog />
      {/* ── SIDEBAR ───────────────────────────────────────────────────── */}
      <aside className={`${sidebarOpen ? "w-60" : "w-16"} bg-[#0d1f1a] flex flex-col transition-all duration-300 shrink-0 min-h-screen sticky top-0`}>
        {/* logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/8">
          {sidebarOpen ? (
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#ff7a00] flex items-center justify-center text-white font-bold text-sm shrink-0">S</div>
              <div className="min-w-0">
                <p className="text-white text-sm font-bold truncate">SELF</p>
                <p className="text-white/30 text-[10px] tracking-widest uppercase">Admin</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-[#ff7a00] flex items-center justify-center text-white font-bold text-sm">S</div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto text-white/30 hover:text-white/70 transition-colors shrink-0">
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d={sidebarOpen ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
            </svg>
          </button>
        </div>

        {/* nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-hidden">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              title={!sidebarOpen ? t.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all relative group ${
                tab === t.key
                  ? "bg-[#ff7a00]/15 text-[#ff7a00]"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <span className="shrink-0"><Icon d={Icons[t.icon as keyof typeof Icons]} size={18} /></span>
              {sidebarOpen && <span className="font-medium truncate">{t.label}</span>}
              {t.badge ? (
                <span className={`${sidebarOpen ? "ml-auto" : "absolute top-1 right-1"} min-w-[18px] h-[18px] rounded-full text-[9px] font-bold flex items-center justify-center px-1 ${tab === t.key ? "bg-[#ff7a00] text-white" : "bg-red-500 text-white"}`}>
                  {t.badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        {/* user */}
        <div className="border-t border-white/8 p-3">
          {sidebarOpen ? (
            <div className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-7 h-7 rounded-full bg-[#ff7a00]/20 flex items-center justify-center text-[#ff7a00] text-xs font-bold shrink-0">
                {adminEmail.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/60 text-xs truncate">{adminEmail}</p>
              </div>
              <button onClick={handleLogout} title="Logout" className="text-white/30 hover:text-red-400 transition-colors shrink-0">
                <Icon d={Icons.logout} size={14} />
              </button>
            </div>
          ) : (
            <button onClick={handleLogout} title="Logout" className="w-full flex items-center justify-center p-2 text-white/30 hover:text-red-400 transition-colors">
              <Icon d={Icons.logout} size={16} />
            </button>
          )}
        </div>
      </aside>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">

          {/* Dashboard */}
          {tab === "dashboard" && analytics && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Overview</h2>
                <p className="text-sm text-gray-400">Welcome back, {adminEmail.split("@")[0]}</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Revenue" value={`$${Number(analytics.totalRevenue).toLocaleString()}`} icon="revenue" gradient="bg-[#0d4b3e]" sub={`${analytics.totalOrders} orders`} />
                <StatCard label="Pending Orders" value={analytics.statusBreakdown.find(s => s.status === "pending")?.count ?? 0} icon="orders" gradient="bg-amber-500" sub="Needs attention" />
                <StatCard label="Products" value={analytics.totalProducts} icon="products" gradient="bg-[#ff7a00]" sub={`${products.filter(p => !p.inStock).length} out of stock`} />
                <StatCard label="Subscribers" value={analytics.totalSubscribers} icon="subscribers" gradient="bg-purple-500" sub="Newsletter list" />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Card className="p-5">
                  <h3 className="font-semibold text-gray-700 mb-4">Order Breakdown</h3>
                  {analytics.statusBreakdown.length === 0 ? (
                    <p className="text-gray-400 text-sm py-4 text-center">No orders yet</p>
                  ) : (
                    <div className="space-y-3">
                      {analytics.statusBreakdown.map(s => {
                        const total = analytics.statusBreakdown.reduce((a, b) => a + b.count, 0);
                        const pct = total ? Math.round((s.count / total) * 100) : 0;
                        return (
                          <div key={s.status}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${STATUS_COLORS[s.status] || "bg-gray-50 text-gray-700 border-gray-200"}`}>{s.status}</span>
                              <span className="font-semibold text-gray-700">{s.count}</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#0d4b3e] rounded-full transition-all" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Card>

                <Card className="p-5">
                  <h3 className="font-semibold text-gray-700 mb-4">Low Stock Alert</h3>
                  {analytics.lowStockProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-4 text-center">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                        <Icon d={Icons.check} size={18} />
                      </div>
                      <p className="text-sm text-gray-400">All products are well stocked</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {analytics.lowStockProducts.map(p => (
                        <div key={p.id} className="flex justify-between items-center p-2.5 rounded-xl bg-amber-50">
                          <span className="text-sm font-medium text-gray-700 truncate">{p.name}</span>
                          <span className="text-amber-600 font-bold text-sm ml-4">{p.stock} left</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>

              <Card className="overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-700">Recent Orders</h3>
                  <button onClick={() => setTab("orders")} className="text-xs text-[#ff7a00] font-medium hover:underline">View all →</button>
                </div>
                {analytics.recentOrders.length === 0 ? (
                  <div className="p-10 text-center text-gray-400 text-sm">Orders will appear here once customers check out</div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-[10px] text-gray-400 tracking-[0.12em] uppercase">
                      <tr>
                        {["Order","Customer","Total","Status","Date"].map(h => (
                          <th key={h} className="text-left px-5 py-3.5 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.recentOrders.map(o => (
                        <tr key={o.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3.5 font-mono text-gray-500">#{o.id}</td>
                          <td className="px-5 py-3.5 font-medium text-gray-700">{o.customerName}</td>
                          <td className="px-5 py-3.5 font-semibold text-[#0d4b3e]">${Number(o.totalUsd).toFixed(2)}</td>
                          <td className="px-5 py-3.5"><span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border capitalize ${STATUS_COLORS[o.status] || "bg-gray-50"}`}>{o.status}</span></td>
                          <td className="px-5 py-3.5 text-gray-400 text-xs">{new Date(o.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Card>
            </motion.div>
          )}

          {/* Products */}
          {tab === "products" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Products</h2>
                  <p className="text-sm text-gray-400">{products.length} products · {products.filter(p => !p.inStock).length} out of stock · {products.filter(p => p.featured).length} featured</p>
                </div>
                <div className="flex items-center gap-3">
                  <input value={productSearch} onChange={e => setProductSearch(e.target.value)} placeholder="Search products…" className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00] w-52" />
                  <button
                    onClick={() => setShowAddProduct(!showAddProduct)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7a00] text-white text-sm font-medium hover:bg-[#e06e00] transition-colors shrink-0"
                  >
                    <Icon d={Icons.plus} size={15} /> Add Product
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {showAddProduct && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <Card className="p-6">
                      <h3 className="font-semibold text-gray-700 mb-5 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-[#ff7a00]/10 text-[#ff7a00] flex items-center justify-center"><Icon d={Icons.plus} size={14} /></span>
                        New Product
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">Product Name *</label>
                          <input value={newProduct.name} onChange={e => setNP("name", e.target.value)} placeholder="e.g. Rose Petal Body Scrub" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00] focus:bg-white transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">Category *</label>
                          <select value={newProduct.category} onChange={e => setNP("category", e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00]">
                            <option value="soap">Artisan Soaps</option>
                            <option value="gel">Body Gels</option>
                            <option value="scrub">Exfoliating Scrubs</option>
                            <option value="hair">Hair Care</option>
                            <option value="skincare">Skin Care</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">Price (USD) *</label>
                          <input type="number" value={newProduct.priceUsd} onChange={e => setNP("priceUsd", e.target.value)} placeholder="24.99" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00] focus:bg-white transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">Stock Quantity</label>
                          <input type="number" value={newProduct.stock} onChange={e => setNP("stock", e.target.value)} placeholder="100" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00] focus:bg-white transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">Badge</label>
                          <select value={newProduct.badge} onChange={e => setNP("badge", e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00]">
                            <option value="">None</option>
                            <option value="New">New</option>
                            <option value="Bestseller">Bestseller</option>
                            <option value="Limited">Limited</option>
                            <option value="Sale">Sale</option>
                            <option value="Hot">Hot</option>
                          </select>
                        </div>
                        <div className="md:col-span-3">
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">Short Description</label>
                          <input value={newProduct.shortDesc} onChange={e => setNP("shortDesc", e.target.value)} placeholder="One-line tagline shown on product cards" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00] focus:bg-white transition-all" />
                        </div>
                        <div className="md:col-span-3">
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">Full Description</label>
                          <textarea value={newProduct.description} onChange={e => setNP("description", e.target.value)} rows={3} placeholder="Detailed product description shown on the product page…" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00] focus:bg-white transition-all resize-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">Ingredients <span className="text-gray-300">(comma-separated)</span></label>
                          <input value={newProduct.ingredients} onChange={e => setNP("ingredients", e.target.value)} placeholder="Rose extract, Shea butter, Glycerin" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00] focus:bg-white transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">Benefits <span className="text-gray-300">(comma-separated)</span></label>
                          <input value={newProduct.benefits} onChange={e => setNP("benefits", e.target.value)} placeholder="Moisturizes, Brightens, Softens" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00] focus:bg-white transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1.5">Image URLs <span className="text-gray-300">(comma-separated)</span></label>
                          <input value={newProduct.images} onChange={e => setNP("images", e.target.value)} placeholder="https://... (leave blank for category default)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00] focus:bg-white transition-all" />
                        </div>
                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={newProduct.inStock} onChange={e => setNP("inStock", e.target.checked)} className="w-4 h-4 accent-[#0d4b3e]" />
                            <span className="text-sm text-gray-600">In Stock</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={newProduct.featured} onChange={e => setNP("featured", e.target.checked)} className="w-4 h-4 accent-[#ff7a00]" />
                            <span className="text-sm text-gray-600">Featured</span>
                          </label>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2 border-t border-gray-100">
                        <button onClick={createProduct} disabled={addingProduct} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0d4b3e] text-white text-sm font-medium hover:bg-[#0a3d32] disabled:opacity-60 transition-colors">
                          {addingProduct ? "Creating…" : <><Icon d={Icons.check} size={14} /> Create Product</>}
                        </button>
                        <button onClick={() => setShowAddProduct(false)} className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              <Card className="overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-[10px] text-gray-400 tracking-[0.12em] uppercase">
                    <tr>
                      {["Product","Category","Price","Stock","Badge","Featured","Status",""].map(h => (
                        <th key={h} className="text-left px-5 py-3.5 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(p => (
                      <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-gray-800">{p.name}</td>
                        <td className="px-5 py-3.5 capitalize text-gray-400 text-xs">{p.category}</td>
                        <td className="px-5 py-3.5 font-semibold text-[#0d4b3e]">${Number(p.priceUsd).toFixed(2)}</td>
                        <td className="px-5 py-3.5 text-gray-500">{p.stock}</td>
                        <td className="px-5 py-3.5">
                          <select
                            value={p.badge ?? ""}
                            onChange={e => updateProductBadge(p.id, e.target.value)}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none focus:border-[#ff7a00] bg-white"
                          >
                            <option value="">None</option>
                            <option value="New">New</option>
                            <option value="Bestseller">Bestseller</option>
                            <option value="Limited">Limited</option>
                            <option value="Sale">Sale</option>
                            <option value="Hot">Hot</option>
                          </select>
                        </td>
                        <td className="px-5 py-3.5">
                          <button
                            onClick={() => toggleProductFeatured(p.id, !p.featured)}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${p.featured ? "bg-[#ff7a00]/10 text-[#ff7a00]" : "bg-gray-100 text-gray-300 hover:text-gray-500"}`}
                            title={p.featured ? "Unfeature" : "Feature this product"}
                          >
                            <Icon d={Icons.star} size={14} />
                          </button>
                        </td>
                        <td className="px-5 py-3.5">
                          <button
                            onClick={() => toggleProductStock(p.id, !p.inStock)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all ${p.inStock ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200" : "bg-red-50 text-red-700 border-red-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"}`}
                          >
                            {p.inStock ? "In Stock" : "Out of Stock"}
                          </button>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button onClick={() => deleteProduct(p.id)} className="text-gray-300 hover:text-red-500 transition-colors" title="Delete product">
                            <Icon d={Icons.trash} size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                      <tr><td colSpan={7} className="px-5 py-10 text-center text-gray-400 text-sm">No products found.</td></tr>
                    )}
                  </tbody>
                </table>
              </Card>
            </motion.div>
          )}

          {/* Orders */}
          {tab === "orders" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Orders</h2>
                  <p className="text-sm text-gray-400">{orders.length} total · {orders.filter(o => o.status === "pending").length} pending</p>
                </div>
                <input value={orderSearch} onChange={e => setOrderSearch(e.target.value)} placeholder="Search by ID, name, email…" className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ff7a00] w-64" />
              </div>

              {filteredOrders.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Icon d={Icons.orders} size={24} />
                  </div>
                  <p className="text-gray-500 font-medium">No orders yet</p>
                  <p className="text-sm text-gray-400 mt-1">Orders will appear here once customers check out</p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {filteredOrders.map(o => (
                    <Card key={o.id} className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                            <span className="font-mono text-sm font-bold text-gray-600">#{o.id}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border capitalize ${STATUS_COLORS[o.status] || "bg-gray-50"}`}>{o.status}</span>
                            <span className="text-[10px] text-gray-300 border border-gray-200 rounded-full px-2 py-0.5 capitalize">{o.paymentMethod || "cod"}</span>
                          </div>
                          <p className="font-semibold text-gray-800">{o.customerName}</p>
                          <p className="text-sm text-gray-400">{o.customerEmail} {o.customerPhone && `· ${o.customerPhone}`}</p>
                          <p className="text-xs text-gray-300 mt-0.5">{new Date(o.createdAt).toLocaleString()}</p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {o.items.map((item, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5">
                                {item.name} ×{item.quantity}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 shrink-0">
                          <span className="text-2xl font-bold text-[#0d4b3e]">${Number(o.totalUsd).toFixed(2)}</span>
                          <select
                            value={o.status}
                            onChange={e => updateOrderStatus(o.id, e.target.value)}
                            className="text-xs border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#ff7a00] bg-white cursor-pointer"
                          >
                            {["pending","processing","shipped","delivered","cancelled"].map(s => (
                              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Subscribers */}
          {tab === "subscribers" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Newsletter Subscribers</h2>
                <p className="text-sm text-gray-400">{subscribers.length} subscribers on your list</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                <StatCard label="Total Subscribers" value={subscribers.length} icon="subscribers" gradient="bg-purple-500" />
                <StatCard label="This Month" value={subscribers.filter(s => new Date(s.subscribedAt).getMonth() === new Date().getMonth()).length} icon="trend" gradient="bg-[#0d4b3e]" />
              </div>
              <Card className="overflow-hidden">
                {subscribers.length === 0 ? (
                  <div className="p-12 text-center text-gray-400 text-sm">No subscribers yet. Newsletter signups will appear here.</div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-[10px] text-gray-400 tracking-[0.12em] uppercase">
                      <tr>
                        <th className="text-left px-5 py-3.5 font-medium">#</th>
                        <th className="text-left px-5 py-3.5 font-medium">Email</th>
                        <th className="text-left px-5 py-3.5 font-medium">Subscribed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((s, i) => (
                        <tr key={s.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3.5 text-gray-300 text-xs font-mono">{i + 1}</td>
                          <td className="px-5 py-3.5 font-medium text-gray-700">{s.email}</td>
                          <td className="px-5 py-3.5 text-gray-400 text-xs">{new Date(s.subscribedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Card>
            </motion.div>
          )}

          {tab === "coupons" && <CouponsTab />}
          {tab === "settings" && <SettingsTab />}
        </div>
      </main>
    </div>
  );
};
