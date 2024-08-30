"use client";

import type { ArticleMetadata } from "@/app/page";
import { Badge } from "./ui/badge";
import Link from "next/link";

export default function ArticleList({
  articles,
  tag,
}: {
  articles: ArticleMetadata[];
  tag?: string;
}) {
  return (
    <div className="flex gap-10 flex-wrap w-full">
      {articles
        .filter((article) => !tag || article.tags.includes(tag))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((article) => (
          <Link key={article.title} href={article.href} className="lg:w-1/4 w-full">
            <article>
              <div className="flex items-center justify-between">
                <h3>{article.title}</h3>
                <time>{article.date}</time>
              </div>

              <p>{article.description}</p>

              <div className="flex gap-2 mt-2">
                {article.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </article>
          </Link>
        ))}
    </div>
  );
}
