import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/registry/react/utils/cn";

export type TextareVariant = VariantProps<typeof textVariants>;
export interface InputProps
  extends React.ComponentProps<"textarea">,
    TextareVariant {}

export default function Textarea({ className, ...props }: InputProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textVariants({ className }))}
      {...props}
    />
  );
}

export const textVariants = tv({
  base: [
    "aria-invalid:border-red-600 aria-invalid:ring-red-600/20 dark:aria-invalid:ring-red-600/40 field-sizing-content flex min-h-16 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-base outline-none transition placeholder:text-neutral-500 focus-visible:border-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:border-white dark:focus-visible:ring-white/50",
  ],
});
