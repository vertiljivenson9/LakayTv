import { FilmClient } from "@/components/FilmClient";

// Required for Cloudflare Pages
export const runtime = 'edge';

// Enable dynamic rendering for user-added content
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Film Detail Page - Server Component
export default async function FilmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <FilmClient id={id} />;
}
