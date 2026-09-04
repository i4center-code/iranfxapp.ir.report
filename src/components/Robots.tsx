import { useEffect, useState } from "react";
import { ROBOTS, SIGNAL_POOL, type Robot, type Side } from "../lib/data";
import { faTime } from "../lib/format";
import { Reveal, SectionHead, useInView, usePrefersReducedMotion } from "../lib/motion";
import { RobotMicrobot, RobotOrobat, RobotYuz } from "./icons";

const AVATARS: Record<string, (p: { className?: string }) => React.ReactElement> = {
  orobat: RobotOrobat,
  microbot: RobotMicrobot,
  yuz: RobotYuz,
};

type FeedItem = {
  id: number;
  robot: string;
  side: Side;
  pair: string;
  price: string;
  time: string;
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
  const Avatar = AVATARS[robot.id];
  return (
    <Reveal delay={index * 120}>
      <div
        ref={ref}
        className="group glass relative h-full overflow-hidden rounded-[22px] p-6 transition-all duration-500 hover:-translate-y-2"
      >
        <div
          className="pointer-events-none absolute -top-20 right-[-20%] h-44 w-44 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-50"
          style={{ background: robot.accent }}
        />
        {/* scan line on hover */}
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
            <span
              className="rounded-full px-3 py-1 text-[11.5px] font-bold"
              style={{ background: `${robot.accent}1a`, color: robot.accent }}
            >
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
              <dt className="text-mist">سبک معاملاتی</dt>
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

          <button
            className="mt-5 w-full rounded-xl py-3 text-[14px] font-extrabold text-abyss transition-all duration-300 hover:brightness-110 active:scale-[0.97]"
            style={{ background: robot.accent }}
          >
            فعال‌سازی {robot.name}
          </button>
        </div>
      </div>
    </Reveal>
  );
}

function SignalRow({ item, isNew }: { item: FeedItem; isNew: boolean }) {
  const buy = item.side === "buy";
  return (
    <li
      className={`flex items-center justify-between gap-3 rounded-xl border border-white/7 bg-white/3 px-4 py-3 ${
        isNew ? "rise" : ""
      }`}
    >
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
      <span
        className={`shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-extrabold ${
          buy ? "bg-mint/12 text-mint" : "bg-down/12 text-down"
        }`}
      >
        {buy ? "BUY" : "SELL"}
      </span>
    </li>
  );
}

export default function Robots() {
  const reduced = usePrefersReducedMotion();
  const [feed, setFeed] = useState<FeedItem[]>(() =>
    SIGNAL_POOL.slice(0, 5).map((s, i) => ({
      id: i,
      ...s,
      time: faTime(new Date(Date.now() - (i + 2) * 150000)),
    }))
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
    <section id="robots" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="pointer-events-none absolute top-10 right-[10%] h-[300px] w-[300px] rounded-full bg-pine/12 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          kicker="ربات‌های سیگنال‌ده"
          title={[
            <>سیگنال‌ها را</>,
            <>
              به <span className="text-mint">ماشین</span> بسپارید
            </>,
          ]}
          desc="سه ربات با سه شخصیت معاملاتی متفاوت؛ از سویینگ‌های آرام طلا تا اسکالپ‌های پرهیجان رمزارز و شکار اخبار. شما فقط تصمیم نهایی را می‌گیرید."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {ROBOTS.map((r, i) => (
            <RobotCard key={r.id} robot={r} index={i} />
          ))}
        </div>

        {/* live signal feed */}
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
