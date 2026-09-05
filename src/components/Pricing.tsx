import { useCart } from "../lib/cart";
import { PLANS, productFromPlan } from "../lib/data";
import { useI18n } from "../lib/i18n";
import { Reveal, SectionHead } from "../lib/motion";
import { IconCheck, IconShield } from "./icons";

export default function Pricing() {
  const m = PLANS.monthly;
  const l = PLANS.lifetime;
  const { t, loc } = useI18n();
  const { openPurchase } = useCart();

  const mFeatures = [t("plan.m.f1", m.features[0]), t("plan.m.f2", m.features[1]), t("plan.m.f3", m.features[2]), t("plan.m.f4", m.features[3]), t("plan.m.f5", m.features[4])];
  const lFeatures = [t("plan.l.f1", l.features[0]), t("plan.l.f2", l.features[1]), t("plan.l.f3", l.features[2]), t("plan.l.f4", l.features[3]), t("plan.l.f5", l.features[4])];

  return (
    <section id="plans" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="pointer-events-none absolute right-[14%] top-16 h-[540px] w-[540px] rounded-full bg-dusk/40 blur-[160px]" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          kicker={t("plan.kicker", "اشتراک ایران افیکس")}
          title={[
            <>{t("plan.title", "ساده، شفاف و منصفانه").split("،")[0]}</>,
            <span className="text-mint">{t("plan.title", "ساده، شفاف و منصفانه").split("،").slice(1).join("،") || t("plan.title", "ساده، شفاف و منصفانه")}</span>,
          ]}
          desc={t("plan.desc", "یا یک ماه کامل همه‌چیز را امتحان کنید، یا با افتتاح حساب معاملاتی، اشتراک دائمی را برای همیشه رایگان بگیرید.")}
        />

        <div className="mx-auto mt-16 grid max-w-4xl items-stretch gap-8 lg:grid-cols-[1fr_1.15fr]">
          {/* ماهانه */}
          <Reveal className="h-full">
            <div className="glass flex h-full flex-col rounded-[24px] p-8 transition-all duration-500 hover:-translate-y-2">
              <h3 className="font-display text-[28px] text-fog">{t("plan.m.name", m.name)}</h3>
              <p className="mt-1 text-[13px] text-mist">{t("plan.m.note", m.note)}</p>
              <p className="mt-4 text-[13px] leading-7 text-mist">{t("plan.m.desc", m.desc)}</p>
              <p className="mt-5 flex items-end gap-2">
                <span className="font-display text-[46px] leading-none text-fog" dir="ltr">
                  {loc(m.price)}
                </span>
                <span className="pb-1.5 text-[14px] font-bold text-mist">{t("plan.m.unit", m.unit)}</span>
              </p>
              <ul className="mt-6 space-y-3.5">
                {mFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[14px] text-fog/85">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/7 text-mist">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openPurchase(productFromPlan("monthly"))}
                className="mt-auto w-full rounded-xl bg-paper py-3.5 text-[15px] font-extrabold text-ink shadow-[0_12px_35px_-12px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 active:scale-[0.97]"
              >
                {t("plan.m.cta", m.cta)}
              </button>
              <p className="mt-4 text-center text-[12px] text-mist/80">{t("plan.guarantee", "هر دو پلن شامل ضمانت بازگشت وجه ۷ روزه هستند")}</p>
            </div>
          </Reveal>

          {/* دائمی رایگان */}
          <Reveal delay={140} className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-mint/35 bg-gradient-to-b from-pine/25 via-panel/60 to-abyss/80 p-8 shadow-[0_30px_80px_-25px_rgba(28,137,108,0.55)] transition-all duration-500 hover:-translate-y-2">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-52 w-[120%] -translate-x-1/2 rounded-full bg-mint/15 blur-3xl" />
              <span className="absolute left-6 top-0 rounded-b-xl bg-paper px-4 py-1.5 text-[12px] font-extrabold text-ink shadow-[0_8px_25px_-6px_rgba(0,0,0,0.35)]">
                {t("plan.l.badge", "محبوب‌ترین • بدون پرداخت")}
              </span>

              <div className="relative">
                <h3 className="font-display text-[30px] text-fog">{t("plan.l.name", l.name)}</h3>
                <p className="mt-1 text-[13px] text-mist">{t("plan.l.note", l.note)}</p>
                <p className="mt-4 text-[13px] leading-7 text-mist">{t("plan.l.desc", l.desc)}</p>
                <p className="mt-5 flex items-end gap-2.5">
                  <span className="font-display text-[58px] leading-none text-mint">{t("plan.l.free", l.price)}</span>
                  <span className="pb-2 text-[14px] font-bold text-mist">{t("plan.l.forever", l.unit)}</span>
                </p>

                <ul className="mt-6 space-y-3.5">
                  {lFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[14px] text-fog/90">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint/18 text-mint ring-1 ring-mint/40">
                        <IconCheck className="h-3.5 w-3.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/25 bg-gold/8 p-4 text-[12.5px] leading-6 text-gold">
                  <IconShield className="mt-0.5 h-5 w-5 shrink-0" />
                  {t("plan.l.cond", l.condition)}
                </div>

                <button
                  onClick={() => openPurchase(productFromPlan("lifetime"))}
                  className="shine group mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-paper py-4 text-[15.5px] font-extrabold text-ink shadow-[0_14px_40px_-10px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 active:scale-[0.97]"
                >
                  {t("plan.l.cta", l.cta)}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
