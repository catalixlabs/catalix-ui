import React from "react";
import Link from "next/link";
import type { PageTree } from "fumadocs-core/server";

export default function Sidebar({ tree }: { tree: PageTree.Root }) {
  return (
    <aside className="hidden h-full w-full max-w-52 overflow-y-auto py-4 lg:block">
      <nav className="flex h-full w-full flex-col overflow-y-auto">
        <Tree tree={tree} />
      </nav>
    </aside>
  );
}

const TreeItem = ({ item }: { item: PageTree.Node }) => {
  if (item.type === "page") {
    return (
      <li className="flex flex-col">
        <Link
          href={item.url}
          className="text-muted-foreground hover:text-foreground block p-2"
        >
          {item.name}
        </Link>
      </li>
    );
  }

  if (item.type === "folder") {
    return (
      <li className="flex flex-col">
        <p className="p-2">{item.name}</p>
        {item.children && item.children.length && (
          <ul className="flex flex-col">
            {item.children.map((child) => (
              <TreeItem key={child.$id} item={child} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return null;
};

const Tree = ({ tree }: { tree: PageTree.Root }) => {
  return (
    <ul className="flex flex-col text-sm">
      {tree.children.map((item) => (
        <TreeItem key={item.$id} item={item} />
      ))}
    </ul>
  );
};
