import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, ShoppingBag, BarChart2, Settings, Tag, Mail,
  LogOut, Plus, Pencil, Trash2, Copy, Search, Filter, ChevronLeft, ChevronRight,
  Upload, FileUp, Sparkles, CheckSquare, Square, X, Check, AlertCircle,
  TrendingUp, Users, DollarSign, RefreshCw, Eye, ZoomIn, ChevronDown, Image
} from "lucide-react";
import { api } from "../api/client";
import { useToast } from "../context/ToastContext";
import { SelfLogo } from "../components/SelfLogo";
import { IMAGE_MAP } from "../components/ProductImage";

const resolveImg = (key: string) => IMAGE_MAP[key] ?? key;

const TABS = [
  { id: "dashboard", label: "Dashboard",   icon: LayoutDashboard },
  { id: "products",  label: "Products",    icon: Package },
  { id: "orders",    label: "Orders",      icon: ShoppingBag },
  { id: "newsletter",label: "Subscribers", icon: Users },
  { id: "coupons",   label: "Coupons",     icon: Tag },
  { id: "settings",  label: "Settings",    icon: Settings },
] as const;

type TabId = typeof TABS[number]["id"];
type Category = "soap" | "daily-essentials" | "skincare" | "lip-care" | "hampers";

interface Product {
  id: string; name: string; category: string; priceUsd: string;
  description: string; shortDesc: string; ingredients: string[]; benefits: string[];
  usage: string[]; compatibility: string; images: string[]; rating: string;
  inStock: boolean; stock: number; badge: string | null; featured: boolean;
  createdAt: string; updatedAt: string;
}

interface Order {
  id: number; customerName: string; customerEmail: string; customerPhone: string;
  address: Record<string, string>; items: { id: string; name: string; quantity: number; priceUsd: number }[];
  subtotalUsd: string; shippingUsd: string; totalUsd: string;
  status: string; paymentMethod: string; couponCode: string | null;
  discountUsd: string; notes: string | null; createdAt: string;
}

interface Coupon {
  id: number; code: string; discountType: string; discountValue: string;
  minOrderUsd: string; maxUsage: number | null; usageCount: number;
  active: boolean; expiresAt: string | null; createdAt: string;
}

interface Analytics {
  totalOrders: number; totalRevenue: number; totalProducts: number;
  totalSubscribers: number; statusBreakdown: { status: string; count: number }[];
  recentOrders: Order[]; lowStockProducts: Product[];
}

