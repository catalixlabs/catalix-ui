import React from "react";

export default function Footer() {
  return (
    <footer className="relative">
      <div className="border-border mx-auto w-full max-w-7xl border border-x border-dashed">
        <div className="w-full px-4">
          <div className="flex min-h-14 items-center">
            <p className="text-foreground text-sm">
              &copy; Catalix UI {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
