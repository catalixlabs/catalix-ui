import { Fragment } from "react";
import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { source } from "@/lib/source";
import TableOfContents from "@/components/[docs]/TableOfContents";
import Pagination from "@/components/[docs]/Pagination";
import { ArrowUpRight } from "lucide-react";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  const links = page.data.links;

  return (
    <Fragment>
      <article className="mx-auto w-full min-w-0 max-w-2xl flex-1 py-6">
        <div className="mb-4 flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">{page.data.title}</h1>
          <p className="text-muted-foreground text-lg">
            {page.data.description}
          </p>
          <div className="flex items-center gap-2 pt-4">
            {links?.doc && (
              <Link
                href={links.doc}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-6 shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium outline-none transition focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-3 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              >
                Docs <ArrowUpRight />
              </Link>
            )}
            {links?.api && (
              <Link
                href={links.api}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-6 shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium outline-none transition focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-3 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              >
                API <ArrowUpRight />
              </Link>
            )}
          </div>
        </div>
        <div className="prose dark:prose-invert">
          <MDXContent components={getMDXComponents({})} />
        </div>
        <Pagination path={page.url} />
      </article>
      <div className="hidden w-full max-w-64 text-sm xl:block">
        <TableOfContents items={page.data.toc} />
      </div>
    </Fragment>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
