import { IconInstagram, IconMail, IconTelegram, IconUp, LogoMark } from "./icons";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "پلتفرم‌ها",
    links: [
      { label: "گلد افیکس — طلا", href: "#platforms" },
      { label: "کوین افیکس — رمزارز", href: "#platforms" },
      { label: "دلتا افیکس — فارکس", href: "#platforms" },
      { label: "مقایسه پلتفرم‌ها", href: "#platforms" },
    ],
  },
  {
    title: "دسترسی سریع",
    links: [
      { label: "ربات‌های سیگنال", href: "#robots" },
      { label: "آکادمی آموزشی", href: "#academy" },
      { label: "تعرفه اشتراک", href: "#plans" },
      { label: "دانلود اپلیکیشن", href: "#download" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-abyss/60">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
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
                { icon: IconTelegram, label: "تلگرام", href: "#top" },
                { icon: IconInstagram, label: "اینستاگرام", href: "#top" },
                { icon: IconMail, label: "ایمیل", href: "#top" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-mist transition-all duration-300 hover:-translate-y-1 hover:border-mint/50 hover:text-mint"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="font-display text-[19px] text-fog">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="group inline-flex items-center gap-2 text-[13.5px] text-mist transition-colors hover:text-mint">
                      <span className="h-1 w-1 rounded-full bg-mint/50 transition-all duration-300 group-hover:w-2.5" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

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

        {/* risk warning */}
        <div className="mt-12 rounded-2xl border border-down/25 bg-down/6 p-5 text-[12.5px] leading-7 text-mist">
          <b className="text-down">هشدار ریسک:</b> معاملات اهرمی در بازارهای فارکس، طلا و رمزارز دارای
          ریسک بسیار بالایی است و ممکن است برای همه سرمایه‌گذاران مناسب نباشد. پیش از هر معامله، از
          سرمایه‌ای استفاده کنید که توان از دست دادن آن را دارید. عملکرد گذشته ربات‌های سیگنال‌ده،
          تضمین‌کننده نتایج آینده نیست. ایران افیکس هیچ‌گونه مشاوره سرمایه‌گذاری ارائه نمی‌دهد.
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/6 pt-7 text-[12.5px] text-mist">
          <p>© ۱۴۰۴ ایران افیکس — تمامی حقوق محفوظ است.</p>
          <a href="#top" className="group flex items-center gap-2 transition-colors hover:text-mint">
            بازگشت به بالای صفحه
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-mint/50">
              <IconUp className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
