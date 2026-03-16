export const runtime = 'edge';

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const CONTENT = [
  {
    id: '00000001-0000-0000-0000-000000000001',
    title: 'Tonton Dezirab - Lang Long',
    description: 'Un film haïtien complet en créole 4K du canal FXPRO ENTERTAINMENT. Une comédie haïtienne hilarante.',
    thumbnail: 'https://i.ytimg.com/vi/qqL1cfj9ZP4/hqdefault.jpg',
    youtube_id: 'qqL1cfj9ZP4',
    category: 'movie',
    genre: 'Comédie',
    duration: '1h 15min',
    year: 2025,
    rating: '4.8/5',
    featured: true,
    status: 'active',
  },
  {
    id: '00000001-0000-0000-0000-000000000002',
    title: 'Lang Long - Version #2',
    description: 'La deuxième version du film Lang Long par FXPRO ENTERTAINMENT.',
    thumbnail: 'https://i.ytimg.com/vi/05scOrldMw4/hqdefault.jpg',
    youtube_id: '05scOrldMw4',
    category: 'movie',
    genre: 'Comédie',
    duration: '1h 20min',
    year: 2025,
    rating: '4.7/5',
    featured: true,
    status: 'active',
  },
  {
    id: '00000001-0000-0000-0000-000000000003',
    title: 'KOUT BA - Film Ayisyen 2026',
    description: 'Un film haïtien complet de la série Tonton Dezirab.',
    thumbnail: 'https://i.ytimg.com/vi/inOB-Jl_LnA/hqdefault.jpg',
    youtube_id: 'inOB-Jl_LnA',
    category: 'movie',
    genre: 'Comédie',
    duration: '1h 10min',
    year: 2026,
    rating: '4.6/5',
    featured: true,
    status: 'active',
  },
];

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let count = 0;
    for (const item of CONTENT) {
      const { error } = await supabase
        .from('content')
        .upsert(item, { onConflict: 'id' });
      
      if (!error) count++;
    }

    return NextResponse.json({ success: true, count });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
}
