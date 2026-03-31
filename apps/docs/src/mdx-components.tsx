import type { HTMLAttributes } from "react";
import type { MDXComponents } from "mdx/types";
import defaultComponents from "fumadocs-ui/mdx";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import * as DynamicLink from "fumadocs-core/dynamic-link";
import Link from "fumadocs-core/link";
import { Heading } from "@/mdx/components/heading";

import Button from "@/registry/react/core/button";
import Separator from "@/registry/react/core/separator";
import Input from "@/registry/react/core/input";
import Label from "@/registry/react/core/label";
import Textarea from "@/registry/react/core/textarea";

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
    Button,
    Separator,
    Input,
    Label,
    Textarea,
    ...TabsComponents,
    ...DynamicLink,
    Link,
    ...components,
  };
}
