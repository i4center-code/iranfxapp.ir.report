import { useEffect, useRef, useState } from "react";
import { useCart } from "../lib/cart";
import { faNum } from "../lib/format";
import { LOCALES, useI18n, useTheme, type LangCode } from "../lib/i18n";
import { IconCart, IconUser, LogoMark } from "./icons";

const IconGlobe = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M3.8 12h16.4M12 3.8c-4.6 4.7-4.6 11.7 0 16.4M12 3.8c4.6 4.7 4.6 11.7 0 16.4" />
  </svg>
);

const IconSun = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M18.5 5.5l-1.4 1.4M6.9 17.1l-1.4 1.4" />
  </svg>
);

const IconMoon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M19.5 14.2A8 8 0 0 1 9.8 4.5a8 8 0 1 0 9.7 9.7Z" />
  </svg>
);

function LangSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LOCALES.find((l) => l.code === lang) ?? LOCALES[0];

  useEffect(() => {
    if (mobile) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [mobile]);

  const pick = (code: LangCode) => {
    setLang(code);
    setOpen(false);
  };

  if (mobile) {
    return (
      <div className="grid grid-cols-4 gap-2 px-1 py-2">
        {LOCALES.map((l) => (
          <button
            key={l.code}
            onClick={() => pick(l.code)}
            className={`rounded-xl border px-2 py-2.5 text-[12.5px] font-bold transition-all duration-300 ${
              lang === l.code
                ? "border-mint/60 bg-mint/12 text-mint"
                : "border-white/10 bg-white/4 text-mist hover:text-fog"
            }`}
          >
            {l.native}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("nav.lang", "زبان")}
        aria-expanded={open}
        className={`flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-4 py-2.5 text-[13.5px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-mint/60 ${
          open ? "text-mint" : "text-fog"
        }`}
      >
        <IconGlobe className="h-4.5 w-4.5 text-mint" />
        {current.native}
        <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9.5 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="glass-deep rise absolute left-1/2 top-[calc(100%+10px)] z-[70] w-52 -translate-x-1/2 overflow-hidden rounded-2xl p-1.5 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.8)]">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => pick(l.code)}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-right transition-colors duration-200 ${
                lang === l.code ? "bg-mint/12 text-mint" : "text-mist hover:bg-white/6 hover:text-fog"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className={`flex h-7 w-9 items-center justify-center rounded-lg border text-[10.5px] font-extrabold ${lang === l.code ? "border-mint/50 text-mint" : "border-white/12"}`}>
                  {l.short}
                </span>
                <span className="text-[13.5px] font-bold">{l.native}</span>
              </span>
              <span className="text-[10.5px] opacity-70" dir="auto">{l.region}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();

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

  const navItems: { label: string; href: string }[] = [
    { label: t("nav.site", "سایت"), href: "#top" },
    { label: t("nav.download", "دانلود"), href: "#download" },
    { label: t("nav.calendar", "تقویم"), href: "#" },
    { label: t("nav.blog", "بلاگ"), href: "#" },
    { label: t("nav.articles", "مقالات"), href: "#" },
  ];

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
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 lg:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <span className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
              <LogoMark />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[24px] text-fog lg:text-[26px]">{t("brand.name", "ایران افیکس")}</span>
              <span className="mt-1 text-[10.5px] font-bold text-mint/90">{t("brand.tag", "هوشمندانه معامله کنید")}</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 xl:flex">
            {navItems.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="group relative rounded-full px-4 py-2 text-[14.5px] font-bold text-mist transition-colors duration-200 hover:text-fog"
                >
                  {l.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-[2px] origin-right scale-x-0 rounded-full bg-mint transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "تم روشن" : "تم تیره"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/6 text-fog transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold"
            >
              <span key={theme} className="pop">{theme === "dark" ? <IconSun /> : <IconMoon />}</span>
            </button>
            <div className="hidden sm:block">
              <LangSwitcher />
            </div>
            <button
              onClick={openCart}
              aria-label={t("nav.cart", "سبد خرید")}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/6 text-fog transition-all duration-300 hover:-translate-y-0.5 hover:border-mint/60 hover:text-mint"
            >
              <IconCart className="h-5 w-5" />
              {count > 0 && (
                <span
                  key={count}
                  className="pop absolute -left-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-paper px-1 text-[11px] font-extrabold text-ink shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                >
                  {faNum(count)}
                </span>
              )}
            </button>
            <a
              href="#"
              className="hidden items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-[14px] font-extrabold text-ink shadow-[0_8px_30px_-8px_rgba(255,255,255,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 lg:inline-flex"
            >
              <IconUser className="h-[18px] w-[18px]" />
              {t("nav.login", "ورود | ثبت‌نام")}
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "بستن منو" : "باز کردن منو"}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 bg-white/6 xl:hidden"
            >
              <span className={`h-[2px] w-5 rounded bg-fog transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-[2px] w-5 rounded bg-fog transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`h-[2px] w-5 rounded bg-fog transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>

        {/* mobile panel */}
        <div
          className={`overflow-hidden border-t border-white/8 transition-all duration-400 xl:hidden ${
            open ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-abyss/95 px-4 py-4 backdrop-blur-xl">
            <ul className="space-y-1">
              {navItems.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
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
                  className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-paper px-4 py-3 text-[15px] font-extrabold text-ink"
                >
                  <IconUser className="h-5 w-5" />
                  {t("nav.login", "ورود | ثبت‌نام")}
                </a>
              </li>
            </ul>
            <div className="mt-3 border-t border-white/8 pt-2">
              <p className="flex items-center gap-2 px-2 pb-1 text-[12px] font-bold text-mist">
                <IconGlobe className="h-4 w-4 text-mint" />
                {t("nav.lang", "زبان")}
              </p>
              <LangSwitcher mobile />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
