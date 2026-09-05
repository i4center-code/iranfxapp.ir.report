import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useInView<T extends HTMLElement>(
  rootMargin = "0px 0px -12% 0px"
): [React.MutableRefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView];
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "span";
};

/** Fade-up scroll reveal. */
export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const Tag = as as "div";
  return (
    <Tag
      ref={ref}
      className={`rv ${inView ? "on" : ""} ${className}`}
      style={{ "--rv-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Staggered line-mask heading reveal. */
export function MaskHeading({
  lines,
  className = "",
  stagger = 130,
}: {
  lines: ReactNode[];
  className?: string;
  stagger?: number;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  return (
    <span
      ref={ref}
      className={`mask-group block ${inView ? "on" : ""} ${className}`}
    >
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <span style={{ "--ml-delay": `${i * stagger}ms` } as CSSProperties}>{line}</span>
        </span>
      ))}
    </span>
  );
}

/** Animated count-up that respects reduced motion. */
export function useCountUp(target: number, start: boolean, duration = 1600): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const tick = useCallback(
    (t0: number) => {
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(target * eased);
        if (p < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [target, duration]
  );
  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(target);
      return;
    }
    tick(performance.now());
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, reduced, tick]);
  return value;
}

/** Shared section header used across the page. */
export function SectionHead({
  kicker,
  title,
  desc,
  align = "center",
}: {
  kicker: string;
  title: ReactNode[];
  desc?: string;
  align?: "center" | "start";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-start";
  return (
    <Reveal className={`flex flex-col gap-4 ${alignCls} max-w-3xl ${align === "center" ? "mx-auto" : ""}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/8 px-4 py-1.5 text-[13px] font-medium tracking-wide text-mint">
        <span className="h-1.5 w-1.5 rounded-full bg-mint live-dot" />
        {kicker}
      </span>
      <h2 className="font-display text-4xl leading-[1.15] text-fog sm:text-5xl lg:text-[3.4rem]">
        <MaskHeading lines={title} />
      </h2>
      {desc && <p className="max-w-xl text-[15px] leading-8 text-mist">{desc}</p>}
    </Reveal>
  );
}
