import React from "react";
import Link from "next/link";
import Installer from "@/components/[www]/Installer";
import Button from "@/components/core/button";

export default function Hero() {
  return (
    <section className="border-border relative border-b border-dashed">
      <div className="border-border max-w-8xl mx-auto w-full border-x border-dashed">
        <div className="max-w-8xl mx-auto w-full px-4">
          <div className="relative flex flex-col items-center justify-center py-44">
            <h2 className="mx-auto max-w-5xl text-balance text-center text-4xl tracking-tighter text-neutral-950 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white">
              From design to code, own every line of your interface.
            </h2>
            <p className="mb-6 mt-4 max-w-2xl text-center text-base text-neutral-500 dark:text-neutral-400">
              Catalix UI gives you accessible React components that you fully
              own and control. Built on top of Radix UI for accessibility and
              styled with Tailwind CSS for sleek, modern design, every component
              is easy to copy, customize, and make entirely yours.
            </p>
            <div className="flex w-full max-w-md flex-col items-center gap-2 md:flex-row">
              <Installer />
              <Button asChild={true} variant="primary">
                <Link href="/docs">Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
