import { HTMLAttributes, forwardRef } from "react";
import { cn } from "./Button";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "bordered";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-surface rounded-2xl shadow-sm",
      glass: "glass-card",
      bordered: "bg-surface rounded-2xl border border-surface-border",
    };

    return (
      <div
        ref={ref}
        className={cn(variants[variant], "p-6 md:p-8", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
