import { WatchClient } from "@/components/WatchClient";
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

// Watch Page - Server Component wrapper
export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  // This is a server component that passes params to client component
  return WatchClientWrapper(params);
}

// Async wrapper to handle params
async function WatchClientWrapper(paramsPromise: Promise<{ id: string }>) {
  const { id } = await paramsPromise;
  return <WatchClient id={id} />;
}
