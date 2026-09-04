import {
  COPYRIGHT,
  FOOTER_EXTRA_COLS,
  FOOTER_PLATFORM_LINKS,
  FOOTER_QUICK_LINKS,
} from "../lib/data";
import {
  IconInstagram,
  IconMail,
  IconShield,
  IconTelegram,
  IconUp,
  IconWallet,
  LogoMark,
} from "./icons";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-abyss/75">
      <div className="bg-girih pointer-events-none absolute inset-0 opacity-[0.035]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8">
        {/* row 1: brand + existing columns */}
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#top" className="flex items-center gap-3">
              <LogoMark className="h-11 w-11" />
              <span className="font-display text-[28px] leading-none text-fog">ایران افیکس</span>
            </a>
            <p className="mt-4 max-w-xs text-[13.5px] leading-7 text-mist">
              اکوسیستم معاملاتی ایرانی‌ها برای بازارهای جهانی؛ طلا، رمزارز و فارکس در کنار ربات‌های
              سیگنال‌ده و آموزشی که همیشه به‌روز است.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { icon: IconTelegram, label: "تلگرام" },
                { icon: IconInstagram, label: "اینستاگرام" },
                { icon: IconMail, label: "ایمیل" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-mist transition-all duration-300 hover:-translate-y-1 hover:border-mint/60 hover:text-mint"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            {/* نمادها */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="group flex items-center gap-2.5 rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-mint/60"
              >
                <IconShield className="h-8 w-8 text-mint transition-transform duration-300 group-hover:scale-110" />
                <span className="leading-tight">
                  <span className="block text-[11.5px] font-extrabold text-fog">نماد اعتماد</span>
                  <span className="block text-[10px] text-mist">الکترونیکی</span>
                </span>
              </a>
              <a
                href="#"
                className="group flex items-center gap-2.5 rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60"
              >
                <IconWallet className="h-8 w-8 text-gold transition-transform duration-300 group-hover:scale-110" />
                <span className="leading-tight">
                  <span className="block text-[11.5px] font-extrabold text-fog">پرداخت امن</span>
                  <span className="block text-[10px] text-mist">پی‌پینگ</span>
                </span>
              </a>
            </div>
          </div>

          <nav aria-label="پلتفرم‌ها">
            <h4 className="font-display text-[19px] text-fog">پلتفرم‌ها</h4>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_PLATFORM_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="group inline-flex items-center gap-2 text-[13.5px] text-mist transition-colors hover:text-mint">
                    <span className="h-1 w-1 rounded-full bg-mint/60 transition-all duration-300 group-hover:w-2.5" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="دسترسی سریع">
            <h4 className="font-display text-[19px] text-fog">دسترسی سریع</h4>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="group inline-flex items-center gap-2 text-[13.5px] text-mist transition-colors hover:text-mint">
                    <span className="h-1 w-1 rounded-full bg-mint/60 transition-all duration-300 group-hover:w-2.5" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="font-display text-[19px] text-fog">در تماس باشید</h4>
            <ul className="mt-4 space-y-3 text-[13.5px] text-mist">
              <li>تلگرام: <bdo dir="ltr" className="font-bold text-fog">@IranFX_Official</bdo></li>
              <li>ایمیل: <bdo dir="ltr" className="font-bold text-fog">support@iranfx.ir</bdo></li>
              <li>پشتیبانی تلفنی: <bdo dir="ltr" className="font-bold text-fog">۰۲۱-۹۱۳۰۴۰۰۰</bdo></li>
              <li>ساعت پاسخگویی: <b className="text-mint">۲۴ ساعته، حتی جمعه‌ها</b></li>
            </ul>
          </div>
        </div>

        {/* row 2: new columns */}
        <div className="mt-12 grid gap-10 border-t border-white/8 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_EXTRA_COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="font-display text-[19px] text-fog">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="group inline-flex items-center gap-2 text-[13.5px] text-mist transition-colors hover:text-mint">
                      <span className="h-1 w-1 rounded-full bg-mint/60 transition-all duration-300 group-hover:w-2.5" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* risk warning */}
        <div className="mt-12 rounded-2xl border border-down/30 bg-down/8 p-5 text-[12.5px] leading-7 text-mist">
          <b className="text-down">هشدار ریسک:</b> معاملات اهرمی در بازارهای فارکس، طلا و رمزارز دارای
          ریسک بسیار بالایی است و ممکن است برای همه سرمایه‌گذاران مناسب نباشد. پیش از هر معامله، از
          سرمایه‌ای استفاده کنید که توان از دست دادن آن را دارید. عملکرد گذشته ربات‌های سیگنال‌ده،
          تضمین‌کننده نتایج آینده نیست. ایران افیکس هیچ‌گونه مشاوره سرمایه‌گذاری ارائه نمی‌دهد.
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-7 text-[12.5px] text-mist">
          <p>{COPYRIGHT}</p>
          <a href="#top" className="group flex items-center gap-2 transition-colors hover:text-mint">
            بازگشت به بالای صفحه
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-mint/60">
              <IconUp className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
