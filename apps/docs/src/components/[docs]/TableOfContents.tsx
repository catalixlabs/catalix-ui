"use client";

import { useRef } from "react";
import { AnchorProvider, ScrollProvider, TOCItem } from "fumadocs-core/toc";
import type { TOCItemType } from "fumadocs-core/server";

export default function TableOfContents({ items }: { items: TOCItemType[] }) {
  const viewRef = useRef<HTMLDivElement>(null);

  return (
    <AnchorProvider toc={items}>
      <div
        ref={viewRef}
        className="sticky top-16 z-30 hidden h-full w-full max-w-56 flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex"
      >
        <h3 className="text-fd-muted-foreground text-sm">On this page</h3>
        <div className="flex flex-col">
          <ScrollProvider containerRef={viewRef}>
            {items.map((item) => (
              <TOCItem
                key={item.url}
                href={item.url}
                className="text-muted-foreground relative py-1.5 text-sm transition first:pt-0 last:pb-0"
              >
                {item.title}
              </TOCItem>
            ))}
          </ScrollProvider>
        </div>
      </div>
    </AnchorProvider>
  );
}