const EMPTY_PRODUCT = {
  id: "", name: "", category: "soap" as Category, priceUsd: "",
  description: "", shortDesc: "", ingredients: "", benefits: "", usage: "",
  compatibility: "", images: [] as string[], rating: "4.5",
  inStock: true, stock: 0, badge: "", featured: false,
};

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<TabId>("dashboard");
  const [adminEmail, setAdminEmail] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { navigate("/admin"); return; }
    api.get<{ email: string }>("/auth/admin/me")
      .then(d => setAdminEmail(d.email))
      .catch(() => { localStorage.removeItem("admin_token"); navigate("/admin"); });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    navigate("/admin");
  };

  const currentTab = TABS.find(t => t.id === tab);

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif", background: "linear-gradient(135deg, #e8f4ef 0%, #f0f4ff 40%, #fdf6ee 100%)" }}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-[152px]" : "w-[64px]"} flex flex-col transition-all duration-300 shrink-0 z-30 relative`}
        style={{ background: "#1a2e20" }}>

        {/* Brand header */}
        <div className={`p-4 flex items-center gap-2.5 ${!sidebarOpen ? "justify-center" : ""}`}
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="w-8 h-8 rounded-lg bg-[#ff7a00] flex items-center justify-center shrink-0 text-white font-bold text-sm">S</div>
          {sidebarOpen && (
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm leading-tight tracking-wide">SELF</p>
              <p className="text-white/40 text-[11px]">ADMIN</p>
            </div>
          )}
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="ml-auto text-white/30 hover:text-white/60 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        <nav className="flex-1 px-2.5 space-y-0.5 overflow-y-auto py-4">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-2.5 rounded-xl transition-all duration-150 text-left ${
                tab === t.id ? "text-[#1a2e20] font-semibold" : "text-white/50 hover:text-white/80 hover:bg-white/5"
              } ${!sidebarOpen ? "justify-center px-0 py-3" : "px-3 py-2.5"}`}
              style={tab === t.id ? { background: "#ff7a00" } : {}}
              title={!sidebarOpen ? t.label : undefined}
            >
              <t.icon className="w-4 h-4 shrink-0" />
              {sidebarOpen && <span className="text-sm">{t.label}</span>}
            </button>
          ))}
        </nav>

        <div className="px-2.5 pb-4 space-y-0.5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="w-full flex items-center justify-center py-3 text-white/30 hover:text-white/60 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/5 text-white/40 hover:text-red-300 transition-all text-sm mt-1 ${!sidebarOpen ? "justify-center px-0" : ""}`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span className="text-sm">Sign out</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto flex flex-col">
        <div className="flex-1 p-6 md:p-8 max-w-7xl w-full">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {tab === "dashboard"  && <DashboardTab />}
              {tab === "products"   && <ProductsTab toast={toast} />}
              {tab === "orders"     && <OrdersTab toast={toast} />}
              {tab === "coupons"    && <CouponsTab toast={toast} />}
              {tab === "newsletter" && <NewsletterTab />}
              {tab === "settings"   && <SettingsTab toast={toast} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// ─── Dashboard Tab ───────────────────────────────────────────────────────────

const DashboardTab: React.FC = () => {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Analytics>("/analytics").then(setData).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState />;

  const stats = [
    { label: "Total Revenue", value: `$${(data?.totalRevenue || 0).toFixed(2)}`, icon: DollarSign, color: "bg-[#ff7a00]/10 text-[#ff7a00]" },
    { label: "Total Orders", value: data?.totalOrders || 0, icon: ShoppingBag, color: "bg-[#0d4b3e]/10 text-[#0d4b3e]" },
    { label: "Products", value: data?.totalProducts || 0, icon: Package, color: "bg-purple-100 text-purple-600" },
    { label: "Subscribers", value: data?.totalSubscribers || 0, icon: Users, color: "bg-blue-100 text-blue-600" },
  ];

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const statCards = [
    {
      label: "TOTAL REVENUE", value: `$${(data?.totalRevenue || 0).toFixed(2)}`,
      sub: `${data?.totalOrders || 0} orders`,
      icon: DollarSign, iconBg: "#1a2e20", iconColor: "#fff",
      blob: "rgba(134,239,172,0.35)"
    },
    {
      label: "PENDING ORDERS", value: data?.statusBreakdown?.find(s => s.status === "pending")?.count ?? 0,
      sub: "Needs attention",
      icon: ShoppingBag, iconBg: "#ff7a00", iconColor: "#fff",
      blob: "rgba(253,186,116,0.35)"
    },
    {
      label: "PRODUCTS", value: data?.totalProducts || 0,
      sub: `${data?.lowStockProducts?.length || 0} out of stock`,
      icon: Package, iconBg: "#f97316", iconColor: "#fff",
      blob: "rgba(253,186,116,0.35)"
    },
    {
      label: "SUBSCRIBERS", value: data?.totalSubscribers || 0,
      sub: "Newsletter list",
      icon: Users, iconBg: "#7c3aed", iconColor: "#fff",
      blob: "rgba(196,181,253,0.4)"
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-[#1a2e20]">Overview</h1>
        <p className="text-sm text-[#888] mt-0.5">Welcome back, admin</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => (
          <div key={s.label} className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px) saturate(180%)", WebkitBackdropFilter: "blur(16px) saturate(180%)", border: "1px solid rgba(255,255,255,0.75)", boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
            {/* Blob decoration */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full" style={{ background: s.blob, filter: "blur(10px)" }} />
            <div className="relative">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: s.iconBg }}>
                <s.icon className="w-4 h-4" style={{ color: s.iconColor }} />
              </div>
              <p className="text-[10px] font-semibold tracking-widest text-[#aaa] mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-[#1a1a1a]">{s.value}</p>
              <p className="text-xs text-[#aaa] mt-0.5">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px) saturate(180%)", WebkitBackdropFilter: "blur(16px) saturate(180%)", border: "1px solid rgba(255,255,255,0.75)", boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
          <h3 className="font-semibold text-[#1a1a1a] text-sm mb-4">Order Breakdown</h3>
          <div className="space-y-3">
            {data?.statusBreakdown.map(s => (
              <div key={s.status}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium capitalize ${statusColors[s.status] || "bg-gray-100 text-gray-700"}`}>{s.status}</span>
                  <span className="text-xs font-semibold text-[#555]">{s.count}</span>
                </div>
                <div className="w-full h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${Math.min((s.count / (data?.totalOrders || 1)) * 100, 100)}%`, background: "#1a2e20" }} />
                </div>
              </div>
            ))}
            {!data?.statusBreakdown.length && <p className="text-[#aaa] text-sm text-center py-6">No orders yet</p>}
          </div>
        </div>

        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px) saturate(180%)", WebkitBackdropFilter: "blur(16px) saturate(180%)", border: "1px solid rgba(255,255,255,0.75)", boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
          <h3 className="font-semibold text-[#1a1a1a] text-sm mb-4">Low Stock Alert</h3>
          {data?.lowStockProducts.length ? (
            <div className="space-y-2">
              {data.lowStockProducts.map(p => (
                <div key={p.id} className="flex justify-between items-center py-2 border-b border-[#f5f5f5] last:border-0">
                  <div className="flex items-center gap-2.5">
                    {p.images?.[0] ? (
                      <img src={resolveImg(p.images[0])} className="w-8 h-8 rounded-lg object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] flex items-center justify-center"><Package className="w-3.5 h-3.5 text-[#ccc]" /></div>
                    )}
                    <span className="text-sm text-[#333] truncate max-w-[160px]">{p.name}</span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${p.stock <= 3 ? "bg-red-50 text-red-500" : "bg-yellow-50 text-yellow-600"}`}>{p.stock} left</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-9 h-9 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-sm text-[#aaa]">All products are well stocked</p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px) saturate(180%)", WebkitBackdropFilter: "blur(16px) saturate(180%)", border: "1px solid rgba(255,255,255,0.75)", boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#1a1a1a] text-sm">Recent Orders</h3>
          <button onClick={() => {}} className="text-xs text-[#ff7a00] hover:underline font-medium">View all →</button>
        </div>
        {data?.recentOrders.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                  {["ORDER","CUSTOMER","TOTAL","STATUS","DATE"].map(h => (
                    <th key={h} className="pb-2.5 text-left text-[10px] font-semibold tracking-widest text-[#bbb]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map(o => (
                  <tr key={o.id} style={{ borderBottom: "1px solid #f8f8f8" }}>
                    <td className="py-3 text-[#555] font-medium">#{o.id}</td>
                    <td className="py-3 text-[#1a1a1a]">{o.customerName}</td>
                    <td className="py-3 font-semibold text-[#1a1a1a]">${Number(o.totalUsd).toFixed(2)}</td>
                    <td className="py-3"><span className={`text-xs px-2 py-0.5 rounded font-medium capitalize ${statusColors[o.status] || "bg-gray-100"}`}>{o.status}</span></td>
                    <td className="py-3 text-[#aaa] text-xs">{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10">
            <ShoppingBag className="w-9 h-9 text-[#e5e5e5] mx-auto mb-2" />
            <p className="text-sm text-[#aaa]">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Products Tab ─────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

const ProductsTab: React.FC<{ toast: (msg: string, t?: "success" | "error" | "info") => void }> = ({ toast }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showPdfImport, setShowPdfImport] = useState(false);
  const [showMockup, setShowMockup] = useState<Product | null>(null);
  const [galleryProduct, setGalleryProduct] = useState<Product | null>(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadProducts = useCallback(() => {
    setLoading(true);
    api.get<Product[]>("/products").then(setProducts).catch(() => toast("Failed to load products", "error")).finally(() => setLoading(false));
  }, [toast]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const filtered = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || p.category === categoryFilter;
    const matchStock = stockFilter === "all" || (stockFilter === "instock" && p.inStock) || (stockFilter === "outofstock" && !p.inStock) || (stockFilter === "low" && p.inStock && p.stock < 10);
    return matchSearch && matchCat && matchStock;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageProducts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSelect = (id: string) => {
    setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  };
  const toggleAll = () => {
    if (selected.size === pageProducts.length) setSelected(new Set());
    else setSelected(new Set(pageProducts.map(p => p.id)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    setDeleting(id);
    try {
      await api.delete(`/products/${id}`);
      toast("Product deleted");
      loadProducts();
    } catch { toast("Failed to delete product", "error"); }
    finally { setDeleting(null); }
  };

  const handleDuplicate = async (id: string) => {
    try {
      await api.post(`/products/${id}/duplicate`, {});
      toast("Product duplicated");
      loadProducts();
    } catch { toast("Failed to duplicate", "error"); }
  };

  const handleBulkDelete = async () => {
    if (!selected.size || !confirm(`Delete ${selected.size} products?`)) return;
    try {
      await api.post("/products/bulk/delete", { ids: [...selected] });
      toast(`${selected.size} products deleted`);
      setSelected(new Set());
      loadProducts();
    } catch { toast("Bulk delete failed", "error"); }
  };

  const handleBulkToggleStock = async (inStock: boolean) => {
    if (!selected.size) return;
    try {
      await api.post("/products/bulk/update", { ids: [...selected], updates: { inStock } });
      toast(`${selected.size} products updated`);
      setSelected(new Set());
      loadProducts();
    } catch { toast("Bulk update failed", "error"); }
  };

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <h1 className="font-display text-3xl text-[#0d4b3e]">Products</h1>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setShowPdfImport(true)} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#0d4b3e]/20 rounded-xl text-sm hover:bg-[#0d4b3e] hover:text-white transition-all">
            <FileUp className="w-4 h-4" /> PDF Import
          </button>
          <button onClick={() => { setEditProduct(null); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#ff7a00] text-white rounded-xl text-sm hover:bg-[#e66e00] transition-all">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#0d4b3e]/5 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777]" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search products…" className="w-full pl-9 pr-3 py-2 border border-[#0d4b3e]/15 rounded-xl text-sm outline-none focus:border-[#ff7a00]" />
        </div>
        <select value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setPage(1); }} className="border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00] bg-white capitalize">
          {categories.map(c => <option key={c} value={c} className="capitalize">{c === "all" ? "All Categories" : c}</option>)}
        </select>
        <select value={stockFilter} onChange={e => { setStockFilter(e.target.value); setPage(1); }} className="border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00] bg-white">
          <option value="all">All Stock</option>
          <option value="instock">In Stock</option>
          <option value="outofstock">Out of Stock</option>
          <option value="low">Low Stock (&lt;10)</option>
        </select>
        <span className="text-sm text-[#777]">{filtered.length} products</span>
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0d4b3e] text-white rounded-xl p-3 flex items-center gap-4 flex-wrap">
          <span className="text-sm font-medium">{selected.size} selected</span>
          <button onClick={() => handleBulkToggleStock(true)} className="text-sm px-3 py-1 bg-green-500/20 hover:bg-green-500/40 rounded-lg transition-all">Mark In Stock</button>
          <button onClick={() => handleBulkToggleStock(false)} className="text-sm px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/40 rounded-lg transition-all">Mark Out of Stock</button>
          <button onClick={handleBulkDelete} className="text-sm px-3 py-1 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-all flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete All</button>
          <button onClick={() => setSelected(new Set())} className="ml-auto text-white/60 hover:text-white"><X className="w-4 h-4" /></button>
        </motion.div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#0d4b3e]/5 overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center"><div className="w-8 h-8 border-2 border-[#ff7a00] border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f8f5] border-b border-[#0d4b3e]/5">
                  <tr>
                    <th className="px-4 py-3 text-left w-10">
                      <button onClick={toggleAll}>{selected.size === pageProducts.length && pageProducts.length > 0 ? <CheckSquare className="w-4 h-4 text-[#ff7a00]" /> : <Square className="w-4 h-4 text-[#777]" />}</button>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#777] uppercase tracking-wide">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#777] uppercase tracking-wide">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#777] uppercase tracking-wide">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#777] uppercase tracking-wide">Stock</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#777] uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[#777] uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f8f8f5]">
                  {pageProducts.map(p => (
                    <tr key={p.id} className={`hover:bg-[#f8f8f5]/60 transition-colors ${selected.has(p.id) ? "bg-[#ff7a00]/5" : ""}`}>
                      <td className="px-4 py-3">
                        <button onClick={() => toggleSelect(p.id)}>{selected.has(p.id) ? <CheckSquare className="w-4 h-4 text-[#ff7a00]" /> : <Square className="w-4 h-4 text-[#777]" />}</button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <button onClick={() => { setGalleryProduct(p); setGalleryIdx(0); }} className="shrink-0 relative group">
                            {p.images?.[0] ? (
                              <img src={resolveImg(p.images[0])} className="w-12 h-12 rounded-xl object-cover border border-[#0d4b3e]/10" />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-[#f8f8f5] flex items-center justify-center border border-[#0d4b3e]/10"><Image className="w-5 h-5 text-[#777]" /></div>
                            )}
                            {p.images?.length > 1 && <span className="absolute -bottom-1 -right-1 bg-[#0d4b3e] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{p.images.length}</span>}
                            <div className="absolute inset-0 rounded-xl bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><ZoomIn className="w-4 h-4 text-white" /></div>
                          </button>
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate max-w-[180px]">{p.name}</p>
                            <p className="text-xs text-[#777] truncate max-w-[180px]">{p.id}</p>
                            {p.badge && <span className="text-[10px] bg-[#ff7a00]/10 text-[#ff7a00] px-1.5 py-0.5 rounded-full">{p.badge}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3"><span className="text-xs bg-[#0d4b3e]/8 text-[#0d4b3e] px-2 py-1 rounded-full capitalize">{p.category}</span></td>
                      <td className="px-4 py-3 font-semibold text-sm">${Number(p.priceUsd).toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm">{p.stock}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {p.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <button onClick={() => setShowMockup(p)} className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-600 transition-colors" title="AI Mockup"><Sparkles className="w-4 h-4" /></button>
                          <button onClick={() => { setEditProduct(p); setShowForm(true); }} className="p-1.5 rounded-lg hover:bg-[#0d4b3e]/8 text-[#0d4b3e] transition-colors" title="Edit"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => handleDuplicate(p.id)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors" title="Duplicate"><Copy className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors disabled:opacity-40" title="Delete">
                            {deleting === p.id ? <div className="w-4 h-4 border border-red-400 border-t-transparent rounded-full animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-3 border-t border-[#f8f8f5] flex items-center justify-between">
                <p className="text-sm text-[#777]">Page {page} of {totalPages}</p>
                <div className="flex gap-2">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg border disabled:opacity-40 hover:bg-[#f8f8f5] transition-all"><ChevronLeft className="w-4 h-4" /></button>
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg border disabled:opacity-40 hover:bg-[#f8f8f5] transition-all"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            )}

            {pageProducts.length === 0 && (
              <div className="py-16 text-center text-[#777]">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No products found</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {galleryProduct && (
          <GalleryModal product={galleryProduct} idx={galleryIdx} setIdx={setGalleryIdx} onClose={() => setGalleryProduct(null)} />
        )}
      </AnimatePresence>

      {/* Product Form Modal */}
      <AnimatePresence>
        {showForm && (
          <ProductFormModal
            product={editProduct}
            onClose={() => setShowForm(false)}
            onSaved={() => { setShowForm(false); loadProducts(); toast(editProduct ? "Product updated" : "Product created"); }}
            toast={toast}
          />
        )}
      </AnimatePresence>

      {/* PDF Import Modal */}
      <AnimatePresence>
        {showPdfImport && (
          <PdfImportModal
            onClose={() => setShowPdfImport(false)}
            onImported={(data) => {
              setEditProduct(null);
              setShowPdfImport(false);
              setShowForm(true);
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent("prefill-product", { detail: data }));
              }, 100);
            }}
            toast={toast}
          />
        )}
      </AnimatePresence>

      {/* Mockup Generator Modal */}
      <AnimatePresence>
        {showMockup && (
          <MockupModal product={showMockup} onClose={() => setShowMockup(null)} toast={toast} onAddImage={(url) => {
            api.put(`/products/${showMockup.id}`, { images: [...(showMockup.images || []), url] })
              .then(() => { loadProducts(); toast("Mockup added to product images"); })
              .catch(() => toast("Failed to add mockup image", "error"));
            setShowMockup(null);
          }} />
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Gallery Modal ────────────────────────────────────────────────────────────

const GalleryModal: React.FC<{ product: Product; idx: number; setIdx: (i: number) => void; onClose: () => void }> = ({ product, idx, setIdx, onClose }) => {
  const imgs = product.images || [];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
        {imgs.length ? (
          <>
            <img src={imgs[idx]} className="w-full max-h-[70vh] object-contain rounded-2xl" />
            {imgs.length > 1 && (
              <>
                <button onClick={() => setIdx((idx - 1 + imgs.length) % imgs.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm"><ChevronLeft className="w-5 h-5" /></button>
                <button onClick={() => setIdx((idx + 1) % imgs.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm"><ChevronRight className="w-5 h-5" /></button>
                <div className="flex gap-2 justify-center mt-3">
                  {imgs.map((im, i) => <button key={i} onClick={() => setIdx(i)} className={`w-12 h-12 rounded-lg overflow-hidden border-2 ${i === idx ? "border-[#ff7a00]" : "border-transparent"}`}><img src={im} className="w-full h-full object-cover" /></button>)}
                </div>
              </>
            )}
          </>
        ) : <div className="bg-white rounded-2xl p-12 text-center text-[#777]"><Image className="w-12 h-12 mx-auto mb-2 opacity-30" /><p>No images</p></div>}
        <button onClick={onClose} className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg text-[#777] hover:text-[#1c1c1c]"><X className="w-4 h-4" /></button>
      </motion.div>
    </motion.div>
  );
};

// ─── Product Form Modal ───────────────────────────────────────────────────────

const ProductFormModal: React.FC<{
  product: Product | null;
  onClose: () => void;
  onSaved: () => void;
  toast: (msg: string, t?: "success" | "error" | "info") => void;
}> = ({ product, onClose, onSaved, toast }) => {
  const [form, setForm] = useState({
    id: product?.id || "",
    name: product?.name || "",
    category: product?.category || "soap",
    priceUsd: product?.priceUsd ? String(product.priceUsd) : "",
    description: product?.description || "",
    shortDesc: product?.shortDesc || "",
    ingredients: product?.ingredients?.join("\n") || "",
    benefits: product?.benefits?.join("\n") || "",
    usage: product?.usage?.join("\n") || "",
    compatibility: product?.compatibility || "",
    images: product?.images || [] as string[],
    rating: product?.rating || "4.5",
    inStock: product?.inStock ?? true,
    stock: product?.stock || 0,
    badge: product?.badge || "",
    featured: product?.featured || false,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [previewIdx, setPreviewIdx] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail) {
        setForm(prev => ({
          ...prev,
          name: custom.detail.name || prev.name,
          category: custom.detail.category || prev.category,
          priceUsd: String(custom.detail.priceUsd || prev.priceUsd),
          description: custom.detail.description || prev.description,
          shortDesc: custom.detail.shortDesc || prev.shortDesc,
          ingredients: Array.isArray(custom.detail.ingredients) ? custom.detail.ingredients.join("\n") : prev.ingredients,
          benefits: Array.isArray(custom.detail.benefits) ? custom.detail.benefits.join("\n") : prev.benefits,
          usage: Array.isArray(custom.detail.usage) ? custom.detail.usage.join("\n") : prev.usage,
          compatibility: custom.detail.compatibility || prev.compatibility,
          badge: custom.detail.badge || prev.badge,
        }));
      }
    };
    window.addEventListener("prefill-product", handler);
    return () => window.removeEventListener("prefill-product", handler);
  }, []);

  const compressImage = (file: File): Promise<File> =>
    new Promise(resolve => {
      const canvas = document.createElement("canvas");
      const img = new window.Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const MAX = 1200;
        let { width, height } = img;
        if (width > MAX || height > MAX) {
          if (width > height) { height = Math.round(height * MAX / width); width = MAX; }
          else { width = Math.round(width * MAX / height); height = MAX; }
        }
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
        canvas.toBlob(blob => {
          URL.revokeObjectURL(url);
          resolve(blob ? new File([blob], file.name, { type: "image/jpeg" }) : file);
        }, "image/jpeg", 0.82);
      };
      img.onerror = () => resolve(file);
      img.src = url;
    });

  const handleFiles = async (files: File[]) => {
    const images = files.filter(f => f.type.startsWith("image/"));
    if (!images.length) { toast("Please select image files", "error"); return; }
    setUploading(true);
    try {
      const compressed = await Promise.all(images.map(compressImage));
      const fd = new FormData();
      compressed.forEach(f => fd.append("files", f));
      const res = await api.upload<{ urls: string[] }>("/upload/image", fd);
      setForm(prev => ({ ...prev, images: [...prev.images, ...res.urls] }));
      toast(`${res.urls.length} image(s) uploaded`);
    } catch { toast("Upload failed", "error"); }
    finally { setUploading(false); }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const removeImage = (idx: number) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
    if (previewIdx >= form.images.length - 1) setPreviewIdx(0);
  };

  const handleSave = async () => {
    if (!form.name || !form.priceUsd) { toast("Name and price are required", "error"); return; }
    setSaving(true);
    const payload = {
      ...form,
      priceUsd: parseFloat(form.priceUsd),
      stock: Number(form.stock),
      ingredients: form.ingredients.split("\n").map(s => s.trim()).filter(Boolean),
      benefits: form.benefits.split("\n").map(s => s.trim()).filter(Boolean),
      usage: form.usage.split("\n").map(s => s.trim()).filter(Boolean),
      badge: form.badge || null,
    };
    try {
      if (product) {
        await api.put(`/products/${product.id}`, payload);
      } else {
        if (!form.id) payload.id = `prod-${Date.now()}`;
        await api.post("/products", payload);
      }
      onSaved();
    } catch (err: unknown) {
      toast((err as Error).message || "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const field = (label: string, key: keyof typeof form, type = "text", extra?: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label className="text-[10px] tracking-widest uppercase text-[#777] mb-1.5 block">{label}</label>
      <input type={type} value={String(form[key])} onChange={e => setForm(prev => ({ ...prev, [key]: type === "number" ? Number(e.target.value) : e.target.value }))}
        className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00] bg-white" {...extra} />
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white rounded-3xl w-full max-w-3xl my-4 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0ec]">
          <h2 className="font-display text-2xl text-[#0d4b3e]">{product ? "Edit Product" : "New Product"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#f8f8f5] rounded-xl transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Image Upload */}
          <div>
            <label className="text-[10px] tracking-widest uppercase text-[#777] mb-2 block">Product Images</label>
            {/* Preview */}
            {form.images.length > 0 && (
              <div className="mb-3 relative">
                <img src={resolveImg(form.images[previewIdx])} className="w-full h-48 object-cover rounded-2xl border border-[#0d4b3e]/10" />
                <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                  {form.images.map((url, i) => (
                    <div key={i} className="relative shrink-0">
                      <button onClick={() => setPreviewIdx(i)} className={`w-14 h-14 rounded-xl overflow-hidden border-2 ${i === previewIdx ? "border-[#ff7a00]" : "border-transparent"}`}>
                        <img src={resolveImg(url)} className="w-full h-full object-cover" />
                      </button>
                      <button onClick={() => removeImage(i)} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-600 transition-colors"><X className="w-2.5 h-2.5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${dragOver ? "border-[#ff7a00] bg-[#ff7a00]/5" : "border-[#0d4b3e]/20 hover:border-[#ff7a00] hover:bg-[#ff7a00]/3"}`}
            >
              <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={e => handleFiles(Array.from(e.target.files || []))} />
              {uploading ? (
                <div className="flex items-center justify-center gap-2 text-[#ff7a00]"><div className="w-5 h-5 border-2 border-[#ff7a00] border-t-transparent rounded-full animate-spin" /><span className="text-sm">Uploading…</span></div>
              ) : (
                <div className="space-y-1">
                  <Upload className="w-8 h-8 mx-auto text-[#777]" />
                  <p className="text-sm text-[#777]">Drag & drop images here or <span className="text-[#ff7a00] font-medium">browse</span></p>
                  <p className="text-xs text-[#aaa]">JPG, PNG, WebP — auto-compressed to 1200px</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {field("Product Name*", "name")}
            {field("Price (USD)*", "priceUsd", "number")}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#777] mb-1.5 block">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00] bg-white capitalize">
                {["soap","daily-essentials","skincare","lip-care","hampers"].map(c => <option key={c} value={c} className="capitalize">{c.replace(/-/g, " ")}</option>)}
              </select>
            </div>
            {field("Badge (e.g. bestseller)", "badge")}
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {field("Stock Quantity", "stock", "number")}
            {field("Rating (0-5)", "rating")}
            <div className="flex flex-col gap-2 justify-end">
              <label className="flex items-center gap-2 cursor-pointer py-2">
                <button onClick={() => setForm(p => ({ ...p, inStock: !p.inStock }))} className={`w-10 h-6 rounded-full transition-colors relative ${form.inStock ? "bg-green-500" : "bg-gray-300"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.inStock ? "left-[18px]" : "left-0.5"}`} />
                </button>
                <span className="text-sm">In Stock</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer py-2">
                <button onClick={() => setForm(p => ({ ...p, featured: !p.featured }))} className={`w-10 h-6 rounded-full transition-colors relative ${form.featured ? "bg-[#ff7a00]" : "bg-gray-300"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.featured ? "left-[18px]" : "left-0.5"}`} />
                </button>
                <span className="text-sm">Featured</span>
              </label>
            </div>
          </div>

          <div>
            <label className="text-[10px] tracking-widest uppercase text-[#777] mb-1.5 block">Short Description</label>
            <input value={form.shortDesc} onChange={e => setForm(p => ({ ...p, shortDesc: e.target.value }))} className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00]" />
          </div>

          <div>
            <label className="text-[10px] tracking-widest uppercase text-[#777] mb-1.5 block">Full Description</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00] resize-none" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#777] mb-1.5 block">Ingredients (one per line)</label>
              <textarea value={form.ingredients} onChange={e => setForm(p => ({ ...p, ingredients: e.target.value }))} rows={4} className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00] resize-none" />
            </div>
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#777] mb-1.5 block">Benefits (one per line)</label>
              <textarea value={form.benefits} onChange={e => setForm(p => ({ ...p, benefits: e.target.value }))} rows={4} className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00] resize-none" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#777] mb-1.5 block">Usage Steps (one per line)</label>
              <textarea value={form.usage} onChange={e => setForm(p => ({ ...p, usage: e.target.value }))} rows={3} className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00] resize-none" />
            </div>
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#777] mb-1.5 block">Skin Compatibility</label>
              <textarea value={form.compatibility} onChange={e => setForm(p => ({ ...p, compatibility: e.target.value }))} rows={3} className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00] resize-none" />
            </div>
          </div>

          {!product && (
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#777] mb-1.5 block">Product ID (auto-generated if empty)</label>
              <input value={form.id} onChange={e => setForm(p => ({ ...p, id: e.target.value }))} placeholder="e.g. self-soap-01" className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00]" />
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-[#f0f0ec] flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2 rounded-xl border border-[#0d4b3e]/20 text-sm hover:bg-[#f8f8f5] transition-all">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2 rounded-xl bg-[#ff7a00] text-white text-sm font-medium hover:bg-[#e66e00] transition-all disabled:opacity-50 flex items-center gap-2">
            {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {saving ? "Saving…" : (product ? "Save Changes" : "Create Product")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── PDF Import Modal ─────────────────────────────────────────────────────────

const PdfImportModal: React.FC<{
  onClose: () => void;
  onImported: (data: Record<string, unknown>) => void;
  toast: (msg: string, t?: "success" | "error" | "info") => void;
}> = ({ onClose, onImported, toast }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePdfFile = async (file: File) => {
    if (!file.name.endsWith(".pdf") && file.type !== "application/pdf") {
      toast("Please select a PDF file", "error"); return;
    }
    setLoading(true);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      const ab = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: ab }).promise;
      let extracted = "";
      for (let i = 1; i <= Math.min(pdf.numPages, 5); i++) {
        const pg = await pdf.getPage(i);
        const content = await pg.getTextContent();
        extracted += content.items.map((item) => ("str" in item ? (item as { str?: string }).str || "" : "")).join(" ") + "\n";
      }
      setText(extracted.trim());
    } catch { toast("Failed to read PDF", "error"); }
    finally { setLoading(false); }
  };

  const handleExtract = async () => {
    if (!text.trim()) { toast("Please add some text to extract from", "error"); return; }
    setLoading(true);
    try {
      const result = await api.post<Record<string, unknown>>("/ai/extract-pdf", { text });
      onImported(result);
    } catch { toast("AI extraction failed. Is OpenAI configured?", "error"); }
    finally { setLoading(false); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-3xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0ec]">
          <div>
            <h2 className="font-display text-2xl text-[#0d4b3e]">PDF Product Import</h2>
            <p className="text-xs text-[#777] mt-0.5">AI extracts product details from your catalogue</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#f8f8f5] rounded-xl"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handlePdfFile(f); }}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragOver ? "border-[#ff7a00] bg-[#ff7a00]/5" : "border-[#0d4b3e]/20 hover:border-[#ff7a00]"}`}
          >
            <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handlePdfFile(f); }} />
            <FileUp className="w-8 h-8 mx-auto text-[#777] mb-2" />
            <p className="text-sm text-[#777]">Drop your PDF here or <span className="text-[#ff7a00] font-medium">browse</span></p>
          </div>

          <div>
            <label className="text-[10px] tracking-widest uppercase text-[#777] mb-1.5 block">Or paste product text</label>
            <textarea value={text} onChange={e => setText(e.target.value)} rows={6} placeholder="Paste product description, ingredients, benefits…" className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00] resize-none" />
          </div>

          <button onClick={handleExtract} disabled={loading || !text.trim()} className="w-full py-3 rounded-xl bg-[#0d4b3e] text-white text-sm font-medium hover:bg-[#156150] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Extracting with AI…</> : <><Sparkles className="w-4 h-4" />Extract Product Details with AI</>}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Mockup Generator Modal ───────────────────────────────────────────────────

const MockupModal: React.FC<{
  product: Product;
  onClose: () => void;
  onAddImage: (url: string) => void;
  toast: (msg: string, t?: "success" | "error" | "info") => void;
}> = ({ product, onClose, onAddImage, toast }) => {
  const [style, setStyle] = useState("Minimalist luxury packaging on white background, botanical elements, natural lighting, high-end beauty brand aesthetic");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const generate = async () => {
    setGenerating(true);
    setResult(null);
    try {
      const res = await api.post<{ url: string }>("/ai/generate-mockup", { productName: product.name, category: product.category, style });
      setResult(res.url);
    } catch { toast("Mockup generation failed. Is OpenAI configured?", "error"); }
    finally { setGenerating(false); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-3xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0ec]">
          <div>
            <h2 className="font-display text-2xl text-[#0d4b3e]">AI Mockup Generator</h2>
            <p className="text-xs text-[#777] mt-0.5">{product.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#f8f8f5] rounded-xl"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-[10px] tracking-widest uppercase text-[#777] mb-1.5 block">Style Description</label>
            <textarea value={style} onChange={e => setStyle(e.target.value)} rows={3} className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00] resize-none" />
          </div>

          {result ? (
            <div className="space-y-3">
              <img src={result} className="w-full rounded-2xl border border-[#0d4b3e]/10" />
              <div className="flex gap-3">
                <button onClick={() => setResult(null)} className="flex-1 py-2 rounded-xl border border-[#0d4b3e]/20 text-sm hover:bg-[#f8f8f5] transition-all">Regenerate</button>
                <button onClick={() => onAddImage(result)} className="flex-1 py-2 rounded-xl bg-[#ff7a00] text-white text-sm font-medium hover:bg-[#e66e00] transition-all flex items-center justify-center gap-1"><Plus className="w-4 h-4" /> Add to Product</button>
              </div>
            </div>
          ) : (
            <button onClick={generate} disabled={generating} className="w-full py-3 rounded-xl bg-[#0d4b3e] text-white text-sm font-medium hover:bg-[#156150] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {generating ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Generating…</> : <><Sparkles className="w-4 h-4" />Generate Mockup</>}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Orders Tab ───────────────────────────────────────────────────────────────

const OrdersTab: React.FC<{ toast: (msg: string, t?: "success" | "error" | "info") => void }> = ({ toast }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    api.get<Order[]>("/orders/admin/all").then(setOrders).catch(() => toast("Failed to load orders", "error")).finally(() => setLoading(false));
  }, []);

  const filtered = orders.filter(o => {
    const matchSearch = !search || o.customerName.toLowerCase().includes(search.toLowerCase()) || o.customerEmail.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id: number, status: string) => {
    setUpdatingId(id);
    try {
      await api.put(`/orders/admin/${id}`, { status });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      toast("Order status updated");
    } catch { toast("Update failed", "error"); }
    finally { setUpdatingId(null); }
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700", processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700", delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-[#0d4b3e]">Orders</h1>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#0d4b3e]/5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customer…" className="w-full pl-9 pr-3 py-2 border border-[#0d4b3e]/15 rounded-xl text-sm outline-none focus:border-[#ff7a00]" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00] bg-white">
          <option value="all">All Status</option>
          {["pending","processing","shipped","delivered","cancelled"].map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
        </select>
        <span className="text-sm text-[#777] self-center">{filtered.length} orders</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#0d4b3e]/5 overflow-hidden">
        {loading ? <div className="p-12 flex justify-center"><div className="w-8 h-8 border-2 border-[#ff7a00] border-t-transparent rounded-full animate-spin" /></div> : (
          <div className="divide-y divide-[#f8f8f5]">
            {filtered.map(o => (
              <div key={o.id} className="p-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setExpandedId(expandedId === o.id ? null : o.id)} className="text-[#0d4b3e] hover:text-[#ff7a00] transition-colors">
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedId === o.id ? "rotate-180" : ""}`} />
                    </button>
                    <div>
                      <p className="font-semibold text-sm">#{o.id} · {o.customerName}</p>
                      <p className="text-xs text-[#777]">{o.customerEmail} · {new Date(o.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm">${Number(o.totalUsd).toFixed(2)}</span>
                    <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} disabled={updatingId === o.id} className={`text-xs px-3 py-1.5 rounded-full font-medium border-0 outline-none capitalize cursor-pointer ${statusColors[o.status] || "bg-gray-100"}`}>
                      {["pending","processing","shipped","delivered","cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <AnimatePresence>
                  {expandedId === o.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="mt-4 pl-8 space-y-3 text-sm">
                        <div className="grid sm:grid-cols-2 gap-4 bg-[#f8f8f5] rounded-xl p-3">
                          <div><p className="text-xs text-[#777] mb-1">Shipping Address</p><p>{Object.values(o.address).filter(Boolean).join(", ")}</p></div>
                          <div><p className="text-xs text-[#777] mb-1">Payment</p><p className="capitalize">{o.paymentMethod}{o.couponCode ? ` · Coupon: ${o.couponCode}` : ""}</p></div>
                        </div>
                        <div><p className="text-xs text-[#777] mb-2">Items</p>
                          <div className="space-y-1">
                            {o.items?.map((item, i) => (
                              <div key={i} className="flex justify-between text-xs"><span>{item.name} × {item.quantity}</span><span>${(item.priceUsd * item.quantity).toFixed(2)}</span></div>
                            ))}
                          </div>
                        </div>
                        {o.notes && <div><p className="text-xs text-[#777] mb-1">Notes</p><p className="text-[#555]">{o.notes}</p></div>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            {filtered.length === 0 && <div className="py-16 text-center text-[#777]"><ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-20" /><p>No orders found</p></div>}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Coupons Tab ──────────────────────────────────────────────────────────────

const CouponsTab: React.FC<{ toast: (msg: string, t?: "success" | "error" | "info") => void }> = ({ toast }) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: "", discountType: "percent", discountValue: "", minOrderUsd: "0", maxUsage: "", expiresAt: "" });
  const [saving, setSaving] = useState(false);

  const load = () => { api.get<Coupon[]>("/coupons").then(setCoupons).catch(() => toast("Failed to load coupons", "error")).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.code || !form.discountValue) { toast("Code and discount value required", "error"); return; }
    setSaving(true);
    try {
      await api.post("/coupons", { ...form, maxUsage: form.maxUsage ? Number(form.maxUsage) : null, expiresAt: form.expiresAt || null });
      toast("Coupon created"); setShowForm(false); setForm({ code: "", discountType: "percent", discountValue: "", minOrderUsd: "0", maxUsage: "", expiresAt: "" }); load();
    } catch (e: unknown) { toast((e as Error).message || "Failed to create coupon", "error"); }
    finally { setSaving(false); }
  };

  const toggleActive = async (c: Coupon) => {
    try { await api.put(`/coupons/${c.id}`, { active: !c.active }); load(); }
    catch { toast("Update failed", "error"); }
  };

  const deleteCoupon = async (id: number) => {
    if (!confirm("Delete coupon?")) return;
    try { await api.delete(`/coupons/${id}`); toast("Coupon deleted"); load(); }
    catch { toast("Delete failed", "error"); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-[#0d4b3e]">Coupons</h1>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-[#ff7a00] text-white rounded-xl text-sm hover:bg-[#e66e00] transition-all"><Plus className="w-4 h-4" /> New Coupon</button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#0d4b3e]/5 space-y-4">
              <h3 className="font-semibold text-[#0d4b3e]">Create Coupon</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div><label className="text-[10px] uppercase text-[#777] mb-1 block">Code</label><input value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00]" /></div>
                <div><label className="text-[10px] uppercase text-[#777] mb-1 block">Type</label><select value={form.discountType} onChange={e => setForm(p => ({ ...p, discountType: e.target.value }))} className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00] bg-white"><option value="percent">Percent %</option><option value="fixed">Fixed $</option></select></div>
                <div><label className="text-[10px] uppercase text-[#777] mb-1 block">Value</label><input type="number" value={form.discountValue} onChange={e => setForm(p => ({ ...p, discountValue: e.target.value }))} className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00]" /></div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div><label className="text-[10px] uppercase text-[#777] mb-1 block">Min Order ($)</label><input type="number" value={form.minOrderUsd} onChange={e => setForm(p => ({ ...p, minOrderUsd: e.target.value }))} className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00]" /></div>
                <div><label className="text-[10px] uppercase text-[#777] mb-1 block">Max Usage</label><input type="number" value={form.maxUsage} onChange={e => setForm(p => ({ ...p, maxUsage: e.target.value }))} placeholder="Unlimited" className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00]" /></div>
                <div><label className="text-[10px] uppercase text-[#777] mb-1 block">Expires At</label><input type="date" value={form.expiresAt} onChange={e => setForm(p => ({ ...p, expiresAt: e.target.value }))} className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00]" /></div>
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowForm(false)} className="px-5 py-2 rounded-xl border border-[#0d4b3e]/20 text-sm hover:bg-[#f8f8f5]">Cancel</button>
                <button onClick={save} disabled={saving} className="px-6 py-2 rounded-xl bg-[#ff7a00] text-white text-sm disabled:opacity-50">{saving ? "Creating…" : "Create Coupon"}</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-2xl shadow-sm border border-[#0d4b3e]/5 overflow-hidden">
        {loading ? <div className="p-12 flex justify-center"><div className="w-8 h-8 border-2 border-[#ff7a00] border-t-transparent rounded-full animate-spin" /></div> : (
          <table className="w-full text-sm">
            <thead className="bg-[#f8f8f5] border-b"><tr className="text-left"><th className="px-4 py-3 text-xs font-medium text-[#777] uppercase">Code</th><th className="px-4 py-3 text-xs font-medium text-[#777] uppercase">Discount</th><th className="px-4 py-3 text-xs font-medium text-[#777] uppercase">Usage</th><th className="px-4 py-3 text-xs font-medium text-[#777] uppercase">Expires</th><th className="px-4 py-3 text-xs font-medium text-[#777] uppercase">Active</th><th className="px-4 py-3 text-xs font-medium text-[#777] uppercase text-right">Delete</th></tr></thead>
            <tbody className="divide-y divide-[#f8f8f5]">
              {coupons.map(c => (
                <tr key={c.id} className="hover:bg-[#f8f8f5]/60">
                  <td className="px-4 py-3 font-mono font-bold text-[#0d4b3e]">{c.code}</td>
                  <td className="px-4 py-3">{c.discountType === "percent" ? `${c.discountValue}%` : `$${c.discountValue}`}</td>
                  <td className="px-4 py-3">{c.usageCount}{c.maxUsage ? ` / ${c.maxUsage}` : ""}</td>
                  <td className="px-4 py-3 text-[#777]">{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : "—"}</td>
                  <td className="px-4 py-3"><button onClick={() => toggleActive(c)} className={`w-10 h-6 rounded-full transition-colors relative ${c.active ? "bg-green-500" : "bg-gray-300"}`}><span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${c.active ? "left-[18px]" : "left-0.5"}`} /></button></td>
                  <td className="px-4 py-3 text-right"><button onClick={() => deleteCoupon(c.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-all"><Trash2 className="w-4 h-4" /></button></td>
                </tr>
              ))}
              {coupons.length === 0 && <tr><td colSpan={6} className="py-12 text-center text-[#777]">No coupons yet</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// ─── Newsletter Tab ───────────────────────────────────────────────────────────

const NewsletterTab: React.FC = () => {
  const [subscribers, setSubscribers] = useState<{ id: number; email: string; subscribedAt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get<{ id: number; email: string; subscribedAt: string }[]>("/newsletter/subscribers")
      .then(setSubscribers).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = subscribers.filter(s => !search || s.email.toLowerCase().includes(search.toLowerCase()));

  const exportCSV = () => {
    const csv = ["Email,Date", ...filtered.map(s => `${s.email},${new Date(s.subscribedAt).toLocaleDateString()}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "subscribers.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-display text-3xl text-[#0d4b3e]">Newsletter Subscribers</h1>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#0d4b3e]/20 rounded-xl text-sm hover:bg-[#0d4b3e] hover:text-white transition-all">
          <Upload className="w-4 h-4 rotate-180" /> Export CSV
        </button>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#0d4b3e]/5 flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777]" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search email…" className="w-full pl-9 pr-3 py-2 border border-[#0d4b3e]/15 rounded-xl text-sm outline-none focus:border-[#ff7a00]" /></div>
        <span className="text-sm text-[#777] self-center">{filtered.length} subscribers</span>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-[#0d4b3e]/5 overflow-hidden">
        {loading ? <div className="p-12 flex justify-center"><div className="w-8 h-8 border-2 border-[#ff7a00] border-t-transparent rounded-full animate-spin" /></div> : (
          <table className="w-full text-sm">
            <thead className="bg-[#f8f8f5] border-b"><tr className="text-left"><th className="px-4 py-3 text-xs font-medium text-[#777] uppercase">#</th><th className="px-4 py-3 text-xs font-medium text-[#777] uppercase">Email</th><th className="px-4 py-3 text-xs font-medium text-[#777] uppercase">Subscribed</th></tr></thead>
            <tbody className="divide-y divide-[#f8f8f5]">
              {filtered.map((s, i) => (
                <tr key={s.id} className="hover:bg-[#f8f8f5]/60">
                  <td className="px-4 py-3 text-[#777]">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{s.email}</td>
                  <td className="px-4 py-3 text-[#777]">{new Date(s.subscribedAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={3} className="py-12 text-center text-[#777]">No subscribers yet</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// ─── Settings Tab ─────────────────────────────────────────────────────────────

const SettingsTab: React.FC<{ toast: (msg: string, t?: "success" | "error" | "info") => void }> = ({ toast }) => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const FIELDS = [
    { key: "whatsapp_number", label: "WhatsApp Number", placeholder: "+971501234567" },
    { key: "free_shipping_threshold", label: "Free Shipping Threshold (USD)", placeholder: "50" },
    { key: "instagram_url", label: "Instagram URL", placeholder: "https://instagram.com/selfwellness" },
    { key: "facebook_url", label: "Facebook URL", placeholder: "https://facebook.com/selfwellness" },
    { key: "announcement_text", label: "Announcement Bar Text", placeholder: "Free shipping on orders above $50" },
    { key: "contact_email", label: "Contact Email", placeholder: "hello@selfwellness.com" },
  ];

  useEffect(() => {
    api.get<Record<string, string>>("/settings").then(setSettings).catch(console.error).finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try { await api.put("/settings", settings); toast("Settings saved"); }
    catch { toast("Failed to save settings", "error"); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-[#0d4b3e]">Site Settings</h1>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#0d4b3e]/5">
        {loading ? <div className="p-8 flex justify-center"><div className="w-8 h-8 border-2 border-[#ff7a00] border-t-transparent rounded-full animate-spin" /></div> : (
          <div className="space-y-5 max-w-xl">
            {FIELDS.map(f => (
              <div key={f.key}>
                <label className="text-[10px] tracking-widest uppercase text-[#777] mb-1.5 block">{f.label}</label>
                <input value={settings[f.key] || ""} onChange={e => setSettings(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} className="w-full border border-[#0d4b3e]/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#ff7a00]" />
              </div>
            ))}
            <button onClick={save} disabled={saving} className="mt-2 px-8 py-3 rounded-xl bg-[#ff7a00] text-white text-sm font-medium hover:bg-[#e66e00] disabled:opacity-50 transition-all">
              {saving ? "Saving…" : "Save Settings"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Shared ───────────────────────────────────────────────────────────────────

const LoadingState: React.FC = () => (
  <div className="flex items-center justify-center py-24">
    <div className="w-8 h-8 border-2 border-[#ff7a00] border-t-transparent rounded-full animate-spin" />
  </div>
);
