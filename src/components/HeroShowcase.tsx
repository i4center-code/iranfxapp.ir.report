import { useEffect, useMemo, useRef, useState } from "react";
import { SYSTEMS, type System } from "../lib/data";
import { faPrice, toFa } from "../lib/format";
import { Reveal, usePrefersReducedMotion } from "../lib/motion";
import { CandleChart, Sparkline, genCandles } from "./charts";
import { IconArrowLeft, IconDownload } from "./icons";

/* ---------- قیمت‌های زنده موکاپ‌ها ---------- */
function useLivePrices(enabled: boolean) {
  const [px, setPx] = useState({ btc: 67240, eur: 1.0842, mithqal: 10425000 });
  const [dir, setDir] = useState<{ btc: "up" | "down"; eur: "up" | "down"; mithqal: "up" | "down" }>({
    btc: "up",
    eur: "up",
    mithqal: "up",
  });
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => {
      setPx((p) => {
        const btc = p.btc + (Math.random() - 0.48) * 220;
        const eur = +(p.eur + (Math.random() - 0.48) * 0.0005).toFixed(5);
        const mithqal = p.mithqal + Math.round((Math.random() - 0.48) * 42000);
        setDir({
          btc: btc >= p.btc ? "up" : "down",
          eur: eur >= p.eur ? "up" : "down",
          mithqal: mithqal >= p.mithqal ? "up" : "down",
        });
        return { btc, eur, mithqal };
      });
    }, 1600);
    return () => clearInterval(id);
  }, [enabled]);
  return { px, dir };
}

