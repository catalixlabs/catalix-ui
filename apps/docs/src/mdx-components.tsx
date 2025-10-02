import type { HTMLAttributes } from "react";
import type { MDXComponents } from "mdx/types";
import defaultComponents from "fumadocs-ui/mdx";
import { Heading } from "@/mdx/components/heading";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <Heading as="h1" {...props} />
    ),
    h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <Heading as="h2" {...props} />
    ),
    h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <Heading as="h3" {...props} />
    ),
    h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <Heading as="h4" {...props} />
    ),
    h5: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <Heading as="h5" {...props} />
    ),
    h6: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <Heading as="h6" {...props} />
    ),
    ...components,
  };
}
