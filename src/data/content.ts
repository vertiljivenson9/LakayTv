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
    description: "Doc et Zoe sont embauchés pour livrer un colis mystérieux à travers Port-au-Prince. À un carrefour, ils rencont un chien et leur destin bascule. Un thriller haïtien qui explore les croyances vodou et la réalité sociale d'Haïti avec une maîtrise cinématographique exceptionnelle. Le film a été sélectionné dans de nombreux festivals internationaux.",
    thumbnail: "https://i.ytimg.com/vi/A4UHcU0lBQk/hqdefault.jpg",
    youtubeId: "A4UHcU0lBQk",
    year: 2017,
    category: "movie",
    genre: "Thriller",
    duration: "1h 45min",
    rating: "4.7/5",
    director: "Bruno Mourral",
    cast: ["Jasmuel Andri", "Ricardo Stephane", "Rolex Ernest"],
    featured: true,
  },
  {
    id: "2",
    title: "Freda",
    description: "Freda vit avec sa mère et sa sœur à Port-au-Prince. Toutes trois survivent grâce à la vente de produits de beauté au marché. Freda rêve de poursuivre ses études et de quitter ce pays qui ne lui offre aucun avenir. Un portrait réaliste et touchant de la jeunesse haïtienne qui lutte pour ses rêves.",
    thumbnail: "https://i.ytimg.com/vi/VPb_REkcLxU/hqdefault.jpg",
    youtubeId: "VPb_REkcLxU",
    year: 2021,
    category: "movie",
    genre: "Drame",
    duration: "1h 33min",
    rating: "4.8/5",
    director: "Gessica Généus",
    cast: ["Nehémie Bastien", "Faboala Michel", "Gessica Généus"],
    featured: true,
  },
  {
    id: "3",
    title: "Kidnapping Inc.",
    description: "Deux kidnappeurs maladroits enlèvent le fils d'un sénateur haïtien. Mais tout ne se passe pas comme prévu dans cette comédie noire qui dénonce avec humour la crise des enlèvements en Haïti. Un film audacieux qui mélange thriller politique et humour noir.",
    thumbnail: "https://i.ytimg.com/vi/daR0uF81kTw/hqdefault.jpg",
    youtubeId: "daR0uF81kTw",
    year: 2020,
    category: "movie",
    genre: "Comédie Noire",
    duration: "1h 42min",
    rating: "4.5/5",
    director: "Bruno Mourral",
    cast: ["Jasmuel Andri", "Rolaphton Mercure", "Anabel Lopez"],
    featured: true,
  },
  {
    id: "4",
    title: "I Love You Anne",
    description: "Un classique du cinéma haïtien qui a marqué toute une génération. Cette comédie romantique raconte l'histoire d'amour entre deux jeunes qui doivent surmonter les obstacles familiaux et sociaux. Le film le plus célèbre du cinéma haïtien moderne.",
    thumbnail: "https://i.ytimg.com/vi/G6kqJM1rEO8/hqdefault.jpg",
    youtubeId: "G6kqJM1rEO8",
    year: 2003,
    category: "movie",
    genre: "Comédie Romantique",
    duration: "1h 50min",
    rating: "4.6/5",
    director: "Raymond Lespinasse",
    cast: ["Jessifra", "Fabiola Colimon"],
  },
  {
    id: "5",
    title: "Ensansib",
    description: "Une tragique histoire de couple qui explore les défis de la vie conjugale en Haïti. Ce film poignant aborde les thèmes de la jalousie, de la trahison et de la rédemption avec une sensibilité rare. Une production de Magic Film.",
    thumbnail: "https://i.ytimg.com/vi/JOcNyL5tUO4/hqdefault.jpg",
    youtubeId: "JOcNyL5tUO4",
    year: 2023,
    category: "movie",
    genre: "Drame",
    duration: "2h 05min",
    rating: "4.4/5",
    director: "Steeve Bicot",
  },
  {
    id: "6",
    title: "Haïti: Entre Création et Résilience",
    description: "Un documentaire fascinant qui explore la richesse culturelle d'Haïti à travers ses artistes, ses artisans et ses créateurs. Malgré les défis économiques et politiques, la créativité haïtienne continue de briller et d'inspirer le monde entier.",
    thumbnail: "https://i.ytimg.com/vi/EZrP6E8D4PM/hqdefault.jpg",
    youtubeId: "EZrP6E8D4PM",
    year: 2022,
    category: "documentary",
    genre: "Documentaire Culturel",
    duration: "52min",
    rating: "4.6/5",
    featured: true,
  },
  {
    id: "7",
    title: "Sikatris Timafi",
    description: "Une série haïtienne captivante qui Suit les vies entrelacées de plusieurs familles à Port-au-Prince. Secrets de famille, trahisons et rédemptions se mêlent dans ce feuilleton qui a conquis le public haïtien.",
    thumbnail: "https://i.ytimg.com/vi/nJgfgQSw_MQ/hqdefault.jpg",
    youtubeId: "nJgfgQSw_MQ",
    year: 2024,
    category: "series",
    genre: "Drame",
    duration: "Série - 12 épisodes",
    rating: "4.5/5",
  },
  {
    id: "8",
    title: "Le Miracle de la Foi",
    description: "Une histoire inspirante sur le pouvoir de la foi dans la vie d'une famille haïtienne confrontée à des épreuves difficiles. Ce film touchant explore les thèmes de la spiritualité, de l'espoir et de la résilience.",
    thumbnail: "https://i.ytimg.com/vi/BGwSE2MPwxY/hqdefault.jpg",
    youtubeId: "BGwSE2MPwxY",
    year: 2023,
    category: "movie",
    genre: "Drame Spirituel",
    duration: "1h 55min",
    rating: "4.4/5",
    director: "Jean Gardy Bien Aimé",
  },
  {
    id: "9",
    title: "Carnaval d'Haïti",
    description: "Plongez dans l'univers vibrant du Carnaval haïtien, l'une des fêtes les plus colorées et énergiques des Caraïbes. Musique, danse, costumes et traditions se mêlent dans cette célébration unique de la culture haïtienne.",
    thumbnail: "https://i.ytimg.com/vi/W5DGLfFyKH8/hqdefault.jpg",
    youtubeId: "W5DGLfFyKH8",
    year: 2023,
    category: "documentary",
    genre: "Culture & Tradition",
    duration: "45min",
    rating: "4.6/5",
  },
  {
    id: "10",
    title: "Ayiti: Perle des Antilles",
    description: "Un voyage visuel spectaculaire à travers la beauté d'Haïti. Des plages de Labadee aux rues colorées de Jacmel, en passant par la majesté de la Citadelle Laferrière, ce documentaire révèle les trésors cachés de la perle des Antilles.",
    thumbnail: "https://i.ytimg.com/vi/OKbX24R31NA/hqdefault.jpg",
    youtubeId: "OKbX24R31NA",
    year: 2022,
    category: "documentary",
    genre: "Documentaire Touristique",
    duration: "1h 20min",
    rating: "4.7/5",
  },
  {
    id: "11",
    title: "Kote Freda ap Antre",
    description: "La suite tant attendue de l'histoire de Freda. Alors qu'elle poursuit ses rêves d'une vie meilleure, Freda doit faire face à de nouveaux défis qui mettront sa détermination à l'épreuve. Un drame social poignant sur la condition féminine en Haïti.",
    thumbnail: "https://i.ytimg.com/vi/NJsseUC_1bo/hqdefault.jpg",
    youtubeId: "NJsseUC_1bo",
    year: 2023,
    category: "movie",
    genre: "Drame",
    duration: "1h 40min",
    rating: "4.5/5",
    director: "Gessica Généus",
  },
  {
    id: "12",
    title: "La Kidnapping en Haiti",
    description: "Un drame intense qui plonge au cœur de la crise des enlèvements qui frappe Haïti. À travers l'histoire d'une famille déchirée, le film dénonce les ravages de ce fléau tout en montrant la résilience du peuple haïtien face à l'adversité.",
    thumbnail: "https://i.ytimg.com/vi/1MBgw6MXQvY/hqdefault.jpg",
    youtubeId: "1MBgw6MXQvY",
    year: 2021,
    category: "movie",
    genre: "Drame Social",
    duration: "1h 35min",
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
