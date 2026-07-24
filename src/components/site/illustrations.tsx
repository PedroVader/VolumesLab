// Technical "lab blueprint" SVG illustrations · one per product.
// Monochrome, instrument-style schematics that match the site design system.
// When real photography exists, swap these slots for images.

import type { IllustrationKey } from "@/data/productContent";

function Grid() {
  return (
    <g stroke="currentColor" strokeOpacity="0.08" strokeWidth="1">
      {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="300" />
      ))}
      {[50, 100, 150, 200, 250].map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} />
      ))}
    </g>
  );
}

function Label({ x, y, children, anchor = "start" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="fill-foreground font-mono" fontSize="9" letterSpacing="1.5" opacity="0.75">
      {children}
    </text>
  );
}

function Crosshair({ x, y }: { x: number; y: number }) {
  return (
    <g stroke="currentColor" strokeWidth="1" opacity="0.9">
      <circle cx={x} cy={y} r="7" fill="none" />
      <line x1={x - 12} y1={y} x2={x + 12} y2={y} />
      <line x1={x} y1={y - 12} x2={x} y2={y + 12} />
    </g>
  );
}

const S = { stroke: "currentColor", strokeWidth: 1.5, fill: "none" } as const;
const DASH = { ...S, strokeDasharray: "4 4", opacity: 0.6 } as const;

function Vo2max() {
  return (
    <g>
      <Grid />
      {/* ramp curve rising to VO2max plateau */}
      <path d="M30 250 C 90 248, 130 230, 170 190 C 210 150, 240 110, 280 92 C 310 80, 340 78, 370 78" {...S} strokeWidth="2" />
      {/* VT markers */}
      <line x1="150" y1="215" x2="150" y2="270" {...DASH} />
      <line x1="265" y1="98" x2="265" y2="270" {...DASH} />
      <Label x={142} y={284}>VT1</Label>
      <Label x={257} y={284}>VT2</Label>
      <Crosshair x={370} y={78} />
      <Label x={300} y={60}>VO2MAX 46.2</Label>
      <Label x={30} y={30}>O2 UPTAKE · ML/KG/MIN</Label>
      <line x1="30" y1="270" x2="380" y2="270" {...S} opacity="0.4" />
    </g>
  );
}

function BodyComp() {
  return (
    <g>
      <Grid />
      {/* geometric body silhouette */}
      <circle cx="200" cy="62" r="20" {...S} strokeWidth="2" />
      <path d="M200 84 L200 150 M170 100 L230 100 M172 100 L168 165 M228 100 L232 165 M200 150 L182 235 M200 150 L218 235 M182 235 L180 258 M218 235 L220 258" {...S} strokeWidth="2" />
      {/* segment scan lines */}
      {[100, 122, 150, 185, 218].map((y) => (
        <line key={y} x1="150" y1={y} x2="250" y2={y} {...DASH} />
      ))}
      {/* side measurement bars */}
      <rect x="285" y="96" width="50" height="8" {...S} />
      <rect x="285" y="118" width="78" height="8" {...S} />
      <rect x="285" y="140" width="34" height="8" {...S} />
      <Label x={285} y={88}>LEAN 61.2 KG</Label>
      <Label x={285} y={166}>FAT 18.4%</Label>
      <Crosshair x={200} y={150} />
      <Label x={30} y={30}>3-D SCAN · 30 SEC</Label>
    </g>
  );
}

function Bone() {
  return (
    <g>
      <Grid />
      {/* vertebrae stack */}
      {[70, 100, 130, 160, 190].map((y, i) => (
        <rect key={y} x={168 - i * 2} y={y} width={64 + i * 4} height="22" rx="6" {...S} strokeWidth="2" />
      ))}
      <line x1="200" y1="60" x2="200" y2="222" {...DASH} />
      {/* hip joint */}
      <circle cx="262" cy="230" r="22" {...S} strokeWidth="2" />
      <circle cx="262" cy="230" r="8" {...S} />
      {/* T-score gauge */}
      <line x1="60" y1="255" x2="340" y2="255" {...S} opacity="0.4" />
      {[60, 130, 200, 270, 340].map((x) => (
        <line key={x} x1={x} y1="250" x2={x} y2="260" {...S} />
      ))}
      <Crosshair x={228} y={255} />
      <Label x={236} y={244}>T-SCORE −0.4</Label>
      <Label x={52} y={244}>−2.5</Label>
      <Label x={330} y={244}>+2.0</Label>
      <Label x={30} y={30}>DXA · LUMBAR + HIP</Label>
    </g>
  );
}

