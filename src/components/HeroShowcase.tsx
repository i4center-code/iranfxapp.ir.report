import { useEffect, useRef, useState } from "react";
import { SYSTEMS, type System } from "../lib/data";
import { faNum, faPrice, toFa } from "../lib/format";
import { useI18n } from "../lib/i18n";
import { useCountUp, useInView, usePrefersReducedMotion } from "../lib/motion";
import { CandleChart, genCandles, type Candle } from "./charts";
import { IconArrowLeft, IconBolt, IconDownload, IconSignal } from "./icons";

/* ---------- قیمت‌های زنده موکاپ‌ها ---------- */
function useLivePrices(enabled: boolean) {
  const [, force] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => force((v) => v + 1), 1600);
    return () => clearInterval(id);
  }, [enabled]);
}

const META: Record<
  string,
  {
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
  }
> = {
  coin: {
    pair: "BTC / USDT",
    base: 67240,
    vol: 620,
    decimals: 0,
    drift: 0.06,
    mini: [
      { p: "BTC", pr: "۶۷٬۲۴۰", ch: 1.87 },
      { p: "ETH", pr: "۳٬۵۱۲", ch: -0.64 },
      { p: "SOL", pr: "۱۴۸٫۷", ch: 3.2 },
      { p: "BNB", pr: "۵۹۲٫۴", ch: 0.44 },
      { p: "XRP", pr: "۰٫۵۲۸", ch: -1.15 },
      { p: "ADA", pr: "۰٫۴۵۲", ch: 0.82 },
      { p: "DOGE", pr: "۰٫۱۲۴", ch: 2.1 },
    ],
    positions: [
      { pair: "BTC/USDT", side: "خرید", pnl: "+۳٫۱٪", up: true },
      { pair: "ETH/USDT", side: "فروش", pnl: "−۰٫۸٪", up: false },
    ],
    chipTitle: "سیگنال میکوبات",
    chipBody: "خرید BTC/USDT در ۶۷٬۲۱۴",
    chipTag: "همین حالا",
  },
  delta: {
    pair: "EUR / USD",
    base: 1.0842,
    vol: 0.0014,
    decimals: 4,
    drift: 0.02,
    mini: [
      { p: "EURUSD", pr: "۱٫۰۸۴۲", ch: 0.11 },
      { p: "GBPUSD", pr: "۱٫۲۷۰۵", ch: -0.23 },
      { p: "USDJPY", pr: "۱۵۷٫۳۲", ch: 0.35 },
      { p: "XAUUSD", pr: "۲٬۳۸۴", ch: 0.42 },
      { p: "US30", pr: "۳۹٬۱۱۲", ch: 0.27 },
      { p: "NAS100", pr: "۱۸٬۴۵۰", ch: 0.91 },
      { p: "USOIL", pr: "۸۳٫۶", ch: -0.52 },
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
      { p: "مثقال ۱۸", pr: "۵٬۹۴۲٬۰۰۰", ch: 0.65 },
      { p: "گرم ۱۸", pr: "۱٬۳۷۱٬۰۰۰", ch: 0.58 },
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

function useLiveCandles(enabled: boolean) {
  const [series, setSeries] = useState<Record<string, Candle[]>>(initSeries);
  const [dir, setDir] = useState<"up" | "down">("up");
  const tick = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => {
      tick.current += 1;
      setSeries((prev) => {
        const next: Record<string, Candle[]> = {};
        for (const key of Object.keys(prev)) {
          const arr = prev[key].map((c) => ({ ...c }));
          const l = arr[arr.length - 1];
          const meta = META[key];
          const move = (Math.random() - 0.47) * meta.vol * 1.8;
          l.c = +(l.c + move).toFixed(6);
          l.h = Math.max(l.h, l.c);
          l.l = Math.min(l.l, l.c);
          if (tick.current % 4 === 0) {
            const o = l.c;
            const c = o + (Math.random() - 0.47) * meta.vol * 1.8;
            arr.push({ o, c, h: Math.max(o, c) * 1.0006, l: Math.min(o, c) * 0.9994 });
            arr.shift();
          }
          setDir(l.c >= l.o ? "up" : "down");
          next[key] = arr;
        }
        return next;
      });
    }, 1600);
    return () => clearInterval(id);
  }, [enabled]);

  return { series, dir };
}

