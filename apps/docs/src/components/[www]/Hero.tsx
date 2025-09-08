import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-border relative border-b border-dashed">
      <div className="border-border mx-auto w-full max-w-6xl border-x border-dashed">
        <div className="mx-auto w-full max-w-6xl px-4 py-44">
          <div className="flex flex-col items-center justify-center">
            <h2 className="mx-2 max-w-5xl text-balance text-center text-4xl tracking-tighter sm:text-5xl lg:text-6xl xl:text-6xl">
              From design to code, own every line of your interface.{" "}
            </h2>
            <p className="mb-6 mt-4 max-w-lg text-center text-base text-zinc-600 dark:text-zinc-300">
              Foundry UI gives you accessible React components that you fully
              own and control. Built on top of Radix UI for rock-solid
              accessibility and styled with Tailwind CSS for sleek, modern
              design, every component is easy to copy, customize, and make
              entirely yours.
            </p>
            <div className="flex items-center gap-2">
              <Link
                href="/docs"
                className="focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium shadow-sm shadow-black/20 transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              >
                Documentation
              </Link>
              <Link
                href="/docs"
                className="focus-visible:ring-ring bg-background ring-foreground/10 hover:bg-muted/50 dark:ring-foreground/15 dark:hover:bg-muted/50 inline-flex h-9 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm shadow-black/15 ring-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              >
                View components
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