function Gait() {
  return (
    <g>
      <Grid />
      {/* alternating L/R footfall waves */}
      <path d="M20 200 L20 150 L60 150 L60 200 L100 200 L100 150 L140 150 L140 200 L180 200 L180 150 L220 150 L220 200" {...S} strokeWidth="2" />
      <path d="M60 230 L60 185 L100 185 L100 230 L140 230 L140 185 L180 185 L180 230 L220 230 L220 185 L260 185 L260 230" {...S} opacity="0.55" strokeWidth="1.5" />
      <Label x={24} y={140}>LEFT</Label>
      <Label x={64} y={248}>RIGHT</Label>
      {/* cadence ticks */}
      {[60, 140, 220].map((x) => (
        <line key={x} x1={x} y1="100" x2={x} y2="120" {...S} />
      ))}
      <Label x={56} y={90}>172 SPM</Label>
      <Crosshair x={300} y={185} />
      <Label x={288} y={165}>ASYM 3.1%</Label>
      <Label x={30} y={30}>FOOTFALL · 3-D CAPTURE</Label>
    </g>
  );
}

function Grip() {
  return (
    <g>
      <Grid />
      {/* gauge arc */}
      <path d="M90 220 A 110 110 0 0 1 310 220" {...S} strokeWidth="2" />
      <path d="M110 220 A 90 90 0 0 1 290 220" {...DASH} />
      {/* ticks */}
      {[0, 30, 60, 90, 120, 150, 180].map((deg) => {
        const rad = ((deg - 180) * Math.PI) / 180;
        const x1 = 200 + 110 * Math.cos(rad);
        const y1 = 220 + 110 * Math.sin(rad);
        const x2 = 200 + 122 * Math.cos(rad);
        const y2 = 220 + 122 * Math.sin(rad);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} {...S} />;
      })}
      {/* needle at ~72% */}
      <line x1="200" y1="220" x2={200 + 100 * Math.cos((-49 * Math.PI) / 180)} y2={220 + 100 * Math.sin((-49 * Math.PI) / 180)} {...S} strokeWidth="2.5" />
      <circle cx="200" cy="220" r="6" {...S} strokeWidth="2" />
      <Label x={176} y={262}>44 KG · P72</Label>
      <Label x={30} y={30}>DYNAMOMETRY · PEAK FORCE</Label>
    </g>
  );
}

function Metabolic() {
  return (
    <g>
      <Grid />
      {/* breath-by-breath double waveform */}
      <path d="M20 150 Q 45 90 70 150 T 120 150 T 170 150 T 220 150 T 270 150 T 320 150 T 370 150" {...S} strokeWidth="2" />
      <path d="M20 170 Q 45 215 70 170 T 120 170 T 170 170 T 220 170 T 270 170 T 320 170 T 370 170" {...S} opacity="0.55" strokeWidth="1.5" />
      <Label x={24} y={80}>O2</Label>
      <Label x={24} y={240}>CO2</Label>
      <Crosshair x={270} y={108} />
      <Label x={250} y={70}>RMR 1,680 KCAL</Label>
      <Label x={30} y={30}>INDIRECT CALORIMETRY</Label>
    </g>
  );
}

function Mobility() {
  return (
    <g>
      <Grid />
      {/* joint with range arcs */}
      <line x1="200" y1="220" x2="200" y2="110" {...S} strokeWidth="2" />
      <line x1="200" y1="220" x2="290" y2="150" {...S} strokeWidth="2" />
      <circle cx="200" cy="220" r="7" {...S} strokeWidth="2" />
      <path d="M200 150 A 70 70 0 0 1 263 183" {...DASH} />
      <path d="M200 120 A 100 100 0 0 1 290 157" {...S} opacity="0.5" />
      <Crosshair x={290} y={150} />
      <Label x={282} y={132}>88°</Label>
      <Label x={206} y={200}>SHOULDER ER</Label>
      <Label x={30} y={30}>ACTIVE RANGE · DEG</Label>
    </g>
  );
}

