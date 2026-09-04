import { TICKER_ITEMS } from "../lib/data";
import { IconDown, IconUp } from "./icons";

export default function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-shell relative z-40 overflow-hidden border-b border-white/8 bg-abyss/90">
      <div className="ticker-track items-center gap-10 py-2" style={{ "--ticker-speed": "46s" } as React.CSSProperties}>
        {items.map((it, i) => {
          const up = it.change >= 0;
          return (
            <span key={i} className="flex shrink-0 items-center gap-2.5 text-[12.5px] text-mist" dir="ltr">
              <span className="font-medium text-fog/90" dir="rtl">{it.pair}</span>
              <bdo dir="ltr" className="font-semibold tabular-nums text-fog">{it.price}</bdo>
              <span
                className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-bold tabular-nums ${
                  up ? "bg-mint/12 text-mint" : "bg-down/12 text-down"
                }`}
              >
                {up ? <IconUp className="h-3 w-3" /> : <IconDown className="h-3 w-3" />}
                <bdo dir="ltr">{it.change > 0 ? "+" : it.change < 0 ? "−" : ""}{Math.abs(it.change).toFixed(2)}٪</bdo>
              </span>
              <span className="mx-1 h-1 w-1 rounded-full bg-line" />
            </span>
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-l from-transparent to-abyss" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-abyss" />
    </div>
  );
}
