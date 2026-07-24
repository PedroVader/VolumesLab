// Hand-drawn "blueprint" street map of the Churruca 5 block, matching the
// site's instrument/schematic illustration language (hairline strokes, mono
// labels, red survey pin). Not geographically exact, intentionally stylised.

const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Calle+Churruca+5,+Madrid,+Spain";

const street = { stroke: "currentColor", fill: "none", strokeLinecap: "round" } as const;

function StreetLabel({
  x,
  y,
  children,
  rotate = 0,
}: {
  x: number;
  y: number;
  children: string;
  rotate?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      className="fill-foreground font-mono"
      fontSize="13"
      letterSpacing="1.5"
      opacity="0.6"
    >
      {children}
    </text>
  );
}

export function HandDrawnMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden">
      <svg
        viewBox="0 0 800 500"
        role="img"
        aria-label="Stylised map of Volumes Lab at Calle Churruca 5, Madrid"
        className="h-auto w-full origin-center text-foreground max-sm:scale-[1.45]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* faint block texture */}
        <g stroke="currentColor" strokeOpacity="0.05" strokeWidth="1">
          {[80, 160, 240, 320, 400, 480, 560, 640, 720].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" />
          ))}
          {[80, 160, 240, 320, 400, 480].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} />
          ))}
        </g>

        {/* city blocks (subtle fills) */}
        <g className="fill-foreground" fillOpacity="0.035">
          <rect x="70" y="130" width="150" height="100" />
          <rect x="70" y="280" width="150" height="80" />
          <rect x="290" y="130" width="230" height="100" />
          <rect x="290" y="280" width="230" height="80" />
          <rect x="590" y="130" width="150" height="100" />
          <rect x="590" y="280" width="150" height="80" />
        </g>

        {/* main avenues (thicker) */}
        <line x1="0" y1="120" x2="800" y2="110" {...street} strokeWidth="9" strokeOpacity="0.14" />
        <line x1="0" y1="120" x2="800" y2="110" {...street} strokeWidth="1.5" />
        <line x1="255" y1="0" x2="270" y2="500" {...street} strokeWidth="9" strokeOpacity="0.14" />
        <line x1="255" y1="0" x2="270" y2="500" {...street} strokeWidth="1.5" />
        <line x1="560" y1="0" x2="575" y2="500" {...street} strokeWidth="9" strokeOpacity="0.14" />
        <line x1="560" y1="0" x2="575" y2="500" {...street} strokeWidth="1.5" />

        {/* side streets (hairlines) */}
        <line x1="0" y1="250" x2="800" y2="242" {...street} strokeWidth="1.5" />
        <line x1="0" y1="370" x2="800" y2="360" {...street} strokeWidth="1" strokeOpacity="0.7" />
        <line x1="130" y1="0" x2="140" y2="500" {...street} strokeWidth="1" strokeOpacity="0.7" />
        <line x1="410" y1="0" x2="422" y2="500" {...street} strokeWidth="1" strokeOpacity="0.7" />
        <line x1="700" y1="0" x2="710" y2="500" {...street} strokeWidth="1" strokeOpacity="0.7" />

        {/* street labels */}
        <StreetLabel x={300} y={104}>CALLE DE SAGASTA</StreetLabel>
        <StreetLabel x={150} y={236}>CALLE DE CHURRUCA</StreetLabel>
        <StreetLabel x={300} y={354}>CALLE DE SAN MATEO</StreetLabel>
        <StreetLabel x={244} y={430} rotate={-90}>FUENCARRAL</StreetLabel>
        <StreetLabel x={549} y={430} rotate={-90}>HORTALEZA</StreetLabel>

        {/* survey pin at Churruca 5 (red) */}
        <g className="text-primary">
          {/* crosshair guides */}
          <line x1="422" y1="246" x2="422" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 5" opacity="0.5" />
          <line x1="422" y1="246" x2="620" y2="246" stroke="currentColor" strokeWidth="1" strokeDasharray="4 5" opacity="0.5" />
          {/* pin */}
          <path
            d="M422 214 C 404 214 392 228 392 245 C 392 268 422 300 422 300 C 422 300 452 268 452 245 C 452 228 440 214 422 214 Z"
            className="fill-primary"
            stroke="none"
          />
          <circle cx="422" cy="244" r="9" className="fill-background" />
          <circle cx="422" cy="244" r="3.5" className="fill-primary" />
        </g>

        {/* compass */}
        <g className="fill-foreground" opacity="0.6">
          <text x="748" y="52" className="font-mono" fontSize="12" letterSpacing="1">N</text>
          <line x1="753" y1="60" x2="753" y2="90" stroke="currentColor" strokeWidth="1.5" />
          <path d="M753 58 L749 66 L757 66 Z" className="fill-foreground" />
        </g>

        {/* scale bar */}
        <g opacity="0.6">
          <line x1="60" y1="462" x2="160" y2="462" stroke="currentColor" strokeWidth="1.5" />
          <line x1="60" y1="457" x2="60" y2="467" stroke="currentColor" strokeWidth="1.5" />
          <line x1="160" y1="457" x2="160" y2="467" stroke="currentColor" strokeWidth="1.5" />
          <text x="60" y="452" className="fill-foreground font-mono" fontSize="10" letterSpacing="1">50 M</text>
        </g>
      </svg>
      </div>

      {/* location card: floats over the map on desktop, sits below it on mobile */}
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noreferrer"
        className="group block border-t border-foreground bg-background/95 p-4 transition-colors hover:border-primary sm:absolute sm:bottom-6 sm:right-6 sm:max-w-[15rem] sm:border sm:backdrop-blur-sm"
      >
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
          [ Volumes Lab ]
        </p>
        <p className="mt-2 text-sm leading-snug text-foreground">
          Calle Churruca 5, Centro
          <br />
          28004 Madrid
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors group-hover:text-primary">
          Get directions →
        </p>
      </a>
    </div>
  );
}
