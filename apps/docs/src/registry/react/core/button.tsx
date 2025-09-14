import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export type ButtonVarinat = VariantProps<typeof buttonVariant>;
export interface ButtonProps
  extends React.ComponentProps<"button">,
    ButtonVarinat {}

export default function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button className={buttonVariant({ variant, className })} {...props} />
  );
}

export const buttonVariant = tv({
  base: [
    "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  variants: {
    variant: {
      default:
        "shadow-sm shadow-black/20 bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90",
      outline:
        "shadow-sm shadow-black/15 border border-transparent bg-background ring-1 ring-foreground/10 duration-200 hover:bg-muted/50 dark:ring-foreground/15 dark:hover:bg-muted/50",
      secondary:
        "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
