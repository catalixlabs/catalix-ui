import React from "react";

export default function Footer() {
  return (
    <footer className="border-border relative border-b border-dotted">
      <div className="border-border mx-auto w-full max-w-7xl border-x border-dotted">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="flex items-center justify-between py-12">
            <p className="text-muted-foreground text-sm">
              Copyright ©&nbsp;{new Date().getFullYear()}&nbsp;Catalix UI.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
