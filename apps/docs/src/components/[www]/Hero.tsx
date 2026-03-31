import React from "react";
import Installer from "@/components/[www]/Installer";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="py-48">
          <div className="relative flex flex-col items-center justify-center">
            <h2 className="mx-auto max-w-5xl text-balance text-center text-4xl tracking-tighter text-neutral-950 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white">
              From design to code, own every line of your interface.
            </h2>
            <p className="mb-6 mt-4 max-w-2xl text-center text-base text-neutral-600 dark:text-neutral-400">
              Catalix UI gives you accessible React components that you fully
              own and control. Built on top of Base UI for accessibility and
              styled with Tailwind CSS for sleek, modern design, every component
              is easy to copy, customize, and make entirely yours.
            </p>
            <div className="flex w-full max-w-sm flex-col items-center gap-2 md:flex-row">
              <Installer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
