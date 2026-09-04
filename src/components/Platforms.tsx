import { useRef, useState } from "react";
import { PLATFORMS } from "../lib/data";
import { faPct } from "../lib/format";
import { MaskHeading, Reveal, useInView } from "../lib/motion";
import { Sparkline } from "./charts";
import {
  CoinMark,
  DeltaMark,
  GoldBars,
  IconArrowLeft,
  IconChevronLeft,
  IconChevronRight,
} from "./icons";

const MARKS: Record<string, (p: { className?: string }) => React.ReactElement> = {
  gold: GoldBars,
  coin: CoinMark,
  delta: DeltaMark,
};

export default function Platforms() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [headRef, headIn] = useInView<HTMLDivElement>();

  const update = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    setCanPrev(pos > 10);
    setCanNext(pos < max - 10);
  };

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const w = (card?.offsetWidth ?? 380) + 24;
    /* در چیدمان راست‌به‌چپ، پیمایش رو به جلو با مقدار منفی انجام می‌شود */
    el.scrollBy({ left: dir * -w, behavior: "smooth" });
  };

  return (
    <section id="platforms" className="relative scroll-mt-24 pt-10 lg:pt-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div
          ref={headRef}
          className={`mask-group mb-8 flex flex-wrap items-end justify-between gap-6 ${headIn ? "on" : ""}`}
        >
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/8 px-4 py-1.5 text-[13px] font-medium text-mint">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-mint" />
              پلتفرم‌های معاملاتی
            </span>
            <h2 className="font-display text-4xl leading-[1.15] text-fog sm:text-5xl">
              <MaskHeading
                lines={[
                  <>یک اکوسیستم،</>,
                  <>
                    سه میدان <span className="text-mint">نبرد</span>
                  </>,
                ]}
              />
            </h2>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label="پلتفرم قبلی"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/4 text-fog transition-all duration-300 hover:border-mint/50 hover:text-mint disabled:cursor-not-allowed disabled:opacity-30"
            >
              <IconChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label="پلتفرم بعدی"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/4 text-fog transition-all duration-300 hover:border-mint/50 hover:text-mint disabled:cursor-not-allowed disabled:opacity-30"
            >
              <IconChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Reveal>
          <div
            ref={scrollerRef}
            onScroll={update}
            className="scroller -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 lg:-mx-8 lg:px-8"
          >
            {PLATFORMS.map((p, idx) => {
              const Mark = MARKS[p.id];
              const up = p.change >= 0;
              return (
                <article
                  key={p.id}
                  data-card
                  className="group glass relative w-[300px] shrink-0 snap-start overflow-hidden rounded-[22px] p-6 transition-all duration-500 hover:-translate-y-2 sm:w-[370px] lg:w-[390px]"
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  {/* accent glow */}
                  <div
                    className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-500 opacity-25 group-hover:opacity-60"
                    style={{ background: p.accent }}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <span
                          className="flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105"
                          style={{ background: p.accentSoft, border: `1px solid ${p.accent}44` }}
                        >
                          <Mark className="h-11 w-11" />
                        </span>
                        <div>
                          <h3 className="font-display text-[27px] leading-tight text-fog">{p.name}</h3>
                          <p className="text-[11px] font-semibold tracking-[0.22em] text-mist" dir="ltr">
                            {p.en}
                          </p>
                        </div>
                      </div>
                      <span
                        className="rounded-full px-3 py-1 text-[11.5px] font-bold"
                        style={{ background: p.accentSoft, color: p.accent }}
                      >
                        {p.market}
                      </span>
                    </div>

                    <p className="mt-4 min-h-[52px] text-[14px] leading-7 text-mist">{p.tagline}</p>

                    <div className="mt-2 flex items-end justify-between gap-4">
                      <div dir="ltr" className="text-left">
                        <p className="text-[11px] font-medium text-mist">{p.pair}</p>
                        <p className="text-[26px] font-extrabold tabular-nums leading-tight text-fog">
                          {p.price}
                        </p>
                      </div>
                      <span
                        className={`mb-1 rounded-full px-2.5 py-1 text-[12px] font-bold tabular-nums ${
                          up ? "bg-mint/12 text-mint" : "bg-down/12 text-down"
                        }`}
                      >
                        {faPct(p.change)}
                      </span>
                    </div>

                    <div className="mt-2 h-16">
                      <Sparkline data={p.spark} accent={p.accent} className="h-full w-full" />
                    </div>

                    <ul className="mt-5 space-y-2.5 border-t border-white/8 pt-5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-[13.5px] text-fog/85">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke={p.accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m5 12.8 4.2 4.2L19 7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex items-center gap-3">
                      <button
                        className="flex-1 rounded-xl px-4 py-3 text-[14px] font-bold text-abyss transition-all duration-300 hover:brightness-110 active:scale-[0.97]"
                        style={{ background: p.accent }}
                      >
                        ورود به {p.name}
                      </button>
                      <a
                        href="#download"
                        className="group/link flex items-center gap-1.5 rounded-xl border border-white/12 px-4 py-3 text-[13px] font-medium text-mist transition-colors duration-300 hover:text-fog"
                      >
                        جزئیات
                        <IconArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-x-1" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>

        <p className="mt-1 text-center text-[12px] text-mist/70 md:hidden">
          برای دیدن هر سه پلتفرم، بکشید و رها کنید ←
        </p>
      </div>
    </section>
  );
}
