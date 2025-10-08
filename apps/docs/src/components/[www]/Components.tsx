import React from "react";

function chunkArray<T>(arr: T[], size: number) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

export default function Components() {
  const items = [...Array(12)]; // can be any length
  const rows = chunkArray(items, 4); // group into N's

  return (
    <section className="relative border-b border-dashed border-neutral-950/10 dark:border-white/10">
      <div className="max-w-8xl mx-auto w-full border-x border-dashed border-neutral-950/10 dark:border-white/10">
        <div className="max-w-8xl mx-auto w-full px-4">
          <div className="relative py-24">
            <div className="mx-auto flex max-w-md flex-col items-center gap-4 pb-12 text-center">
              <h2 className="text-balance text-4xl tracking-tighter text-neutral-950 sm:text-5xl dark:text-white">
                Components
              </h2>
              <p className="text-muted-foreground">
                Here you can find all the components available in the library.
                We are working on adding more components.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {rows.map((r, ri) => (
                <div
                  key={ri}
                  className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {r.map((_, i) => (
                    <div
                      key={i}
                      className="border-border relative flex flex-col gap-2 border p-2"
                    >
                      <div className="border-border bg-card min-h-56 border"></div>
                      <div className="relative">
                        <div className="flex flex-wrap items-center">
                          <h2 className="text-sm/6 font-medium">
                            Component {i + 1}
                          </h2>
                          <p className="text-muted-foreground line-clamp-1 w-full flex-none font-mono text-xs">
                            Component
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
