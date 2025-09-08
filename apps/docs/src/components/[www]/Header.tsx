import React from "react";
import Link from "next/link";
import Navigation from "./Navigation";
import Foundry from "public/images/foundry.svg";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-dashed border-border bg-background/80 backdrop-blur">
      <div className="border-x border-border border-dashed max-w-6xl w-full mx-auto">
        <div className="max-w-6xl w-full mx-auto px-4">
          <div className="flex h-16 items-center justify-start gap-6">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <Foundry className="size-8" />
              <span className="text-lg font-medium">Foundry UI</span>
            </Link>
            <nav className="relative hidden lg:flex items-center justify-end flex-1">
              <Navigation />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
