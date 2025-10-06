"use client";

import React from "react";
import Link from "next/link";
import type { PageTree } from "fumadocs-core/server";
import { usePathname } from "next/navigation";

const normalize = (url: string) => {
  if (url.length && url.endsWith("/")) return url.slice(0, -1);
  return url;
};

const isActive = (url: string, pathname: string, nested = true) => {
  url = normalize(url);
  pathname = normalize(pathname);
  return url === pathname || (nested && pathname.startsWith(`${url}/`));
};

export default function Sidebar({ tree }: { tree: PageTree.Root }) {
  return (
    <aside
      className="border-border sticky top-14 hidden w-full max-w-64 shrink-0 overflow-y-auto border-r border-dashed lg:block"
      style={{ height: "calc(100vh - 56px)" }}
    >
      <nav className="flex flex-col py-6">
        <Tree tree={tree} />
      </nav>
    </aside>
  );
}

const TreeItem = ({ item }: { item: PageTree.Node }) => {
  const pathname = usePathname();

  const active =
    item.type === "page" && item.url
      ? isActive(item.url, pathname, false)
      : false;

  if (item.type === "page") {
    return (
      <li className="flex flex-col">
        <Link
          href={item.url}
          data-active={active}
          className="text-muted-foreground hover:text-foreground block py-2 data-[active=true]:text-blue-400"
        >
          {item.name}
        </Link>
      </li>
    );
  }

  if (item.type === "folder") {
    return (
      <li className="flex flex-col">
        <p className="py-2 first:pt-0">{item.name}</p>
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
    <ul className="flex flex-col gap-2 text-sm">
      {tree.children.map((item) => (
        <TreeItem key={item.$id + item.type} item={item} />
      ))}
    </ul>
  );
};
