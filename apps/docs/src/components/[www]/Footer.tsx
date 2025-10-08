import React from "react";

export default function Footer() {
  return (
    <footer className="border-border relative border-b border-dashed">
      <div className="border-border max-w-8xl mx-auto w-full border-x border-dashed">
        <div className="max-w-8xl mx-auto w-full px-4">
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
