"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { tv } from "tailwind-variants";
import { cn } from "@/registry/react/utils/cn";

export default function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(separtorVariants({ orientation, className }))}
      {...props}
    />
  );
}

export const separtorVariants = tv({
  base: "bg-neutral-200 dark:bg-neutral-800 shrink-0 pointer-events-none",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
});
