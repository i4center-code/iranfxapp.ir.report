import { useEffect, useRef, useState } from "react";
import { SYSTEMS, type System } from "../lib/data";
import { faNum, faPrice, toFa } from "../lib/format";
import { Reveal, usePrefersReducedMotion } from "../lib/motion";
import { CandleChart, genCandles, type Candle } from "./charts";
import { IconArrowLeft, IconBolt, IconDownload, IconSignal } from "./icons";

/* ---------- داده‌های هر سامانه برای موکاپ موبایل ---------- */
type Meta = {
  pair: string;
  base: number;
  vol: number;
  decimals: number;
  drift: number;
  mini: { p: string; pr: string; ch: number }[];
  positions: { pair: string; side: string; pnl: string; up: boolean }[];
  chipTitle: string;
  chipBody: string;
  chipTag: string;
};

const META: Record<string, Meta> = {
  coin: {
    pair: "BTC/USDT",
    base: 66400,
    vol: 480,
    decimals: 0,
    drift: 0.05,
    mini: [
      { p: "BTC", pr: "۶۷٬۲۴۰", ch: 1.87 },
      { p: "ETH", pr: "۳٬۵۱۲", ch: -0.64 },
      { p: "BNB", pr: "۵۹۴", ch: 0.42 },
      { p: "SOL", pr: "۱۴۸٫۷", ch: 2.31 },
      { p: "XRP", pr: "۰٫۵۲۸", ch: -1.05 },
      { p: "DOGE", pr: "۰٫۱۶۲", ch: 0.77 },
    ],
    positions: [
      { pair: "BTC/USDT", side: "خرید", pnl: "+۳٫۱٪", up: true },
      { pair: "ETH/USDT", side: "فروش", pnl: "−۰٫۴٪", up: false },
    ],
    chipTitle: "سیگنال میکوبات",
    chipBody: "خرید BTC/USDT در ۶۷٬۲۱۴",
    chipTag: "همین حالا",
  },
  delta: {
    pair: "EUR/USD",
    base: 1.0812,
    vol: 0.0015,
    decimals: 4,
    drift: 0.02,
    mini: [
      { p: "EUR/USD", pr: "۱٫۰۸۴۲", ch: 0.11 },
      { p: "GBP/USD", pr: "۱٫۲۷۰۵", ch: -0.23 },
      { p: "USD/JPY", pr: "۱۵۷٫۳۲", ch: 0.35 },
      { p: "AUD/USD", pr: "۰٫۶۵۹۸", ch: -0.18 },
      { p: "USD/CAD", pr: "۱٫۳۶۴۵", ch: 0.09 },
      { p: "US30", pr: "۳۹٬۱۱۲", ch: 0.27 },
    ],
    positions: [
      { pair: "EUR/USD", side: "خرید", pnl: "+۱٫۸٪", up: true },
      { pair: "GBP/USD", side: "فروش", pnl: "+۰٫۶٪", up: true },
    ],
    chipTitle: "سیگنال اُروبات",
    chipBody: "خرید XAU/USD در ۲٬۳۸۱٫۴",
    chipTag: "۴ دقیقه پیش",
  },
  gold: {
    pair: "طلای ۱۸ عیار / مثقال",
    base: 5942000,
    vol: 24000,
    decimals: 0,
    drift: 0.07,
    mini: [
      { p: "مثقال ۱۸ عیار", pr: "۵٬۹۴۲٬۰۰۰", ch: 0.65 },
      { p: "گرم ۱۸ عیار", pr: "۱٬۳۷۱٬۰۰۰", ch: 0.58 },
      { p: "انس جهانی", pr: "۲٬۳۸۴", ch: 0.42 },
      { p: "سکه امامی", pr: "۴۰٬۸۵۰", ch: 1.12 },
      { p: "ربع سکه", pr: "۱۳٬۲۰۰", ch: 0.31 },
      { p: "نقره", pr: "۲۸٫۶۴", ch: -0.91 },
    ],
    positions: [
      { pair: "طلای آبشده", side: "خرید", pnl: "+۲٫۴٪", up: true },
      { pair: "انس جهانی", side: "فروش", pnl: "−۰٫۲٪", up: false },
    ],
    chipTitle: "حباب سکه",
    chipBody: "حباب سکه امامی: ۳٫۸٪",
    chipTag: "به‌روزرسانی شد",
  },
};

