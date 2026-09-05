import { REFERENCE, REFERENCE_PILLARS, STEPS, STEPS_HEAD } from "../lib/data";
import { Reveal, SectionHead } from "../lib/motion";
import Courses from "./Courses";

function PillarIcon({ i, className = "h-6 w-6" }: { i: number; className?: string }) {
  const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (i) {
    case 0:
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <path d="M4.5 5.8A2.3 2.3 0 0 1 6.8 3.5H19.5v14.7H6.9a2.4 2.4 0 0 0-2.4 2.3V5.8Z" />
          <path d="M4.5 18.2a2.3 2.3 0 0 1 2.3-2.3h12.7" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <circle cx="12" cy="12" r="8.2" />
          <path d="M12 7.5V12l3 2.2" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <path d="M4 18 9.5 12l3.5 3 7-8" />
          <path d="M16.5 7H20v3.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <path d="m14.5 6.5 3 3L8 19l-4 1 1-4 9.5-9.5Z" />
          <path d="m12.5 8.5 3 3" />
        </svg>
      );
  }
}

export default function Reference() {
  return (
    <section id="academy" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="pointer-events-none absolute top-1/4 left-[5%] h-[460px] w-[460px] rounded-full bg-gold/7 blur-[150px]" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead kicker={REFERENCE.kicker} title={[<>ایران اِفیکس؛</>, <><span className="text-mint">مرجع کاملی</span> برای معامله‌گران</>]} desc={REFERENCE.desc} />

        {/* ستون‌های مرجع */}
        <Reveal delay={120}>
          <div className="glass mt-12 grid gap-px overflow-hidden rounded-[22px] bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {REFERENCE_PILLARS.map((pl, i) => (
              <div key={pl.title} className="group relative bg-ink/95 p-7 transition-colors duration-400 hover:bg-panel/70">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                  style={{ background: `${pl.accent}16`, color: pl.accent, border: `1px solid ${pl.accent}3d` }}
                >
                  <PillarIcon i={i} />
                </span>
                <h3 className="mt-4 font-display text-[21px] text-fog">{pl.title}</h3>
                <p className="mt-2 text-[12.5px] leading-6 text-mist">{pl.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* دوره‌ها */}
        <Courses />

        {/* ۳ گام آموزشی */}
        <div className="mt-20">
          <SectionHead kicker={STEPS_HEAD.kicker} title={[<>{STEPS_HEAD.title}</>]} desc={STEPS_HEAD.desc} />
          <div className="relative mt-14">
            <div className="pointer-events-none absolute right-[16%] left-[16%] top-10 hidden border-t-2 border-dashed border-white/12 lg:block" />
            <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
              {STEPS.map((s, i) => (
                <Reveal key={s.num} delay={i * 140}>
                  <div className="group relative text-center">
                    <span
                      className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full font-display text-[34px] transition-transform duration-500 group-hover:scale-110"
                      style={{
                        background: "#0b0c19",
                        color: s.accent,
                        border: `2px solid ${s.accent}66`,
                        boxShadow: `0 0 35px -8px ${s.accent}55`,
                      }}
                    >
                      {s.num}
                    </span>
                    <h3 className="mt-5 font-display text-[25px] text-fog">{s.title}</h3>
                    <p className="mx-auto mt-2.5 max-w-[300px] text-[13.5px] leading-7 text-mist">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
