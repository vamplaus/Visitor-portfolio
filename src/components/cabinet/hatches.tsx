/**
 * Engraving: hatch patterns shared by every drawing on the site.
 * Light falls from the upper left; darker faces get denser hatching, as on a
 * copperplate. Referenced as fill="url(#hatch-2)" from any SVG in the page.
 */
export function Hatches() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute" focusable="false">
      <defs>
        <pattern id="hatch-1" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#4a4b52" strokeWidth="0.7" />
        </pattern>
        <pattern id="hatch-2" width="3.5" height="3.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="3.5" stroke="#4a4b52" strokeWidth="0.75" />
        </pattern>
        <pattern id="hatch-3" width="3.5" height="3.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="3.5" stroke="#5d5f66" strokeWidth="0.8" />
          <line x1="0" y1="0" x2="3.5" y2="0" stroke="#4a4b52" strokeWidth="0.6" />
        </pattern>
        <pattern id="hatch-seal" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#7b1e2b" strokeWidth="1" />
        </pattern>
      </defs>
    </svg>
  );
}
