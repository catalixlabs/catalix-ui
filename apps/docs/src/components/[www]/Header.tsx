import React from "react";
import Link from "next/link";
import Navigation from "./Navigation";
import Catalix from "public/images/catalix.svg";

export default function Header() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 w-full border-b border-dotted backdrop-blur">
      <div className="border-border mx-auto w-full max-w-7xl border-x border-dotted">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="flex h-16 items-center justify-start gap-6">
            <Link href="/" className="text-foreground flex items-center gap-2">
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
