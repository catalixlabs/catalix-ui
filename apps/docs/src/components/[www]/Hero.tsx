import React from "react";
import Link from "next/link";
import Installer from "./Installer";

export default function Hero() {
  return (
    <section className="border-border relative border-b border-dotted">
      <div className="border-border mx-auto w-full max-w-7xl border-x border-dotted">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="relative flex flex-col items-center justify-center py-44">
            <h2 className="mx-auto max-w-5xl text-balance text-center text-4xl tracking-tighter sm:text-5xl lg:text-6xl xl:text-7xl">
              From design to code, own every line of your interface.
            </h2>
            <p className="text-muted-foreground mb-6 mt-4 max-w-2xl text-center text-base">
              Catalix UI gives you accessible React components that you fully
              own and control. Built on top of Radix UI for accessibility and
              styled with Tailwind CSS for sleek, modern design, every component
              is easy to copy, customize, and make entirely yours.
            </p>
            <div className="flex w-full max-w-md flex-col items-center gap-2 md:flex-row">
              <Installer />
              <Link
                href="/docs"
                className="focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium shadow-sm shadow-black/20 transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              >
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
