import { contents } from "@/data/content";
import { FilmClient } from "@/components/FilmClient";

// Generate static paths for all content
export function generateStaticParams() {
  return contents.map((content) => ({
    id: content.id,
  }));
}

// Film Detail Page - Server Component
export default async function FilmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <FilmClient id={id} />;
}
