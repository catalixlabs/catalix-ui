"use client";

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import {
  Button as ButtonPrimitive,
  ButtonProps as ButtonPrimitiveProps,
  composeRenderProps,
} from "react-aria-components";
import { twmx } from "twmx";

export type ButtonVarinat = VariantProps<typeof buttonStyle>;
export interface ButtonProps extends ButtonPrimitiveProps, ButtonVarinat {}

export default function Button({
  variant = "default",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={composeRenderProps(className, (className, renderProps) =>
        twmx(buttonStyle({ ...renderProps, variant, size, className }))
      )}
      {...props}
    />
  );
}

export const buttonStyle = tv({
  base: [
    "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    ,
  ],
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white",
      outline:
        "bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost:
        "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      sm: "h-8 rounded-md px-3 text-xs",
      md: "h-9 px-4 py-2 text-sm",
      lg: "h-10 rounded-md px-8 text-sm",
    },
  },
});
