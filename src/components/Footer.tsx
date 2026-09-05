import { FOOTER_EXTRA_COLS, FOOTER_PLATFORM_LINKS, FOOTER_QUICK_LINKS } from "../lib/data";
import { useI18n } from "../lib/i18n";
import { IconInstagram, IconMail, IconShield, IconTelegram, IconUp, IconWallet, LogoMark } from "./icons";

export default function Footer() {
  const { t } = useI18n();

  const platformLinks = FOOTER_PLATFORM_LINKS.map((l, i) => ({ ...l, label: t(`footer.p${i + 1}`, l.label) }));
  const quickLinks = FOOTER_QUICK_LINKS.map((l, i) => ({ ...l, label: t(`footer.q${i + 1}`, l.label) }));
  const extraCols = FOOTER_EXTRA_COLS.map((col, ci) => {
    const titles = ["footer.cats", "footer.dlCol", "footer.tools", "footer.support"];
    const prefixes = ["footer.c", "footer.d", "footer.t", "footer.s"];
    return {
      title: t(titles[ci] ?? "footer.cats", col.title),
      links: col.links.map((l, li) => ({ ...l, label: t(`${prefixes[ci]}${li + 1}`, l.label) })),
    };
  });

  const LinkRow = ({ label, href }: { label: string; href: string }) => (
    <li>
      <a href={href} className="group inline-flex items-center gap-2 text-[13.5px] text-mist transition-colors hover:text-mint">
        <span className="h-1 w-1 rounded-full bg-mint/60 transition-all duration-300 group-hover:w-2.5" />
        {label}
      </a>
    </li>
  );

  return (
    <footer className="relative border-t border-white/10 bg-abyss/75">
      <div className="bg-girih pointer-events-none absolute inset-0 opacity-[0.035]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#top" className="flex items-center gap-3">
              <LogoMark className="h-11 w-11" />
              <span className="font-display text-[28px] leading-none text-fog">{t("brand.name", "ایران افیکس")}</span>
            </a>
            <p className="mt-4 max-w-xs text-[13.5px] leading-7 text-mist">{t("footer.about", "اکوسیستم معاملاتی ایرانی‌ها برای بازارهای جهانی.")}</p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { icon: IconTelegram, label: t("footer.telegram", "تلگرام") },
                { icon: IconInstagram, label: t("footer.email", "ایمیل") },
                { icon: IconMail, label: t("footer.email", "ایمیل") },
              ].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-mist transition-all duration-300 hover:-translate-y-1 hover:border-mint/60 hover:text-mint"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#" className="group flex items-center gap-2.5 rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-mint/60">
                <IconShield className="h-8 w-8 text-mint transition-transform duration-300 group-hover:scale-110" />
                <span className="leading-tight">
                  <span className="block text-[11.5px] font-extrabold text-fog">{t("footer.trust", "نماد اعتماد")}</span>
                  <span className="block text-[10px] text-mist">{t("footer.trustSub", "الکترونیکی")}</span>
                </span>
              </a>
              <a href="#" className="group flex items-center gap-2.5 rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60">
                <IconWallet className="h-8 w-8 text-gold transition-transform duration-300 group-hover:scale-110" />
                <span className="leading-tight">
                  <span className="block text-[11.5px] font-extrabold text-fog">{t("footer.pay", "پرداخت امن")}</span>
                  <span className="block text-[10px] text-mist">{t("footer.paySub", "پی‌پینگ")}</span>
                </span>
              </a>
            </div>
          </div>

          <nav aria-label={t("footer.platforms", "پلتفرم‌ها")}>
            <h4 className="font-display text-[19px] text-fog">{t("footer.platforms", "پلتفرم‌ها")}</h4>
            <ul className="mt-4 space-y-2.5">
              {platformLinks.map((l) => (
                <LinkRow key={l.label} {...l} />
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.quick", "دسترسی سریع")}>
            <h4 className="font-display text-[19px] text-fog">{t("footer.quick", "دسترسی سریع")}</h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <LinkRow key={l.label} {...l} />
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="font-display text-[19px] text-fog">{t("footer.contact", "در تماس باشید")}</h4>
            <ul className="mt-4 space-y-3 text-[13.5px] text-mist">
              <li>
                {t("footer.telegram", "تلگرام")}: <bdo dir="ltr" className="font-bold text-fog">@IranFX_Official</bdo>
              </li>
              <li>
                {t("footer.email", "ایمیل")}: <bdo dir="ltr" className="font-bold text-fog">support@iranfx.ir</bdo>
              </li>
              <li>
                {t("footer.phone", "پشتیبانی تلفنی")}: <bdo dir="ltr" className="font-bold text-fog">۰۲۱-۹۱۳۰۴۰۰۰</bdo>
              </li>
              <li>
                {t("footer.hours", "ساعت پاسخگویی")}: <b className="text-mint">{t("footer.hoursVal", "۲۴ ساعته، حتی جمعه‌ها")}</b>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-white/8 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {extraCols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="font-display text-[19px] text-fog">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <LinkRow key={l.label} {...l} />
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-down/30 bg-down/8 p-5 text-[12.5px] leading-7 text-mist">
          <b className="text-down">{t("footer.riskTitle", "هشدار ریسک")}:</b> {t("footer.risk", "معاملات اهرمی ریسک بالایی دارد.")}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-7 text-[12.5px] text-mist">
          <p>{t("footer.copyright", "© ۱۴۰۴ - تمامی حقوق برای ایران افیکس محفوظ است.")}</p>
          <a href="#top" className="group flex items-center gap-2 transition-colors hover:text-mint">
            {t("footer.top", "بازگشت به بالای صفحه")}
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-mint/60">
              <IconUp className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
