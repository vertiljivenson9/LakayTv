import { WatchClient } from "@/components/WatchClient";

// Required for Cloudflare Pages
export const runtime = 'edge';

// Enable dynamic rendering for user-added content
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Watch Page - Server Component
export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <WatchClient id={id} />;
}
