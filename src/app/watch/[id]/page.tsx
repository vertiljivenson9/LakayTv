import { contents } from "@/data/content";
import { WatchClient } from "@/components/WatchClient";

// Generate static paths for all content
export function generateStaticParams() {
  return contents.map((content) => ({
    id: content.id,
  }));
}

// Watch Page - Server Component
export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <WatchClient id={id} />;
}
