import React from "react";
import Link from "next/link";

const meta = [
  {
    title: "Get started",
    items: [
      {
        title: "Introduction",
        href: "/docs/get-started/introduction",
      },
      {
        title: "Installation",
        href: "/docs/get-started/installation",
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Button",
        href: "/docs/components/button",
      },
      {
        title: "Input",
        href: "/docs/components/input",
      },
      {
        title: "Label",
        href: "/docs/components/label",
      },
      {
        title: "Separator",
        href: "/docs/components/separator",
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="h-full w-full max-w-64">
      <nav className="flex h-full w-full flex-col overflow-y-auto">
        <ul className="flex flex-col gap-3 overflow-y-auto p-4">
          {meta.map((section) => (
            <li key={section.title}>
              <h3 className="text-forground mb-1 py-2 text-sm font-light">
                {section.title}
              </h3>
              <ul className="flex flex-col">
                {section.items.map((item, i) => (
                  <li key={i} className="relative">
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground block py-2 text-sm"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
