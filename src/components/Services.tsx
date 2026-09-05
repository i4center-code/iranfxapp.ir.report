import { useEffect, useState } from "react";
import { useCart } from "../lib/cart";
import {
  productFromRobot,
  ROBOTS,
  SERVICE_TILES,
  SERVICES_INTRO,
  SIGNAL_POOL,
  type Robot,
  type Side,
} from "../lib/data";
import { faTime } from "../lib/format";
import { Reveal, SectionHead, useInView, usePrefersReducedMotion } from "../lib/motion";
import { IconCart, RobotMicrobot, RobotOrobat, RobotYuz } from "./icons";

const AVATARS: Record<string, (p: { className?: string }) => React.ReactElement> = {
  microbot: RobotMicrobot,
  orobat: RobotOrobat,
  yuz: RobotYuz,
};

function WinBar({ value, accent, start }: { value: number; accent: string; start: boolean }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
      <div
        className="h-full rounded-full transition-[width] duration-[1400ms] ease-out"
        style={{ width: start ? `${value}%` : "0%", background: `linear-gradient(90deg, ${accent}88, ${accent})` }}
      />
    </div>
  );
}

function RobotCard({ robot, index }: { robot: Robot; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const { addToCart, openPurchase } = useCart();
  const Avatar = AVATARS[robot.id];
  return (
    <Reveal delay={index * 120}>
      <div ref={ref} className="group glass relative h-full overflow-hidden rounded-[22px] p-6 transition-all duration-500 hover:-translate-y-2">
        <div
          className="pointer-events-none absolute -top-20 right-[-20%] h-44 w-44 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
          style={{ background: robot.accent }}
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div
            className="scan-line absolute inset-x-4 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${robot.accent}, transparent)`, boxShadow: `0 0 14px 2px ${robot.accent}66` }}
          />
        </div>

        <div className="relative">
          <div className="flex items-start justify-between">
            <span
              className="relative flex h-24 w-24 items-center justify-center rounded-3xl transition-transform duration-500 group-hover:scale-105"
              style={{ background: `${robot.accent}14`, border: `1px solid ${robot.accent}3d` }}
            >
              <Avatar className="h-16 w-16" />
              <span
                className="absolute -bottom-1.5 -left-1.5 flex items-center gap-1.5 rounded-full bg-abyss px-2.5 py-1 text-[10px] font-bold"
                style={{ color: robot.accent, border: `1px solid ${robot.accent}55` }}
              >
                <span className="live-dot h-1.5 w-1.5 rounded-full" style={{ background: robot.accent }} />
                آنلاین
              </span>
            </span>
            <span className="rounded-full px-3 py-1 text-[11.5px] font-bold" style={{ background: `${robot.accent}1a`, color: robot.accent }}>
              {robot.tag}
            </span>
          </div>

          <h3 className="mt-5 font-display text-[30px] leading-tight text-fog">{robot.name}</h3>
          <p className="text-[13px] font-semibold" style={{ color: robot.accent }}>
            {robot.role}
          </p>
          <p className="mt-3 text-[13.5px] leading-7 text-mist">{robot.desc}</p>

          <div className="mt-5 space-y-2 border-t border-white/8 pt-5">
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="text-mist">نرخ موفقیت ۹۰ روزه</span>
              <span className="font-extrabold tabular-nums" style={{ color: robot.accent }}>
                ٪{robot.winRate}
              </span>
            </div>
            <WinBar value={robot.winRate} accent={robot.accent} start={inView} />
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[12.5px]">
            <div>
              <dt className="text-mist">سیگنال روزانه</dt>
              <dd className="mt-0.5 font-bold text-fog">{robot.daily}</dd>
            </div>
            <div>
              <dt className="text-mist">پوشش بازار</dt>
              <dd className="mt-0.5 font-bold text-fog">{robot.timeframe}</dd>
            </div>
          </dl>

          <div className="mt-4 flex flex-wrap gap-2">
            {robot.markets.map((m) => (
              <span key={m} className="rounded-full border border-white/12 bg-white/4 px-3 py-1 text-[11.5px] font-medium text-fog/85">
                {m}
              </span>
            ))}
            <span className="mr-auto text-[11.5px] text-mist/80">آخرین سیگنال: {robot.lastSignal}</span>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/12 bg-abyss/45 px-4 py-3">
            <div>
              <p className="text-[11px] text-mist">اشتراک ماهانه</p>
              <p className="font-display text-[24px] leading-tight text-fog">
                {robot.priceLabel}
                <span className="mr-1.5 font-body text-[11.5px] font-bold text-mist">تومان</span>
              </p>
            </div>
            <button
              onClick={() => addToCart(productFromRobot(robot))}
              aria-label={`افزودن ${robot.name} به سبد خرید`}
              className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              style={{ color: robot.accent, background: `${robot.accent}16`, border: `1px solid ${robot.accent}59` }}
            >
              <IconCart className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={() => openPurchase(productFromRobot(robot))}
            className="shine mt-3 w-full rounded-xl bg-fog py-3 text-[14px] font-extrabold text-ink shadow-[0_12px_35px_-12px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 active:scale-[0.97]"
          >
            خرید اشتراک {robot.name}
          </button>
        </div>
      </div>
    </Reveal>
  );
}

function TileIcon({ icon, className = "h-6 w-6" }: { icon: string; className?: string }) {
  const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (icon) {
    case "standard":
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <path d="M12 3.2 19 6.5v5.4c0 4.6-3.2 7.5-7 9.1-3.8-1.6-7-4.5-7-9.1V6.5L12 3.2Z" />
          <path d="m8.8 11.8 2.2 2.2 4.2-4.5" />
        </svg>
      );
    case "app":
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <rect x="7" y="3.5" width="10" height="17" rx="2.5" />
          <path d="M10.5 17.5h3" />
        </svg>
      );
    case "support":
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <path d="M4.5 13.5v-2a7.5 7.5 0 0 1 15 0v2" />
          <rect x="3.5" y="13" width="4" height="6" rx="1.6" />
          <rect x="16.5" y="13" width="4" height="6" rx="1.6" />
          <path d="M18.5 19v.6a2.4 2.4 0 0 1-2.4 2.4H13" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H12l-4.5 4v-4h-1A2.5 2.5 0 0 1 4 13.5v-7Z" />
          <path d="M8.5 9h7M8.5 12h4.5" />
        </svg>
      );
  }
}

