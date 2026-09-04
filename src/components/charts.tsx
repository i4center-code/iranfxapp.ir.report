import { useId } from "react";

export type Candle = { o: number; h: number; l: number; c: number };

/** Deterministic PRNG so charts are stable between renders. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function genCandles(
  seed: number,
  n: number,
  start: number,
  vol: number,
  drift = 0
): Candle[] {
  const rnd = mulberry32(seed);
  const out: Candle[] = [];
  let prev = start;
  for (let i = 0; i < n; i++) {
    const o = prev;
    const move = (rnd() - 0.48 + drift) * vol;
    const c = o + move;
    const h = Math.max(o, c) + rnd() * vol * 0.55;
    const l = Math.min(o, c) - rnd() * vol * 0.55;
    out.push({ o, h, l, c });
    prev = c;
  }
  return out;
}

export function CandleChart({
  candles,
  up = "#3ecf9a",
  down = "#e5656c",
  className = "",
  animateKey = 0,
}: {
  candles: Candle[];
  up?: string;
  down?: string;
  className?: string;
  animateKey?: string | number;
}) {
  const W = 340;
  const H = 150;
  const P = 8;
  const highs = candles.map((c) => c.h);
  const lows = candles.map((c) => c.l);
  const max = Math.max(...highs);
  const min = Math.min(...lows);
  const range = max - min || 1;
  const y = (v: number) => P + ((max - v) / range) * (H - P * 2);
  const n = candles.length;
  const step = W / n;
  const bw = Math.min(step * 0.62, 9);

  return (
    <svg
      key={animateKey}
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      preserveAspectRatio="none"
      aria-hidden
    >
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1="0"
          x2={W}
          y1={H * g}
          y2={H * g}
          stroke="rgba(255,255,255,0.06)"
          strokeDasharray="3 5"
        />
      ))}
      {candles.map((c, i) => {
        const isUp = c.c >= c.o;
        const color = isUp ? up : down;
        const cx = i * step + step / 2;
        const top = y(Math.max(c.o, c.c));
        const bodyH = Math.max(Math.abs(y(c.o) - y(c.c)), 1.6);
        return (
          <g key={`${animateKey}-${i}`} className="candle" style={{ animationDelay: `${i * 26}ms` }}>
            <line x1={cx} x2={cx} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth="1.3" />
            <rect x={cx - bw / 2} y={top} width={bw} height={bodyH} rx="1.2" fill={color} />
          </g>
        );
      })}
    </svg>
  );
}

export function Sparkline({
  data,
  accent,
  className = "",
  filled = true,
}: {
  data: number[];
  accent: string;
  className?: string;
  filled?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const W = 120;
  const H = 40;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    4 + ((max - v) / range) * (H - 8),
  ]);
  const path = pts.map(([x, yy], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${yy.toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} preserveAspectRatio="none" aria-hidden>
      {filled && (
        <defs>
          <linearGradient id={`sg-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.32" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {filled && (
        <path
          className="spark-area"
          d={`${path} L${W},${H} L0,${H} Z`}
          fill={`url(#sg-${id})`}
        />
      )}
      <path
        className="spark-path"
        d={path}
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={last[0]} cy={last[1]} r="2.4" fill={accent} />
    </svg>
  );
}

/** Small deterministic QR-like pattern for the download section. */
export function QrPattern({ className = "h-28 w-28" }: { className?: string }) {
  const n = 17;
  const cells: boolean[] = [];
  const rnd = mulberry32(1404);
  for (let i = 0; i < n * n; i++) cells.push(rnd() > 0.52);
  const finder = (fx: number, fy: number) => (
    <g key={`${fx}-${fy}`}>
      <rect x={fx} y={fy} width="5" height="5" fill="none" stroke="#f3f5fb" strokeWidth="1" />
      <rect x={fx + 1.5} y={fy + 1.5} width="2" height="2" fill="#3ecf9a" />
    </g>
  );
  return (
    <svg viewBox={`0 0 ${n} ${n}`} className={className} shapeRendering="crispEdges" aria-hidden>
      {cells.map((on, i) => {
        const x = i % n;
        const yy = Math.floor(i / n);
        const inFinder =
          (x < 6 && yy < 6) || (x > n - 7 && yy < 6) || (x < 6 && yy > n - 7);
        if (!on || inFinder) return null;
        return <rect key={i} x={x} y={yy} width="0.82" height="0.82" fill="#f3f5fb" />;
      })}
      {finder(0.5, 0.5)}
      {finder(n - 5.5, 0.5)}
      {finder(0.5, n - 5.5)}
    </svg>
  );
}
