import { FilmClient } from "@/components/FilmClient";

// Enable dynamic rendering for user-added content
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Generate static paths for known static content (optional optimization)
export function generateStaticParams() {
  // Return empty array to allow all dynamic routes
  // Static content will still work because of the FilmClient logic
  return [];
}

// Film Detail Page - Server Component
export default async function FilmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <FilmClient id={id} />;
}
