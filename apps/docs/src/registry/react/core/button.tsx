import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export type ButtonVarinat = VariantProps<typeof buttonVariant>;
export interface ButtonProps
  extends React.ComponentProps<"button">,
    ButtonVarinat {}

export default function Button({
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariant({ variant, className })} {...props} />
  );
}

export const buttonVariant = tv({
  base: [
    "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  variants: {
    variant: {
      default:
        "shadow-sm shadow-black/20 bg-neutral-950 text-white hover:bg-neutral-900 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100",
      destructive: "bg-red-600 text-white shadow-md hover:bg-red-600/90",
      outline:
        "shadow-sm shadow-black/15 border border-transparent bg-white ring-1 ring-neutral-950/10 duration-200 hover:bg-neutral-100/50 dark:bg-neutral-950 dark:ring-white/15 dark:hover:bg-neutral-800/50",
      secondary:
        "bg-neutral-100 text-neutral-950 shadow-sm hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
      ghost:
        "hover:bg-neutral-100 hover:text-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-white",
      link: "text-neutral-950 underline-offset-4 hover:underline dark:text-white",
    },
  },
});
