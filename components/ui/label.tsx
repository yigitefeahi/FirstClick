import { cn } from "@/lib/utils";
import { LabelHTMLAttributes, forwardRef } from "react";

const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-medium leading-none text-slate-700", className)}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label };
