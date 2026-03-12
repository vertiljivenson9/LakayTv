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
    title: "Kafou",
    description: "Un thriller haïtien captivant qui explore les mystères et les traditions de la vie rurale à Haïti. Un chauffeur de moto-taxi se retrouve pris dans une série d'événements mystérieux qui changent sa vie à jamais.",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    youtubeId: "dQw4w9WgXcQ",
    year: 2022,
    category: "movie",
    genre: "Thriller",
    duration: "1h 45min",
    rating: "4.5/5",
    director: "Bruno Mourral",
    cast: ["Jasmuel Andri", "Ricardo Stephane"],
    featured: true,
  },
  {
    id: "2",
    title: "Freda",
    description: "L'histoire émouvante d'une jeune femme haïtienne qui lutte pour poursuivre ses études tout en supportant sa famille dans les rues de Port-au-Prince. Un portrait réaliste de la jeunesse haïtienne contemporaine.",
    thumbnail: "https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg",
    youtubeId: "jNQXAC9IVRw",
    year: 2021,
    category: "movie",
    genre: "Drame",
    duration: "1h 38min",
    rating: "4.7/5",
    director: "Gessica Généus",
    cast: ["Nehémie Bastien", "Faboala Michel"],
    featured: true,
  },
  {
    id: "3",
    title: "Chroniques d'Haïti",
    description: "Une série documentaire qui explore l'histoire riche et complexe d'Haïti, de la révolution à nos jours. Un voyage fascinant à travers les siècles.",
    thumbnail: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
    youtubeId: "9bZkp7q19f0",
    year: 2023,
    category: "series",
    genre: "Documentaire",
    duration: "6 épisodes",
    rating: "4.8/5",
    featured: true,
  },
  {
    id: "4",
    title: "Le Mariage de Kompa",
    description: "Une comédie romantique haïtienne qui suit les aventures d'un jeune musicien qui tombe amoureux d'une femme promise à un autre. Musique, rires et émotions garantis.",
    thumbnail: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
    youtubeId: "kJQP7kiw5Fk",
    year: 2022,
    category: "movie",
    genre: "Comédie",
    duration: "1h 52min",
    rating: "4.3/5",
  },
  {
    id: "5",
    title: "Nouvel Vie",
    description: "Le parcours d'un immigrant haïtien qui retourne dans son pays natal après des années à l'étranger. Il découvre un pays transformé et doit faire face à ses propres démons.",
    thumbnail: "https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg",
    youtubeId: "fJ9rUzIMcZQ",
    year: 2023,
    category: "movie",
    genre: "Drame",
    duration: "2h 05min",
    rating: "4.4/5",
  },
  {
    id: "6",
    title: "Vodou Mysteries",
    description: "Un documentaire fascinant qui démystifie la religion vodou haïtienne, explorant ses rituels, sa spiritualité et son importance culturelle.",
    thumbnail: "https://i.ytimg.com/vi/60ItHLz5WEA/hqdefault.jpg",
    youtubeId: "60ItHLz5WEA",
    year: 2021,
    category: "documentary",
    genre: "Documentaire",
    duration: "1h 20min",
    rating: "4.6/5",
  },
  {
    id: "7",
    title: "Cap-Haïtien: Perle des Antilles",
    description: "Un court-métrage documentaire qui explore la beauté et l'histoire de Cap-Haïtien, la deuxième plus grande ville d'Haïti.",
    thumbnail: "https://i.ytimg.com/vi/L_jWHffIx5E/hqdefault.jpg",
    youtubeId: "L_jWHffIx5E",
    year: 2023,
    category: "short",
    genre: "Documentaire",
    duration: "25min",
    rating: "4.5/5",
  },
  {
    id: "8",
    title: "Les Enfants de la Rue",
    description: "Un drame poignant qui suit le quotidien d'enfants des rues de Port-au-Prince, leur lutte pour survivre et leurs rêves d'un avenir meilleur.",
    thumbnail: "https://i.ytimg.com/vi/hT_nvWreIhg/hqdefault.jpg",
    youtubeId: "hT_nvWreIhg",
    year: 2022,
    category: "movie",
    genre: "Drame",
    duration: "1h 35min",
    rating: "4.7/5",
    director: "Arnold Antonin",
  },
  {
    id: "9",
    title: "Kanaval: La Fête",
    description: "Plongez dans l'univers coloré et énergique du Carnaval haïtien. Musique, danse et traditions se mêlent dans cette célébration unique.",
    thumbnail: "https://i.ytimg.com/vi/Ho32Oh6b4cI/hqdefault.jpg",
    youtubeId: "Ho32Oh6b4cI",
    year: 2023,
    category: "documentary",
    genre: "Culture",
    duration: "52min",
    rating: "4.4/5",
  },
  {
    id: "10",
    title: "Mama Lola",
    description: "L'histoire touchante d'une mambo (prêtresse vodou) qui guide sa communauté à travers les défis modernes tout en préservant les traditions ancestrales.",
    thumbnail: "https://i.ytimg.com/vi/zWhYxgL_Shk/hqdefault.jpg",
    youtubeId: "zWhYxgL_Shk",
    year: 2021,
    category: "movie",
    genre: "Drame",
    duration: "1h 48min",
    rating: "4.6/5",
  },
  {
    id: "11",
    title: "La République des Ombres",
    description: "Un thriller politique qui explore les coulisses du pouvoir en Haïti. Un journaliste découvre une conspiration qui menace la démocratie.",
    thumbnail: "https://i.ytimg.com/vi/mWRsgZuwf_c/hqdefault.jpg",
    youtubeId: "mWRsgZuwf_c",
    year: 2023,
    category: "movie",
    genre: "Thriller",
    duration: "2h 10min",
    rating: "4.5/5",
  },
  {
    id: "12",
    title: "Tales from Haiti",
    description: "Une série d'anthologie présentant des contes et légendes traditionnels haïtiens adaptés pour l'écran. Chaque épisode raconte une histoire unique.",
    thumbnail: "https://i.ytimg.com/vi/1wYNFfGRMXE/hqdefault.jpg",
    youtubeId: "1wYNFfGRMXE",
    year: 2022,
    category: "series",
    genre: "Fantastique",
    duration: "8 épisodes",
    rating: "4.3/5",
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
