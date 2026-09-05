import { WHY_ITEMS } from "../lib/data";
import { useI18n } from "../lib/i18n";
import { Reveal } from "../lib/motion";
import { IconArrowLeft } from "./icons";

function WhyIcon({ id, className = "h-6 w-6" }: { id: string; className?: string }) {
  const S = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "founded":
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <path d="M4 20h16M5.5 20V9.5L12 4l6.5 5.5V20" />
          <path d="M9 20v-5h6v5M9.5 11.5h.01M14.5 11.5h.01" />
        </svg>
      );
    case "goal":
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <circle cx="12" cy="12" r="8.2" />
          <circle cx="12" cy="12" r="4.4" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "expertise":
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <path d="M4 18 9.5 12l3.5 3 7-8" />
          <circle cx="9.5" cy="12" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="13" cy="15" r="1.3" fill="currentColor" stroke="none" />
          <path d="M16.5 7H20v3.5" />
        </svg>
      );
    case "mission":
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <path d="M6 21V4m0 0h11.5l-2.4 3.5L17.5 11H6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} {...S}>
          <path d="m12 3.5 8.5 4.5L12 12.5 3.5 8 12 3.5Z" />
          <path d="m4.5 12.5 7.5 4 7.5-4M4.5 16.5l7.5 4 7.5-4" opacity="0.7" />
        </svg>
      );
  }
}

function FoundingStat() {
  const { t, lang } = useI18n();
  /* سال تأسیس — عدد ثابت، بدون جداکننده هزارگان */
  const year = lang === "fa" ? "۱۳۹۹" : "1399";
  return (
    <div className="mt-8 flex items-center gap-6 rounded-2xl border border-white/10 bg-abyss/50 p-5">
      <span className="font-display text-[46px] leading-none text-mint" dir="ltr">
        {year}
      </span>
      <span className="text-[13px] leading-6 text-mist">
        {t("why.year", "سال تأسیس")}
        <br />
        <b className="text-fog">
          {lang === "fa" ? "۵+" : "5+"} {t("why.yearNote", "سال تجربه در کنار معامله‌گران ایرانی")}
        </b>
      </span>
    </div>
  );
}

export default function Why() {
  const { t } = useI18n();
  return (
    <section id="why" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="pointer-events-none absolute left-[8%] top-24 h-[480px] w-[480px] rounded-full bg-dusk/35 blur-[150px]" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5 lg:row-span-2">
            <div className="glass-deep relative flex h-full flex-col overflow-hidden rounded-[26px] p-8 lg:p-10">
              <div className="bg-girih pointer-events-none absolute inset-0 opacity-[0.06]" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/8 px-4 py-1.5 text-[13px] font-bold text-mint">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-mint" />
                  {t("why.kicker", "انتخاب هوشمند")}
                </span>
                <h2 className="mt-6 font-display text-[34px] leading-[1.3] text-fog sm:text-[40px] lg:text-[44px]">
                  {t("why.title", "چرا ایران افیکس را انتخاب کنید؟")}
                </h2>
                <p className="mt-5 text-[14px] leading-8 text-mist sm:text-[14.5px]">
                  {t(
                    "why.desc",
                    "با تجربه‌ای غنی در بازارهای مالی جهانی، ما مأموریتی روشن داریم: دموکراتیک کردن دسترسی به ابزارهای حرفه‌ای معاملاتی برای همه معامله‌گران ایرانی."
                  )}
                </p>
                <FoundingStat />
              </div>
            </div>
          </Reveal>

          {WHY_ITEMS.map((item, i) => (
            <Reveal key={item.id} delay={i * 90} className={i < 2 ? "lg:col-span-7" : "lg:col-span-4"}>
              <article
                className="group glass relative h-full overflow-hidden rounded-[22px] p-7 transition-all duration-500 hover:-translate-y-1.5"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${item.accent}55`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
              >
                <div
                  className="pointer-events-none absolute -top-16 left-[-10%] h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ background: item.accent }}
                />
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl p-3 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                      style={{ background: `${item.accent}16`, color: item.accent, border: `1px solid ${item.accent}3d` }}
                    >
                      <WhyIcon id={item.id} className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-[23px] text-fog">{t(`why.${item.id}.t`, item.title)}</h3>
                  </div>
                  <p className="mt-4 text-[13.5px] leading-7 text-mist">{t(`why.${item.id}.d`, item.desc)}</p>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold transition-colors duration-300 hover:opacity-80"
                    style={{ color: item.accent }}
                  >
                    {t("why.more", "بیشتر بدانید")}
                    <IconArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
