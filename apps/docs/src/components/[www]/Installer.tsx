"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import Button from "@/components/core/button";

const command = "npx @catalix/cli init";

export default function Installer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-neutral-950/5 bg-neutral-950/5 py-2 pl-4 pr-px text-sm font-light text-neutral-950 backdrop-blur-sm dark:border-neutral-50/5 dark:bg-neutral-50/5 dark:text-neutral-50">
      <span className="pointer-events-none shrink-0 select-none text-neutral-500 dark:text-neutral-400">
        $
      </span>
      <div className="flex-1 truncate text-left font-mono text-fuchsia-950 dark:text-fuchsia-100">
        {command}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          aria-label="Copy"
          variant="ghost"
          disabled={copied}
          onClick={handleCopy}
          className="size-8 p-0"
        >
          {copied ? <Check /> : <Copy />}
        </Button>
      </div>
    </div>
  );
}
