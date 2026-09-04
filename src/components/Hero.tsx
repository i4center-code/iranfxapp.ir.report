import { useEffect, useRef, useState } from "react";
import { TRUST_POINTS } from "../lib/data";
import { faNum, faPrice, toFa } from "../lib/format";
import { MaskHeading, Reveal, useCountUp, useInView, usePrefersReducedMotion } from "../lib/motion";
import { CandleChart, genCandles, type Candle } from "./charts";
import { IconBolt, IconSignal, TrustIcon } from "./icons";
import Platforms from "./Platforms";

const TABS = {
  XAUUSD: { label: "XAU/USD", name: "انس طلا", decimals: 2 },
  BTCUSDT: { label: "BTC/USDT", name: "بیت‌کوین", decimals: 0 },
  EURUSD: { label: "EUR/USD", name: "یورو/دلار", decimals: 4 },
} as const;

type TabKey = keyof typeof TABS;

const INIT_SERIES: Record<TabKey, Candle[]> = {
  XAUUSD: genCandles(7, 32, 2358, 6.5, 0.07),
  BTCUSDT: genCandles(9, 32, 66400, 850, 0.05),
  EURUSD: genCandles(13, 32, 1.0812, 0.0016, 0.02),
};
const VOLS: Record<TabKey, number> = { XAUUSD: 3.4, BTCUSDT: 420, EURUSD: 0.0009 };

