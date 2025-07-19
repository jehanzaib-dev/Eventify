export default function Spinner({ size = "6", color = "border-blue-500" }) {
  return (
    <div
      className={`
        h-${size} w-${size}
        animate-spin
        rounded-full
        border-4 border-t-transparent
        ${color}
      `}
    />
  );
}
