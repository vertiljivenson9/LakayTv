export interface Content {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
  year: number;
  category: "movie" | "series" | "documentary" | "short";
  genre: string;
  duration: string;
  rating: string;
  director?: string;
  cast?: string[];
  featured?: boolean;
}

export const contents: Content[] = [
  // FXPRO ENTERTAINMENT Movies
  {
    id: "1",
    title: "Tonton Dezirab - Lang Long",
    description: "Un film haïtien complet en créole 4K du canal FXPRO ENTERTAINMENT. Une comédie haïtienne hilarante qui vous fera rire aux éclats. Une production de qualité professionnelle.",
    thumbnail: "https://i.ytimg.com/vi/qqL1cfj9ZP4/hqdefault.jpg",
    youtubeId: "qqL1cfj9ZP4",
    year: 2025,
    category: "movie",
    genre: "Comédie",
    duration: "1h 15min",
    rating: "4.8/5",
    featured: true,
  },
  {
    id: "2",
    title: "Lang Long - Version #2",
    description: "La deuxième version du film Lang Long par FXPRO ENTERTAINMENT. Une comédie haïtienne en créole avec une qualité 4K exceptionnelle.",
    thumbnail: "https://i.ytimg.com/vi/05scOrldMw4/hqdefault.jpg",
    youtubeId: "05scOrldMw4",
    year: 2025,
    category: "movie",
    genre: "Comédie",
    duration: "1h 20min",
    rating: "4.7/5",
    featured: true,
  },
  {
    id: "3",
    title: "KOUT BA - Film Ayisyen 2026",
    description: "Un film haïtien complet de la série Tonton Dezirab par FXPRO ENTERTAINMENT. Une comédie moderne qui capture l'essence de la culture haïtienne.",
    thumbnail: "https://i.ytimg.com/vi/inOB-Jl_LnA/hqdefault.jpg",
    youtubeId: "inOB-Jl_LnA",
    year: 2026,
    category: "movie",
    genre: "Comédie",
    duration: "1h 10min",
    rating: "4.6/5",
    featured: true,
  },
  {
    id: "4",
    title: "Tòg Chòv - Dezirab",
    description: "Un film complet en créole haïtien. ManMan'm Dim SE ou ki PAPA'M - Une histoire émouvante de famille et de relations.",
    thumbnail: "https://i.ytimg.com/vi/LjoXumlw1GA/hqdefault.jpg",
    youtubeId: "LjoXumlw1GA",
    year: 2024,
    category: "movie",
    genre: "Drame",
    duration: "1h 25min",
    rating: "4.5/5",
  },
  {
    id: "5",
    title: "DEZIRAB - Film Ayisyen Romantik",
    description: "Un film romantique haïtien en 4K. Une belle histoire d'amour filmée avec une qualité professionnelle par FXPRO ENTERTAINMENT.",
    thumbnail: "https://i.ytimg.com/vi/UdkvaRkvwDM/hqdefault.jpg",
    youtubeId: "UdkvaRkvwDM",
    year: 2025,
    category: "movie",
    genre: "Romance",
    duration: "1h 05min",
    rating: "4.4/5",
  },
  {
    id: "6",
    title: "Tonton Dezirab - BRI SAPAT",
    description: "Un film complet de la série Tonton Dezirab. Une comédie haïtienne avec tous les éléments qui font rire toute la famille.",
    thumbnail: "https://i.ytimg.com/vi/lxCsUDGR-j8/hqdefault.jpg",
    youtubeId: "lxCsUDGR-j8",
    year: 2024,
    category: "movie",
    genre: "Comédie",
    duration: "1h 30min",
    rating: "4.6/5",
  },
  {
    id: "7",
    title: "EPISODE #6 AWOUSA KOUT BA",
    description: "Un épisode de la série EKLEZIAS avec Tonton Dezirab. Une comédie dramatique qui explore les problèmes de la vie haïtienne.",
    thumbnail: "https://i.ytimg.com/vi/-vYqMjhv6Is/hqdefault.jpg",
    youtubeId: "-vYqMjhv6Is",
    year: 2026,
    category: "series",
    genre: "Comédie Dramatique",
    duration: "45min",
    rating: "4.5/5",
  },
  {
    id: "8",
    title: "JISTIS POU CHACHA",
    description: "Un film de la série Tonton Dezirab. Une comédie qui explore les thèmes de justice et de famille dans le contexte haïtien.",
    thumbnail: "https://i.ytimg.com/vi/7C7Ew9tyeFk/hqdefault.jpg",
    youtubeId: "7C7Ew9tyeFk",
    year: 2025,
    category: "movie",
    genre: "Comédie",
    duration: "55min",
    rating: "4.4/5",
  },
  {
    id: "9",
    title: "Tonton Dezirab - MON KOMPÈ",
    description: "Episode #3 Nèg Anwo - Un film de la série Tonton Dezirab par FXPRO ENTERTAINMENT. Qualité professionnelle.",
    thumbnail: "https://i.ytimg.com/vi/P-cavpxha-E/hqdefault.jpg",
    youtubeId: "P-cavpxha-E",
    year: 2025,
    category: "series",
    genre: "Comédie",
    duration: "40min",
    rating: "4.3/5",
  },
  {
    id: "10",
    title: "NéG Anro - Film Haitian",
    description: "Episode #9 de la série avec Tonton Dezirab et Mazora. Une comédie haïtienne moderne.",
    thumbnail: "https://i.ytimg.com/vi/1lLMLg9L3iE/hqdefault.jpg",
    youtubeId: "1lLMLg9L3iE",
    year: 2025,
    category: "series",
    genre: "Comédie",
    duration: "35min",
    rating: "4.3/5",
  },
  {
    id: "11",
    title: "REKONSILYASYON",
    description: "Un film haïtien complet sur le thème de la réconciliation. Une production FXPRO ENTERTAINMENT de qualité.",
    thumbnail: "https://i.ytimg.com/vi/OdVabqus_XQ/hqdefault.jpg",
    youtubeId: "OdVabqus_XQ",
    year: 2025,
    category: "movie",
    genre: "Drame",
    duration: "1h",
    rating: "4.4/5",
  },
  {
    id: "12",
    title: "TONTON DEZIRAB - KONSEYE",
    description: "Un film de la série Tonton Dezirab. Comédie haïtienne avec des conseils hilarants.",
    thumbnail: "https://i.ytimg.com/vi/duoW68S-RRc/hqdefault.jpg",
    youtubeId: "duoW68S-RRc",
    year: 2025,
    category: "movie",
    genre: "Comédie",
    duration: "50min",
    rating: "4.5/5",
  },
];

export function getContentById(id: string): Content | undefined {
  return contents.find((content) => content.id === id);
}

export function getFeaturedContent(): Content[] {
  return contents.filter((content) => content.featured);
}

export function getContentByCategory(category: Content["category"]): Content[] {
  return contents.filter((content) => content.category === category);
}
