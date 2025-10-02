import React from "react";
import Link from "next/link";
import Catalix from "public/images/catalix.svg";

export default function Header() {
  return (
    <header className="bg-background/50 border-border sticky top-0 z-50 w-full border-b border-dotted backdrop-blur-md">
      <div className="border-border max-w-8xl mx-auto w-full border-x border-dotted">
        <div className="max-w-8xl mx-auto w-full px-4">
          <div className="flex h-full min-h-16 items-center">
            <Link href="/" className="text-foreground flex items-center gap-2">
              <Catalix className="size-6" />
              <span className="text-lg font-medium">Catalix Docs</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