function Strength() {
  return (
    <g>
      <Grid />
      {/* isometric force-time curve */}
      <path d="M40 250 L40 250 C 70 250 85 90 110 82 C 140 74 220 74 250 80 C 285 88 300 240 330 248" {...S} strokeWidth="2" />
      <line x1="40" y1="250" x2="370" y2="250" {...S} opacity="0.4" />
      <line x1="60" y1="86" x2="270" y2="86" {...DASH} />
      <Label x={150} y={74}>PEAK 2.4× BW</Label>
      <Crosshair x={180} y={80} />
      <Label x={30} y={30}>FORCE · TIME · IMTP</Label>
      <Label x={290} y={268}>3 SEC HOLD</Label>
    </g>
  );
}

function Foundations() {
  return (
    <g>
      <Grid />
      {/* 2×2 instrument cluster */}
      <g>
        <circle cx="110" cy="90" r="34" {...S} strokeWidth="2" />
        <path d="M110 90 L110 56 A 34 34 0 0 1 139 106 Z" {...S} />
        <Label x={88} y={140}>COMP 18.4%</Label>
      </g>
      <g>
        <rect x="240" y="100" width="14" height="36" {...S} />
        <rect x="260" y="84" width="14" height="52" {...S} />
        <rect x="280" y="66" width="14" height="70" {...S} />
        <Label x={240} y={152}>GRIP 44 KG</Label>
      </g>
      <g>
        <path d="M80 220 Q 95 190 110 220 T 140 220" {...S} strokeWidth="2" />
        <Label x={80} y={248}>RMR 1,680</Label>
      </g>
      <g>
        <path d="M250 230 A 30 30 0 0 1 310 230" {...S} strokeWidth="2" />
        <line x1="280" y1="230" x2="302" y2="208" {...S} strokeWidth="2" />
        <Label x={242} y={248}>MOBILITY 86</Label>
      </g>
      <Label x={30} y={30}>BASELINE BATTERY · 4 PILLARS</Label>
    </g>
  );
}

function Longevity() {
  return (
    <g>
      <Grid />
      {/* pulse line */}
      <path d="M20 160 L90 160 L110 110 L135 210 L155 140 L170 160 L230 160 L250 120 L270 195 L288 150 L300 160 L380 160" {...S} strokeWidth="2" />
      {/* concentric healthspan rings */}
      <circle cx="320" cy="90" r="44" {...DASH} />
      <circle cx="320" cy="90" r="28" {...S} />
      <Crosshair x={320} y={90} />
      <Label x={292} y={32}>HEALTHSPAN</Label>
      <Label x={30} y={30}>CARDIO-METABOLIC SCREEN</Label>
    </g>
  );
}

function Performance() {
  return (
    <g>
      <Grid />
      {/* lactate exponential curve */}
      <path d="M30 240 C 120 238 170 230 210 205 C 250 180 280 120 310 70 C 320 52 330 42 340 36" {...S} strokeWidth="2" />
      <line x1="30" y1="212" x2="370" y2="212" {...DASH} />
      <line x1="228" y1="188" x2="228" y2="270" {...DASH} />
      <Crosshair x={228} y={188} />
      <Label x={238} y={180}>LT2 · 172 BPM</Label>
      <Label x={30} y={200}>4 MMOL</Label>
      <Label x={30} y={30}>LACTATE CURVE · MMOL/L</Label>
    </g>
  );
}

function Membership() {
  return (
    <g>
      <Grid />
      {/* upward trendline with quarterly retest points */}
      <path d="M40 240 C 120 235 180 190 240 150 C 290 118 330 80 360 62" {...S} strokeWidth="2" />
      {[70, 160, 250, 340].map((x, i) => {
        const ys = [222, 175, 122, 72];
        return (
          <g key={x}>
            <circle cx={x} cy={ys[i]} r="6" {...S} strokeWidth="2" />
            <line x1={x} y1={ys[i] + 14} x2={x} y2="268" {...DASH} />
            <Label x={x - 8} y={284}>{`Q${i + 1}`}</Label>
          </g>
        );
      })}
      <Label x={270} y={52}>+9.2% VO2MAX</Label>
      <Label x={30} y={30}>PROGRESS · 12 MONTHS</Label>
    </g>
  );
}

