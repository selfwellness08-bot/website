import React, { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  const icons = { success: CheckCircle, error: AlertCircle, info: Info };
  const colors = {
    success: "border-[#0d4b3e]/20 bg-white text-[#0d4b3e]",
    error: "border-red-200 bg-white text-red-700",
    info: "border-[#ff7a00]/20 bg-white text-[#ff7a00]",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[200] flex flex-col gap-2 items-end pointer-events-none">
        <AnimatePresence>
          {toasts.map(t => {
            const Icon = icons[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 60, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-2xl border shadow-xl shadow-black/8 backdrop-blur-sm min-w-[240px] max-w-[320px] ${colors[t.type]}`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                <p className="text-sm font-medium flex-1 leading-snug">{t.message}</p>
                <button
                  onClick={() => dismiss(t.id)}
                  className="opacity-40 hover:opacity-100 transition-opacity ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be inside ToastProvider");
  return ctx;
};
