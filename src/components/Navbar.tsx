import Link from "next/link";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export default function Navbar({
  title,
  tags,
}: {
  title: string;
  tags: string[];
}) {
  return (
    <nav className="space-y-4 mb-4">
      <Link href="/">
        <h1>{title}</h1>
      </Link>
      
      <Separator />

      <div className="flex gap-2">
        {tags.map((tag) => (
          <Link key={tag} href={`/?tag=${tag}`}>
            <Badge>{tag}</Badge>
          </Link>
        ))}
      </div>
    </nav>
  );
}
