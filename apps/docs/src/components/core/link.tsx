"use client";

import * as React from "react";
import {
  Link as LinkPrimitive,
  LinkProps as LinkPrimitiveProps,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { twmx } from "twmx";

type LinkVariants = VariantProps<typeof linkStyle>;
interface LinkProps extends LinkPrimitiveProps, LinkVariants {}

export default function Link({
  variant = "primary",
  size = "md",
  className,
  ...props
}: LinkProps) {
  return (
    <LinkPrimitive
      className={composeRenderProps(className, (className) =>
        twmx(linkStyle({ variant, size, className }))
      )}
      {...props}
    />
  );
}

const baseStyle = tv({
  base: [
    "relative isolate inline-flex cursor-pointer items-center justify-center gap-x-2 rounded-md border border-transparent px-3.5 py-2.5 text-base/6 font-medium disabled:pointer-events-none disabled:opacity-50 sm:px-3 sm:py-1.5 sm:text-sm/6 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
});

export const linkStyle = tv({
  extend: baseStyle,
  variants: {
    variant: {
      primary:
        "after:inset-shadow-2xs after:inset-shadow-white/15 bg-neutral-700/90 text-white before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-neutral-600 before:shadow-sm after:absolute after:inset-0 after:-z-10 after:rounded-md hover:bg-neutral-700 hover:after:bg-white/10 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-neutral-700 active:after:bg-white/10 disabled:before:shadow-none disabled:after:shadow-none dark:border-white/5 dark:bg-neutral-600 dark:before:hidden dark:after:-inset-px dark:after:rounded-md dark:hover:after:bg-white/5 dark:active:after:bg-white/5",
      secondary:
        "after:inset-shadow-2xs after:inset-shadow-white/15 bg-neutral-950/90 text-white before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-neutral-900 before:shadow-sm after:absolute after:inset-0 after:-z-10 after:rounded-md hover:bg-neutral-950 hover:after:bg-white/10 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-neutral-950 active:after:bg-white/10 disabled:before:shadow-none disabled:after:shadow-none dark:border-white/5 dark:bg-neutral-800 dark:before:hidden dark:after:-inset-px dark:after:rounded-md dark:hover:after:bg-white/5 dark:active:after:bg-white/5",
      destruct:
        "after:inset-shadow-2xs after:inset-shadow-white/15 bg-red-700/90 text-white after:absolute after:inset-0 after:-z-10 after:rounded-md hover:after:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:after:bg-white/15 disabled:before:shadow-none disabled:after:shadow-none dark:border-white/5 dark:bg-red-600 dark:before:hidden dark:after:-inset-px dark:after:rounded-md",
    },
    size: {
      sm: "h-8 rounded-md px-3 text-xs",
      md: "h-9 px-4 py-2 text-sm",
      lg: "h-10 rounded-md px-8 text-sm",
    },
  },
});
