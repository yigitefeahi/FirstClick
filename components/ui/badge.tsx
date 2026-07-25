import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "neutral";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-200": variant === "default",
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200":
            variant === "success",
          "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200": variant === "warning",
          "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-200": variant === "danger",
          "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300": variant === "neutral",
        },
        className
      )}
      {...props}
    />
  );
}
