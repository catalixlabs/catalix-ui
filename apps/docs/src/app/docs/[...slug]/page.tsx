import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import fs from "fs";
import path from "path";
import MDXTest from "@/components/MDXTest";
import { type Metadata } from "next";

type TFrontmatter = {
  title: string;
  description: string;
};

async function getContent(slugs: string[]) {
  const contentDir = path.join(process.cwd(), "src/contents");
  const filePath = path.join(contentDir, ...slugs) + ".mdx";
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { frontmatter, strippedSource: content } =
    getFrontmatter<TFrontmatter>(fileContent);

  return { frontmatter, content };
}

export default async function Page({ params }: PageProps<"/docs/[...slug]">) {
  const { slug } = await params;
  const result = await getContent(slug);

  if (!result) notFound();

  const { content } = result;

  return (
    <div className="max-w-4xl">
      <div className="prose prose-slate">
        <MDXRemote source={content} components={{ MDXTest }} />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/docs/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  const res = await getContent(slug);
  if (!res) return {};
  const title = res.frontmatter.title + " | Foundry UI";
  const description = res.frontmatter.description;

  return { title, description };
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src/contents");
  const params: { slug: string[] }[] = [];

  function scanDir(dir: string, currentPath: string[] = []) {
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDir(fullPath, [...currentPath, item]);
      } else if (item.endsWith(".mdx")) {
        const fileName = item.replace(".mdx", "");
        params.push({ slug: [...currentPath, fileName] });
      }
    });
  }

  scanDir(contentDir);
  return params;
}
