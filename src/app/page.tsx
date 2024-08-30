import { glob } from "glob";

export const dynamic = "force-dynamic";

type ArticleMetadata = {
  title: string;
  description: string;
  date: string;
  tags: string[];
};

async function getPages() {
  const pages = await glob("./**/*.mdx", {
    cwd: "./src/app",
  });

  return Promise.all(
    pages.map(async (page) => {
      const component = await import(`@/app/${page}`);
      return component.metadata as ArticleMetadata;
    })
  );
}

export default async function Home() {
  const pages = await getPages();

  return <main></main>;
}