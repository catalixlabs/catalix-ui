"use client";

import * as React from "react";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cn, tv, VariantProps } from "tailwind-variants";

interface SeparatorProps
  extends SeparatorPrimitive.Props,
    VariantProps<typeof separatorVariants> {}

export default function Separator({
  orientation = "horizontal",
  className,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive
      orientation={orientation}
      className={cn(separatorVariants({ orientation }), className)}
      {...props}
    />
  );
}

const separatorVariants = tv({
  base: "pointer-events-none shrink-0 bg-neutral-200 dark:bg-neutral-800",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
});
