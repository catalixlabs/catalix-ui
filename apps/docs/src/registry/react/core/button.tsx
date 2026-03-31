"use client";

import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { tv, type VariantProps, cn } from "tailwind-variants";

interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {}

export default function Button({
  variant = "primary",
  size = "md",
  width = "auto",
  className,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, width }), className)}
      {...props}
    />
  );
}

const buttonVariants = tv({
  base: [
    "relative inline-flex shrink cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-transparent font-medium leading-none ring-1 ring-inset ring-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-20 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  variants: {
    variant: {
      primary:
        "bg-violet-600 text-white outline-violet-500 ring-violet-500 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-500",
      secondary: "bg-transparent text-neutral-600 hover:bg-neutral-100",
      destruct: "bg-red-600 text-white hover:bg-red-500",
    },
    width: {
      full: "w-full",
      auto: "w-auto",
    },
    size: {
      sm: "h-8 px-2 py-1 text-xs [&_svg]:size-3.5",
      md: "h-10 px-3 py-2 text-sm [&_svg]:size-3.5",
      lg: "h-10 px-3 py-2 text-base [&_svg]:size-3.5",
    },
  },
});
