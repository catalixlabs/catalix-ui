import { NextProvider as MDXProvider } from "fumadocs-core/framework/next";
import Sidebar from "@/components/[docs]/Sidebar";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <MDXProvider>
      <div className="bg-background relative z-10 flex min-h-svh flex-col">
        <header className="bg-background border-border sticky top-0 z-50 h-16 w-full border-b border-dotted"></header>
        <div className="flex flex-1 flex-col">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-2">
            <div className="flex min-h-min w-full flex-1 items-start px-0">
              <Sidebar />
              {children}
            </div>
          </div>
        </div>
      </div>
    </MDXProvider>
  );
}
