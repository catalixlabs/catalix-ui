"use client";

import * as React from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

export interface LabelProps
  extends React.ComponentProps<"label">,
    VariantProps<typeof labelVariants> {}

export default function Label({ className, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(labelVariants({ className }))}
      {...props}
    />
  );
}

export const labelVariants = tv({
  base: [
    "select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  ],
});
