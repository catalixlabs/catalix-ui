"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { RouterProvider as RACRouterProvider } from "react-aria-components";

declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export default function RouterProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <RACRouterProvider navigate={router.push}>{children}</RACRouterProvider>
  );
}
