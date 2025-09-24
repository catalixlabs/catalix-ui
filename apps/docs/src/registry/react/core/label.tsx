"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/registry/react/utils/cn";

export type LabelVariant = VariantProps<typeof labelVariants>;
export interface InputProps
  extends React.ComponentProps<typeof LabelPrimitive.Root>,
    LabelVariant {}

export default function Label({ className, ...props }: InputProps) {
  return (
    <LabelPrimitive.Root
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
