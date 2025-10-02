import React from "react";
import { findNeighbour } from "fumadocs-core/server";
import { source } from "@/lib/source";
import Link from "next/link";

export default function Pagination({ path }: { path: string }) {
  const pageTree = source.pageTree;
  const neighbours = findNeighbour(pageTree, path);

  if (!neighbours.previous && !neighbours.next) return null;

  return (
    <div className="mt-24 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {neighbours?.previous?.url && (
        <Link
          href={neighbours?.previous?.url}
          className="hover:bg-accent/80 hover:text-accent-foreground border-border flex flex-col gap-2 rounded-lg border p-4 text-sm transition-colors md:col-start-1"
        >
          <div className="inline-flex items-center gap-1.5 font-medium">
            <span className="text-foreground">{neighbours.previous.name}</span>
          </div>
          <p className="text-muted-foreground truncate">
            {neighbours.previous.description}
          </p>
        </Link>
      )}
      {neighbours?.next?.url && (
        <Link
          href={neighbours?.next?.url}
          className="hover:bg-accent/80 hover:text-accent-foreground border-border flex flex-col gap-2 rounded-lg border p-4 text-end text-sm transition-colors md:col-start-2"
        >
          <div className="inline-flex flex-row-reverse items-center gap-1.5 font-medium">
            <span className="text-foreground">{neighbours.next.name}</span>
          </div>
          <p className="text-muted-foreground truncate">
            {neighbours.next.description}
          </p>
        </Link>
      )}
    </div>
  );
}
