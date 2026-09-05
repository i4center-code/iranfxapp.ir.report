import { useEffect, useState } from "react";
import { useCart } from "../lib/cart";
import { COURSES, PLANS, ROBOTS, type Product } from "../lib/data";
import { useI18n } from "../lib/i18n";
import { Pattern } from "./Courses";
import {
  IconBolt,
  IconBook,
  IconCart,
  IconCheck,
  IconClose,
  IconShield,
  IconTrash,
  RobotMicrobot,
  RobotOrobat,
  RobotYuz,
} from "./icons";

const ROBOT_AVATARS: Record<string, (p: { className?: string }) => React.ReactElement> = {
  "robot-microbot": RobotMicrobot,
  "robot-orobat": RobotOrobat,
  "robot-yuz": RobotYuz,
};

const CRYPTO_ADDR = "TXk3fQz8vB2mR7yN5dC9wA4eH6jL1sP0uG";

function ProductArt({ p }: { p: Product }) {
  if (p.kind === "robot") {
    const Avatar = ROBOT_AVATARS[p.id];
    return (
      <span className="flex h-20 w-20 items-center justify-center rounded-3xl" style={{ background: `${p.accent}16`, border: `1px solid ${p.accent}44` }}>
        {Avatar ? <Avatar className="h-14 w-14" /> : <IconBolt className="h-8 w-8" />}
      </span>
    );
  }
  if (p.kind === "course") {
    const course = COURSES.find((c) => `course-${c.id}` === p.id);
    return (
      <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl" style={{ background: `${p.accent}14`, border: `1px solid ${p.accent}40` }}>
        {course ? (
          <span className="block h-12 w-16">
            <Pattern kind={course.pattern} color={p.accent} />
          </span>
        ) : (
          <IconBook className="h-8 w-8" />
        )}
      </span>
    );
  }
  return (
    <span className="flex h-20 w-20 items-center justify-center rounded-3xl" style={{ background: `${p.accent}16`, border: `1px solid ${p.accent}44` }}>
      {p.id === "plan-lifetime" ? <IconShield className="h-9 w-9 text-gold" /> : <IconBolt className="h-9 w-9 text-mint" />}
    </span>
  );
}

