import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "./data";

export type CartLine = {
  id: string;
  name: string;
  kindLabel: string;
  priceLabel: string;
  priceNum: number;
  accent: string;
  unit: string;
};

export type ToastKind = "added" | "dup" | "gw" | "crypto";
type Toast = { id: number; kind: ToastKind; name?: string };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  purchase: Product | null;
  cartOpen: boolean;
  toast: Toast | null;
  addToCart: (p: Product) => void;
  removeLine: (id: string) => void;
  openPurchase: (p: Product) => void;
  closePurchase: () => void;
  openCart: () => void;
  closeCart: () => void;
  notify: (kind: ToastKind) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart باید داخل CartProvider استفاده شود");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [purchase, setPurchase] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  const showToast = useCallback((msg: string) => {
    window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), msg });
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const addToCart = useCallback(
    (p: Product) => {
      setLines((prev) => {
        if (prev.some((l) => l.id === p.id)) {
          showToast(`«${p.name}» از قبل در سبد شماست`);
          return prev;
        }
        showToast(`«${p.name}» به سبد خرید اضافه شد`);
        return [
          ...prev,
          {
            id: p.id,
            name: p.name,
            kindLabel: p.kindLabel,
            priceLabel: p.priceLabel,
            priceNum: p.priceNum,
            accent: p.accent,
            unit: p.unit,
          },
        ];
      });
    },
    [showToast]
  );

  const removeLine = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const openPurchase = useCallback((p: Product) => {
    setPurchase(p);
  }, []);

  const closePurchase = useCallback(() => setPurchase(null), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  /* قفل اسکرول وقتی پنلی باز است */
  useEffect(() => {
    document.body.style.overflow = purchase || cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [purchase, cartOpen]);

  /* بستن با Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (purchase) setPurchase(null);
      else if (cartOpen) setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [purchase, cartOpen]);

  const total = lines.reduce((s, l) => s + l.priceNum, 0);

  return (
    <CartContext.Provider
      value={{
        lines,
        count: lines.length,
        total,
        purchase,
        cartOpen,
        toast,
        addToCart,
        removeLine,
        openPurchase,
        closePurchase,
        openCart,
        closeCart,
        notify: showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
