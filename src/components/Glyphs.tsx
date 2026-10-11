/** Small line-art glyphs for the three "vectors" on the home page. Pure SVG + CSS animation. */

export function ResearchGlyph() {
  const pts = Array.from({ length: 48 }, (_, i) => {
    const x = 6 + i * 6.1;
    const spike = [9, 17, 23, 31, 38].includes(i);
    const y = 60 + Math.sin(i * 0.45) * 18 + (spike ? (i % 2 ? -26 : 24) : 0);
    return { x, y, spike };
  });
  return (
    <svg viewBox="0 0 300 120" className="vector-glyph" aria-hidden="true">
      <polyline
        points={pts.map((p) => `${p.x},${60 + Math.sin(((p.x - 6) / 6.1) * 0.45) * 18}`).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.spike ? 3 : 1.6}
          fill={p.spike ? "var(--signal)" : "currentColor"}
          opacity={p.spike ? 1 : 0.8}
        >
          {p.spike && <animate attributeName="r" values="2;4;2" dur="2.4s" begin={`${i * 0.1}s`} repeatCount="indefinite" />}
        </circle>
      ))}
    </svg>
  );
}

export function DevGlyph() {
  const layers = [56, 42, 28, 42, 56];
  return (
    <svg viewBox="0 0 300 120" className="vector-glyph" aria-hidden="true">
      {layers.map((h, li) => {
        const x = 40 + li * 55;
        const n = Math.round(h / 8);
        return (
          <g key={li}>
            {Array.from({ length: n }, (_, k) => {
              const y = 60 - h / 2 + (k * h) / Math.max(n - 1, 1);
              return (
                <circle key={k} cx={x} cy={y} r="2" fill="currentColor" opacity="0.85">
                  <animate
                    attributeName="opacity"
                    values="0.25;1;0.25"
                    dur="2.8s"
                    begin={`${li * 0.35 + k * 0.05}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })}
            {li < layers.length - 1 && (
              <line x1={x} y1={60 - h / 2} x2={x + 55} y2={60 + layers[li + 1] / 2} stroke="currentColor" strokeOpacity="0.2" />
            )}
            {li < layers.length - 1 && (
              <line x1={x} y1={60 + h / 2} x2={x + 55} y2={60 - layers[li + 1] / 2} stroke="currentColor" strokeOpacity="0.2" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function ExploreGlyph() {
  return (
    <svg viewBox="0 0 300 120" className="vector-glyph" aria-hidden="true">
      <g fill="none" stroke="currentColor">
        <circle cx="150" cy="60" r="48" strokeOpacity="0.5" />
        <ellipse cx="150" cy="60" rx="20" ry="48" strokeOpacity="0.25" />
        <ellipse cx="150" cy="60" rx="38" ry="48" strokeOpacity="0.2" />
        <line x1="102" y1="60" x2="198" y2="60" strokeOpacity="0.25" />
        <ellipse cx="150" cy="60" rx="46" ry="14" strokeOpacity="0.2" transform="translate(0 -22)" />
        <path d="M128 50 Q 175 -5 214 40" stroke="var(--signal)" strokeDasharray="3 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-28" dur="1.6s" repeatCount="indefinite" />
        </path>
      </g>
      <circle cx="128" cy="50" r="3.2" fill="var(--signal)" />
      <circle cx="214" cy="40" r="2.4" fill="currentColor" />
    </svg>
  );
}
