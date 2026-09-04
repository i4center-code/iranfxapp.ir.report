import { PLANS } from "../lib/data";
import { Reveal, SectionHead } from "../lib/motion";
import { IconCheck, IconShield } from "./icons";

export default function Pricing() {
  const m = PLANS.monthly;
  const l = PLANS.lifetime;

  return (
    <section id="plans" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="pointer-events-none absolute top-16 right-[14%] h-[340px] w-[340px] rounded-full bg-pine/14 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          kicker="اشتراک ایران افیکس"
          title={[
            <>ساده، شفاف،</>,
            <>
              بدون <span className="text-mint">ستاره</span>
            </>,
          ]}
          desc="یا یک ماه کامل همه‌چیز را امتحان کنید، یا با افتتاح حساب معاملاتی، اشتراک دائمی را برای همیشه رایگان بگیرید."
        />

        <div className="mx-auto mt-16 grid max-w-4xl items-stretch gap-8 lg:grid-cols-[1fr_1.15fr]">
          {/* monthly */}
          <Reveal className="h-full">
            <div className="glass flex h-full flex-col rounded-[24px] p-8 transition-all duration-500 hover:-translate-y-2">
              <h3 className="font-display text-[28px] text-fog">{m.name}</h3>
              <p className="mt-1 text-[13px] text-mist">{m.note}</p>
              <p className="mt-6 flex items-end gap-2">
                <span className="font-display text-[52px] leading-none text-fog">{m.price}</span>
                <span className="pb-1.5 text-[14px] font-bold text-mist">{m.unit}</span>
              </p>
              <ul className="mt-7 space-y-3.5">
                {m.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[14px] text-fog/85">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/7 text-mist">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="mt-auto w-full rounded-xl border border-white/18 py-3.5 pt-3.5 text-[15px] font-extrabold text-fog transition-all duration-300 hover:border-mint/60 hover:text-mint active:scale-[0.97] [margin-top:auto]">
                {m.cta}
              </button>
              <p className="mt-4 text-center text-[12px] text-mist/80">لغو در هر زمان، بدون جریمه</p>
            </div>
          </Reveal>

          {/* lifetime — featured */}
          <Reveal delay={140} className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-mint/35 bg-gradient-to-b from-pine/25 via-panel/60 to-abyss/80 p-8 shadow-[0_30px_80px_-25px_rgba(28,137,108,0.55)] transition-all duration-500 hover:-translate-y-2">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-52 w-[120%] -translate-x-1/2 rounded-full bg-mint/15 blur-3xl" />
              <span className="absolute left-6 top-0 rounded-b-xl bg-mint px-4 py-1.5 text-[12px] font-extrabold text-abyss shadow-[0_8px_25px_-6px_rgba(62,207,154,0.7)]">
                محبوب‌ترین • بدون پرداخت
              </span>

              <div className="relative">
                <h3 className="font-display text-[30px] text-fog">{l.name}</h3>
                <p className="mt-1 text-[13px] text-mist">{l.note}</p>
                <p className="mt-6 flex items-end gap-2.5">
                  <span className="font-display text-[58px] leading-none text-mint">{l.price}</span>
                  <span className="pb-2 text-[14px] font-bold text-mist">{l.unit}</span>
                </p>

                <ul className="mt-7 space-y-3.5">
                  {l.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[14px] text-fog/90">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint/18 text-mint ring-1 ring-mint/40">
                        <IconCheck className="h-3.5 w-3.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/25 bg-gold/8 p-4 text-[12.5px] leading-6 text-gold/90">
                  <IconShield className="mt-0.5 h-5 w-5 shrink-0" />
                  {l.condition}
                </div>

                <a
                  href="#download"
                  className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-mint py-4 text-[15.5px] font-extrabold text-abyss shadow-[0_14px_40px_-10px_rgba(62,207,154,0.7)] transition-all duration-300 hover:brightness-110 active:scale-[0.97]"
                >
                  {l.cta}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <p className="mt-10 text-center text-[13px] text-mist">
            هر دو پلن شامل ضمانت بازگشت وجه ۷ روزه هستند — مقایسه کامل امکانات در اپلیکیشن
          </p>
        </Reveal>
      </div>
    </section>
  );
}
