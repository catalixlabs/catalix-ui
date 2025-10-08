import type { ComponentPropsWithoutRef } from "react";
import { twMerge as cn } from "tailwind-merge";

type Types = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps<T extends Types> = Omit<ComponentPropsWithoutRef<T>, "as"> & {
  as?: T;
};

export function Heading<T extends Types = "h1">({
  as,
  className,
  ...props
}: HeadingProps<T>): React.ReactElement {
  const As = as || "h1";

  return <As className={cn(className)} {...props} />;
}
