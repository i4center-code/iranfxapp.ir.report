import { FINAL_CTA } from "../lib/data";
import { Reveal, SectionHead } from "../lib/motion";
import { IconArrowLeft, IconDownload } from "./icons";

export default function FinalCta() {
  return (
    <section id="start" className="relative scroll-mt-24 pb-24 pt-8 lg:pb-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="glass-deep relative overflow-hidden rounded-[32px] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute -left-28 -top-28 h-[440px] w-[440px] rounded-full bg-pine/28 blur-[130px]" />
          <div className="pointer-events-none absolute -bottom-32 right-[15%] h-[380px] w-[380px] rounded-full bg-mint/12 blur-[130px]" />
          <div className="bg-girih pointer-events-none absolute inset-0 opacity-[0.05]" />

          <div className="relative">
            <SectionHead
              align="center"
              kicker={FINAL_CTA.kicker}
              title={[<>همین حالا</>, <><span className="text-mint">شروع کنید</span></>]}
              desc={FINAL_CTA.desc}
            />

            <Reveal delay={180}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#plans"
                  className="shine group inline-flex items-center gap-2.5 rounded-full bg-fog px-8 py-4 text-[15.5px] font-extrabold text-ink shadow-[0_14px_45px_-12px_rgba(255,255,255,0.6)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
                >
                  <IconDownload className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                  دانلود اپلیکیشن
                </a>
                <a
                  href="#academy"
                  className="group inline-flex items-center gap-2 rounded-full border border-mint/50 px-8 py-4 text-[15.5px] font-bold text-mint transition-all duration-300 hover:-translate-y-0.5 hover:bg-mint hover:text-abyss"
                >
                  آموزش رایگان
                  <IconArrowLeft className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-x-1" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mx-auto mt-14 max-w-3xl border-t border-white/10 pt-10 text-center">
                <p className="font-display text-[24px] text-gold sm:text-[28px]">{FINAL_CTA.successTitle}</p>
                <p className="mt-3 text-[15.5px] font-bold leading-8 text-fog">{FINAL_CTA.successLine1}</p>
                <p className="mt-2 text-[13.5px] leading-7 text-mist">{FINAL_CTA.successLine2}</p>
                <div className="mt-6 flex items-center justify-center gap-3 text-[12px] text-mist">
                  <span className="h-px w-10 bg-white/15" />
                  ایران اِفیکس، همراه مطمئن شما در بازارهای جهانی
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
