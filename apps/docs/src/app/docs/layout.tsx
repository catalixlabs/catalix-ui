import { NextProvider as NextMDXProvider } from "fumadocs-core/framework/next";
import { source } from "@/lib/source";
import Sidebar from "@/components/[docs]/Sidebar";
import Footer from "@/components/[docs]/Footer";
import Header from "@/components/[docs]/Header";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <NextMDXProvider>
      <div className="bg-background relative z-10 flex min-h-svh flex-col">
        <Header />
        <main className="flex flex-1 flex-col">
          <div className="max-w-8xl border-border mx-auto flex w-full flex-1 flex-col border-x border-dotted">
            <div className="flex min-h-min flex-1 items-start">
              <Sidebar tree={source.pageTree} />
              <div className="h-full w-full">{children}</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </NextMDXProvider>
  );
}
