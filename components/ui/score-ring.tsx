import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  label: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  invert?: boolean;
}

const SIZES = {
  sm: { dimension: 88, stroke: 6, fontSize: "text-xl" },
  md: { dimension: 112, stroke: 8, fontSize: "text-2xl" },
  lg: { dimension: 140, stroke: 10, fontSize: "text-3xl" },
};

function getScoreColor(score: number, invert: boolean) {
  const display = invert ? 100 - score : score;
  if (display >= 70) return { stroke: "#10b981", text: "text-emerald-600" };
  if (display >= 45) return { stroke: "#f59e0b", text: "text-amber-600" };
  return { stroke: "#f43f5e", text: "text-rose-600" };
}

export function ScoreRing({ score, label, size = "md", className, invert = false }: ScoreRingProps) {
  const { dimension, stroke, fontSize } = SIZES[size];
  const radius = (dimension - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, score));
  const displayScore = invert ? 100 - clamped : clamped;
  const offset = circumference - (displayScore / 100) * circumference;
  const colors = getScoreColor(clamped, invert);

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: dimension, height: dimension }}>
        <svg width={dimension} height={dimension} className="-rotate-90">
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={stroke}
          />
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold tabular-nums", fontSize, colors.text)}>{clamped}</span>
        </div>
      </div>
      <span className="text-center text-xs font-medium text-slate-600">{label}</span>
    </div>
  );
}
