import { FEATURE_CARDS, FEATURES_HEAD } from "../lib/data";
import { Reveal, SectionHead } from "../lib/motion";
import { IconArrowLeft } from "./icons";

function FeatureArt({ icon, accent }: { icon: string; accent: string }) {
  const common = { fill: "none", stroke: accent, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (icon) {
    case "chart":
      return (
        <svg viewBox="0 0 120 60" className="h-full w-full" aria-hidden>
          {[15, 30, 45].map((y) => (
            <path key={y} d={`M4 ${y}h112`} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          ))}
          <g strokeWidth="2.6" {...common}>
            <path d="M18 42V30M18 24v-4" />
            <rect x="14" y="30" width="8" height="12" rx="1.5" fill={`${accent}33`} />
            <path d="M40 46V34M40 28v-6" />
            <rect x="36" y="28" width="8" height="14" rx="1.5" fill={`${accent}33`} />
            <path d="M62 38V26M62 20v-4" />
            <rect x="58" y="20" width="8" height="14" rx="1.5" fill={accent} fillOpacity="0.5" />
            <path d="M84 34V20M84 14v-3" />
            <rect x="80" y="14" width="8" height="16" rx="1.5" fill={accent} fillOpacity="0.6" />
            <path d="M104 26V14M104 9V6" />
            <rect x="100" y="9" width="8" height="14" rx="1.5" fill={accent} fillOpacity="0.7" />
          </g>
        </svg>
      );
    case "news":
      return (
        <svg viewBox="0 0 120 60" className="h-full w-full" aria-hidden>
          <rect x="8" y="8" width="104" height="44" rx="8" stroke={accent} strokeWidth="2" fill={`${accent}0f`} />
          <path d="M18 20h46M18 29h60M18 38h38" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
          <circle cx="94" cy="24" r="9" stroke={accent} strokeWidth="2" fill={`${accent}22`} />
          <path d="M94 19.5V24l3 2" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "live":
      return (
        <svg viewBox="0 0 120 60" className="h-full w-full" aria-hidden>
          <rect x="8" y="8" width="104" height="44" rx="8" stroke={accent} strokeWidth="2" fill={`${accent}0f`} />
          <path d="M16 38 30 26l10 6 14-14 12 8 16-12 14 8" stroke={accent} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="100" cy="20" r="4" fill={accent}>
            <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <path d="M16 46h30" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 60" className="h-full w-full" aria-hidden>
          <path d="M20 46a40 40 0 0 1 80 0" stroke={accent} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M30 46a30 30 0 0 1 60 0" stroke={accent} strokeWidth="1.4" fill="none" strokeDasharray="4 6" opacity="0.5" />
          <path d="m60 46 22-24" stroke={accent} strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="46" r="5" fill={accent} />
          <path d="M26 46h-8M102 46h-8" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
  }
}

export default function Features() {
  const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
  return (
    <section id="features" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="pointer-events-none absolute top-16 right-[10%] h-[480px] w-[480px] rounded-full bg-skyx/7 blur-[150px]" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead kicker={FEATURES_HEAD.kicker} title={[<>امکانات</>, <><span className="text-mint">ویژه</span></>]} desc={FEATURES_HEAD.desc} />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {FEATURE_CARDS.map((f, i) => (
            <Reveal key={f.id} delay={i * 100} className={spans[i]}>
              <article
                className="group glass relative h-full overflow-hidden rounded-[22px] p-7 transition-all duration-500 hover:-translate-y-1.5 sm:p-8"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${f.accent}55`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
              >
                <div
                  className="pointer-events-none absolute -bottom-20 left-[-8%] h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                  style={{ background: f.accent }}
                />
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className={`shrink-0 rounded-2xl border border-white/8 bg-abyss/60 p-4 ${i % 2 === 0 ? "sm:w-52" : "sm:w-44"}`}>
                    <div className="h-20">
                      <FeatureArt icon={f.icon} accent={f.accent} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-[24px] text-fog">{f.title}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-7 text-mist">{f.desc}</p>
                    <a href="#" className="mt-3.5 inline-flex items-center gap-2 text-[13px] font-bold transition-opacity hover:opacity-75" style={{ color: f.accent }}>
                      دسترسی از اپلیکیشن
                      <IconArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* بنر ایران افیکس */}
        <Reveal delay={160} className="mt-6">
          <div className="glass-deep relative overflow-hidden rounded-[22px] px-8 py-8 sm:px-10">
            <div className="bg-girih pointer-events-none absolute inset-0 opacity-[0.06]" />
            <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-pine/25 blur-[90px]" />
            <div className="relative flex flex-wrap items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-[26px] text-fog sm:text-[30px]">
                  بنر ایران افیکس؛ <span className="text-mint">همیشه جلوی چشم بازار</span>
                </h3>
                <p className="mt-2 max-w-xl text-[13.5px] leading-7 text-mist">
                  قیمت‌ها، سیگنال‌ها و تحلیل‌های ایران افیکس را در قالب بنرها و ویجت‌های زنده، همه‌جا همراه خود داشته باشید.
                </p>
              </div>
              <a
                href="#why"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-mint/50 px-6 py-3 text-[14px] font-bold text-mint transition-all duration-300 hover:-translate-y-0.5 hover:bg-mint hover:text-abyss"
              >
                آشنایی با مجموعه
                <IconArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
