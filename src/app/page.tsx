import ArticleList from "@/components/ArticleList";
import Navbar from "@/components/Navbar";
import { glob } from "glob";

export const dynamic = "force-dynamic";

export type ArticleMetadata = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  href: string;
};

async function getPages() {
  const pages = await glob("./**/page.mdx", {
    cwd: "./src/app",
  });

  return Promise.all(
    pages.map(async (page) => {
      const component = await import(`@/app/${page}`);
      const url = page.replace(/\page.mdx$/, "");
      return { ...component.metadata, href: url } as ArticleMetadata;
    })
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: { tag?: string };
}) {
  const pages = await getPages();
  const tags = pages
    .flatMap((page) => page.tags)
    .filter((tag, index, self) => self.indexOf(tag) === index);

  return (
    <main className="w-full">
      <Navbar title="Journal" tags={tags} />

      <ArticleList articles={pages} tag={searchParams.tag} />
    </main>
  );
}
