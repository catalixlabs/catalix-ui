import React from "react";
import Link from "next/link";

const menu = [
  { label: "Documentation", path: "/docs" },
  { label: "Components", path: "/docs/components" },
  { label: "Blocks", path: "/docs/blocks" },
  { label: "Pricing", path: "/pricing" },
  { label: "Changelog", path: "/changelog" },
];

export default function Navigation() {
  return (
    <nav className="relative hidden lg:flex items-center justify-end flex-1">
      <ul className="flex flex-row gap-1 text-sm">
        {menu.map((_, i) => (
          <li key={i} className="relative">
            <Link href={_.path} className="flex items-center px-3">
              {_.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
