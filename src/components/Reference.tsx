import { REFERENCE_PILLARS, STEPS } from "../lib/data";
import { faNum } from "../lib/format";
import { useI18n } from "../lib/i18n";
import { Reveal, SectionHead } from "../lib/motion";
import Courses from "./Courses";

function PillarIcon({ icon, className = "h-6 w-6" }: { icon: string; className?: string }) {
  const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (icon) {
    case "edu":
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <path d="M4.5 5.8A2.3 2.3 0 0 1 6.8 3.5H19.5v14.7H6.9a2.4 2.4 0 0 0-2.4 2.3V5.8Z" />
          <path d="M4.5 18.2a2.3 2.3 0 0 1 2.3-2.3h12.7M9 8h6" />
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
    case "analysis":
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <path d="M4 19.5h16M6.5 16l4-5 3 2.5 5-6.5" />
          <circle cx="6.5" cy="16" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="13.5" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <path d="M9 3.5h6v4.2l2.5 2.8a4 4 0 0 1 1 2.7v5.3a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2v-5.3a4 4 0 0 1 1-2.7L9 7.7V3.5Z" />
          <path d="M9.5 12h5M12 3.5v3" />
        </svg>
      );
  }
}

function StepIcon({ icon, className = "h-7 w-7" }: { icon: string; className?: string }) {
  const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (icon) {
    case "pick":
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <path d="M4 6.5h10M4 12h16M4 17.5h10" />
          <circle cx="17.5" cy="6.5" r="1.6" />
          <circle cx="17.5" cy="17.5" r="1.6" />
        </svg>
      );
    case "exam":
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <path d="M6.5 3.5h11a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19V5a1.5 1.5 0 0 1 1.5-1.5Z" />
          <path d="m8.5 9 1.5 1.5L12.5 8M8.5 14.5 10 16l2.5-2.5M15 9.8h1M15 15.3h1" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <circle cx="9" cy="8.5" r="3.4" />
          <path d="M3.5 19.5c.6-3.1 2.7-4.9 5.5-4.9s4.9 1.8 5.5 4.9" />
          <path d="m15.5 9.5 1.7 1.7 3.3-3.5" />
        </svg>
      );
  }
}

export default function Reference() {
  const { t } = useI18n();
  return (
    <section id="reference" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="pointer-events-none absolute left-[10%] top-40 h-[460px] w-[460px] rounded-full bg-dusk/35 blur-[150px]" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* سربرگ + ۴ رکن */}
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/8 px-4 py-1.5 text-[13px] font-bold text-mint">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-mint" />
              {t("ref.kicker", "مرجع معامله‌گران")}
            </span>
            <h2 className="mt-6 font-display text-[34px] leading-[1.3] text-fog sm:text-[42px]">
              {t("ref.title", "ایران اِفیکس مرجع کاملی برای معامله‌گران")}
            </h2>
            <p className="mt-5 max-w-lg text-[14px] leading-8 text-mist sm:text-[14.5px]">
              {t(
                "ref.desc",
                "اپلیکیشن ایران اِفیکس، به عنوان دستیار هوشمند تریدرها، با ارائه ابزارها و امکانات پیشرفته، تجربه‌ای حرفه‌ای از معاملات را برایتان فراهم می‌کند."
              )}
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {REFERENCE_PILLARS.map((p, i) => {
              const ids = ["edu", "support", "analysis", "tools"];
              const pid = ids[i] ?? "edu";
              return (
                <Reveal key={pid} delay={i * 100}>
                  <article
                    className="group glass h-full rounded-[20px] p-6 transition-all duration-500 hover:-translate-y-1.5"
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${p.accent}55`)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                  >
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                      style={{ background: `${p.accent}16`, color: p.accent, border: `1px solid ${p.accent}3d` }}
                    >
                      <PillarIcon icon={pid} />
                    </span>
                    <h3 className="mt-4 font-display text-[21px] text-fog">{t(`ref.${pid}.t`, p.title)}</h3>
                    <p className="mt-2 text-[13px] leading-7 text-mist">{t(`ref.${pid}.d`, p.desc)}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* آکادمی */}
        <div className="mt-20">
          <SectionHead
            kicker={t("ref.acadKicker", "آکادمی ایران افیکس")}
            title={[
              <>{t("ref.acadTitle", "دوره‌های تخصصی آکادمی")}</>,
              <span className="text-gold">{t("ref.acadDesc", "با تخفیف ویژه برای مشترکین ایران افیکس")}</span>,
            ]}
          />
          <Courses />
        </div>

        {/* ۳ گام آموزشی */}
        <div className="mt-20">
          <SectionHead
            kicker={t("ref.stepsKicker", "سه مرحله ساده")}
            title={[<>{t("ref.stepsTitle", "۳ گام آموزشی")}</>]}
            desc={t("ref.stepsDesc", "انتخاب رشته کنید، آزمون بدید، گواهینامه بگیرید فقط ۳ مرحله تا بازارهای مالی.")}
          />
          <div className="relative mt-14 grid gap-6 md:grid-cols-3">
            <div className="pointer-events-none absolute left-[16%] right-[16%] top-9 hidden h-px bg-gradient-to-l from-transparent via-mint/40 to-transparent md:block" />
            {STEPS.map((s, i) => {
              const sIcons = ["pick", "exam", "cert"];
              return (
              <Reveal key={s.num} delay={i * 130}>
                <article className="group glass relative h-full overflow-hidden rounded-[22px] p-7 text-center transition-all duration-500 hover:-translate-y-2">
                  <div className="relative z-10 mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 bg-abyss shadow-[0_14px_35px_-12px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-110" style={{ borderColor: `${s.accent}80` }}>
                    <span style={{ color: s.accent }}>
                      <StepIcon icon={sIcons[i] ?? "pick"} />
                    </span>
                  </div>
                  <span className="absolute -top-1 right-5 font-display text-[64px] leading-none opacity-[0.07]" aria-hidden>
                    {faNum(i + 1)}
                  </span>
                  <h3 className="mt-5 font-display text-[24px] text-fog">
                    <span className="text-mint">{faNum(i + 1)}.</span> {t(`ref.step${i + 1}.t`, s.title)}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-7 text-mist">{t(`ref.step${i + 1}.d`, s.desc)}</p>
                </article>
              </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
