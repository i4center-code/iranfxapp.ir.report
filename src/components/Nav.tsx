import { useEffect, useState } from "react";
import { NAV_LINKS } from "../lib/data";
import { IconDownload, LogoMark } from "./icons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* scroll progress */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
        <div
          className="h-full bg-gradient-to-l from-mint via-pine to-mint transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%`, float: "left" }}
        />
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-deep shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)]" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <span className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
              <LogoMark />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[26px] text-fog">ایران افیکس</span>
              <span className="mt-1 text-[10.5px] font-medium tracking-[0.28em] text-mint/80">
                IRAN FX
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-200 ${
                    active === l.id ? "text-mint" : "text-mist hover:text-fog"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-mint transition-all duration-300 ${
                      active === l.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#download"
              className="group hidden items-center gap-2 rounded-full bg-pine px-5 py-2.5 text-[14px] font-bold text-fog shadow-[0_8px_30px_-8px_rgba(28,137,108,0.8)] transition-all duration-300 hover:bg-mint hover:text-abyss sm:inline-flex"
            >
              <IconDownload className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-y-0.5" />
              دانلود اپلیکیشن
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "بستن منو" : "باز کردن منو"}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-white/12 bg-white/4 lg:hidden"
            >
              <span className={`h-[2px] w-5 rounded bg-fog transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-[2px] w-5 rounded bg-fog transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`h-[2px] w-5 rounded bg-fog transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>

        {/* mobile panel */}
        <div
          className={`overflow-hidden border-t border-white/6 transition-all duration-400 lg:hidden ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="space-y-1 bg-abyss/95 px-5 py-4 backdrop-blur-xl">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-[15px] font-medium text-mist transition-colors hover:bg-white/5 hover:text-mint"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#download"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-pine px-4 py-3 text-[15px] font-bold text-fog"
              >
                <IconDownload className="h-5 w-5" />
                دانلود اپلیکیشن
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
