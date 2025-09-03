export default function Layout({ children }: LayoutProps<"/docs/[...slug]">) {
  return <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>;
}
