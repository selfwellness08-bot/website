import React, { Suspense, useState } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar, Footer, LoadingScreen, WhatsAppButton, MobileBottomNav } from "./components/Layout";
import { CartProvider, CurrencyProvider } from "./context/StoreContexts";
import { ToastProvider } from "./context/ToastContext";
import { UIProvider } from "./context/UIContext";
import { CartDrawer } from "./components/CartDrawer";

const HomePage          = React.lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const ShopPage          = React.lazy(() => import("./pages/ShopPages").then(m => ({ default: m.ShopPage })));
const ProductDetailPage = React.lazy(() => import("./pages/ShopPages").then(m => ({ default: m.ProductDetailPage })));
const AboutPage         = React.lazy(() => import("./pages/AboutContactPages").then(m => ({ default: m.AboutPage })));
const ContactPage       = React.lazy(() => import("./pages/AboutContactPages").then(m => ({ default: m.ContactPage })));
const FAQPage           = React.lazy(() => import("./pages/AboutContactPages").then(m => ({ default: m.FAQPage })));
const CartPage          = React.lazy(() => import("./pages/AboutContactPages").then(m => ({ default: m.CartPage })));
const CheckoutPage      = React.lazy(() => import("./pages/AboutContactPages").then(m => ({ default: m.CheckoutPage })));
const PrivacyPage       = React.lazy(() => import("./pages/OtherPages").then(m => ({ default: m.PrivacyPage })));
const TermsPage         = React.lazy(() => import("./pages/OtherPages").then(m => ({ default: m.TermsPage })));
const TrackOrderPage    = React.lazy(() => import("./pages/OtherPages").then(m => ({ default: m.TrackOrderPage })));
const JournalPage       = React.lazy(() => import("./pages/OtherPages").then(m => ({ default: m.JournalPage })));
const SustainabilityPage= React.lazy(() => import("./pages/OtherPages").then(m => ({ default: m.SustainabilityPage })));
const IngredientsPage   = React.lazy(() => import("./pages/OtherPages").then(m => ({ default: m.IngredientsPage })));
const QuizPage          = React.lazy(() => import("./pages/OtherPages").then(m => ({ default: m.QuizPage })));
const AdminLoginPage    = React.lazy(() => import("./pages/AdminLoginPage").then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = React.lazy(() => import("./pages/AdminDashboardPage").then(m => ({ default: m.AdminDashboardPage })));

const PageFallback: React.FC = () => (
  <div className="pt-[140px] min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#ff7a00] border-t-transparent rounded-full animate-spin" />
  </div>
);

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [pathname]);
  return null;
};

function AdminRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="*" element={<AdminLoginPage />} />
      </Routes>
    </Suspense>
  );
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <Suspense fallback={<PageFallback />}>
        <PageTransition>
          <Routes>
            <Route path="/"              element={<HomePage />} />
            <Route path="/shop"          element={<ShopPage />} />
            <Route path="/product/:id"   element={<ProductDetailPage />} />
            <Route path="/about"         element={<AboutPage />} />
            <Route path="/contact"       element={<ContactPage />} />
            <Route path="/cart"          element={<CartPage />} />
            <Route path="/checkout"      element={<CheckoutPage />} />
            <Route path="/privacy"       element={<PrivacyPage />} />
            <Route path="/terms"         element={<TermsPage />} />
            <Route path="/faq"           element={<FAQPage />} />
            <Route path="/track"         element={<TrackOrderPage />} />
            <Route path="/journal"       element={<JournalPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/ingredients"   element={<IngredientsPage />} />
            <Route path="/quiz"          element={<QuizPage />} />
            <Route path="*"             element={<HomePage />} />
          </Routes>
        </PageTransition>
      </Suspense>
      <Footer />
      <WhatsAppButton />
      <MobileBottomNav />
    </>
  );
}

function AdminAwareContent({ setLoading, loading }: { setLoading: (v: boolean) => void; loading: boolean }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/*" element={<AdminLoginPage />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <AppContent />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <CurrencyProvider>
      <CartProvider>
        <UIProvider>
          <ToastProvider>
            <HashRouter>
              <AdminAwareContent setLoading={setLoading} loading={loading} />
            </HashRouter>
          </ToastProvider>
        </UIProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}

export default App;
