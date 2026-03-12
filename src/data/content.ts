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
  {
    id: "1",
    title: "Tonton Dezirab - Lang Long",
    description: "Un film haïtien complet en créole 4K. Une histoire captivante qui vous transportera dans l'univers de la culture haïtienne authentique. Une production de qualité qui montre le talent des cinéastes haïtiens.",
    thumbnail: "https://i.ytimg.com/vi/qqL1cfj9ZP4/hqdefault.jpg",
    youtubeId: "qqL1cfj9ZP4",
    year: 2025,
    category: "movie",
    genre: "Comédie",
    duration: "1h 30min",
    rating: "4.8/5",
    featured: true,
  },
  {
    id: "2",
    title: "Denye Kou",
    description: "Un film haïtien captivant qui explore les défis de la vie quotidienne en Haïti. Une histoire émouvante de résilience et d'espoir face aux épreuves de la vie.",
    thumbnail: "https://i.ytimg.com/vi/85xsbKThzr4/hqdefault.jpg",
    youtubeId: "85xsbKThzr4",
    year: 2024,
    category: "movie",
    genre: "Drame",
    duration: "39min",
    rating: "4.5/5",
    featured: true,
  },
  {
    id: "2",
    title: "L'Arnaqueur",
    description: "Un thriller haïtien qui suit les aventures d'un arnaqueur dans les rues de Port-au-Prince. Un film rempli de rebondissements et de suspense.",
    thumbnail: "https://i.ytimg.com/vi/MU_lVkzGF4I/hqdefault.jpg",
    youtubeId: "MU_lVkzGF4I",
    year: 2024,
    category: "movie",
    genre: "Thriller",
    duration: "1h 30min",
    rating: "4.6/5",
    featured: true,
  },
  {
    id: "3",
    title: "Salvatrice",
    description: "Une histoire touchante de rédemption et d'espoir. Salvatrice nous transporte dans l'univers complexe des relations familiales haïtiennes.",
    thumbnail: "https://i.ytimg.com/vi/LyxjVOIuNnA/hqdefault.jpg",
    youtubeId: "LyxjVOIuNnA",
    year: 2024,
    category: "movie",
    genre: "Drame",
    duration: "1h 15min",
    rating: "4.4/5",
    featured: true,
  },
  {
    id: "4",
    title: "Le Romancier",
    description: "Une comédie romantique haïtienne moderne qui explore les relations amoureuses dans le contexte de la société haïtienne contemporaine.",
    thumbnail: "https://i.ytimg.com/vi/OCbsUkabI50/hqdefault.jpg",
    youtubeId: "OCbsUkabI50",
    year: 2024,
    category: "movie",
    genre: "Comédie Romantique",
    duration: "1h 20min",
    rating: "4.3/5",
  },
  {
    id: "5",
    title: "Entolerans",
    description: "Un film puissant qui aborde les thèmes de l'intolérance et de la justice sociale en Haïti. Une œuvre engagée qui ne laisse pas indifférent.",
    thumbnail: "https://i.ytimg.com/vi/VdbCwasDj60/hqdefault.jpg",
    youtubeId: "VdbCwasDj60",
    year: 2025,
    category: "movie",
    genre: "Drame Social",
    duration: "1h 10min",
    rating: "4.7/5",
  },
  {
    id: "6",
    title: "Trèt Makiye",
    description: "Un court-métrage haïtien qui capture l'essence de la vie urbaine à Port-au-Prince. Une réalisation artistique remarquable.",
    thumbnail: "https://i.ytimg.com/vi/7_8svqjHfqY/hqdefault.jpg",
    youtubeId: "7_8svqjHfqY",
    year: 2024,
    category: "short",
    genre: "Court-métrage",
    duration: "15min",
    rating: "4.2/5",
  },
  {
    id: "7",
    title: "Pinocchio (Version Haïtienne)",
    description: "Une adaptation haïtienne du classique Pinocchio. Un film familial qui ravira petits et grands avec une touche de culture haïtienne.",
    thumbnail: "https://i.ytimg.com/vi/fQ0koDSu0og/hqdefault.jpg",
    youtubeId: "fQ0koDSu0og",
    year: 2024,
    category: "movie",
    genre: "Familial",
    duration: "1h 25min",
    rating: "4.0/5",
  },
  {
    id: "8",
    title: "Kafou - Film Miroir",
    description: "Un documentaire qui explore la réalité haïtienne à travers le prisme du film Kafou. Une analyse profonde de la société haïtienne contemporaine.",
    thumbnail: "https://i.ytimg.com/vi/OKbX24R31NA/hqdefault.jpg",
    youtubeId: "OKbX24R31NA",
    year: 2023,
    category: "documentary",
    genre: "Documentaire",
    duration: "50min",
    rating: "4.8/5",
  },
  {
    id: "9",
    title: "Vwazen An",
    description: "Un court-métrage poignant sur les leçons de vie. Une production haïtienne qui explore les thèmes de famille et de communauté.",
    thumbnail: "https://i.ytimg.com/vi/1n5GWkYZN00/hqdefault.jpg",
    youtubeId: "1n5GWkYZN00",
    year: 2024,
    category: "short",
    genre: "Court-métrage",
    duration: "12min",
    rating: "4.1/5",
  },
  {
    id: "10",
    title: "Meilleur Film Haitien 2024",
    description: "Une compilation des meilleurs moments du cinéma haïtien de l'année 2024. Un aperçu de la richesse et de la diversité du cinéma haïtien.",
    thumbnail: "https://i.ytimg.com/vi/Bakp4mqafJU/hqdefault.jpg",
    youtubeId: "Bakp4mqafJU",
    year: 2024,
    category: "documentary",
    genre: "Documentaire",
    duration: "45min",
    rating: "4.3/5",
  },
  {
    id: "11",
    title: "Kidnapping Film Haïtien",
    description: "Un thriller intense basé sur les réalités des enlèvements en Haïti. Le film suit une famille déchirée par ce fléau qui touche la société.",
    thumbnail: "https://i.ytimg.com/vi/NtbiNdV4Gi0/hqdefault.jpg",
    youtubeId: "NtbiNdV4Gi0",
    year: 2024,
    category: "movie",
    genre: "Thriller",
    duration: "1h 5min",
    rating: "4.4/5",
  },
  {
    id: "12",
    title: "Les Hypocrites",
    description: "Un drame social qui dénonce l'hypocrisie dans la société haïtienne. Une œuvre courageuse qui fait réfléchir sur nos valeurs communes.",
    thumbnail: "https://i.ytimg.com/vi/BGwSE2MPwxY/hqdefault.jpg",
    youtubeId: "BGwSE2MPwxY",
    year: 2023,
    category: "movie",
    genre: "Drame Social",
    duration: "34min",
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
