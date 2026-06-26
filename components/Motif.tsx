const VARIANTS = {
  small: { width: 46, height: 70, radius: 23, dot: 3.5, offset: 11, color: "var(--gold)" },
  large: { width: 60, height: 90, radius: 30, dot: 4, offset: 14, color: "var(--champagne)" },
} as const;

export default function Motif({
  variant = "small",
  style,
}: {
  variant?: keyof typeof VARIANTS;
  style?: React.CSSProperties;
}) {
  const v = VARIANTS[variant];
  return (
    <div
      style={{
        width: v.width,
        height: v.height,
        border: `1px solid ${v.color}`,
        borderRadius: v.radius,
        position: "relative",
        ...style,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: v.offset,
          left: "50%",
          transform: "translateX(-50%)",
          width: v.dot,
          height: v.dot,
          borderRadius: "50%",
          background: v.color,
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: v.offset,
          left: "50%",
          transform: "translateX(-50%)",
          width: v.dot,
          height: v.dot,
          borderRadius: "50%",
          background: v.color,
        }}
      />
    </div>
  );
}