function Glp1() {
  return (
    <g>
      <Grid />
      {/* descending weight curve with medical check-ins */}
      <path d="M40 60 C 100 64 150 96 200 140 C 250 182 310 222 360 232" {...S} strokeWidth="2" />
      {[90, 175, 260, 345].map((x, i) => {
        const ys = [82, 128, 182, 226];
        return (
          <g key={x}>
            <rect x={x - 5} y={ys[i] - 5} width="10" height="10" {...S} strokeWidth="1.5" />
          </g>
        );
      })}
      <Label x={252} y={168}>MD CHECK-INS</Label>
      <Label x={284} y={208}>−6.2 KG / 12 WK</Label>
      <Label x={30} y={30}>WEIGHT · SUPERVISED</Label>
    </g>
  );
}

function CardioPack() {
  return (
    <g>
      <Grid />
      {/* HR zone bars */}
      {[
        { x: 60, h: 40 },
        { x: 120, h: 70 },
        { x: 180, h: 110 },
        { x: 240, h: 85 },
        { x: 300, h: 55 },
      ].map((b, i) => (
        <rect key={b.x} x={b.x} y={230 - b.h} width="36" height={b.h} {...S} strokeWidth={i === 2 ? 2.5 : 1.5} />
      ))}
      <Label x={172} y={106}>ZONE 2</Label>
      <Label x={60} y={252}>Z1</Label>
      <Label x={120} y={252}>Z2</Label>
      <Label x={180} y={252}>Z3</Label>
      <Label x={240} y={252}>Z4</Label>
      <Label x={300} y={252}>Z5</Label>
      <Crosshair x={198} y={120} />
      <Label x={30} y={30}>4 SESSIONS · ZONE COACHED</Label>
    </g>
  );
}

function PtPack() {
  return (
    <g>
      <Grid />
      {/* 10 session blocks, increasing height */}
      {Array.from({ length: 10 }).map((_, i) => {
        const h = 30 + i * 14;
        return <rect key={i} x={48 + i * 31} y={240 - h} width="18" height={h} {...S} strokeWidth={i === 9 ? 2.5 : 1.5} />;
      })}
      <Label x={286} y={60}>S10 · RETEST</Label>
      <Crosshair x={332} y={62} />
      <Label x={30} y={30}>10 SESSIONS · 1:1</Label>
    </g>
  );
}

function Retest() {
  return (
    <g>
      <Grid />
      {/* 12-month timeline with 4 retest points */}
      <line x1="30" y1="160" x2="370" y2="160" {...S} opacity="0.5" />
      {[70, 160, 250, 340].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={160} r="8" {...S} strokeWidth="2" />
          <circle cx={x} cy={160} r="2.5" className="fill-foreground" />
          <line x1={x} y1={i % 2 === 0 ? 120 : 200} x2={x} y2={i % 2 === 0 ? 152 : 168} {...DASH} />
          <Label x={x - 8} y={i % 2 === 0 ? 112 : 224}>{`T${i + 1}`}</Label>
        </g>
      ))}
      <Label x={30} y={268}>MO 0</Label>
      <Label x={330} y={268}>MO 12</Label>
      <Label x={30} y={30}>QUARTERLY RETESTS · 12 MO</Label>
    </g>
  );
}

const illustrations: Record<IllustrationKey, () => React.ReactElement> = {
  vo2max: Vo2max,
  bodycomp: BodyComp,
  bone: Bone,
  gait: Gait,
  grip: Grip,
  metabolic: Metabolic,
  mobility: Mobility,
  strength: Strength,
  foundations: Foundations,
  longevity: Longevity,
  performance: Performance,
  membership: Membership,
  glp1: Glp1,
  cardiopack: CardioPack,
  ptpack: PtPack,
  retest: Retest,
};

export function ProductIllustration({ k, className = "" }: { k: IllustrationKey; className?: string }) {
  const Inner = illustrations[k];
  return (
    <svg viewBox="0 0 400 300" role="img" aria-hidden className={`text-foreground ${className}`} preserveAspectRatio="xMidYMid meet">
      <Inner />
    </svg>
  );
}
