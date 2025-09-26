import type { MDXComponents } from "mdx/types";

const defaultMdxComponents: MDXComponents = {};

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
  };
}
