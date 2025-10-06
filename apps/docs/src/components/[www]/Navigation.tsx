import React from "react";
import Link from "next/link";

const menu = [
  { label: "Documentation", path: "/docs" },
  { label: "Components", path: "/docs/components" },
  { label: "Changelog", path: "/changelog" },
];

export default function Navigation() {
  return (
    <nav className="relative hidden flex-1 items-center justify-end lg:flex">
      <ul className="flex flex-row gap-1 text-sm">
        {menu.map((_, i) => (
          <li key={i} className="relative">
            <Link
              href={_.path}
              className="text-muted-foreground hover:text-foreground flex items-center px-3"
            >
              {_.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
