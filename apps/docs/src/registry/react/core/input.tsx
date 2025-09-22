import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export type InputVariant = VariantProps<typeof inputVariants>;
export interface InputProps
  extends React.ComponentProps<"input">,
    InputVariant {}

export default function Input({ className, ...props }: InputProps) {
  return <input className={inputVariants({ className })} {...props} />;
}

export const inputVariants = tv({
  base: [
    "flex h-9 w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 dark:file:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  ],
});
