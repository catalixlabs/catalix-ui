import React from "react";
import Footer from "@/components/[www]/Footer";
import Header from "@/components/[www]/Header";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
