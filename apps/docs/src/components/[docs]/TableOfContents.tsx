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
        className="sticky top-16 hidden w-full max-w-64 p-4 xl:block"
        style={{ height: "calc(100svh - 64px)" }}
      >
        <div className="flex w-full flex-col">
          <h3 className="pb-2 text-sm">On this page</h3>
          <ScrollProvider containerRef={viewRef}>
            <TOCTree items={buildTree(items)} />
          </ScrollProvider>
        </div>
      </div>
    </AnchorProvider>
  );
}

type TOCNode = TOCItemType & { children: TOCNode[] };

const buildTree = (items: TOCItemType[]) =>
  items.reduce<TOCNode[]>((acc, item) => {
    const node: TOCNode = { ...item, children: [] };

    // Find the right parent in the accumulated tree
    const parent = [...acc].reverse().find((n) => n.depth < node.depth);

    if (parent) parent.children.push(node);
    else acc.push(node);

    return acc;
  }, []);

const TOCTree = ({
  items,
}: {
  items: (TOCItemType & { children?: TOCItemType[] })[];
}) => {
  return (
    <ul className="border-border flex flex-col gap-2 border-l">
      {items?.map((item) => (
        <TreeItem key={item.url} item={item} />
      ))}
    </ul>
  );
};

const TreeItem = ({
  item,
}: {
  item: TOCItemType & { children?: TOCItemType[] };
}) => {
  const paddingLeft = (item.depth - 1) * 8;

  return (
    <li className="-ml-px flex flex-col gap-2">
      <TOCItem
        href={item.url}
        className="text-muted-foreground max-w-11/12 hover:text-foreground inline-block w-full truncate border-l border-transparent py-1.5 text-sm first:p-0 last:pb-0 aria-[current]:font-semibold data-[active=true]:border-blue-400 data-[active=true]:text-blue-400"
        style={{ paddingLeft: paddingLeft + "px" }}
      >
        {item.title}
      </TOCItem>

      {item.children && item.children.length > 0 && (
        <TOCTree items={item.children} />
      )}
    </li>
  );
};
