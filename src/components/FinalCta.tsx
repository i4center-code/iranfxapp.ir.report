import { useI18n } from "../lib/i18n";
import { Reveal, SectionHead } from "../lib/motion";
import { IconArrowLeft, IconDownload } from "./icons";

export default function FinalCta() {
  const { t } = useI18n();
  const title = t("final.title", "همین حالا شروع کنید");
  return (
    <section id="start" className="relative scroll-mt-24 pb-24 pt-8 lg:pb-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="glass-deep relative overflow-hidden rounded-[32px] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute -left-28 -top-28 h-[440px] w-[440px] rounded-full bg-dusk/50 blur-[130px]" />
          <div className="pointer-events-none absolute -bottom-32 right-[15%] h-[380px] w-[380px] rounded-full bg-mint/12 blur-[130px]" />
          <div className="bg-girih pointer-events-none absolute inset-0 opacity-[0.05]" />

          <div className="relative">
            <SectionHead
              align="center"
              kicker={t("final.kicker", "شروع هوشمندانه")}
              title={[
                <>{title.split(" ").slice(0, -1).join(" ") || title}</>,
                <span className="text-mint">{title.split(" ").slice(-1)}</span>,
              ]}
              desc={t(
                "final.desc",
                "به خانواده بزرگ معامله‌گران ایران افیکس بپیوندید و از خدمات حرفه‌ای ما بهره‌مند شوید. به‌ویژه، اپلیکیشن ما کاملاً رایگان است و تمام امکانات مورد نیاز را در اختیارتان قرار می‌دهد."
              )}
            />

            <Reveal delay={180}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#download"
                  className="shine group inline-flex items-center gap-2.5 rounded-full bg-paper px-8 py-4 text-[15.5px] font-extrabold text-ink shadow-[0_14px_45px_-12px_rgba(255,255,255,0.6)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
                >
                  <IconDownload className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                  {t("final.app", "دانلود اپلیکیشن")}
                </a>
                <a
                  href="#reference"
                  className="group inline-flex items-center gap-2 rounded-full border border-mint/50 px-8 py-4 text-[15.5px] font-bold text-mint transition-all duration-300 hover:-translate-y-0.5 hover:bg-mint hover:text-ink"
                >
                  {t("final.edu", "آموزش رایگان")}
                  <IconArrowLeft className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-x-1" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mx-auto mt-14 max-w-3xl border-t border-white/10 pt-10 text-center">
                <p className="font-display text-[24px] text-gold sm:text-[28px]">{t("final.successTitle", "موفقیت شما")}</p>
                <p className="mt-3 text-[15.5px] font-bold leading-8 text-fog">
                  {t("final.l1", "اگر می‌خواهید یک معامله‌گر موفق شوید، حتما به ایران اِفیکس نیاز دارید.")}
                </p>
                <p className="mt-2 text-[13.5px] leading-7 text-mist">
                  {t(
                    "final.l2",
                    "از کتاب‌های آموزشی تا دستیارهای معاملاتی، ایران اِفیکس همه ابزارهای لازم برای موفقیت شما در بازارهای مالی را فراهم می‌کند."
                  )}
                </p>
                <div className="mt-6 flex items-center justify-center gap-3 text-[12px] text-mist">
                  <span className="h-px w-10 bg-white/15" />
                  {t("final.tag", "ایران اِفیکس، همراه مطمئن شما در بازارهای جهانی")}
                  <span className="h-px w-10 bg-white/15" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
