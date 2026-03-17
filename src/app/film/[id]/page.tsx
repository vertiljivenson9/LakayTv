import { FilmClient } from "@/components/FilmClient";
import { contents } from "@/data/content";

// Pre-generate static paths for known content
export async function generateStaticParams() {
  // Return all known content IDs
  return contents.map((content) => ({
    id: content.id,
  }));
}

// Enable dynamic params for user-added content
export const dynamicParams = true;

// Film Detail Page - Server Component wrapper
export default function FilmPage({ params }: { params: Promise<{ id: string }> }) {
  // This is a server component that passes params to client component
  return FilmClientWrapper(params);
}

// Async wrapper to handle params
async function FilmClientWrapper(paramsPromise: Promise<{ id: string }>) {
  const { id } = await paramsPromise;
  return <FilmClient id={id} />;
}
