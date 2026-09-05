import { DOWNLOAD_PERKS } from "../lib/data";
import { Reveal, SectionHead } from "../lib/motion";
import { CandleChart, genCandles, QrPattern, Sparkline } from "./charts";
import {
  IconAndroid,
  IconApple,
  IconCheck,
  IconDownload,
  IconSignal,
  IconWindows,
} from "./icons";

const STATIC_CANDLES = genCandles(42, 22, 100, 4, 0.1);

function PhoneMock() {
  return (
    <div className="relative mx-auto w-[290px] sm:w-[315px]">
      {/* glow + ring */}
      <div className="pointer-events-none absolute -inset-10 -z-10">
        <div className="absolute inset-0 rounded-full bg-pine/25 blur-[70px]" />
      </div>
      <div className="pointer-events-none absolute -inset-6 -z-10 hidden items-center justify-center sm:flex">
        <div className="spin-slow h-[380px] w-[380px] rounded-full border border-dashed border-mint/20" />
      </div>

      <div className="relative rounded-[44px] border border-white/15 bg-abyss p-[10px] shadow-[0_50px_110px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(62,207,154,0.12)]">
        <div className="relative overflow-hidden rounded-[36px] border border-white/8 bg-ink">
          {/* notch */}
          <div className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-abyss" />

          <div className="px-4 pb-4 pt-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-display text-[15px] text-fog">ایران افیکس</span>
                <span className="rounded bg-mint/12 px-1.5 py-0.5 text-[9px] font-bold text-mint">PRO</span>
              </div>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/6 text-[11px] font-bold text-mist">ن</span>
            </div>

            <div className="mt-3 rounded-2xl border border-white/8 bg-white/3 p-3.5">
              <p className="text-[10px] text-mist">موجودی کل پرتفوی</p>
              <p className="font-display text-[24px] leading-tight text-fog" dir="ltr">
                $۱۲٬۴۵۰٫۸۰
              </p>
              <div className="mt-1 flex items-center justify-between">
                <span className="rounded-full bg-mint/12 px-2 py-0.5 text-[9.5px] font-bold text-mint">+۲٫۴٪ امروز</span>
                <div className="h-7 w-24">
                  <Sparkline data={[8, 10, 9, 12, 11, 14, 12, 15, 13, 17, 15, 19]} accent="#3ecf9a" className="h-full w-full" filled={false} />
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-white/8 bg-abyss/70 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-fog" dir="ltr">XAU/USD</span>
                <span className="text-[11px] tabular-nums text-mint" dir="ltr">۲٬۳۸۴٫۵۰</span>
              </div>
              <div className="mt-1.5 h-16">
                <CandleChart candles={STATIC_CANDLES} className="h-full w-full" />
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <span className="rounded-lg bg-mint/15 py-1.5 text-center text-[10.5px] font-extrabold text-mint">خرید</span>
                <span className="rounded-lg bg-down/12 py-1.5 text-center text-[10.5px] font-extrabold text-down">فروش</span>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {[
                { pair: "BTC/USDT", side: "خرید", pnl: "+۳٫۱٪", up: true },
                { pair: "EUR/USD", side: "فروش", pnl: "−۰٫۴٪", up: false },
              ].map((pos) => (
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

            <div className="mt-3.5 flex items-center justify-around rounded-2xl border border-white/8 bg-white/3 py-2.5">
              <span className="h-4 w-4 rounded bg-mint/70" />
              <span className="h-4 w-4 rounded-full bg-white/20" />
              <span className="h-4 w-4 rounded-lg bg-white/20" />
              <span className="h-4 w-4 rounded-sm bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* floating notifications */}
      <div className="anim-float absolute -right-16 top-16 hidden w-48 rounded-2xl border border-mint/30 bg-abyss/95 p-3.5 shadow-[0_18px_45px_-15px_rgba(0,0,0,0.85)] backdrop-blur-md md:block">
        <p className="flex items-center gap-2 text-[11px] font-bold text-fog">
          <IconSignal className="h-3.5 w-3.5 text-mint" />
          سیگنال جدید میکوبات
        </p>
        <p className="mt-1.5 text-[10.5px] leading-5 text-mist">
          خرید <bdo dir="ltr">BTC/USDT</bdo> در <bdo dir="ltr">۶۷٬۲۱۴</bdo>
        </p>
        <span className="mt-2 inline-block rounded-full bg-mint/12 px-2.5 py-0.5 text-[9.5px] font-bold text-mint">
          همین حالا
        </span>
      </div>
      <div className="anim-float-late absolute -left-14 bottom-24 hidden rounded-2xl border border-gold/30 bg-abyss/95 px-4 py-3 shadow-[0_18px_45px_-15px_rgba(0,0,0,0.85)] backdrop-blur-md md:block">
        <p className="font-display text-[22px] leading-none text-gold" dir="ltr">+۱۸٫۲٪</p>
        <p className="mt-1 text-[10px] text-mist">بازده این ماه سبد شما</p>
      </div>
    </div>
  );
}

export default function DownloadCta() {
  const buttons = [
    { icon: IconAndroid, title: "دانلود برای اندروید", sub: "APK مستقیم • ۳۸ مگابایت" },
    { icon: IconWindows, title: "نسخه ویندوز", sub: "x64 • نسخه ۴٫۲٫۰" },
    { icon: IconApple, title: "نسخه iOS", sub: "به‌زودی در اپ‌استور" },
  ];

  return (
    <section id="download" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="glass-deep relative overflow-hidden rounded-[32px] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          {/* inner ambience */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-[380px] w-[380px] rounded-full bg-dusk/50 blur-[110px]" />
          <div className="pointer-events-none absolute -bottom-28 right-[20%] h-[320px] w-[320px] rounded-full bg-pine/18 blur-[110px]" />
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />

          <div className="relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHead
                align="start"
                kicker="دانلود ایران افیکس"
                title={[
                  <>همیشه، همه‌جا،</>,
                  <>
                    در <span className="text-mint">جیب</span> شما
                  </>,
                ]}
                desc="نصب در کمتر از یک دقیقه؛ بازار، سیگنال ربات‌ها و حساب معاملاتی‌تان را همه‌جا همراه داشته باشید."
              />

              <Reveal delay={120}>
                <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
                  {DOWNLOAD_PERKS.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[13.5px] text-fog/85">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint/14 text-mint ring-1 ring-mint/35">
                        <IconCheck className="h-3.5 w-3.5" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-9 flex flex-wrap gap-3.5">
                  {buttons.map((b, i) => (
                    <a
                      key={b.title}
                      href="#top"
                      className={`group flex items-center gap-3.5 rounded-2xl px-5 py-3.5 transition-all duration-300 hover:-translate-y-1 active:scale-[0.97] ${
                        i === 0
                          ? "bg-fog text-ink shadow-[0_14px_40px_-12px_rgba(255,255,255,0.6)] hover:brightness-95"
                          : "border border-white/14 bg-white/4 text-fog hover:border-mint/50"
                      }`}
                    >
                      <b.icon className="h-6 w-6" />
                      <span className="leading-tight">
                        <span className="block text-[14px] font-extrabold">{b.title}</span>
                        <span className={`block text-[11px] ${i === 0 ? "text-ink/70" : "text-mist"}`}>{b.sub}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-8 flex items-center gap-5">
                  <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-abyss/80 p-3">
                    <QrPattern className="h-full w-full" />
                  </span>
                  <p className="max-w-[240px] text-[12.5px] leading-6 text-mist">
                    دوربین گوشی را روی کد بگیرید تا نسخه اندروید را <b className="text-fog">مستقیم و بدون فیلتر</b> دانلود کنید.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className="relative">
              <PhoneMock />
            </Reveal>
          </div>

          <div className="relative mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-8">
            <p className="flex items-center gap-2.5 text-[13px] text-mist">
              <IconDownload className="h-5 w-5 text-mint" />
              بیش از <b className="text-fog">۲۸٬۵۰۰ نصب فعال</b> روی اندروید و ویندوز
            </p>
            <div className="flex items-center gap-2 text-[13px] text-mist">
              <span className="text-gold">★★★★★</span>
              امتیاز <b className="text-fog" dir="ltr">۴٫۸</b> از ۵ — بر اساس ۶٬۲۰۰ نظر
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
