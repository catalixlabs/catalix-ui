import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/registry/react/utils/cn";

export type InputVariant = VariantProps<typeof inputVariants>;
export interface InputProps
  extends React.ComponentProps<"input">,
    InputVariant {}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      className={cn(inputVariants({ className }))}
      {...props}
    />
  );
}

export const inputVariants = tv({
  base: [
    "aria-invalid:ring-red-600/20 aria-invalid:border-red-600 flex h-9 w-full min-w-0 rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-base outline-none transition selection:bg-neutral-950 selection:text-white file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:border-neutral-950 focus-visible:ring-[3px] focus-visible:ring-neutral-950/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:ring-white/15 dark:selection:text-neutral-950 dark:file:text-white dark:placeholder:text-neutral-400 dark:focus-visible:border-white dark:focus-visible:ring-white/50",
  ],
});
