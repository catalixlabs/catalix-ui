import React from "react";
import Link from "next/link";
import Navigation from "./Navigation";
import Catalix from "public/images/catalix.svg";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-dashed border-neutral-950/10 bg-white backdrop-blur dark:border-white/10 dark:bg-neutral-900">
      <div className="max-w-8xl mx-auto w-full border-x border-dashed border-neutral-950/10 dark:border-white/10">
        <div className="max-w-8xl mx-auto w-full px-4">
          <div className="flex h-16 items-center justify-start gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-neutral-950 dark:text-white"
            >
              <Catalix className="size-6" />
              <span className="text-lg font-medium">Catalix UI</span>
            </Link>
            <nav className="relative hidden flex-1 items-center justify-end lg:flex">
              <Navigation />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
