import React from "react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex items-center justify-between py-4">
          <p className="text-sm">
            Copyright ©&nbsp;{new Date().getFullYear()}&nbsp;Catalix UI.
          </p>
        </div>
      </div>
    </footer>
  );
}
