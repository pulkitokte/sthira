// src/components/morningFlow/illustrations/MotionArc.jsx
// Reusable dashed arc indicating rotational/circular movement (rolls,
// twists, circles). Shared by every illustration that needs to convey
// "this part moves in a circle/rotates" without redrawing arc math
// in each individual illustration file.

export default function MotionArc({
  cx,
  cy,
  r = 16,
  startAngle = -30,
  endAngle = 210,
}) {
  const toXY = (angleDeg) => {
    const rad = (Math.PI / 180) * angleDeg;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  const [x1, y1] = toXY(startAngle);
  const [x2, y2] = toXY(endAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

  return (
    <path
      d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`}
      strokeWidth={2.5}
      strokeDasharray="3 5"
      opacity={0.5}
    />
  );
}
