/**
 * Script para crear las tablas en Supabase
 * Ejecutar con: bun run scripts/setup-db.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan las variables de entorno NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function setupDatabase() {
  console.log('🚀 Iniciando configuración de base de datos...\n');

  // Insertar géneros
  console.log('📦 Insertando géneros...');
  const genres = [
    { name: 'Comédie', slug: 'comedie' },
    { name: 'Drame', slug: 'drame' },
    { name: 'Romance', slug: 'romance' },
    { name: 'Action', slug: 'action' },
    { name: 'Thriller', slug: 'thriller' },
    { name: 'Documentaire', slug: 'documentaire' },
    { name: 'Court-métrage', slug: 'court-metrage' },
    { name: 'Comédie Dramatique', slug: 'comedie-dramatique' },
  ];

  for (const genre of genres) {
    const { error } = await supabase.from('genres').upsert(genre, { onConflict: 'slug' });
    if (error && error.code !== '23505') {
      console.log(`  ⚠️  Error insertando género ${genre.name}: ${error.message}`);
    } else {
      console.log(`  ✅ Género: ${genre.name}`);
    }
  }

  // Insertar contenido inicial
  console.log('\n🎬 Insertando contenido inicial...');
  const content = [
    {
      id: '00000001-0000-0000-0000-000000000001',
      title: 'Tonton Dezirab - Lang Long',
      description: 'Un film haïtien complet en créole 4K du canal FXPRO ENTERTAINMENT. Une comédie haïtienne hilarante qui vous fera rire aux éclats. Une production de qualité professionnelle.',
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
      description: "La deuxième version du film Lang Long par FXPRO ENTERTAINMENT. Une comédie haïtienne en créole avec une qualité 4K exceptionnelle.",
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
      description: "Un film haïtien complet de la série Tonton Dezirab par FXPRO ENTERTAINMENT. Une comédie moderne qui capture l'essence de la culture haïtienne.",
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
    {
      id: '00000001-0000-0000-0000-000000000004',
      title: 'Tòg Chòv - Dezirab',
      description: "Un film complet en créole haïtien. ManMan'm Dim SE ou ki PAPA'M - Une histoire émouvante de famille et de relations.",
      thumbnail: 'https://i.ytimg.com/vi/LjoXumlw1GA/hqdefault.jpg',
      youtube_id: 'LjoXumlw1GA',
      category: 'movie',
      genre: 'Drame',
      duration: '1h 25min',
      year: 2024,
      rating: '4.5/5',
      featured: false,
      status: 'active',
    },
    {
      id: '00000001-0000-0000-0000-000000000005',
      title: 'DEZIRAB - Film Ayisyen Romantik',
      description: "Un film romantique haïtien en 4K. Une belle histoire d'amour filmée avec une qualité professionnelle par FXPRO ENTERTAINMENT.",
      thumbnail: 'https://i.ytimg.com/vi/UdkvaRkvwDM/hqdefault.jpg',
      youtube_id: 'UdkvaRkvwDM',
      category: 'movie',
      genre: 'Romance',
      duration: '1h 05min',
      year: 2025,
      rating: '4.4/5',
      featured: false,
      status: 'active',
    },
    {
      id: '00000001-0000-0000-0000-000000000006',
      title: 'Tonton Dezirab - BRI SAPAT',
      description: 'Un film complet de la série Tonton Dezirab. Une comédie haïtienne avec tous les éléments qui font rire toute la famille.',
      thumbnail: 'https://i.ytimg.com/vi/lxCsUDGR-j8/hqdefault.jpg',
      youtube_id: 'lxCsUDGR-j8',
      category: 'movie',
      genre: 'Comédie',
      duration: '1h 30min',
      year: 2024,
      rating: '4.6/5',
      featured: false,
      status: 'active',
    },
    {
      id: '00000001-0000-0000-0000-000000000007',
      title: 'EPISODE #6 AWOUSA KOUT BA',
      description: 'Un épisode de la série EKLEZIAS avec Tonton Dezirab. Une comédie dramatique qui explore les problèmes de la vie haïtienne.',
      thumbnail: 'https://i.ytimg.com/vi/-vYqMjhv6Is/hqdefault.jpg',
      youtube_id: '-vYqMjhv6Is',
      category: 'series',
      genre: 'Comédie Dramatique',
      duration: '45min',
      year: 2026,
      rating: '4.5/5',
      featured: false,
      status: 'active',
    },
    {
      id: '00000001-0000-0000-0000-000000000008',
      title: 'JISTIS POU CHACHA',
      description: 'Un film de la série Tonton Dezirab. Une comédie qui explore les thèmes de justice et de famille dans le contexte haïtien.',
      thumbnail: 'https://i.ytimg.com/vi/7C7Ew9tyeFk/hqdefault.jpg',
      youtube_id: '7C7Ew9tyeFk',
      category: 'movie',
      genre: 'Comédie',
      duration: '55min',
      year: 2025,
      rating: '4.4/5',
      featured: false,
      status: 'active',
    },
    {
      id: '00000001-0000-0000-0000-000000000009',
      title: 'Tonton Dezirab - MON KOMPÈ',
      description: "Episode #3 Nèg Anwo - Un film de la série Tonton Dezirab par FXPRO ENTERTAINMENT. Qualité professionnelle.",
      thumbnail: 'https://i.ytimg.com/vi/P-cavpxha-E/hqdefault.jpg',
      youtube_id: 'P-cavpxha-E',
      category: 'series',
      genre: 'Comédie',
      duration: '40min',
      year: 2025,
      rating: '4.3/5',
      featured: false,
      status: 'active',
    },
    {
      id: '00000001-0000-0000-0000-000000000010',
      title: 'NéG Anro - Film Haitian',
      description: 'Episode #9 de la série avec Tonton Dezirab et Mazora. Une comédie haïtienne moderne.',
      thumbnail: 'https://i.ytimg.com/vi/1lLMLg9L3iE/hqdefault.jpg',
      youtube_id: '1lLMLg9L3iE',
      category: 'series',
      genre: 'Comédie',
      duration: '35min',
      year: 2025,
      rating: '4.3/5',
      featured: false,
      status: 'active',
    },
    {
      id: '00000001-0000-0000-0000-000000000011',
      title: 'REKONSILYASYON',
      description: 'Un film haïtien complet sur le thème de la réconciliation. Une production FXPRO ENTERTAINMENT de qualité.',
      thumbnail: 'https://i.ytimg.com/vi/OdVabqus_XQ/hqdefault.jpg',
      youtube_id: 'OdVabqus_XQ',
      category: 'movie',
      genre: 'Drame',
      duration: '1h',
      year: 2025,
      rating: '4.4/5',
      featured: false,
      status: 'active',
    },
    {
      id: '00000001-0000-0000-0000-000000000012',
      title: 'TONTON DEZIRAB - KONSEYE',
      description: 'Un film de la série Tonton Dezirab. Comédie haïtienne avec des conseils hilarants.',
      thumbnail: 'https://i.ytimg.com/vi/duoW68S-RRc/hqdefault.jpg',
      youtube_id: 'duoW68S-RRc',
      category: 'movie',
      genre: 'Comédie',
      duration: '50min',
      year: 2025,
      rating: '4.5/5',
      featured: false,
      status: 'active',
    },
  ];

  for (const item of content) {
    const { error } = await supabase.from('content').upsert(item, { onConflict: 'id' });
    if (error && error.code !== '23505') {
      console.log(`  ⚠️  Error insertando ${item.title}: ${error.message}`);
    } else {
      console.log(`  ✅ ${item.title}`);
    }
  }

  console.log('\n✅ Configuración completada!');
  console.log('\n📋 Instrucciones:');
  console.log('1. Si las tablas no se crearon, ejecuta el SQL en supabase-schema.sql');
  console.log('2. Ve a Supabase Dashboard > SQL Editor');
  console.log('3. Pega el contenido del archivo y ejecútalo');
}

setupDatabase().catch(console.error);