/* ---------- پنل خرید محصول ---------- */
function PurchaseDrawer() {
  const { purchase: p, closePurchase, addToCart, openCart } = useCart();
  const { t, loc, dir } = useI18n();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(false);
  }, [p?.id]);

  if (!p) return null;

  /* ---- ساخت نمای ترجمه‌شده محصول (مشخصات + امکانات) ---- */
  const base = p.id.split("-")[1] ?? "";
  const MKT: Record<string, string> = { "فارکس": "forex", "رمزارز": "crypto", "طلا": "gold", "شاخص‌ها": "indices" };
  let metaView: { label: string; value: string }[] = [];
  let featureView: string[] = [];

  if (p.kind === "robot") {
    const r = ROBOTS.find((x) => x.id === base);
    if (r) {
      const wr = loc(`${r.winRate}%`);
      const daily = t(`svc.${base}.daily`, r.daily);
      const style = t(`svc.${base}.time`, r.timeframe);
      metaView = [
        { label: t("prod.mWinRate", "نرخ موفقیت"), value: wr },
        { label: t("prod.mDaily", "سیگنال روزانه"), value: daily },
        { label: t("prod.mStyle", "سبک"), value: style },
        { label: t("prod.mMarkets", "بازارها"), value: r.markets.map((m) => t(`svc.mkt.${MKT[m] ?? m}`, m)).join(dir === "rtl" ? "، " : ", ") },
      ];
      featureView = [
        t("prod.fWinRate90", "نرخ موفقیت {v} در ۹۰ روز گذشته").replace("{v}", wr),
        t("prod.fDailyV", "سیگنال روزانه: {v}").replace("{v}", daily),
        t("prod.fStyleV", "سبک معاملاتی: {v}").replace("{v}", style),
        t("prod.fDelivery", "ارسال سیگنال به تلگرام و داخل اپلیکیشن"),
        t("prod.fGuarantee7", "گارانتی بازگشت وجه تا ۷ روز"),
      ];
    }
  } else if (p.kind === "course") {
    const c = COURSES.find((x) => x.id === base);
    if (c) {
      metaView = [
        { label: t("prod.mLevel", "سطح"), value: t(`course.${base}.lv`, c.level) },
        { label: t("prod.mTeacher", "مدرس"), value: t(`course.${base}.tc`, c.teacher) },
        { label: t("prod.mSessions", "جلسات"), value: t(`course.${base}.s`, c.sessions) },
        { label: t("prod.mHours", "مدت"), value: t(`course.${base}.h`, c.hours) },
      ];
      featureView = [
        t("prod.fLifetime", "دسترسی مادام‌العمر به ویدیوها"),
        t("prod.fPractice", "تمرین عملی روی چارت زنده"),
        t("prod.fCertificate", "گواهینامه پایان دوره ایران افیکس"),
        t("prod.fWeekly", "رفع اشکال هفتگی با مدرس"),
      ];
    }
  } else if (p.id === "plan-monthly") {
    metaView = [
      { label: t("prod.mValidity", "مدت اعتبار"), value: t("plan.duration30", "۳۰ روز") },
      { label: t("prod.mRenew", "تمدید"), value: t("plan.renewManual", "دستی و اختیاری") },
      { label: t("prod.mWarranty", "ضمانت"), value: t("plan.warranty7", "بازگشت ۷ روزه") },
    ];
    featureView = PLANS.monthly.features.map((f, i) => t(`plan.m.f${i + 1}`, f));
  } else {
    metaView = [
      { label: t("prod.mValidity", "مدت اعتبار"), value: t("plan.lifetimeVal", "همیشگی") },
      { label: t("prod.mCost", "هزینه"), value: t("plan.freeVal", "رایگان") },
      { label: t("prod.mActivation", "فعال‌سازی"), value: t("plan.activationAccount", "با افتتاح حساب") },
    ];
    featureView = PLANS.lifetime.features.map((f, i) => t(`plan.l.f${i + 1}`, f));
  }

  const desc =
    p.kind === "robot"
      ? t(`svc.${base}.d`, p.desc)
      : p.kind === "course"
        ? t(`course.${base}.d`, p.desc)
        : p.id === "plan-monthly"
          ? t("plan.m.desc", p.desc)
          : p.id === "plan-lifetime"
            ? t("plan.l.desc", p.desc)
            : p.desc;

  const onAdd = () => {
    addToCart(p);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <>
      <div className="backdrop-in fixed inset-0 z-[75] bg-abyss/75 backdrop-blur-sm" onClick={closePurchase} aria-hidden />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${t("shop.addToCart", "خرید")} — ${p.name}`}
        className="drawer-panel glass-deep fixed inset-y-0 left-0 z-[80] flex w-full max-w-[440px] flex-col border-l-0 border-r border-white/10"
      >
        <div className="relative overflow-hidden border-b border-white/8 px-7 py-6">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-36 w-72 -translate-x-1/2 rounded-full opacity-25 blur-3xl" style={{ background: p.accent }} />
          <div className="relative flex items-center gap-4">
            <ProductArt p={p} />
            <div className="min-w-0">
              <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: `${p.accent}1a`, color: p.accent }}>
                {p.kind === "robot"
                  ? t("svc.kindRobot", p.kindLabel)
                  : p.kind === "course"
                    ? t("svc.kindCourse", p.kindLabel)
                    : p.id === "plan-monthly"
                      ? t("plan.m.name", p.kindLabel)
                      : t("plan.l.name", p.kindLabel)}
              </span>
              <h3 className="mt-1.5 truncate font-display text-[26px] leading-tight text-fog">
                {p.id.startsWith("robot-")
                  ? t(`svc.${p.id.replace("robot-", "")}.t`, p.name)
                  : p.id.startsWith("course-")
                    ? t(`course.${p.id.replace("course-", "")}.t`, p.name)
                    : p.id === "plan-monthly"
                      ? t("plan.m.name", p.name)
                      : p.id === "plan-lifetime"
                        ? t("plan.l.name", p.name)
                        : p.name}
              </h3>
            </div>
            <button
              onClick={closePurchase}
              aria-label="بستن"
              className="mr-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/4 text-mist transition-all hover:rotate-90 hover:border-down/50 hover:text-down"
            >
              <IconClose className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-6">
          <p className="text-[14px] leading-8 text-fog/90">{desc}</p>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {metaView.map((m) => (
              <div key={m.label} className="rounded-xl border border-white/8 bg-white/3 px-3.5 py-3">
                <p className="text-[11px] text-mist">{m.label}</p>
                <p className="mt-1 text-[13.5px] font-extrabold text-fog">{m.value}</p>
              </div>
            ))}
          </div>

          <h4 className="mt-6 flex items-center gap-2 text-[13.5px] font-extrabold text-fog">
            <span className="h-4 w-1 rounded-full" style={{ background: p.accent }} />
            {t("shop.receive", "چه چیزهایی دریافت می‌کنید؟")}
          </h4>
          <ul className="mt-3.5 space-y-3">
            {featureView.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[13.5px] leading-6 text-fog/85">
                <span className="mt-0.5 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full" style={{ background: `${p.accent}1a`, color: p.accent }}>
                  <IconCheck className="h-3 w-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-white/8 bg-abyss/50 px-7 py-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[12px] text-mist">{t("shop.price", "قیمت")}</p>
              <p className="font-display text-[34px] leading-none text-fog" dir="ltr">
                {p.priceNum === 0 ? (
                  t("plan.l.free", p.priceLabel)
                ) : (
                  <>
                    {loc(p.priceLabel)}
                    <span className="mr-2 font-body text-[13px] font-bold text-mist" dir="rtl">
                      {p.id === "plan-monthly" ? t("plan.m.unit", p.unit) : t("svc.toman", p.unit)}
                    </span>
                  </>
                )}
              </p>
            </div>
            <span className="mb-1 flex items-center gap-1.5 rounded-full bg-mint/10 px-3 py-1 text-[11px] font-bold text-mint">
              <IconShield className="h-3.5 w-3.5" />
              {t("shop.guarantee", "ضمانت بازگشت وجه")}
            </span>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={onAdd}
              className={`shine flex flex-1 items-center justify-center gap-2.5 rounded-xl py-3.5 text-[15px] font-extrabold transition-all duration-300 active:scale-[0.97] ${
                added ? "bg-pine text-fog" : "bg-paper text-ink shadow-[0_12px_35px_-10px_rgba(255,255,255,0.5)] hover:brightness-95"
              }`}
            >
              {added ? (
                <>
                  <IconCheck className="h-5 w-5" />
                  {t("shop.added", "به سبد اضافه شد")}
                </>
              ) : (
                <>
                  <IconCart className="h-5 w-5" />
                  {t("shop.addToCart", "افزودن به سبد خرید")}
                </>
              )}
            </button>
            <button
              onClick={() => {
                closePurchase();
                openCart();
              }}
              className="rounded-xl border border-white/15 px-5 py-3.5 text-[13.5px] font-bold text-mist transition-all duration-300 hover:border-mint/60 hover:text-mint"
            >
              {t("shop.viewCart", "مشاهده سبد")}
            </button>
          </div>
          <p className="mt-3 text-center text-[11px] text-mist/80">{t("shop.payments", "پرداخت ریالی • رمزارز برای کاربران بین‌المللی")}</p>
        </div>
      </aside>
    </>
  );
}

/* ---------- سبد خرید با انتخاب روش پرداخت ---------- */
function CartDrawer() {
  const { cartOpen, closeCart, lines, total, removeLine, notify } = useCart();
  const { t, loc } = useI18n();
  const [method, setMethod] = useState<"rial" | "crypto">("rial");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (cartOpen) setCopied(false);
  }, [cartOpen]);

  const lineName = (l: { id: string; name: string; kindLabel: string }) => {
    if (l.id.startsWith("robot-")) return t(`svc.${l.id.replace("robot-", "")}.t`, l.name);
    if (l.id.startsWith("course-")) return t(`course.${l.id.replace("course-", "")}.t`, l.name);
    if (l.id === "plan-monthly") return t("plan.m.name", l.name);
    if (l.id === "plan-lifetime") return t("plan.l.name", l.name);
    return l.name;
  };
  const lineKind = (l: { id: string; name: string; kindLabel: string }) => {
    if (l.id.startsWith("robot-")) return t("svc.kindRobot", l.kindLabel);
    if (l.id.startsWith("course-")) return t("svc.kindCourse", l.kindLabel);
    if (l.id === "plan-monthly") return t("plan.m.name", l.kindLabel);
    if (l.id === "plan-lifetime") return t("plan.l.name", l.kindLabel);
    return l.kindLabel;
  };

  if (!cartOpen) return null;

  const copyAddr = async () => {
    try {
      await navigator.clipboard.writeText(CRYPTO_ADDR);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <>
      <div className="backdrop-in fixed inset-0 z-[75] bg-abyss/75 backdrop-blur-sm" onClick={closeCart} aria-hidden />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("shop.cartTitle", "سبد خرید")}
        className="drawer-panel glass-deep fixed inset-y-0 left-0 z-[80] flex w-full max-w-[430px] flex-col border-l-0 border-r border-white/10"
      >
        <div className="flex items-center justify-between border-b border-white/8 px-7 py-6">
          <h3 className="flex items-center gap-3 font-display text-[26px] text-fog">
            <IconCart className="h-6 w-6 text-mint" />
            {t("shop.cartTitle", "سبد خرید")}
            {lines.length > 0 && (
              <span className="rounded-full bg-mint px-2.5 py-0.5 font-body text-[12px] font-extrabold text-ink">{loc(lines.length)} {t("shop.items", "مورد")}</span>
            )}
          </h3>
          <button
            onClick={closeCart}
            aria-label="بستن"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/4 text-mist transition-all hover:rotate-90 hover:border-down/50 hover:text-down"
          >
            <IconClose className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-6">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-white/20 text-mist">
                <IconCart className="h-9 w-9" />
              </span>
              <p className="font-display text-[22px] text-fog">{t("shop.empty", "سبد خرید شما خالی است")}</p>
              <p className="max-w-[240px] text-[13px] leading-6 text-mist">{t("shop.emptyDesc", "ربات‌ها و دوره‌های موردعلاقه‌تان را اضافه کنید.")}</p>
              <button
                onClick={closeCart}
                className="mt-2 rounded-full bg-mint px-6 py-2.5 text-[13.5px] font-extrabold text-ink transition-transform hover:scale-105 active:scale-95"
              >
                {t("shop.viewProducts", "مشاهده محصولات")}
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((l) => (
                <li key={l.id} className="rise flex items-center gap-3.5 rounded-2xl border border-white/8 bg-white/3 p-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: `${l.accent}16`, border: `1px solid ${l.accent}3d` }}>
                    {l.id.startsWith("robot") ? <IconBolt className="h-5 w-5" /> : l.id.startsWith("course") ? <IconBook className="h-5 w-5" /> : <IconShield className="h-5 w-5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-extrabold text-fog">{lineName(l)}</p>
                    <p className="text-[11.5px] text-mist">{lineKind(l)}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-[13.5px] font-extrabold tabular-nums text-fog" dir="ltr">
                      {loc(l.priceLabel)}
                    </p>
                    {l.priceNum > 0 && <p className="text-[10.5px] text-mist">{t("svc.toman", "تومان")}</p>}
                  </div>
                  <button
                    onClick={() => removeLine(l.id)}
                    aria-label={`${t("shop.remove", "حذف")} ${l.name}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-mist transition-all duration-300 hover:bg-down/12 hover:text-down"
                  >
                    <IconTrash className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-white/8 bg-abyss/50 px-7 py-5">
            <div className="flex items-center justify-between">
              <span className="text-[13.5px] text-mist">{t("shop.total", "جمع سبد خرید")}</span>
              <span className="font-display text-[26px] text-fog" dir="ltr">
                {loc(total)}
                <span className="mr-1.5 font-body text-[12px] font-bold text-mist" dir="rtl">{t("svc.toman", "تومان")}</span>
              </span>
            </div>

            {/* انتخاب روش پرداخت */}
            <p className="mt-4 text-[12px] font-bold text-mist">{t("shop.payMethod", "روش پرداخت")}</p>
            <div className="mt-2 grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setMethod("rial")}
                className={`rounded-xl border px-3 py-3 text-right transition-all duration-300 ${
                  method === "rial" ? "border-mint/60 bg-mint/10" : "border-white/10 bg-white/3 hover:border-white/25"
                }`}
              >
                <span className={`block text-[13.5px] font-extrabold ${method === "rial" ? "text-mint" : "text-fog"}`}>{t("shop.gwRial", "درگاه ریالی")}</span>
                <span className="mt-0.5 block text-[10.5px] text-mist">{t("shop.gwRialSub", "پی‌پینگ • ایران")}</span>
              </button>
              <button
                onClick={() => setMethod("crypto")}
                className={`rounded-xl border px-3 py-3 text-right transition-all duration-300 ${
                  method === "crypto" ? "border-gold/60 bg-gold/10" : "border-white/10 bg-white/3 hover:border-white/25"
                }`}
              >
                <span className={`block text-[13.5px] font-extrabold ${method === "crypto" ? "text-gold" : "text-fog"}`}>{t("shop.gwCrypto", "رمزارز")}</span>
                <span className="mt-0.5 block text-[10.5px] text-mist">{t("shop.gwCryptoSub", "USDT • بین‌المللی")}</span>
              </button>
            </div>

            {method === "crypto" && (
              <div className="rise mt-3 rounded-xl border border-gold/30 bg-gold/6 p-3.5">
                <p className="text-[11px] leading-5 text-gold">{t("shop.cryptoNote", "مناسب کاربران خارج از ایران؛ پرداخت با تتر (TRC-20)، تون‌کوین یا بیت‌کوین.")}</p>
                <p className="mt-2.5 text-[10.5px] font-bold text-mist">{t("shop.cryptoAddr", "آدرس کیف پول USDT (TRC-20)")}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <code className="flex-1 truncate rounded-lg border border-white/10 bg-abyss/70 px-3 py-2 text-[11px] tabular-nums text-fog" dir="ltr">
                    {CRYPTO_ADDR}
                  </code>
                  <button
                    onClick={copyAddr}
                    className={`shrink-0 rounded-lg px-3 py-2 text-[11.5px] font-extrabold transition-all duration-300 active:scale-95 ${
                      copied ? "bg-mint text-ink" : "bg-gold text-ink hover:brightness-110"
                    }`}
                  >
                    {copied ? t("shop.copied", "کپی شد ✓") : t("shop.copy", "کپی آدرس")}
                  </button>
                </div>
                <p className="mt-2 text-[10.5px] text-mist/85">{t("shop.cryptoConfirm", "پس از واریز، رسید را در پشتیبانی ارسال کنید")}</p>
              </div>
            )}

            <button
              onClick={() => notify(method === "rial" ? "gw" : "crypto")}
              className={`shine mt-4 w-full rounded-xl py-4 text-[15.5px] font-extrabold text-ink shadow-[0_14px_40px_-10px_rgba(255,255,255,0.45)] transition-all duration-300 hover:brightness-95 active:scale-[0.97] ${
                method === "rial" ? "bg-paper" : "bg-gold"
              }`}
            >
              {method === "rial" ? t("shop.checkout", "تسویه حساب امن") : t("shop.checkoutCrypto", "پرداخت با رمزارز")}
            </button>
            <p className="mt-3 text-center text-[11.5px] text-mist/80">
              {method === "rial" ? t("shop.gwNote", "پرداخت از طریق درگاه امن پی‌پینگ انجام می‌شود") : "USDT (TRC-20) • TON • BTC"}
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

/* ---------- اعلان (توست) ---------- */
function ToastHost() {
  const { toast } = useCart();
  const { t } = useI18n();
  if (!toast) return null;

  const nameOf = (pid?: string) => {
    if (!pid) return "";
    if (pid.startsWith("robot-")) return t(`svc.${pid.replace("robot-", "")}.t`, pid);
    if (pid.startsWith("course-")) return t(`course.${pid.replace("course-", "")}.t`, pid);
    if (pid === "plan-monthly") return t("plan.m.name", "اشتراک یک‌ماهه");
    if (pid === "plan-lifetime") return t("plan.l.name", "اشتراک دائمی");
    return pid;
  };

  let msg = "";
  if (toast.kind === "added") msg = `«${nameOf(toast.pid)}» ${t("shop.toastAdded", "به سبد خرید اضافه شد")}`;
  else if (toast.kind === "dup") msg = `«${nameOf(toast.pid)}» ${t("shop.toastDup", "از قبل در سبد شماست")}`;
  else if (toast.kind === "gw") msg = t("shop.toastGw", "در حال اتصال به درگاه امن پی‌پینگ…");
  else msg = t("shop.toastCrypto", "سفارش شما برای پرداخت رمزارزی ثبت شد");

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-8 z-[90] flex justify-center px-4">
      <div key={toast.id} className="rise glass-deep flex items-center gap-3 rounded-full border-mint/35 py-3 pl-6 pr-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)]">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint/18 text-mint ring-1 ring-mint/40">
          <IconCheck className="h-4 w-4" />
        </span>
        <p className="text-[13.5px] font-bold text-fog">{msg}</p>
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <>
      <PurchaseDrawer />
      <CartDrawer />
      <ToastHost />
    </>
  );
}
