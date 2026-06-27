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
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-gradient-to-r from-brand-600 to-violet-600 text-white shadow-md shadow-brand-500/25 hover:from-brand-700 hover:to-violet-700 hover:shadow-lg hover:shadow-brand-500/30":
              variant === "default",
            "bg-slate-100 text-slate-900 hover:bg-slate-200": variant === "secondary",
            "border border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50":
              variant === "outline",
            "text-slate-600 hover:bg-slate-100 hover:text-slate-900": variant === "ghost",
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
