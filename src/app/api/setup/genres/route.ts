export const runtime = 'edge';

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const GENRES = [
  { name: 'Comédie', slug: 'comedie' },
  { name: 'Drame', slug: 'drame' },
  { name: 'Romance', slug: 'romance' },
  { name: 'Action', slug: 'action' },
  { name: 'Thriller', slug: 'thriller' },
  { name: 'Documentaire', slug: 'documentaire' },
  { name: 'Court-métrage', slug: 'court-metrage' },
  { name: 'Comédie Dramatique', slug: 'comedie-dramatique' },
];

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let count = 0;
    for (const genre of GENRES) {
      const { error } = await supabase
        .from('genres')
        .upsert(genre, { onConflict: 'slug' });
      
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
