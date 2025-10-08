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
      <ul className="flex flex-row gap-2">
        {menu.map((_, i) => (
          <li key={i} className="relative">
            <Link
              href={_.path}
              className="flex items-center px-3 text-sm/6 text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white"
            >
              {_.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
