import { NextProvider as NextMDXProvider } from "fumadocs-core/framework/next";
import { source } from "@/lib/source";
import Sidebar from "@/components/[docs]/Sidebar";
import Footer from "@/components/[docs]/Footer";
import Header from "@/components/[docs]/Header";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <NextMDXProvider>
      <div className="bg-background relative flex min-h-svh flex-col">
        <div className="border-grid flex h-full flex-1 flex-col">
          <Header />
          <div className="flex h-full flex-1 flex-col">
            <div className="max-w-8xl border-border mx-auto w-full border-x border-dashed">
              <div className="flex h-full w-full flex-1 items-start px-4">
                <Sidebar tree={source.pageTree} />
                <main className="relative flex flex-1">{children}</main>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </NextMDXProvider>
  );
}
