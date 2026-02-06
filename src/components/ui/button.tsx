import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-bold tracking-tight ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.96] disabled:grayscale",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_10px_20px_-5px_hsla(var(--primary),0.3)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90 shadow-[0_10px_20px_-5px_hsla(var(--destructive),0.3)]",
        outline:
          "border-2 border-primary/20 bg-transparent text-primary hover:bg-primary hover:text-white hover:border-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        scan: "bg-primary text-primary-foreground shadow-[0_15px_30px_-5px_hsla(var(--primary),0.4)] hover:shadow-[0_20px_40px_-5px_hsla(var(--primary),0.5)] hover:-translate-y-0.5",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-[0_10px_20px_-5px_hsla(var(--success),0.3)]",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 shadow-[0_10px_20px_-5px_hsla(var(--warning),0.3)]",
        glass: "glass text-foreground hover:bg-white/40 dark:hover:bg-black/40 border-white/30 shadow-xl",
      },
      size: {
        default: "h-14 px-8 py-4",
        sm: "h-10 rounded-xl px-4 text-xs",
        lg: "h-16 rounded-[1.5rem] px-10 text-base",
        xl: "h-20 rounded-[2rem] px-12 text-xl",
        icon: "h-12 w-12 rounded-xl",
        "icon-lg": "h-16 w-16 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
