import type { ArtKey } from "@/lib/types";

/** Illustrations générées (paysage + route) utilisées tant que la cliente n'a pas fourni ses photos. */
export const palettes: Record<ArtKey, string[]> = {
  alpes: ["#1d2b44", "#3d5a80", "#98c1d9", "#e0fbfc", "#ee6c4d"],
  ardenne: ["#1b2a1e", "#2f4a35", "#5e8c61", "#c9d6b8", "#e8862c"],
  sud: ["#3b1f2b", "#8c3b3b", "#e07a5f", "#f2cc8f", "#f4f1de"],
  desert: ["#2b1a12", "#7a3e1d", "#c96a2b", "#f2b35b", "#fde7c4"],
  nuit: ["#0d1321", "#1d2d44", "#3e5c76", "#748cab", "#f0ebd8"],
  ecosse: ["#14213d", "#2b4162", "#5c7c5a", "#a3b18a", "#dad7cd"],
};

export function Landscape({ art, seed = 1, road = true }: { art: ArtKey; seed?: number; road?: boolean }) {
  const p = palettes[art] ?? palettes.alpes;
  const r = (n: number) => {
    const x = Math.sin(seed * 999 + n) * 10000;
    return x - Math.floor(x);
  };
  const ridge = (y: number, amp: number, n: number) => {
    let d = `M0 ${y}`;
    for (let i = 0; i <= 10; i++) d += ` L${i * 80} ${(y - r(i + n) * amp).toFixed(1)}`;
    return d + " L800 600 L0 600Z";
  };
  const id = `sky-${art}-${seed}`;
  const roadPath = `M${(330 + r(6) * 80).toFixed(0)} 600 C 250 520, 560 500, ${(420 + r(7) * 100).toFixed(0)} 430 S 380 390, 470 360`;

  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p[1]} />
          <stop offset="1" stopColor={p[3]} />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#${id})`} />
      <circle cx={150 + r(3) * 500} cy={140 + r(4) * 80} r={50 + r(5) * 30} fill={p[4]} opacity={0.85} />
      <path d={ridge(300, 140, 10)} fill={p[2]} opacity={0.7} />
      <path d={ridge(380, 120, 20)} fill={p[1]} />
      <path d={ridge(460, 80, 30)} fill={p[0]} />
      {road && (
        <>
          <path d={roadPath} stroke="#111" strokeWidth={46} fill="none" strokeLinecap="round" opacity={0.9} />
          <path d={roadPath} stroke={p[4]} strokeWidth={3} fill="none" strokeDasharray="14 14" />
        </>
      )}
    </svg>
  );
}