/* ---------- پوسته پنجره موکاپ ---------- */
function MockShell({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="glass-deep relative overflow-hidden rounded-[22px] shadow-[0_45px_100px_-30px_rgba(0,0,0,0.85)]">
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-down/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
        </div>
        <span className="text-[12px] font-bold text-mist">{title}</span>
        <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-bold" style={{ background: `${accent}1c`, color: accent }}>
          <span className="live-dot h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          زنده
        </span>
      </div>
      <div className="relative">{children}</div>
      {/* بازتاب نور */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/5 to-transparent" />
    </div>
  );
}

/* ---------- موکاپ کوین افیکس ---------- */
const COIN_ROWS = [
  { sym: "ETH", name: "اتریوم", price: "۳٬۵۱۲٫۸", chg: "−۰٫۶۴٪", up: false, spark: [8, 10, 9, 11, 10, 12, 11, 10, 12, 11] },
  { sym: "SOL", name: "سولانا", price: "۱۴۸٫۷", chg: "+۳٫۲٪", up: true, spark: [12, 11, 12, 10, 11, 9, 10, 8, 9, 6] },
  { sym: "DOGE", name: "دوج‌کوین", price: "۰٫۱۶۲", chg: "+۰٫۸٪", up: true, spark: [9, 10, 9, 11, 10, 9, 10, 9, 8, 7] },
];

function MockCoin({ price, dir }: { price: number; dir: "up" | "down" }) {
  return (
    <MockShell title="coinfx.iranfx.ir — ارز دیجیتال" accent="#ef9656">
      <div className="p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11.5px] text-mist" dir="ltr">BTC / USDT</p>
            <p
              key={Math.round(price)}
              className={`font-display text-[32px] leading-none tabular-nums text-fog ${dir === "up" ? "flash-up" : "flash-down"}`}
              dir="ltr"
            >
              {faPrice(price, 0)}
            </p>
          </div>
          <span className="mb-1 rounded-full bg-mint/12 px-2.5 py-1 text-[11.5px] font-bold tabular-nums text-mint">▲ +۱٫۸۷٪</span>
        </div>
        <div className="mt-3 h-14">
          <Sparkline data={[20, 26, 22, 30, 24, 32, 26, 20, 28, 22, 30, 24, 18, 26, 20, 28, 22, 16, 24, 10]} accent="#ef9656" className="h-full w-full" />
        </div>
        <div className="mt-4 space-y-2">
          {COIN_ROWS.map((c) => (
            <div key={c.sym} className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/3 px-3.5 py-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ember/14 text-[10px] font-extrabold text-ember">
                {c.sym.slice(0, 3)}
              </span>
              <div className="flex-1">
                <p className="text-[12.5px] font-bold text-fog">{c.name}</p>
                <p className="text-[10.5px] tabular-nums text-mist" dir="ltr">{c.price}</p>
              </div>
              <span className="h-7 w-16"><Sparkline data={c.spark} accent={c.up ? "#3ecf9a" : "#e5656c"} filled={false} className="h-full w-full" /></span>
              <span className={`w-16 text-left text-[11px] font-bold tabular-nums ${c.up ? "text-mint" : "text-down"}`} dir="ltr">{c.chg}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <span className="rounded-lg bg-mint/14 py-2.5 text-center text-[12.5px] font-extrabold text-mint ring-1 ring-mint/30">خرید</span>
          <span className="rounded-lg bg-down/12 py-2.5 text-center text-[12.5px] font-extrabold text-down ring-1 ring-down/30">فروش</span>
        </div>
      </div>
    </MockShell>
  );
}

/* ---------- موکاپ دلتا افیکس ---------- */
const FX_ROWS = [
  { pair: "GBP/USD", bid: "۱٫۲۷۰۵", ask: "۱٫۲۷۰۸", up: true },
  { pair: "USD/JPY", bid: "۱۵۷٫۳۲", ask: "۱۵۷٫۳۵", up: false },
  { pair: "XAU/USD", bid: "۲٬۳۸۴٫۵", ask: "۲٬۳۸۴٫۹", up: true },
  { pair: "US30", bid: "۳۹٬۱۱۲", ask: "۳۹٬۱۱۵", up: true },
];

function MockDelta({ price, dir }: { price: number; dir: "up" | "down" }) {
  const candles = useMemo(() => genCandles(21, 26, 1.0812, 0.0016, 0.02), []);
  return (
    <MockShell title="deltafx.iranfx.ir — فارکس" accent="#5cb8de">
      <div className="p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11.5px] text-mist" dir="ltr">EUR / USD</p>
            <p
              key={price}
              className={`font-display text-[32px] leading-none tabular-nums text-fog ${dir === "up" ? "flash-up" : "flash-down"}`}
              dir="ltr"
            >
              {faPrice(price, 4)}
            </p>
          </div>
          <div className="mb-1 text-left">
            <p className="text-[10px] text-mist">اسپرد</p>
            <p className="text-[13px] font-extrabold tabular-nums text-skyx" dir="ltr">۰٫۳ pip</p>
          </div>
        </div>
        <div className="mt-3 h-24 overflow-hidden rounded-xl border border-white/6 bg-abyss/60 p-1.5">
          <CandleChart candles={candles} up="#3ecf9a" down="#e5656c" className="h-full w-full" />
        </div>
        <div className="mt-3.5 overflow-hidden rounded-xl border border-white/6">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-white/5 px-3.5 py-2 text-[10.5px] font-bold text-mist">
            <span>نماد</span>
            <span className="text-center">Bid</span>
            <span className="text-left">Ask</span>
          </div>
          {FX_ROWS.map((r) => (
            <div key={r.pair} className="grid grid-cols-[1.2fr_1fr_1fr] border-t border-white/5 px-3.5 py-2 text-[11.5px] tabular-nums">
              <span className="font-bold text-fog" dir="ltr">{r.pair}</span>
              <span className={`text-center ${r.up ? "text-mint" : "text-down"}`} dir="ltr">{r.bid}</span>
              <span className="text-left text-fog/80" dir="ltr">{r.ask}</span>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

/* ---------- موکاپ گلد افیکس ---------- */
function MockGold({ price, dir }: { price: number; dir: "up" | "down" }) {
  const gram = Math.round(price / 4.608);
  return (
    <MockShell title="goldfx.iranfx.ir — طلای آب شده" accent="#e6b45a">
      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11.5px] text-mist">طلای آب شده (مثقال)</p>
            <p
              key={price}
              className={`font-display text-[28px] leading-tight tabular-nums text-fog ${dir === "up" ? "flash-up" : "flash-down"}`}
            >
              {faPrice(price, 0)}
              <span className="mr-1.5 font-body text-[11px] font-bold text-mist">تومان</span>
            </p>
          </div>
          <svg viewBox="0 0 80 56" className="h-14 w-20 shrink-0" fill="none" aria-hidden>
            <path d="M22 20h18l4.5 12h-27L22 20Z" fill="#e6b45a" fillOpacity="0.85" stroke="#8a6420" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M42 20h18l4.5 12h-27L42 20Z" fill="#e6b45a" fillOpacity="0.6" stroke="#8a6420" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M30 36h18l4.5 12h-27L30 36Z" fill="#e6b45a" stroke="#8a6420" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="mt-3 h-14">
          <Sparkline data={[32, 30, 31, 28, 26, 27, 24, 25, 22, 23, 20, 21, 17, 18, 14, 15, 11, 12, 8, 6]} accent="#e6b45a" className="h-full w-full" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          <div className="rounded-xl border border-white/6 bg-white/3 px-3 py-2.5">
            <p className="text-[10px] text-mist">گرم ۱۸ عیار</p>
            <p className="mt-0.5 text-[12.5px] font-extrabold tabular-nums text-fog">{faPrice(gram, 0)}</p>
          </div>
          <div className="rounded-xl border border-white/6 bg-white/3 px-3 py-2.5">
            <p className="text-[10px] text-mist">انس جهانی</p>
            <p className="mt-0.5 text-[12.5px] font-extrabold tabular-nums text-fog" dir="ltr">۲٬۳۸۴٫۵$</p>
          </div>
          <div className="rounded-xl border border-white/6 bg-white/3 px-3 py-2.5">
            <p className="text-[10px] text-mist">حباب سکه</p>
            <p className="mt-0.5 text-[12.5px] font-extrabold tabular-nums text-gold">+۲٫۱٪</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-gold/25 bg-gold/8 px-4 py-2.5">
          <span className="text-[11.5px] font-bold text-gold">مظنه لحظه‌ای بازار تهران</span>
          <span className="flex items-center gap-1.5 text-[10.5px] text-mist">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-gold" />
            به‌روزرسانی خودکار
          </span>
        </div>
      </div>
    </MockShell>
  );
}

/* ---------- محتوای متنی هر سامانه ---------- */
const MOCK_META: Record<string, string[]> = {
  coin: ["۱۲۰+ رمزارز فعال", "نمودار زنده و لحظه‌ای", "تسویه آنی ریالی"],
  delta: ["۶۰+ جفت‌ارز و شاخص", "ابزارهای حرفه‌ای تحلیل", "داده‌های به‌روز"],
  gold: ["قیمت لحظه‌ای مثقال و گرم", "نمودارهای پیشرفته", "مظنه بازار تهران"],
};

function SlideContent({ sys, mock, live, active }: { sys: System; mock: React.ReactNode; live: boolean; active: boolean }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <div className={live ? "" : "rv on"}>
        <span
          className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[13px] font-bold"
          style={{ background: sys.accentSoft, color: sys.accent, border: `1px solid ${sys.accent}44` }}
        >
          <span className="live-dot h-1.5 w-1.5 rounded-full" style={{ background: sys.accent }} />
          {sys.assistant}
        </span>
        <h1 className="mt-6 font-display leading-[1.12]">
          <span className="block text-[42px] text-fog sm:text-[56px] lg:text-[64px]">سامانه</span>
          <span className="block text-[42px] sm:text-[56px] lg:text-[64px]" style={{ color: sys.accent }}>
            {sys.name.replace("سامانه ", "")}
          </span>
        </h1>
        <p className="mt-5 max-w-lg text-[15.5px] leading-8 text-mist">{sys.desc}</p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a
            href="#plans"
            tabIndex={active ? 0 : -1}
            className="shine inline-flex items-center gap-2.5 rounded-full bg-fog px-7 py-3.5 text-[15px] font-extrabold text-ink shadow-[0_10px_40px_-10px_rgba(255,255,255,0.55)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <IconDownload className="h-5 w-5" />
            دانلود اپلیکیشن
          </a>
          <a
            href="#services"
            tabIndex={active ? 0 : -1}
            className="group inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[15px] font-bold transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: `${sys.accent}66`, color: sys.accent }}
          >
            ورود به سامانه
            <IconArrowLeft className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-x-1" />
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {MOCK_META[sys.id].map((m) => (
            <span key={m} className="rounded-full border border-white/12 bg-white/4 px-3.5 py-1.5 text-[12px] font-medium text-fog/85">
              {m}
            </span>
          ))}
        </div>
      </div>
      <div className="relative">
        <div
          className="pointer-events-none absolute -inset-10 -z-10 rounded-full blur-[90px] transition-opacity duration-700"
          style={{ background: sys.accent, opacity: active ? 0.14 : 0.05 }}
        />
        {mock}
      </div>
    </div>
  );
}

/* ---------- هرو اسکرول‌محور ---------- */
export default function HeroShowcase() {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true
  );
  const { px, dir } = useLivePrices(!reduced);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        const prog = Math.min(0.999, Math.max(0, -el.getBoundingClientRect().top / total));
        setP(prog);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isDesktop]);

  const pos = p * 2;
  const activeIdx = Math.min(2, Math.round(pos));

  const scrollToSlide = (i: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + (i / 2) * total + 2, behavior: reduced ? "auto" : "smooth" });
  };

  const mocks = [
    <MockCoin key="coin" price={px.btc} dir={dir.btc} />,
    <MockDelta key="delta" price={px.eur} dir={dir.eur} />,
    <MockGold key="gold" price={px.mithqal} dir={dir.mithqal} />,
  ];

  return (
    <section id="top" ref={wrapRef} className={`relative ${isDesktop ? "h-[300vh]" : ""}`}>
      {/* هاله‌های رنگی گسترده */}
      <div className="pointer-events-none absolute -top-52 left-[10%] -z-10 h-[720px] w-[720px] rounded-full bg-pine/25 blur-[170px]" />
      <div className="pointer-events-none absolute -top-20 right-[-10%] -z-10 h-[620px] w-[620px] rounded-full bg-mint/12 blur-[160px]" />

      {isDesktop ? (
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-8">
            {SYSTEMS.map((sys, i) => {
              const o = i - pos;
              const abs = Math.abs(o);
              const opacity = Math.max(0, Math.min(1, 1 - abs * 1.45));
              const active = abs < 0.45;
              return (
                <div
                  key={sys.id}
                  aria-hidden={!active}
                  className="absolute inset-0 flex items-center"
                  style={{
                    opacity,
                    zIndex: active ? 3 : 1,
                    pointerEvents: active ? "auto" : "none",
                    transform: `translateY(${o * 9}%)`,
                  }}
                >
                  <div className="grid w-full items-center gap-14 lg:grid-cols-2">
                    <div style={{ transform: `translateX(${o * -54}px)`, opacity: Math.max(0, 1 - abs * 1.1) }}>
                      <span
                        className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[13px] font-bold"
                        style={{ background: sys.accentSoft, color: sys.accent, border: `1px solid ${sys.accent}44` }}
                      >
                        <span className="live-dot h-1.5 w-1.5 rounded-full" style={{ background: sys.accent }} />
                        {sys.assistant}
                      </span>
                      <h1 className="mt-6 font-display leading-[1.12]">
                        <span className="block text-[46px] text-fog xl:text-[68px]">سامانه</span>
                        <span className="block text-[46px] xl:text-[68px]" style={{ color: sys.accent }}>
                          {sys.name.replace("سامانه ", "")}
                        </span>
                      </h1>
                      <p className="mt-5 max-w-lg text-[16px] leading-8 text-mist">{sys.desc}</p>
                      <div className="mt-7 flex flex-wrap items-center gap-4">
                        <a
                          href="#plans"
                          tabIndex={active ? 0 : -1}
                          className="shine inline-flex items-center gap-2.5 rounded-full bg-fog px-7 py-3.5 text-[15px] font-extrabold text-ink shadow-[0_10px_40px_-10px_rgba(255,255,255,0.55)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
                        >
                          <IconDownload className="h-5 w-5" />
                          دانلود اپلیکیشن
                        </a>
                        <a
                          href="#services"
                          tabIndex={active ? 0 : -1}
                          className="group inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[15px] font-bold transition-all duration-300 hover:-translate-y-0.5"
                          style={{ borderColor: `${sys.accent}66`, color: sys.accent }}
                        >
                          ورود به سامانه
                          <IconArrowLeft className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-x-1" />
                        </a>
                      </div>
                      <div className="mt-8 flex flex-wrap gap-2.5">
                        {MOCK_META[sys.id].map((m) => (
                          <span key={m} className="rounded-full border border-white/12 bg-white/4 px-3.5 py-1.5 text-[12px] font-medium text-fog/85">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div
                      className="relative"
                      style={{
                        transform: `translateX(${o * 64}px) scale(${1 - abs * 0.07}) rotate(${o * -1.4}deg)`,
                        opacity: Math.max(0, 1 - abs * 1.1),
                      }}
                    >
                      <div
                        className="pointer-events-none absolute -inset-12 -z-10 rounded-full blur-[100px] transition-opacity duration-500"
                        style={{ background: sys.accent, opacity: active ? 0.16 : 0.04 }}
                      />
                      {mocks[i]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ریل ناوبری سامانه‌ها */}
          <div className="absolute left-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-start gap-1 lg:flex" dir="rtl">
            {SYSTEMS.map((sys, i) => (
              <button
                key={sys.id}
                onClick={() => scrollToSlide(i)}
                className={`group flex items-center gap-3 rounded-full py-2 pl-4 pr-2 text-[12.5px] font-bold transition-all duration-300 ${
                  activeIdx === i ? "text-fog" : "text-mist/60 hover:text-mist"
                }`}
              >
                <span
                  className="h-[26px] w-[3px] rounded-full transition-all duration-400"
                  style={{
                    background: activeIdx === i ? sys.accent : "rgba(255,255,255,0.15)",
                    boxShadow: activeIdx === i ? `0 0 14px ${sys.accent}aa` : "none",
                  }}
                />
                {sys.name.replace("سامانه ", "")}
              </button>
            ))}
          </div>

          {/* نشانگر اسکرول */}
          <div
            className="absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-2.5 transition-opacity duration-500"
            style={{ opacity: p > 0.06 ? 0 : 1 }}
          >
            <span className="text-[12px] font-medium text-mist">برای آشنایی با ۳ سامانه معاملاتی، اسکرول کنید</span>
            <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-mist/50 p-1.5">
              <span className="mouse-wheel h-2 w-1 rounded-full bg-mint" />
            </span>
          </div>

          {/* شمارنده سامانه */}
          <div className="absolute bottom-8 left-8 z-10 hidden items-center gap-2 font-display text-[15px] text-mist lg:flex" dir="ltr">
            <span className="text-[26px] text-fog">{toFa(String(activeIdx + 1))}</span>
            <span className="h-px w-8 bg-white/25" />
            <span>{toFa("3")}</span>
          </div>
        </div>
      ) : (
        /* ---------- نسخه موبایل: اسلایدهای پشت‌سرهم ---------- */
        <div className="space-y-20 px-5 pb-16 pt-12 sm:px-8">
          {SYSTEMS.map((sys, i) => (
            <Reveal key={sys.id} delay={i * 60}>
              <SlideContent sys={sys} mock={mocks[i]} live={false} active />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
