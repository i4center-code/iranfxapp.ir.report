import { useCart } from "../lib/cart";
import { COURSES, productFromCourse, type Course } from "../lib/data";
import { useI18n } from "../lib/i18n";
import { Reveal } from "../lib/motion";
import { IconBook, IconCart, IconClock, IconPlay, IconStar } from "./icons";

/** miniature chart-pattern illustrations, one per course */
export function Pattern({ kind, color }: { kind: Course["pattern"]; color: string }) {
  const paths: Record<Course["pattern"], React.ReactNode> = {
    channel: (
      <>
        <path d="M4 34 20 26l14 6 16-9 14 5 18-10 14 6 16-9" stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 44 20 36l14 6 16-9 14 5 18-10 14 6 16-9" stroke={color} strokeWidth="1.2" opacity="0.4" strokeDasharray="4 5" fill="none" />
      </>
    ),
    doubletop: (
      <path d="M4 40 20 16l12 18 12-18 12 20 14 4h22" stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
    fib: (
      <>
        {[12, 22, 30, 38].map((y) => (
          <path key={y} d={`M4 ${y}h92`} stroke={color} strokeWidth="1.2" opacity={y === 22 ? 0.9 : 0.35} strokeDasharray="6 5" />
        ))}
        <path d="M4 40 30 12 52 26 78 14l18 8" stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    flag: (
      <>
        <path d="M4 42 34 10" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M36 12 56 20 76 28l20 8" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 22 52 30 72 38l18 7" stroke={color} strokeWidth="1.1" opacity="0.4" strokeDasharray="4 5" />
      </>
    ),
    triangle: (
      <>
        <path d="M4 12h60M4 12c14 8 24 10 60 12" stroke={color} strokeWidth="1.4" opacity="0.5" fill="none" />
        <path d="M4 40h60M4 40c14-7 24-10 60-14" stroke={color} strokeWidth="1.4" opacity="0.5" fill="none" />
        <path d="M6 30 18 18l10 16 12-20 10 14 12-16 8 10 26-2" stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    steps: (
      <path d="M4 42h14v-8h14v-8h14v-8h14v-8h14" stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  };
  return (
    <svg viewBox="0 0 100 50" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={`fade-${kind}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.16" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <rect width="100" height="50" fill={`url(#fade-${kind})`} />
      {paths[kind]}
    </svg>
  );
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const featured = course.featured;
  const { addToCart, openPurchase } = useCart();
  const { t, loc } = useI18n();
  return (
    <Reveal delay={(index % 3) * 110} className={featured ? "md:col-span-2" : ""}>
      <article
        className={`group glass relative flex h-full flex-col overflow-hidden rounded-[22px] transition-all duration-500 hover:-translate-y-2 ${
          featured ? "lg:flex-row" : ""
        }`}
      >
        <div
          className={`relative shrink-0 overflow-hidden ${featured ? "h-36 lg:h-auto lg:w-[42%]" : "h-32"}`}
        >
          <Pattern kind={course.pattern} color={course.levelColor} />
          <span
            className="absolute right-4 top-4 rounded-full px-3 py-1 text-[11.5px] font-extrabold"
            style={{ background: `${course.levelColor}1f`, color: course.levelColor, border: `1px solid ${course.levelColor}44` }}
          >
            {t(`course.${course.id}.lv`, course.level)}
          </span>
          {featured && (
            <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-[11px] font-extrabold text-abyss">
              <IconPlay className="h-3 w-3" />
              {t("course.featured", "پیشنهاد آکادمی")}
            </span>
          )}
        </div>

        <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-8" : ""}`}>
          <h3 className={`font-display leading-snug text-fog ${featured ? "text-[30px]" : "text-[24px]"}`}>
            {t(`course.${course.id}.t`, course.title)}
          </h3>
          {featured && (
            <p className="mt-2 text-[13.5px] leading-7 text-mist">
              {t(
                "course.c1.d",
                "نقطه شروع مسیر یادگیری، از مفاهیم پایه و ساختار بازار تا اولین معامله واقعی، قدم‌به‌قدم و به زبان ساده."
              )}
            </p>
          )}
          <p className="mt-2 text-[12.5px] text-mist">
            {t("course.teacher", "مدرس")}: {t(`course.${course.id}.tc`, course.teacher)}
          </p>

          <div className="mb-5 mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-mist">
            <span className="flex items-center gap-1.5">
              <IconBook className="h-4 w-4 text-mint" />
              {t(`course.${course.id}.s`, course.sessions)}
            </span>
            <span className="flex items-center gap-1.5">
              <IconClock className="h-4 w-4 text-mint" />
              {t(`course.${course.id}.h`, course.hours)}
            </span>
            <span className="flex items-center gap-1.5">
              <IconStar className="h-4 w-4 text-gold" />
              <b className="text-fog">{t(`course.${course.id}.r`, course.rating)}</b>
            </span>
          </div>

          <div className="mt-auto border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
              <p className="font-display text-[25px] leading-none text-fog">
                {loc(course.priceLabel)}
                <span className="mr-1.5 font-body text-[11.5px] font-bold text-mist">{t("svc.toman", "تومان")}</span>
              </p>
              <button
                onClick={() => addToCart(productFromCourse(course))}
                aria-label={`افزودن ${course.title} به سبد خرید`}
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                style={{ color: course.levelColor, background: `${course.levelColor}18`, border: `1px solid ${course.levelColor}55` }}
              >
                <IconCart className="h-4.5 w-4.5" />
              </button>
            </div>
            <button
              onClick={() => openPurchase(productFromCourse(course))}
              className="shine mt-3.5 w-full rounded-xl bg-paper py-3 text-[13.5px] font-extrabold text-ink shadow-[0_10px_30px_-12px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 active:scale-[0.97]"
            >
              {t("course.buy", "مشاهده و خرید دوره")}
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Courses() {
  const { t } = useI18n();
  return (
    <div className="mt-14">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((c, i) => (
          <CourseCard key={c.id} course={c} index={i} />
        ))}
        <Reveal delay={220}>
          <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3 rounded-[22px] border border-dashed border-white/15 p-6 text-center transition-colors duration-300 hover:border-mint/40">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/4">
              <IconClock className="h-6 w-6 text-mist" />
            </span>
            <p className="font-display text-[22px] text-fog">{t("ref.upc.t", "تحلیل آنچین رمزارزها")}</p>
            <p className="text-[12.5px] text-mist">
              {t("ref.upcoming", "دوره بعدی آکادمی")} — <b className="text-mint">{t("ref.soon", "به‌زودی")}</b>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
