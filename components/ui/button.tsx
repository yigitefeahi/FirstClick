import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-lab-ink text-white shadow-md shadow-lab-ink/15 hover:bg-brand-700 hover:shadow-lg dark:bg-lab-signal dark:text-[#0c1222] dark:hover:bg-[#d4f85c]":
              variant === "default",
            "bg-lab-mist text-lab-ink hover:bg-slate-200 dark:bg-[var(--lab-mist)] dark:text-[var(--lab-ink)] dark:hover:bg-white/10":
              variant === "secondary",
            "border border-slate-300 bg-white text-slate-800 hover:border-brand-500 hover:bg-brand-50 dark:border-white/15 dark:bg-transparent dark:text-slate-100 dark:hover:border-brand-400 dark:hover:bg-white/5":
              variant === "outline",
            "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white":
              variant === "ghost",
          },
          {
            "h-11 px-6 text-sm": size === "default",
            "h-9 px-4 text-sm": size === "sm",
            "h-12 px-8 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
