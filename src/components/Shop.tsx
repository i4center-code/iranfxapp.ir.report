import { useEffect, useState } from "react";
import { useCart } from "../lib/cart";
import { COURSES, ROBOTS, type Product } from "../lib/data";
import { faNum } from "../lib/format";
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
  "robot-orobat": RobotOrobat,
  "robot-microbot": RobotMicrobot,
  "robot-yuz": RobotYuz,
};

function ProductArt({ p }: { p: Product }) {
  if (p.kind === "robot") {
    const Avatar = ROBOT_AVATARS[p.id];
    return (
      <span
        className="flex h-20 w-20 items-center justify-center rounded-3xl"
        style={{ background: `${p.accent}16`, border: `1px solid ${p.accent}44` }}
      >
        {Avatar ? <Avatar className="h-14 w-14" /> : <IconBolt className="h-8 w-8" />}
      </span>
    );
  }
  if (p.kind === "course") {
    const course = COURSES.find((c) => `course-${c.id}` === p.id);
    return (
      <span
        className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl"
        style={{ background: `${p.accent}14`, border: `1px solid ${p.accent}40` }}
      >
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
    <span
      className="flex h-20 w-20 items-center justify-center rounded-3xl"
      style={{ background: `${p.accent}16`, border: `1px solid ${p.accent}44` }}
    >
      {p.id === "plan-lifetime" ? (
        <IconShield className="h-9 w-9 text-gold" />
      ) : (
        <IconBolt className="h-9 w-9 text-mint" />
      )}
    </span>
  );
}

/* ---------- پنل خرید محصول ---------- */
function PurchaseDrawer() {
  const { purchase: p, closePurchase, addToCart, openCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(false);
  }, [p?.id]);

  if (!p) return null;

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
        aria-label={`خرید ${p.name}`}
        className="drawer-panel glass-deep fixed inset-y-0 left-0 z-[80] flex w-full max-w-[440px] flex-col border-l-0 border-r border-white/10"
      >
        <div className="relative overflow-hidden border-b border-white/8 px-7 py-6">
          <div
            className="pointer-events-none absolute -top-16 left-1/2 h-36 w-72 -translate-x-1/2 rounded-full blur-3xl opacity-25"
            style={{ background: p.accent }}
          />
          <div className="relative flex items-center gap-4">
            <ProductArt p={p} />
            <div className="min-w-0">
              <span
                className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                style={{ background: `${p.accent}1a`, color: p.accent }}
              >
                {p.kindLabel}
              </span>
              <h3 className="mt-1.5 truncate font-display text-[26px] leading-tight text-fog">{p.name}</h3>
            </div>
            <button
              onClick={closePurchase}
              aria-label="بستن پنل خرید"
              className="mr-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/4 text-mist transition-all hover:rotate-90 hover:border-down/50 hover:text-down"
            >
              <IconClose className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-6">
          <p className="text-[14px] leading-8 text-fog/90">{p.desc}</p>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {p.meta.map((m) => (
              <div key={m.label} className="rounded-xl border border-white/8 bg-white/3 px-3.5 py-3">
                <p className="text-[11px] text-mist">{m.label}</p>
                <p className="mt-1 text-[13.5px] font-extrabold text-fog">{m.value}</p>
              </div>
            ))}
          </div>

          <h4 className="mt-6 flex items-center gap-2 text-[13.5px] font-extrabold text-fog">
            <span className="h-4 w-1 rounded-full" style={{ background: p.accent }} />
            چه چیزهایی دریافت می‌کنید؟
          </h4>
          <ul className="mt-3.5 space-y-3">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[13.5px] leading-6 text-fog/85">
                <span
                  className="mt-0.5 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${p.accent}1a`, color: p.accent }}
                >
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
              <p className="text-[12px] text-mist">قیمت</p>
              <p className="font-display text-[34px] leading-none text-fog">
                {p.priceNum === 0 ? p.priceLabel : (
                  <>
                    {p.priceLabel}
                    <span className="mr-2 font-body text-[13px] font-bold text-mist">{p.unit}</span>
                  </>
                )}
              </p>
            </div>
            <span className="mb-1 flex items-center gap-1.5 rounded-full bg-mint/10 px-3 py-1 text-[11px] font-bold text-mint">
              <IconShield className="h-3.5 w-3.5" />
              ضمانت بازگشت وجه
            </span>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={onAdd}
              className={`shine flex flex-1 items-center justify-center gap-2.5 rounded-xl py-3.5 text-[15px] font-extrabold transition-all duration-300 active:scale-[0.97] ${
                added ? "bg-pine text-fog" : "bg-fog text-ink shadow-[0_12px_35px_-10px_rgba(255,255,255,0.5)] hover:brightness-95"
              }`}
            >
              {added ? (
                <>
                  <IconCheck className="h-5 w-5" />
                  به سبد اضافه شد
                </>
              ) : (
                <>
                  <IconCart className="h-5 w-5" />
                  افزودن به سبد خرید
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
              مشاهده سبد
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ---------- سبد خرید ---------- */
function CartDrawer() {
  const { cartOpen, closeCart, lines, total, removeLine, notify } = useCart();
  if (!cartOpen) return null;

  return (
    <>
      <div className="backdrop-in fixed inset-0 z-[75] bg-abyss/75 backdrop-blur-sm" onClick={closeCart} aria-hidden />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="سبد خرید"
        className="drawer-panel glass-deep fixed inset-y-0 left-0 z-[80] flex w-full max-w-[420px] flex-col border-l-0 border-r border-white/10"
      >
        <div className="flex items-center justify-between border-b border-white/8 px-7 py-6">
          <h3 className="flex items-center gap-3 font-display text-[26px] text-fog">
            <IconCart className="h-6 w-6 text-mint" />
            سبد خرید
            {lines.length > 0 && (
              <span className="rounded-full bg-mint px-2.5 py-0.5 font-body text-[12px] font-extrabold text-abyss">
                {faNum(lines.length)} مورد
              </span>
            )}
          </h3>
          <button
            onClick={closeCart}
            aria-label="بستن سبد خرید"
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
              <p className="font-display text-[22px] text-fog">سبد خرید شما خالی است</p>
              <p className="max-w-[240px] text-[13px] leading-6 text-mist">
                ربات‌ها و دوره‌های موردعلاقه‌تان را اضافه کنید تا اینجا منتظرتان باشند.
              </p>
              <button
                onClick={closeCart}
                className="mt-2 rounded-full bg-mint px-6 py-2.5 text-[13.5px] font-extrabold text-abyss transition-transform hover:scale-105 active:scale-95"
              >
                مشاهده محصولات
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((l) => (
                <li
                  key={l.id}
                  className="rise flex items-center gap-3.5 rounded-2xl border border-white/8 bg-white/3 p-4"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${l.accent}16`, border: `1px solid ${l.accent}3d` }}
                  >
                    {l.id.startsWith("robot") ? (
                      <IconBolt className="h-5 w-5" />
                    ) : l.id.startsWith("course") ? (
                      <IconBook className="h-5 w-5" />
                    ) : (
                      <IconShield className="h-5 w-5" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-extrabold text-fog">{l.name}</p>
                    <p className="text-[11.5px] text-mist">{l.kindLabel}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-[13.5px] font-extrabold tabular-nums text-fog" dir="ltr">
                      {l.priceNum === 0 ? l.priceLabel : l.priceLabel}
                    </p>
                    {l.priceNum > 0 && <p className="text-[10.5px] text-mist">تومان</p>}
                  </div>
                  <button
                    onClick={() => removeLine(l.id)}
                    aria-label={`حذف ${l.name}`}
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
              <span className="text-[13.5px] text-mist">جمع سبد خرید</span>
              <span className="font-display text-[26px] text-fog">
                {faNum(total)}
                <span className="mr-1.5 font-body text-[12px] font-bold text-mist">تومان</span>
              </span>
            </div>
            <button
              onClick={() => notify("در حال اتصال به درگاه امن پی‌پینگ…")}
              className="shine mt-4 w-full rounded-xl bg-fog py-4 text-[15.5px] font-extrabold text-ink shadow-[0_14px_40px_-10px_rgba(255,255,255,0.45)] transition-all duration-300 hover:brightness-95 active:scale-[0.97]"
            >
              تسویه حساب امن
            </button>
            <p className="mt-3 text-center text-[11.5px] text-mist/80">
              پرداخت از طریق درگاه امن پی‌پینگ انجام می‌شود
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
  if (!toast) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-8 z-[90] flex justify-center px-4">
      <div
        key={toast.id}
        className="rise glass-deep flex items-center gap-3 rounded-full border-mint/35 py-3 pl-6 pr-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint/18 text-mint ring-1 ring-mint/40">
          <IconCheck className="h-4 w-4" />
        </span>
        <p className="text-[13.5px] font-bold text-fog">{toast.msg}</p>
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