const initSeries = (): Record<string, Candle[]> => ({
  coin: genCandles(23, 24, META.coin.base, META.coin.vol, META.coin.drift),
  delta: genCandles(31, 24, META.delta.base, META.delta.vol, META.delta.drift),
  gold: genCandles(17, 24, META.gold.base, META.gold.vol, META.gold.drift),
});

/* ---------- موکاپ موبایل هر سامانه ---------- */
function SysPhone({ sys, candles, dir, live }: { sys: System; candles: Candle[]; dir: "up" | "down"; live: boolean }) {
  const meta = META[sys.id];
  const price = candles[candles.length - 1].c;
  const change = ((price - candles[0].o) / candles[0].o) * 100;
  const up = change >= 0;

  return (
    <div className="relative mx-auto w-[290px] sm:w-[320px]">
      {/* هاله نوری */}
      <div className="pointer-events-none absolute -inset-14 -z-10 rounded-full opacity-25 blur-[85px]" style={{ background: sys.accent }} />
      <div className="pointer-events-none absolute -inset-7 -z-10 hidden items-center justify-center sm:flex">
        <div className="spin-slow h-[400px] w-[400px] rounded-full border border-dashed" style={{ borderColor: `${sys.accent}33` }} />
      </div>

      <div
        className="relative rounded-[44px] border border-white/15 bg-abyss p-[10px] shadow-[0_50px_110px_-30px_rgba(0,0,0,0.9)]"
        style={{ boxShadow: `0 50px 110px -30px rgba(0,0,0,0.9), 0 0 0 1px ${sys.accent}1f` }}
      >
        <div className="relative overflow-hidden rounded-[36px] border border-white/8 bg-ink">
          <div className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-abyss" />

          <div className="px-4 pb-4 pt-10">
            {/* سربرگ */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-display text-[15px] text-fog">{sys.name.replace("سامانه ", "")}</span>
                <span className="rounded px-1.5 py-0.5 text-[9px] font-bold" style={{ background: `${sys.accent}1f`, color: sys.accent }}>
                  PRO
                </span>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-mint/10 px-2.5 py-1 text-[10px] font-bold text-mint">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-mint" />
                زنده
              </span>
            </div>

            {/* تیکر متحرک قیمت‌ها */}
            <div className="ticker-shell mt-3 overflow-hidden rounded-xl border border-white/8 bg-abyss/80">
              <div className="ticker-track items-center gap-7 py-2" style={{ "--ticker-speed": "26s" } as React.CSSProperties}>
                {[...meta.mini, ...meta.mini, ...meta.mini].map((m, i) => (
                  <span key={i} className="flex shrink-0 items-center gap-1.5 text-[10.5px]" dir="ltr">
                    <b className="text-fog/90">{m.p}</b>
                    <span className="tabular-nums text-mist">{m.pr}</span>
                    <span className={`tabular-nums font-bold ${m.ch >= 0 ? "text-mint" : "text-down"}`}>
                      {m.ch >= 0 ? "▲" : "▼"}{toFa(Math.abs(m.ch).toFixed(2))}٪
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* قیمت اصلی */}
            <div className="mt-3 flex items-end justify-between gap-2">
              <div>
                <p className="text-[10.5px] text-mist">{meta.pair}</p>
                <p
                  key={`${Math.round(price * 10000)}`}
                  dir="ltr"
                  className={`font-display text-[30px] leading-none tabular-nums text-fog ${live ? (dir === "up" ? "flash-up" : "flash-down") : ""}`}
                >
                  {faPrice(price, meta.decimals)}
                </p>
              </div>
              <span className={`mb-1 rounded-full px-2.5 py-1 text-[11px] font-bold tabular-nums ${up ? "bg-mint/12 text-mint" : "bg-down/12 text-down"}`}>
                {up ? "▲" : "▼"} {toFa(Math.abs(change).toFixed(2))}٪
              </span>
            </div>

            {/* نمودار کندل‌های زنده */}
            <div className="mt-2.5 h-28 overflow-hidden rounded-xl border border-white/6 bg-abyss/60 p-1.5">
              <CandleChart candles={candles} className="h-full w-full" />
            </div>

            {/* خرید و فروش */}
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <span className="rounded-xl bg-mint/14 py-2.5 text-center text-[12.5px] font-extrabold text-mint ring-1 ring-mint/35">
                خرید / Buy
              </span>
              <span className="rounded-xl bg-down/12 py-2.5 text-center text-[12.5px] font-extrabold text-down ring-1 ring-down/35">
                فروش / Sell
              </span>
            </div>

            {/* پوزیشن‌ها */}
            <div className="mt-2.5 space-y-1.5">
              {meta.positions.map((pos) => (
                <div key={pos.pair} className="flex items-center justify-between rounded-xl border border-white/7 bg-white/3 px-3 py-2">
                  <div>
                    <p className="text-[10.5px] font-bold text-fog" dir="ltr">{pos.pair}</p>
                    <p className="text-[9px] text-mist">{pos.side}</p>
                  </div>
                  <span className={`text-[11px] font-extrabold tabular-nums ${pos.up ? "text-mint" : "text-down"}`} dir="ltr">
                    {pos.pnl}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-around rounded-2xl border border-white/8 bg-white/3 py-2.5">
              <span className="h-4 w-4 rounded" style={{ background: `${sys.accent}cc` }} />
              <span className="h-4 w-4 rounded-full bg-white/20" />
              <span className="h-4 w-4 rounded-lg bg-white/20" />
              <span className="h-4 w-4 rounded-sm bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* چیپ شناور */}
      <div
        className="anim-float absolute -right-14 top-16 hidden w-44 rounded-2xl border bg-abyss/95 p-3.5 shadow-[0_18px_45px_-15px_rgba(0,0,0,0.85)] backdrop-blur-md md:block"
        style={{ borderColor: `${sys.accent}4d` }}
      >
        <p className="flex items-center gap-2 text-[11px] font-bold text-fog">
          <span style={{ color: sys.accent }}>
            <IconSignal className="h-3.5 w-3.5" />
          </span>
          {meta.chipTitle}
        </p>
        <p className="mt-1.5 text-[10.5px] leading-5 text-mist">{meta.chipBody}</p>
        <span className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-[9.5px] font-bold" style={{ background: `${sys.accent}1c`, color: sys.accent }}>
          {meta.chipTag}
        </span>
      </div>
    </div>
  );
}

/* ---------- اسلاید هر سامانه ---------- */
function SlideContent({ sys, candles, dir, live, flip }: { sys: System; candles: Candle[]; dir: "up" | "down"; live: boolean; flip: boolean }) {
  const meta = META[sys.id];
  const price = candles[candles.length - 1].c;
  return (
    <div className={`grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-8 ${flip ? "lg:[direction:ltr]" : ""}`}>
      <div className={flip ? "lg:[direction:rtl]" : ""}>
        <p className="flex items-center gap-2 text-[12px] font-bold tracking-[0.18em] text-mist">
          <IconBolt className="h-3.5 w-3.5 text-mint" />
          ایران افیکس • هوشمندانه معامله کنید
        </p>
        <span
          className="mt-5 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[13.5px] font-bold"
          style={{ borderColor: `${sys.accent}55`, background: `${sys.accent}12`, color: sys.accent }}
        >
          <span className="live-dot h-2 w-2 rounded-full" style={{ background: sys.accent }} />
          {sys.name}
        </span>
        <h1 className="mt-5 font-display text-[40px] leading-[1.15] text-fog sm:text-[54px] lg:text-[62px]">
          {sys.assistant}
          <svg viewBox="0 0 320 20" className="mt-1 h-3.5 w-56 max-w-full" fill="none" aria-hidden>
            <path d="M4 14C60 6 150 4 316 10" stroke={sys.accent} strokeWidth="5" strokeLinecap="round" opacity="0.65" />
          </svg>
        </h1>
        <p className="mt-5 max-w-lg text-[15px] leading-8 text-mist">{sys.desc}</p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#download"
            className="shine group inline-flex items-center gap-2.5 rounded-full bg-fog px-7 py-3.5 text-[14.5px] font-extrabold text-ink shadow-[0_10px_40px_-10px_rgba(255,255,255,0.55)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <IconDownload className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
            دانلود اپلیکیشن
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[14.5px] font-bold transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: `${sys.accent}66`, color: sys.accent }}
          >
            ورود به سامانه
            <IconArrowLeft className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-9 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/4 px-5 py-3.5">
          <span className="text-[12px] text-mist">{meta.pair}</span>
          <b className="font-display text-[22px] leading-none tabular-nums text-fog" dir="ltr">
            {faPrice(price, meta.decimals)}
          </b>
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-mint">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-mint" />
            قیمت لحظه‌ای
          </span>
        </div>
      </div>

      <div className={flip ? "lg:[direction:rtl]" : ""}>
        <SysPhone sys={sys} candles={candles} dir={dir} live={live} />
      </div>
    </div>
  );
}

/* ---------- هرو اسکرول‌محور ---------- */
export default function HeroShowcase() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [series, setSeries] = useState<Record<string, Candle[]>>(initSeries);
  const [dirs, setDirs] = useState<Record<string, "up" | "down">>({ coin: "up", delta: "up", gold: "up" });
  const prevPrice = useRef<number>(META.coin.base);
  const tick = useRef(0);

  const panels = SYSTEMS.length;
  const active = Math.min(panels - 1, Math.floor(progress * panels));

  /* اسکرول آهسته‌تر: پیمایش بیشتر برای هر سامانه + مکث در پایان */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const scrollLen = el.offsetHeight - window.innerHeight;
        /* ۸۲٪ مسیر صرف سه سامانه می‌شود؛ بقیه، مکثِ قبل از ادامه صفحه */
        const effScroll = scrollLen * 0.82;
        const p = Math.min(1, Math.max(0, -rect.top / effScroll));
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* کندل‌های زنده فقط برای سامانه فعال */
  useEffect(() => {
    if (reduced) return;
    const sys = SYSTEMS[active];
    prevPrice.current = series[sys.id][series[sys.id].length - 1].c;
    const id = setInterval(() => {
      tick.current += 1;
      setSeries((prev) => {
        const arr = prev[sys.id].map((c) => ({ ...c }));
        const l = arr[arr.length - 1];
        const meta = META[sys.id];
        const move = (Math.random() - 0.47) * meta.vol * 1.7;
        l.c = +(l.c + move).toFixed(6);
        l.h = Math.max(l.h, l.c);
        l.l = Math.min(l.l, l.c);
        if (tick.current % 5 === 0) {
          const o = l.c;
          const c = o + (Math.random() - 0.47) * meta.vol * 1.7;
          arr.push({ o, c, h: Math.max(o, c) * 1.0004, l: Math.min(o, c) * 0.9996 });
          arr.shift();
        }
        setDirs((d) => ({ ...d, [sys.id]: l.c >= prevPrice.current ? "up" : "down" }));
        prevPrice.current = l.c;
        return { ...prev, [sys.id]: arr };
      });
    }, 1600);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduced]);

  if (reduced) {
    return (
      <section ref={ref} className="relative">
        {SYSTEMS.map((s, i) => (
          <div key={s.id} className="mx-auto flex min-h-screen max-w-7xl items-center px-5 py-16 lg:px-8">
            <SlideContent sys={s} candles={series[s.id]} dir="up" live={false} flip={i % 2 === 1} />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={ref} className="relative lg:h-[560vh]">
      {/* ---------- دسکتاپ: صحنه چسبان ---------- */}
      <div className="sticky top-0 hidden h-screen overflow-hidden lg:block">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[640px] w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-dusk/45 blur-[140px]" />
          <div
            className="absolute left-[12%] top-[16%] h-[420px] w-[420px] rounded-full blur-[120px] transition-colors duration-1000"
            style={{ background: SYSTEMS[active].accent, opacity: 0.09 }}
          />
        </div>

        {SYSTEMS.map((s, i) => {
          const d = progress * panels - i;
          const visible = Math.abs(d) < 1.02;
          const opacity = Math.max(0, 1 - Math.abs(d) * 1.18);
          return (
            <div
              key={s.id}
              aria-hidden={!visible}
              className="absolute inset-0 flex items-center transition-opacity duration-150"
              style={{
                opacity,
                transform: `translateX(${d * 7}%) scale(${1 - Math.abs(d) * 0.05})`,
                pointerEvents: visible ? "auto" : "none",
                zIndex: i === active ? 2 : 1,
                willChange: "transform, opacity",
              }}
            >
              <div className="mx-auto w-full max-w-7xl px-10">
                <SlideContent sys={s} candles={series[s.id]} dir={dirs[s.id]} live flip={i % 2 === 1} />
              </div>
            </div>
          );
        })}

        {/* ریل ناوبری سامانه‌ها */}
        <div className="absolute right-8 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-4">
          {SYSTEMS.map((s, i) => (
            <span key={s.id} className="flex items-center gap-3">
              <span
                className={`hidden text-[11.5px] font-bold transition-all duration-300 xl:block ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
                style={{ color: s.accent }}
              >
                {s.name.replace("سامانه ", "")}
              </span>
              <span
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  width: i === active ? 34 : 12,
                  background: i === active ? s.accent : "rgba(255,255,255,0.22)",
                  boxShadow: i === active ? `0 0 14px ${s.accent}88` : "none",
                }}
              />
            </span>
          ))}
          <span className="mt-2 font-display text-[15px] text-mist">
            {faNum(active + 1)}<span className="text-mist/60">/{faNum(3)}</span>
          </span>
        </div>

        {/* راهنمای اسکرول */}
        <div
          className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-500"
          style={{ opacity: progress < 0.05 ? 1 : 0 }}
        >
          <span className="text-[11.5px] font-bold tracking-[0.2em] text-mist">برای دیدن سامانه‌ها اسکرول کنید</span>
          <svg viewBox="0 0 24 38" className="h-9 w-6 text-mint" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="34" rx="10" />
            <circle cx="12" cy="11" r="2.6" fill="currentColor" stroke="none" className="anim-float" />
          </svg>
        </div>
      </div>

      {/* ---------- موبایل: جریان معمولی ---------- */}
      <div className="lg:hidden">
        {SYSTEMS.map((s, i) => (
          <div key={s.id} className="relative flex min-h-screen items-center overflow-hidden px-5 py-16">
            <div
              className="pointer-events-none absolute left-1/2 top-1/3 h-[380px] w-[380px] -translate-x-1/2 rounded-full blur-[110px]"
              style={{ background: s.accent, opacity: 0.1 }}
            />
            <div className="relative w-full">
              <Reveal>
                <SlideContent sys={s} candles={series[s.id]} dir={dirs[s.id]} live flip={false} />
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
