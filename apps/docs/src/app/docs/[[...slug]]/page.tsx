import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { source } from "@/lib/source";
import TableOfContents from "@/components/[docs]/TableOfContents";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <div className="flex h-full w-full">
      <article className="prose prose-neutral dark:prose-invert prose-p:text-muted-foreground prose-a:text-blue-500 prose-a:hover:text-blue-400 prose-a:no-underline prose-a:font-light prose-strong:font-normal prose-h1:text-4xl prose-h1:font-medium prose-h2:font-semibold prose-blockquote:p-3 prose-blockquote:text-sm prose-blockquote:not-italic prose-blockquote:font-light prose-blockquote:prose-p:m-0 prose-blockquote:border prose-blockquote:border-border prose-blockquote:rounded-md prose-ul:pl-1 prose-hr:border-border mx-auto h-full w-full px-4 py-8 text-base font-light leading-relaxed">
        <h1>{page.data.title}</h1>
        <p className="text-muted-foreground text-lg">{page.data.description}</p>
        <MDXContent components={getMDXComponents({})} />
      </article>
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
