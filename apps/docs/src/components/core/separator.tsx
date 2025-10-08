"use client";

import * as React from "react";
import {
  Separator as SeparatorPrimitive,
  type SeparatorProps as SeparatorPrimitiveProps,
} from "react-aria-components";
import { tv, VariantProps } from "tailwind-variants";
import { twmx } from "twmx";

type SeparatorVariants = VariantProps<typeof separatorVariants>;
interface SeparatorProps extends SeparatorPrimitiveProps, SeparatorVariants {}

export default function Separator({
  orientation = "horizontal",
  className,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive
      orientation={orientation}
      className={twmx(separatorVariants({ orientation, className }))}
      {...props}
    />
  );
}

export const separatorVariants = tv({
  base: "pointer-events-none shrink-0 bg-neutral-200 dark:bg-neutral-800",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
});