function Stat({ value, suffix, label, decimals = 0 }: { value: number; suffix?: string; label: string; decimals?: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const n = useCountUp(value, inView);
  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-display text-[34px] leading-none text-fog sm:text-[40px]">
        {decimals ? toFa(n.toFixed(decimals)) : faNum(n)}
        {suffix && <span className="text-mint">{suffix}</span>}
      </span>
      <span className="mt-2 text-[12.5px] font-medium text-mist">{label}</span>
    </div>
  );
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const [tab, setTab] = useState<TabKey>("XAUUSD");
  const [series, setSeries] = useState<Record<TabKey, Candle[]>>(INIT_SERIES);
  const [dir, setDir] = useState<"up" | "down">("up");
  const prevPrice = useRef<number>(INIT_SERIES.XAUUSD[INIT_SERIES.XAUUSD.length - 1].c);
  const tick = useRef(0);

  const candles = series[tab];
  const last = candles[candles.length - 1];
  const price = last.c;
  const change = ((price - candles[0].o) / candles[0].o) * 100;

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      tick.current += 1;
      setSeries((prev) => {
        const arr = prev[tab].map((c) => ({ ...c }));
        const l = arr[arr.length - 1];
        const move = (Math.random() - 0.47) * VOLS[tab] * 1.7;
        l.c = +(l.c + move).toFixed(5);
        l.h = Math.max(l.h, l.c);
        l.l = Math.min(l.l, l.c);
        if (tick.current % 5 === 0) {
          const o = l.c;
          const c = o + (Math.random() - 0.47) * VOLS[tab] * 1.7;
          arr.push({ o, c, h: Math.max(o, c) * 1.0004, l: Math.min(o, c) * 0.9996 });
          arr.shift();
        }
        setDir(l.c >= prevPrice.current ? "up" : "down");
        prevPrice.current = l.c;
        return { ...prev, [tab]: arr };
      });
    }, 1700);
    return () => clearInterval(id);
  }, [tab, reduced]);

  const onTabChange = (k: TabKey) => {
    setTab(k);
    prevPrice.current = series[k][series[k].length - 1].c;
  };

  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-40 left-[8%] h-[420px] w-[420px] rounded-full bg-pine/22 blur-[130px]" />
      <div className="pointer-events-none absolute -top-24 right-[4%] h-[340px] w-[340px] rounded-full bg-mint/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-[55%] left-[-6%] h-[300px] w-[300px] rounded-full bg-gold/7 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-10 lg:px-8 lg:pt-16">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* ------- copy ------- */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/4 px-4 py-2 text-[13px] font-medium text-mist">
                <span className="live-dot h-2 w-2 rounded-full bg-mint" />
                بازارهای جهانی، به سبک ایرانی
                <IconBolt className="h-4 w-4 text-gold" />
              </span>
            </Reveal>

            <h1 className="mt-7 font-display leading-[1.08]">
              <MaskHeading
                stagger={160}
                lines={[
                  <span key="a" className="block text-[56px] text-fog sm:text-[76px] lg:text-[86px]">
                    هوشمندانه
                  </span>,
                  <span key="b" className="relative block text-[56px] text-mint sm:text-[76px] lg:text-[86px]">
                    معامله کنید
                    <svg
                      viewBox="0 0 320 20"
                      className="absolute -bottom-3 right-1 h-4 w-[72%] text-foam sm:-bottom-4"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M4 14C60 6 150 4 316 10"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                        opacity="0.7"
                      />
                    </svg>
                  </span>,
                ]}
              />
            </h1>

            <Reveal delay={250}>
              <p className="mt-8 max-w-xl text-[15.5px] leading-8 text-mist">
                از <b className="text-gold">انس طلا</b> تا <b className="text-ember">رمزارزها</b> و{" "}
                <b className="text-skyx">جفت‌ارزهای فارکس</b>؛ با سه پلتفرم تخصصی، ربات‌های سیگنال‌ده و
                آکادمی آموزشی ایران افیکس، مسیر حرفه‌ای شدن را کوتاه‌تر کنید.
              </p>
            </Reveal>

            <Reveal delay={350} className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#plans"
                className="shine group inline-flex items-center gap-2.5 rounded-full bg-fog px-7 py-3.5 text-[15px] font-extrabold text-ink shadow-[0_10px_40px_-10px_rgba(255,255,255,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-10px_rgba(255,255,255,0.75)] active:scale-[0.97]"
              >
                <IconBolt className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                دریافت اشتراک رایگان
              </a>
              <a
                href="#platforms"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-[15px] font-bold text-fog transition-all duration-300 hover:border-mint/60 hover:text-mint"
              >
                <IconSignal className="h-4.5 w-4.5" />
                مشاهده پلتفرم‌ها
              </a>
            </Reveal>

            <Reveal delay={450} className="mt-12">
              <div className="grid max-w-lg grid-cols-3 gap-6">
                <Stat value={28500} suffix="+" label="معامله‌گر فعال" />
                <Stat value={1240} label="سیگنال در ماه" />
                <Stat value={96} suffix="٪" label="رضایت کاربران" />
              </div>
            </Reveal>
          </div>

          {/* ------- live terminal ------- */}
          <div className="lg:col-span-6">
            <Reveal delay={200} className="relative">
              {/* orbit ring */}
              <div className="pointer-events-none absolute -inset-8 hidden items-center justify-center lg:flex">
                <div className="spin-slow h-[520px] w-[520px] rounded-full border border-dashed border-mint/15" />
              </div>

              <div className="glass-deep relative rounded-[26px] p-5 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-abyss/70 p-1.5">
                    {(Object.keys(TABS) as TabKey[]).map((k) => (
                      <button
                        key={k}
                        onClick={() => onTabChange(k)}
                        className={`rounded-full px-3.5 py-1.5 text-[12px] font-bold transition-all duration-300 sm:px-4 ${
                          tab === k ? "bg-mint text-abyss shadow-[0_4px_18px_-4px_rgba(62,207,154,0.7)]" : "text-mist hover:text-fog"
                        }`}
                        dir="ltr"
                      >
                        {TABS[k].label}
                      </button>
                    ))}
                  </div>
                  <span className="flex items-center gap-2 rounded-full bg-mint/10 px-3 py-1.5 text-[11.5px] font-bold text-mint">
                    <span className="live-dot h-1.5 w-1.5 rounded-full bg-mint" />
                    بازار زنده
                  </span>
                </div>

                <div className="mt-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-medium text-mist">{TABS[tab].name}</p>
                    <p
                      key={`${tab}-${price}`}
                      className={`font-display text-[38px] leading-none tabular-nums text-fog sm:text-[44px] ${
                        dir === "up" ? "flash-up" : "flash-down"
                      }`}
                      dir="ltr"
                    >
                      {faPrice(price, TABS[tab].decimals)}
                    </p>
                  </div>
                  <span
                    className={`mb-1 rounded-full px-3 py-1.5 text-[13px] font-bold tabular-nums ${
                      change >= 0 ? "bg-mint/12 text-mint" : "bg-down/12 text-down"
                    }`}
                  >
                    {change >= 0 ? "▲" : "▼"} {toFa(Math.abs(change).toFixed(2))}٪
                  </span>
                </div>

                <div className="mt-4 h-[190px] overflow-hidden rounded-xl border border-white/6 bg-abyss/50 p-2 sm:h-[220px]">
                  <CandleChart candles={candles} animateKey={tab} className="h-full w-full" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button className="rounded-xl bg-fog py-3 text-[14.5px] font-extrabold text-ink ring-1 ring-white/60 transition-all duration-300 hover:brightness-95 active:scale-[0.97]">
                    خرید / Buy
                  </button>
                  <button className="rounded-xl bg-down/12 py-3 text-[14.5px] font-extrabold text-down ring-1 ring-down/35 transition-all duration-300 hover:bg-down hover:text-abyss active:scale-[0.97]">
                    فروش / Sell
                  </button>
                </div>
              </div>

              {/* floating chips */}
              <div className="anim-float absolute -right-3 -top-6 hidden items-center gap-2.5 rounded-2xl border border-mint/30 bg-abyss/90 px-4 py-3 shadow-[0_18px_45px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md sm:flex lg:-right-8">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint/15">
                  <IconSignal className="h-4.5 w-4.5 text-mint" />
                </span>
                <span className="text-[12.5px] leading-5">
                  <b className="block text-fog">سیگنال اُروبات</b>
                  <span className="text-mint">خرید XAU/USD ✓</span>
                </span>
              </div>
              <div className="anim-float-late absolute -bottom-6 -left-2 hidden items-center gap-2.5 rounded-2xl border border-gold/30 bg-abyss/90 px-4 py-3 shadow-[0_18px_45px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md sm:flex lg:-left-8">
                <span className="font-display text-[26px] leading-none text-gold" dir="ltr">
                  +۲٫۴٪
                </span>
                <span className="text-[12px] leading-5 text-mist">
                  بازده این هفته
                  <b className="block text-fog">سبد طلای شما</b>
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* trust band */}
        <Reveal delay={150} className="mt-16 lg:mt-20">
          <div className="glass flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-[20px] px-6 py-5 lg:justify-between">
            {TRUST_POINTS.map((t, i) => (
              <span key={t.icon} className="group flex items-center gap-3">
                {i > 0 && <span className="hidden h-8 w-px bg-white/10 lg:block" style={{ marginLeft: "-16px" }} />}
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/10 text-mint transition-transform duration-300 group-hover:-translate-y-1">
                  <TrustIcon name={t.icon} className="h-5.5 w-5.5" />
                </span>
                <span className="text-[13.5px] font-semibold text-fog/90">{t.label}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {/* scrollable platform showcase — بخشی از هیرو */}
      <div className="relative mt-20 lg:mt-24">
        <Platforms />
      </div>
    </section>
  );
}
