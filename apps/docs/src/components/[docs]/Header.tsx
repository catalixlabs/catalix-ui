import React from "react";
import Link from "next/link";
import Catalix from "public/images/catalix.svg";
import { routes } from "@/const/routes";

export default function Header() {
  return (
    <header className="border-border sticky top-0 z-50 w-full border-b border-dashed backdrop-blur-md">
      <div className="max-w-8xl border-border mx-auto w-full border-x border-dashed">
        <div className="w-full px-4">
          <div className="flex h-full min-h-14 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-neutral-950 dark:text-white"
            >
              <Catalix className="size-4" />
              <span className="text-base font-medium">Catalix Docs</span>
            </Link>
            <div className="ml-4 flex items-center gap-2 text-sm">
              {routes.map((route, i) => (
                <Link
                  key={i}
                  href={route.path}
                  className="px-2 text-neutral-400"
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
