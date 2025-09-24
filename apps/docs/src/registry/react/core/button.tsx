import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/registry/react/utils/cn";

export type ButtonVarinat = VariantProps<typeof buttonVariant>;
export interface ButtonProps
  extends React.ComponentProps<"button">,
    ButtonVarinat {}

export default function Button({
  variant = "default",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariant({ variant, size, className }))}
      {...props}
    />
  );
}

export const buttonVariant = tv({
  base: [
    "pointer-events-none inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-white [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  variants: {
    variant: {
      default:
        "bg-zinc-950 text-white shadow-sm shadow-black/20 hover:bg-zinc-950/90 dark:bg-white dark:text-zinc-950 dark:hover:bg-white/90",
      destructive: "bg-red-600 text-white shadow-md hover:bg-red-600/90",
      outline:
        "border border-transparent bg-white shadow-sm shadow-black/15 ring-1 ring-zinc-950/10 duration-200 hover:bg-zinc-100/50 dark:bg-zinc-950 dark:ring-white/15 dark:hover:bg-zinc-800/50",
      secondary:
        "bg-zinc-100 text-zinc-950 shadow-sm hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-800/80",
      ghost:
        "hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-white",
      link: "text-zinc-950 underline-offset-4 hover:underline dark:text-white",
    },
    size: {
      sm: "h-8 rounded-md px-3 text-xs",
      md: "h-9 px-4 py-2",
      lg: "h-10 rounded-md px-8",
    },
  },
});
