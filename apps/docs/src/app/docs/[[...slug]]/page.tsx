import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { source } from "@/lib/source";
import TableOfContents from "@/components/[docs]/TableOfContents";
import Footer from "@/components/[docs]/Footer";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <div className="flex size-full">
      <div className="flex1-1 w-full">
        <article className="mx-auto flex w-full min-w-0 max-w-2xl flex-col gap-4 py-8">
          <h1 className="text-3xl font-semibold">{page.data.title}</h1>
          <p className="text-muted-foreground text-lg">
            {page.data.description}
          </p>
          <div className="prose dark:prose-invert text-muted-foreground">
            <MDXContent components={getMDXComponents({})} />
          </div>
          <Footer path={page.url} />
        </article>
      </div>
      <TableOfContents items={page.data.toc} />
    </div>
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
