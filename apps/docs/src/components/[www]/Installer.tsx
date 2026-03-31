"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@base-ui/react/button";

const COMMAND = "npx @catalix/cli init";

export default function Installer() {
  const [, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-neutral-950/5 bg-neutral-950/5 py-2 pl-4 pr-px text-sm font-light text-neutral-950 backdrop-blur-sm dark:border-neutral-900 dark:bg-neutral-900/40">
      <span className="pointer-events-none shrink-0 select-none text-neutral-500">
        $
      </span>
      <div className="flex-1 truncate text-left font-mono dark:text-white">
        {COMMAND}
      </div>
      <div className="flex shrink-0 items-center gap-2 pr-1">
        <Button
          aria-label="Copy command"
          className="relative inline-flex size-8 shrink cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-transparent text-sm font-medium leading-none ring-1 ring-inset ring-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-20 dark:text-neutral-400 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0"
          onClick={handleCopyToClipboard}
        >
          <Copy />
        </Button>
      </div>
    </div>
  );
}