/* ---------- موکاپ موبایل هر سامانه ---------- */
function SysPhone({ sys, candles, dir, live }: { sys: System; candles: Candle[]; dir: "up" | "down"; live: boolean }) {
  const { t, loc } = useI18n();
  const meta = META[sys.id];
  const price = candles[candles.length - 1].c;
  const change = ((price - candles[0].o) / candles[0].o) * 100;
  const up = change >= 0;

  return (
    <div className="relative mx-auto w-[248px] sm:w-[300px] lg:w-[320px]">
      <div className="pointer-events-none absolute -inset-14 -z-10 rounded-full opacity-25 blur-[85px]" style={{ background: sys.accent }} />
      <div className="pointer-events-none absolute -inset-7 -z-10 hidden items-center justify-center sm:flex">
        <div className="spin-slow h-[400px] w-[400px] rounded-full border border-dashed" style={{ borderColor: `${sys.accent}33` }} />
      </div>

      <div
        className="relative rounded-[40px] border border-white/15 bg-abyss p-[9px] shadow-[0_50px_110px_-30px_rgba(0,0,0,0.9)]"
        style={{ boxShadow: `0 50px 110px -30px rgba(0,0,0,0.9), 0 0 0 1px ${sys.accent}1f` }}
      >
        <div className="relative overflow-hidden rounded-[32px] border border-white/8 bg-ink">
          <div className="absolute left-1/2 top-2 z-10 h-4.5 w-20 -translate-x-1/2 rounded-full bg-abyss" />

          <div className="px-3.5 pb-3.5 pt-9 sm:px-4 sm:pb-4 sm:pt-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-display text-[14px] text-fog">
                  {t(`hero.${sys.id}.short`, sys.name.replace("سامانه ", ""))}
                </span>
                <span className="rounded px-1.5 py-0.5 text-[9px] font-bold" style={{ background: `${sys.accent}1f`, color: sys.accent }}>
                  PRO
                </span>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-mint/10 px-2.5 py-1 text-[10px] font-bold text-mint">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-mint" />
                {t("hero.live", "زنده")}
              </span>
            </div>

            {/* تیکر متحرک قیمت‌ها */}
            <div className="ticker-shell mt-2.5 overflow-hidden rounded-xl border border-white/8 bg-abyss/80">
              <div className="ticker-track items-center gap-7 py-2" style={{ "--ticker-speed": "26s" } as React.CSSProperties}>
                {[...meta.mini, ...meta.mini, ...meta.mini].map((m, i) => {
                  const label =
                    sys.id === "gold" ? t(`hero.gold.m${(i % meta.mini.length) + 1}`, m.p) : m.p;
                  return (
                    <span key={i} className="flex shrink-0 items-center gap-1.5 text-[10.5px]" dir="ltr">
                      <b className="text-fog/90">{label}</b>
                      <span className="tabular-nums text-mist">{loc(m.pr)}</span>
                      <span className={`tabular-nums font-bold ${m.ch >= 0 ? "text-mint" : "text-down"}`}>
                        {m.ch >= 0 ? "▲" : "▼"}
                        {loc(`${Math.abs(m.ch).toFixed(2)}%`)}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* قیمت اصلی */}
            <div className="mt-2.5 flex items-end justify-between gap-2">
              <div>
                <p className="text-[10px] text-mist">
                  {sys.id === "gold" ? t("hero.gold.pair", meta.pair) : meta.pair}
                </p>
                <p
                  key={`${Math.round(price * 10000)}`}
                  dir="ltr"
                  className={`font-display text-[26px] leading-none tabular-nums text-fog sm:text-[30px] ${
                    live ? (dir === "up" ? "flash-up" : "flash-down") : ""
                  }`}
                >
                  {loc(faPrice(price, meta.decimals))}
                </p>
              </div>
              <span className={`mb-1 rounded-full px-2.5 py-1 text-[11px] font-bold tabular-nums ${up ? "bg-mint/12 text-mint" : "bg-down/12 text-down"}`}>
                {up ? "▲" : "▼"} {loc(`${Math.abs(change).toFixed(2)}%`)}
              </span>
            </div>

            {/* نمودار کندل‌های زنده */}
            <div className="mt-2 h-[76px] overflow-hidden rounded-xl border border-white/6 bg-abyss/60 p-1.5 sm:h-28">
              <CandleChart candles={candles} className="h-full w-full" />
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <span className="rounded-xl bg-mint/14 py-2 text-center text-[11.5px] font-extrabold text-mint ring-1 ring-mint/35 sm:py-2.5 sm:text-[12.5px]">
                {t("hero.buy", "خرید / Buy")}
              </span>
              <span className="rounded-xl bg-down/12 py-2 text-center text-[11.5px] font-extrabold text-down ring-1 ring-down/35 sm:py-2.5 sm:text-[12.5px]">
                {t("hero.sell", "فروش / Sell")}
              </span>
            </div>

            <div className="mt-2 space-y-1.5">
              {meta.positions.map((pos) => {
                const pairLabel =
                  pos.pair === "طلای آبشده"
                    ? t("hero.gold.p1", pos.pair)
                    : pos.pair === "انس جهانی"
                      ? t("hero.gold.p2", pos.pair)
                      : pos.pair;
                return (
                <div key={pos.pair} className="flex items-center justify-between rounded-xl border border-white/7 bg-white/3 px-3 py-1.5 sm:py-2">
                  <div>
                    <p className="text-[10.5px] font-bold text-fog" dir="ltr">
                      {pairLabel}
                    </p>
                    <p className="text-[9px] text-mist">
                      {pos.side === "خرید" ? t("svc.buySide", pos.side) : t("svc.sellSide", pos.side)}
                    </p>
                  </div>
                  <span className={`text-[11px] font-extrabold tabular-nums ${pos.up ? "text-mint" : "text-down"}`} dir="ltr">
                    {loc(pos.pnl)}
                  </span>
                </div>
                );
              })}
            </div>

            <div className="mt-2.5 flex items-center justify-around rounded-2xl border border-white/8 bg-white/3 py-2">
              <span className="h-3.5 w-3.5 rounded" style={{ background: `${sys.accent}cc` }} />
              <span className="h-3.5 w-3.5 rounded-full bg-white/20" />
              <span className="h-3.5 w-3.5 rounded-lg bg-white/20" />
              <span className="h-3.5 w-3.5 rounded-sm bg-white/20" />
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
          {t(`hero.${sys.id}.chipT`, meta.chipTitle)}
        </p>
        <p className="mt-1.5 text-[10.5px] leading-5 text-mist">{t(`hero.${sys.id}.chipB`, meta.chipBody)}</p>
        <span className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-[9.5px] font-bold" style={{ background: `${sys.accent}1c`, color: sys.accent }}>
          {t(`hero.${sys.id}.chipG`, meta.chipTag)}
        </span>
      </div>
    </div>
  );
}

/* ---------- اسلاید هر سامانه ---------- */
function SlideContent({ sys, candles, dir, live, flip }: { sys: System; candles: Candle[]; dir: "up" | "down"; live: boolean; flip: boolean }) {
  const { t, loc } = useI18n();
  const meta = META[sys.id];
  const price = candles[candles.length - 1].c;
  return (
    <div className={`grid w-full items-center gap-6 lg:grid-cols-2 lg:gap-12 ${flip ? "lg:[direction:ltr]" : ""}`}>
      <div className={flip ? "lg:[direction:rtl]" : ""}>
        <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] text-mist sm:text-[12px]">
          <IconBolt className="h-3.5 w-3.5 text-mint" />
          {t("hero.kicker", "ایران افیکس • هوشمندانه معامله کنید")}
        </p>
        <span
          className="mt-3 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-[12.5px] font-bold sm:mt-5 sm:py-2 sm:text-[13.5px]"
          style={{ borderColor: `${sys.accent}55`, background: `${sys.accent}12`, color: sys.accent }}
        >
          <span className="live-dot h-2 w-2 rounded-full" style={{ background: sys.accent }} />
          {t(`hero.${sys.id}.name`, sys.name)}
        </span>
        <h1 className="mt-3 font-display text-[34px] leading-[1.15] text-fog sm:mt-5 sm:text-[54px] lg:text-[60px]">
          {t(`hero.${sys.id}.assistant`, sys.assistant)}
          <svg viewBox="0 0 320 20" className="mt-1 h-3.5 w-52 max-w-full sm:w-56" fill="none" aria-hidden>
            <path d="M4 14C60 6 150 4 316 10" stroke={sys.accent} strokeWidth="5" strokeLinecap="round" opacity="0.65" />
          </svg>
        </h1>
        <p className="mt-3 max-w-lg text-[13px] leading-6 text-mist sm:mt-5 sm:text-[15px] sm:leading-8">
          {t(`hero.${sys.id}.desc`, sys.desc)}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
          <a
            href="#download"
            className="shine group inline-flex items-center gap-2.5 rounded-full bg-paper px-5 py-3 text-[13px] font-extrabold text-ink shadow-[0_10px_40px_-10px_rgba(255,255,255,0.55)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] sm:px-7 sm:py-3.5 sm:text-[14.5px]"
          >
            <IconDownload className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-y-0.5 sm:h-5 sm:w-5" />
            {t("hero.btnApp", "دانلود اپلیکیشن")}
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[13px] font-bold transition-all duration-300 hover:-translate-y-0.5 sm:px-7 sm:py-3.5 sm:text-[14.5px]"
            style={{ borderColor: `${sys.accent}66`, color: sys.accent }}
          >
            {t("hero.btnEnter", "ورود به سامانه")}
            <IconArrowLeft className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-4 py-2.5 sm:mt-9 sm:gap-4 sm:px-5 sm:py-3.5">
          <span className="text-[11px] text-mist sm:text-[12px]">
            {sys.id === "gold" ? t("hero.gold.pair", meta.pair) : meta.pair}
          </span>
          <b className="font-display text-[19px] leading-none tabular-nums text-fog sm:text-[22px]" dir="ltr">
            {loc(faPrice(price, meta.decimals))}
          </b>
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-mint sm:text-[11px]">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-mint" />
            {t("hero.realtime", "قیمت لحظه‌ای")}
          </span>
        </div>
      </div>

      <div className={flip ? "lg:[direction:rtl]" : ""}>
        <SysPhone sys={sys} candles={candles} dir={dir} live={live} />
      </div>
    </div>
  );
}

/* ---------- اسلاید معرفی ---------- */
function IntroSlide() {
  const { t, loc } = useI18n();
  const [statsRef, statsIn] = useInView<HTMLDivElement>();
  const traders = useCountUp(28500, statsIn);
  const signals = useCountUp(1240, statsIn);
  const sat = useCountUp(96, statsIn);

  return (
    <div className="flex w-full flex-col items-center text-center">
      <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/4 px-4 py-2 text-[12px] font-bold text-mist sm:text-[13px]">
        <span className="live-dot h-2 w-2 rounded-full bg-mint" />
        {t("hero.introTag", "اکوسیستم معاملاتی ایرانی‌ها")}
      </span>
      <h1 className="mt-6 font-display leading-[1.06]">
        <span className="block text-[46px] text-fog sm:text-[72px] lg:text-[88px]">{t("hero.introT1", "هوشمندانه")}</span>
        <span className="relative block text-[46px] text-mint sm:text-[72px] lg:text-[88px]">
          {t("hero.introT2", "معامله کنید")}
          <svg viewBox="0 0 320 20" className="absolute -bottom-2 right-1/2 h-3.5 w-[70%] translate-x-1/2 text-foam sm:-bottom-4" fill="none" aria-hidden>
            <path d="M4 14C60 6 150 4 316 10" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
          </svg>
        </span>
      </h1>
      <p className="mt-6 max-w-2xl text-[14px] leading-7 text-mist sm:text-[15.5px] sm:leading-8">
        {t("hero.introDesc", "سه سامانه تخصصی برای طلا، رمزارز و فارکس؛ با ربات‌های سیگنال‌ده، تحلیل زنده و پشتیبانی ۲۴ ساعته.")}
      </p>
      <div ref={statsRef} className="mt-9 grid grid-cols-3 gap-4 sm:gap-10">
        {[
          { v: traders, suffix: "+", label: t("hero.statTraders", "معامله‌گر فعال") },
          { v: signals, suffix: "", label: t("hero.statSignals", "سیگنال در ماه") },
          { v: sat, suffix: "٪", label: t("hero.statSat", "رضایت کاربران") },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center">
            <span className="font-display text-[26px] leading-none text-fog sm:text-[38px]">
              {loc(faNum(s.v))}
              <span className="text-mint">{loc(s.suffix)}</span>
            </span>
            <span className="mt-2 text-[11px] font-medium text-mist sm:text-[12.5px]">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-9 flex items-center gap-3 text-mint">
        <span className="animate-bounce text-[12.5px] font-bold">{t("hero.scroll", "اسکرول کنید")}</span>
        <svg viewBox="0 0 24 40" className="h-9 w-6 text-mint/80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <rect x="2" y="2" width="20" height="36" rx="10" opacity="0.5" />
          <path d="M12 10v7" className="animate-pulse" />
        </svg>
      </div>
    </div>
  );
}

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* ---------- هرو اسکرول‌محور (دسکتاپ و موبایل) ---------- */
export default function HeroShowcase() {
  const reduced = usePrefersReducedMotion();
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(true);
  const { series, dir } = useLiveCandles(inView && !reduced);

  const panels = SYSTEMS.length;
  const usable = 0.82;
  const slideFloat = clamp01(progress / usable) * panels;
  const active = Math.max(0, Math.min(panels - 1, Math.floor(slideFloat)));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const max = rect.height - window.innerHeight;
        const p = max > 0 ? clamp01(-rect.top / max) : 0;
        setProgress(p);
        setInView(rect.bottom > 0 && rect.top < window.innerHeight);
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
  }, []);

  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const max = rect.height - window.innerHeight;
    const target = (usable * i) / panels;
    window.scrollTo({ top: window.scrollY + rect.top + target * max, behavior: reduced ? "auto" : "smooth" });
  };

  const slides = [
    {
      key: "intro",
      node: <IntroSlide />,
    },
    ...SYSTEMS.map((s) => ({
      key: s.id,
      node: (
        <SlideContent sys={s} candles={series[s.id]} dir={dir} live={inView && !reduced} flip={s.id === "delta"} />
      ),
    })),
  ];

  return (
    <section id="top" ref={ref} className="relative h-[400vh] lg:h-[560vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* هاله‌های پویا */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/4 h-[540px] w-[760px] -translate-x-1/2 rounded-full blur-[150px] transition-colors duration-700"
          style={{ background: SYSTEMS[active]?.accent, opacity: 0.13 }}
        />
        <div className="pointer-events-none absolute -right-40 top-1/3 h-[480px] w-[480px] rounded-full bg-dusk/45 blur-[130px]" />
        <div className="bg-grid pointer-events-none absolute inset-0" />

        <div className="relative mx-auto h-full w-full max-w-7xl px-5 pb-16 pt-24 lg:px-8 lg:pb-8 lg:pt-10">
          {slides.map((s, i) => {
            const dist = slideFloat - i;
            const enter = i === 0 ? 1 : clamp01(dist + 1);
            const exit = easeOutCubic(clamp01(dist));
            const opacity = enter * (1 - exit);
            return (
              <div
                key={s.key}
                className="absolute inset-0 flex w-full items-center"
                style={{
                  opacity,
                  transform: `translateY(${(1 - enter) * 6 - exit * 6}vh)`,
                  visibility: opacity > 0.02 ? "visible" : "hidden",
                  pointerEvents: opacity > 0.5 ? "auto" : "none",
                }}
                aria-hidden={opacity < 0.5}
              >
                {s.node}
              </div>
            );
          })}
        </div>

        {/* ریل ناوبری دسکتاپ */}
        <div className="absolute right-7 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
          {SYSTEMS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => jumpTo(i + 1)}
              aria-label={t(`hero.${s.id}.name`, s.name)}
              className="group flex flex-col items-center gap-1.5"
            >
              <span
                className="h-2.5 w-2.5 rounded-full transition-all duration-500 group-hover:scale-125"
                style={{
                  background: active === i ? s.accent : "rgba(255,255,255,0.22)",
                  boxShadow: active === i ? `0 0 16px ${s.accent}` : "none",
                  transform: active === i ? "scale(1.45)" : undefined,
                }}
              />
              <span
                className={`text-[10.5px] font-bold transition-all duration-300 ${
                  active === i ? "opacity-100" : "opacity-40 group-hover:opacity-80"
                }`}
                style={{ color: active === i ? s.accent : "#9aa3b8" }}
              >
                {t(`hero.${s.id}.short`, s.name.replace("سامانه ", ""))}
              </span>
            </button>
          ))}
        </div>

        {/* نقطه‌های موبایل */}
        <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-2.5 lg:hidden">
          {SYSTEMS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => jumpTo(i + 1)}
              aria-label={t(`hero.${s.id}.name`, s.name)}
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: active === i ? 26 : 8,
                background: active === i ? s.accent : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>

        {/* شمارنده اسلاید */}
        <div className="absolute bottom-5 left-8 z-20 hidden items-center gap-2 text-[12px] font-bold text-mist lg:flex" dir="ltr">
          <span className="font-display text-[20px] leading-none text-fog">{String(active + 1).padStart(2, "0")}</span>
          <span className="opacity-60">/ {String(panels).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
