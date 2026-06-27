import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
  label?: string;
  invert?: boolean;
}

export function Progress({
  value,
  className,
  barClassName,
  showLabel = true,
  label,
  invert = false,
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const displayValue = invert ? 100 - clamped : clamped;

  const barColor =
    displayValue >= 70
      ? "bg-gradient-to-r from-emerald-500 to-teal-500"
      : displayValue >= 45
        ? "bg-gradient-to-r from-amber-400 to-orange-400"
        : "bg-gradient-to-r from-red-400 to-rose-500";

  return (
    <div className={cn("space-y-2", className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="font-medium text-slate-700">{label}</span>}
          {showLabel && (
            <span className="font-semibold tabular-nums text-slate-900">{clamped}/100</span>
          )}
        </div>
      )}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", barColor, barClassName)}
          style={{ width: `${displayValue}%` }}
        />
      </div>
    </div>
  );
}