type FeedItem = { id: number; robot: string; side: Side; pair: string; price: string; time: string };

function SignalRow({ item, isNew }: { item: FeedItem; isNew: boolean }) {
  const buy = item.side === "buy";
  return (
    <li className={`flex items-center justify-between gap-3 rounded-xl border border-white/7 bg-white/3 px-4 py-3 ${isNew ? "rise" : ""}`}>
      <div className="flex min-w-0 items-center gap-3">
        <span className={`h-2 w-2 shrink-0 rounded-full ${buy ? "bg-mint" : "bg-down"}`} />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-bold text-fog">
            <span className="text-mist">{item.robot}</span>{" "}
            <span className={buy ? "text-mint" : "text-down"}>{buy ? "خرید" : "فروش"}</span>{" "}
            <bdo dir="ltr">{item.pair}</bdo>
          </p>
          <p className="text-[11.5px] tabular-nums text-mist">
            در قیمت <bdo dir="ltr">{item.price}</bdo> • {item.time}
          </p>
        </div>
      </div>
      <span className={`shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-extrabold ${buy ? "bg-mint/12 text-mint" : "bg-down/12 text-down"}`}>
        {buy ? "BUY" : "SELL"}
      </span>
    </li>
  );
}

export default function Services() {
  const reduced = usePrefersReducedMotion();
  const [feed, setFeed] = useState<FeedItem[]>(() =>
    SIGNAL_POOL.slice(0, 5).map((s, i) => ({ id: i, ...s, time: faTime(new Date(Date.now() - (i + 2) * 150000)) }))
  );

  useEffect(() => {
    if (reduced) return;
    let i = 5;
    const id = setInterval(() => {
      const s = SIGNAL_POOL[i % SIGNAL_POOL.length];
      i += 1;
      setFeed((prev) => [{ id: Date.now(), ...s, time: faTime() }, ...prev].slice(0, 6));
    }, 3400);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section id="services" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="pointer-events-none absolute top-10 right-[8%] h-[520px] w-[520px] rounded-full bg-pine/14 blur-[160px]" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead kicker={SERVICES_INTRO.kicker} title={[<>محصولات</>, <><span className="text-mint">ایران افیکس</span></>]} desc={SERVICES_INTRO.desc} />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {ROBOTS.map((r, i) => (
            <RobotCard key={r.id} robot={r} index={i} />
          ))}
        </div>

        {/* سایر خدمات */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {SERVICE_TILES.map((t, i) => (
            <Reveal key={t.id} delay={i * 100} className={t.wide ? "lg:col-span-3" : ""}>
              <article
                className={`group glass relative h-full overflow-hidden rounded-[22px] p-7 transition-all duration-500 hover:-translate-y-1.5 ${
                  t.wide ? "lg:flex lg:items-center lg:justify-between lg:gap-10" : ""
                }`}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${t.accent}55`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
              >
                {t.wide && <div className="bg-girih pointer-events-none absolute inset-0 opacity-[0.05]" />}
                <div className="relative flex items-start gap-5">
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                    style={{ background: `${t.accent}16`, color: t.accent, border: `1px solid ${t.accent}3d` }}
                  >
                    <TileIcon icon={t.icon} />
                  </span>
                  <div>
                    <h3 className="font-display text-[23px] text-fog">{t.title}</h3>
                    <p className={`mt-2.5 text-[13.5px] leading-7 text-mist ${t.wide ? "lg:max-w-2xl" : ""}`}>{t.desc}</p>
                  </div>
                </div>
                {t.wide && (
                  <div className="relative mt-6 flex shrink-0 flex-wrap gap-2.5 lg:mt-0">
                    {["امنیت بانکی", "اجرای سریع سفارش", "آپ‌تایم ۹۹٫۹٪"].map((b) => (
                      <span key={b} className="rounded-full border border-mint/30 bg-mint/8 px-4 py-2 text-[12px] font-bold text-mint">
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* جریان زنده سیگنال‌ها */}
        <Reveal delay={150} className="mt-10">
          <div className="glass-deep overflow-hidden rounded-[22px]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-6 py-4">
              <span className="flex items-center gap-2.5 text-[14.5px] font-extrabold text-fog">
                <span className="live-dot h-2.5 w-2.5 rounded-full bg-mint" />
                جریان زنده سیگنال‌ها
              </span>
              <span className="rounded-full border border-mint/25 bg-mint/8 px-3 py-1 text-[11.5px] font-bold text-mint">
                به‌روزرسانی خودکار هر چند ثانیه
              </span>
            </div>
            <ul className="grid gap-2.5 p-4 sm:p-6 lg:grid-cols-2 lg:gap-3">
              {feed.map((item, idx) => (
                <SignalRow key={item.id} item={item} isNew={idx === 0} />
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
