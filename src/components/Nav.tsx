import { useEffect, useState } from "react";
import { useCart } from "../lib/cart";
import { NAV_ITEMS } from "../lib/data";
import { faNum } from "../lib/format";
import { IconCart, IconUser, LogoMark } from "./icons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* scroll progress */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
        <div
          className="h-full bg-gradient-to-l from-foam via-mint to-foam transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%`, float: "left" }}
        />
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-deep shadow-[0_18px_50px_-20px_rgba(0,0,0,0.55)]" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <span className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
              <LogoMark />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[26px] text-fog">ایران افیکس</span>
              <span className="mt-1 text-[10.5px] font-bold tracking-[0.28em] text-mint/90">
                IRAN FX
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.label === "سایت" ? "#top" : l.href}
                  className="group relative rounded-full px-4 py-2 text-[14.5px] font-bold text-mist transition-colors duration-200 hover:text-fog"
                >
                  {l.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-[2px] origin-right scale-x-0 rounded-full bg-mint transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              aria-label="سبد خرید"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/6 text-fog transition-all duration-300 hover:-translate-y-0.5 hover:border-mint/60 hover:text-mint"
            >
              <IconCart className="h-5 w-5" />
              {count > 0 && (
                <span
                  key={count}
                  className="pop absolute -left-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-fog px-1 text-[11px] font-extrabold text-ink shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                >
                  {faNum(count)}
                </span>
              )}
            </button>
            <a
              href="#"
              className="hidden items-center gap-2 rounded-full bg-fog px-5 py-2.5 text-[14px] font-extrabold text-ink shadow-[0_8px_30px_-8px_rgba(255,255,255,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 sm:inline-flex"
            >
              <IconUser className="h-[18px] w-[18px]" />
              ورود | ثبت‌نام
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "بستن منو" : "باز کردن منو"}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 bg-white/6 lg:hidden"
            >
              <span className={`h-[2px] w-5 rounded bg-fog transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-[2px] w-5 rounded bg-fog transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`h-[2px] w-5 rounded bg-fog transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>

        {/* mobile panel */}
        <div
          className={`overflow-hidden border-t border-white/8 transition-all duration-400 lg:hidden ${
            open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="space-y-1 bg-abyss/95 px-5 py-4 backdrop-blur-xl">
            {NAV_ITEMS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.label === "سایت" ? "#top" : l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-[15px] font-bold text-mist transition-colors hover:bg-white/6 hover:text-mint"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-fog px-4 py-3 text-[15px] font-extrabold text-ink"
              >
                <IconUser className="h-5 w-5" />
                ورود | ثبت‌نام
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
