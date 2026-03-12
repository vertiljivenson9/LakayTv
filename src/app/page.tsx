'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ============ SVG ICONS ============
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const FilmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
    <line x1="7" y1="2" x2="7" y2="22"/>
    <line x1="17" y1="2" x2="17" y2="22"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
  </svg>
);

const TvIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
    <polyline points="17 2 12 7 7 2"/>
  </svg>
);

const StarIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const VolumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
    <path d="M5 3h14a1 1 0 0 1 1 1v3a5 5 0 0 1-5 5h-1v3h3v2H7v-2h3v-3H9a5 5 0 0 1-5-5V4a1 1 0 0 1 1-1z"/>
    <path d="M5 3v3a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V3"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ============ FEATURED CONTENT ============
const featuredMovie = {
  id: "featured-1",
  title: "ENSANSIB",
  description: "Une production de Magic Film, ecrit et realise par Steeve Bicot. Une tragique histoire de couple qui explore les profondeurs de l'amour, de la trahison et de la redemption dans la societe haitienne contemporaine. Un film qui a marque le cinema haitien.",
  year: 2024,
  duration: "1h 45min",
  rating: 4.9,
  language: "Creole",
  genre: "Drame",
  youtubeId: "JOcNyL5tUO4",
  thumbnail: "https://img.youtube.com/vi/JOcNyL5tUO4/maxresdefault.jpg",
  rank: 1
};

// ============ TOP RANKING FILMS ============
const topRanking = [
  {
    id: "top1",
    title: "ENSANSIB",
    year: 2024,
    type: "film",
    language: "Creole",
    rating: 4.9,
    youtubeId: "JOcNyL5tUO4",
    genre: "Drame",
    description: "Une tragique histoire de couple par Steeve Bicot.",
    rank: 1
  },
  {
    id: "top2",
    title: "LANMO MANMAN M",
    year: 2024,
    type: "serie",
    language: "Creole",
    rating: 4.8,
    youtubeId: "ZUM4UKnspCg",
    genre: "Drame",
    description: "Feyton ayisyen populaire par CHARLY HSM.",
    rank: 2
  },
  {
    id: "top3",
    title: "2 FRERES JALOUX",
    year: 2025,
    type: "film",
    language: "Creole",
    rating: 4.7,
    youtubeId: "PoUe8bCHGRo",
    genre: "Drame",
    description: "Nouveau film haitien par Steeve Bicot.",
    rank: 3
  },
  {
    id: "top4",
    title: "MANMAN ZONBI",
    year: 2024,
    type: "film",
    language: "Creole",
    rating: 4.6,
    youtubeId: "F43oGHZM1A4",
    genre: "Horreur",
    description: "Horreur et traditions vaudou haitiennes.",
    rank: 4
  },
  {
    id: "top5",
    title: "PASYANS",
    year: 2024,
    type: "film",
    language: "Creole",
    rating: 4.6,
    youtubeId: "i-tEGbafd0c",
    genre: "Drame",
    description: "Un film poignant sur la perseverance.",
    rank: 5
  }
];

// ============ ALL FILMS ============
const films = [
  {
    id: "f1",
    title: "ENSANSIB",
    year: 2024,
    type: "film",
    language: "Creole",
    rating: 4.9,
    youtubeId: "JOcNyL5tUO4",
    genre: "Drame",
    description: "Tragique histoire de couple"
  },
  {
    id: "f2",
    title: "2 FRERES JALOUX",
    year: 2025,
    type: "film",
    language: "Creole",
    rating: 4.7,
    youtubeId: "PoUe8bCHGRo",
    genre: "Drame",
    description: "Jalousie fraternelle"
  },
  {
    id: "f3",
    title: "MANMAN ZONBI",
    year: 2024,
    type: "film",
    language: "Creole",
    rating: 4.6,
    youtubeId: "F43oGHZM1A4",
    genre: "Horreur",
    description: "Horreur vaudou"
  },
  {
    id: "f4",
    title: "TRAHISON",
    year: 2024,
    type: "film",
    language: "Creole",
    rating: 4.5,
    youtubeId: "WHX983z6ZqQ",
    genre: "Drame",
    description: "Trahison et redemption"
  },
  {
    id: "f5",
    title: "PASYANS",
    year: 2024,
    type: "film",
    language: "Creole",
    rating: 4.6,
    youtubeId: "i-tEGbafd0c",
    genre: "Drame",
    description: "Perseverance et courage"
  },
  {
    id: "f6",
    title: "REYALITE",
    year: 2024,
    type: "film",
    language: "Creole",
    rating: 4.4,
    youtubeId: "WMi_1_6guVs",
    genre: "Drame",
    description: "La realite haïtienne"
  },
  {
    id: "f7",
    title: "TRET MAKIYE",
    year: 2024,
    type: "film",
    language: "Creole",
    rating: 4.5,
    youtubeId: "7_8svqjHfqY",
    genre: "Court-metrage",
    description: "Court-metrage haïtien"
  },
  {
    id: "f8",
    title: "VWAZEN AN",
    year: 2024,
    type: "film",
    language: "Creole",
    rating: 4.3,
    youtubeId: "1n5GWkYZN00",
    genre: "Comedie",
    description: "Histoire de voisinage"
  },
  {
    id: "f9",
    title: "SAW FE SE LI OU WE",
    year: 2024,
    type: "film",
    language: "Creole",
    rating: 4.4,
    youtubeId: "161oBU5v70A",
    genre: "Drame",
    description: "Les consequences de nos actes"
  },
  {
    id: "f10",
    title: "SONY SAN MATIRITE",
    year: 2024,
    type: "film",
    language: "Creole",
    rating: 4.2,
    youtubeId: "GWmTi2m-_-U",
    genre: "Comedie",
    description: "Comedie haïtienne"
  },
  {
    id: "f11",
    title: "MEILLEUR FILM HAITIEN",
    year: 2024,
    type: "film",
    language: "Creole",
    rating: 4.3,
    youtubeId: "Bakp4mqafJU",
    genre: "Drame",
    description: "Cinema haïtien"
  },
  {
    id: "f12",
    title: "MIRACLE DE LA FOI",
    year: 2024,
    type: "film",
    language: "Creole",
    rating: 4.4,
    youtubeId: "YOCkCoaJxo4",
    genre: "Drame",
    description: "Foi et miracles"
  }
];

// ============ ALL SERIES ============
const series = [
  {
    id: "s1",
    title: "LANMO MANMAN M",
    year: 2024,
    type: "serie",
    language: "Creole",
    rating: 4.8,
    youtubeId: "ZUM4UKnspCg",
    genre: "Drame",
    description: "Feyton populaire par CHARLY HSM",
    episodes: 26
  },
  {
    id: "s2",
    title: "ENSANSIB SERIE",
    year: 2024,
    type: "serie",
    language: "Creole",
    rating: 4.7,
    youtubeId: "PoUe8bCHGRo",
    genre: "Drame",
    description: "Web serie par Magic Film",
    episodes: 13
  },
  {
    id: "s3",
    title: "MANMAN M TOUYE MENNAJ MWEN",
    year: 2024,
    type: "serie",
    language: "Creole",
    rating: 4.6,
    youtubeId: "evVTfc5S3G8",
    genre: "Drame",
    description: "Drame familial intense",
    episodes: 10
  },
  {
    id: "s4",
    title: "MIZE LUMIE",
    year: 2024,
    type: "serie",
    language: "Creole",
    rating: 4.5,
    youtubeId: "etSBxOlUEx8",
    genre: "Drame",
    description: "Histoire d'une orpheline",
    episodes: 15
  },
  {
    id: "s5",
    title: "ISTWA LAVI TI CHOLINE",
    year: 2024,
    type: "serie",
    language: "Creole",
    rating: 4.4,
    youtubeId: "4BGcFV8O8w0",
    genre: "Drame",
    description: "Parcours de vie",
    episodes: 12
  },
  {
    id: "s6",
    title: "MANMANM MECHAN",
    year: 2024,
    type: "serie",
    language: "Creole",
    rating: 4.5,
    youtubeId: "Ue-neeTE7nM",
    genre: "Drame",
    description: "Relations familiales",
    episodes: 25
  },
  {
    id: "s7",
    title: "FOS LANMOU",
    year: 2024,
    type: "serie",
    language: "Creole",
    rating: 4.3,
    youtubeId: "lrQfzikSc2Y",
    genre: "Romance",
    description: "La force de l'amour",
    episodes: 8
  },
  {
    id: "s8",
    title: "MA RIVALE",
    year: 2024,
    type: "serie",
    language: "Creole",
    rating: 4.4,
    youtubeId: "MPJV7h7ad8I",
    genre: "Drame",
    description: "Rivalites et trahisons",
    episodes: 20
  }
];

// ============ TRENDING NOW ============
const trendingNow = [
  { id: "t1", title: "LANMO MANMAN M", year: 2024, type: "serie", language: "Creole", rating: 4.8, youtubeId: "ZUM4UKnspCg", genre: "Drame" },
  { id: "t2", title: "ENSANSIB", year: 2024, type: "film", language: "Creole", rating: 4.9, youtubeId: "JOcNyL5tUO4", genre: "Drame" },
  { id: "t3", title: "2 FRERES JALOUX", year: 2025, type: "film", language: "Creole", rating: 4.7, youtubeId: "PoUe8bCHGRo", genre: "Drame" },
  { id: "t4", title: "MANMAN ZONBI", year: 2024, type: "film", language: "Creole", rating: 4.6, youtubeId: "F43oGHZM1A4", genre: "Horreur" },
  { id: "t5", title: "PASYANS", year: 2024, type: "film", language: "Creole", rating: 4.6, youtubeId: "i-tEGbafd0c", genre: "Drame" },
  { id: "t6", title: "MIZE LUMIE", year: 2024, type: "serie", language: "Creole", rating: 4.5, youtubeId: "etSBxOlUEx8", genre: "Drame" },
  { id: "t7", title: "TRAHISON", year: 2024, type: "film", language: "Creole", rating: 4.5, youtubeId: "WHX983z6ZqQ", genre: "Drame" },
  { id: "t8", title: "REYALITE", year: 2024, type: "film", language: "Creole", rating: 4.4, youtubeId: "WMi_1_6guVs", genre: "Drame" },
];

// ============ NEW RELEASES ============
const newReleases = [
  { id: "n1", title: "2 FRERES JALOUX", year: 2025, type: "film", language: "Creole", rating: 4.7, youtubeId: "PoUe8bCHGRo", genre: "Drame" },
  { id: "n2", title: "ENSANSIB EPISODE 13", year: 2024, type: "serie", language: "Creole", rating: 4.8, youtubeId: "ndRQ8khNE5E", genre: "Drame" },
  { id: "n3", title: "TRET MAKIYE", year: 2024, type: "film", language: "Creole", rating: 4.5, youtubeId: "7_8svqjHfqY", genre: "Court-metrage" },
  { id: "n4", title: "VWAZEN AN", year: 2024, type: "film", language: "Creole", rating: 4.3, youtubeId: "1n5GWkYZN00", genre: "Comedie" },
  { id: "n5", title: "MANMANM MECHAN EP23", year: 2024, type: "serie", language: "Creole", rating: 4.5, youtubeId: "Ue-neeTE7nM", genre: "Drame" },
  { id: "n6", title: "SAW FE SE LI OU WE", year: 2024, type: "film", language: "Creole", rating: 4.4, youtubeId: "161oBU5v70A", genre: "Drame" },
];

const genres = ["Tous", "Drame", "Horreur", "Action", "Romance", "Thriller", "Comedie", "Court-metrage"];

// ============ WELCOME PAGE COMPONENT ============
function WelcomePage({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-[#0a0a0a] to-purple-900/20" />
      
      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Photo */}
        <div className="mb-8 relative">
          <div className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full overflow-hidden border-4 border-amber-500 shadow-2xl shadow-amber-500/30">
            <img 
              src="https://res.cloudinary.com/dcclzhsim/image/upload/v1769986641/IMG_1484_h6oqhs.png" 
              alt="Vertil Jivenson" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative ring */}
          <div className="absolute inset-0 w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full border-2 border-amber-400/30 animate-pulse" />
        </div>

        {/* Name and Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Vertil Jivenson
        </h1>
        <p className="text-amber-400 text-lg mb-6">
          Fondateur de LakayTV
        </p>
        <div className="flex items-center justify-center gap-2 mb-8">
          <Badge className="bg-blue-600 text-white">Haiti</Badge>
          <Badge className="bg-amber-600 text-white">Cap-Haitien</Badge>
        </div>

        {/* Message */}
        <div className="bg-stone-900/50 backdrop-blur-sm rounded-xl p-6 md:p-8 mb-8 border border-stone-700">
          <p className="text-stone-300 text-lg leading-relaxed mb-4">
            Je suis <span className="text-amber-400 font-semibold">Vertil Jivenson</span>, ne en Haiti, 
            principalement au <span className="text-amber-400">Cap-Haitien, Petite Anse</span>.
          </p>
          <p className="text-stone-300 text-lg leading-relaxed mb-4">
            Mon reve est d&apos;attirer ceux qui partagent le meme reve que moi : 
            <span className="text-white font-semibold"> construire un pays technologique</span>, 
            afin de donner un nouveau but aux jeunes qui sont fatigues d&apos;avoir un travail, 
            fatigues de ne pas finir leurs etudes et devoir avoir un diplome pour trouver du travail 
            dans un pays desordonne.
          </p>
          <p className="text-amber-300 text-lg leading-relaxed font-semibold">
            Aujourd&apos;hui, avec la programmation, vous pouvez trouver du travail en tant qu&apos;autodidacte 
            et gagner un revenu important. Unissez-vous a nous !
          </p>
        </div>

        {/* Continue Button */}
        <Button 
          onClick={onContinue}
          className="bg-amber-600 hover:bg-amber-500 text-white px-10 py-6 text-xl font-semibold rounded-full shadow-lg shadow-amber-600/30 transition-all hover:scale-105"
        >
          Continuer
          <ArrowRightIcon />
        </Button>

        {/* Logo */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <img src="/logo.svg" alt="LakayTV" className="h-8 w-8" />
          <span className="text-xl font-bold text-white">LakayTV</span>
        </div>
      </div>
    </div>
  );
}

// ============ COMPONENTS ============
interface ContentCardProps {
  content: typeof films[0] | typeof series[0] | typeof topRanking[0];
  showRank?: boolean;
  rank?: number;
}

function ContentCard({ content, showRank = false, rank }: ContentCardProps) {
  return (
    <Link
      href={`/watch/${content.id}`}
      className="group relative flex-shrink-0 w-[160px] md:w-[180px] lg:w-[200px] cursor-pointer block"
    >
      <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-gradient-to-br from-amber-900/20 to-stone-900/40">
        <img
          src={`https://img.youtube.com/vi/${content.youtubeId}/hqdefault.jpg`}
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-black shadow-lg transform group-hover:scale-110 transition-transform">
                <PlayIcon />
              </div>
            </div>
            <p className="text-white text-xs text-center line-clamp-2">{content.description}</p>
          </div>
        </div>
        <div className="absolute top-2 left-2">
          {showRank && rank && (
            <Badge className="bg-amber-500 text-black font-bold text-sm px-2">
              #{rank}
            </Badge>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <Badge className={`${content.type === 'film' ? 'bg-blue-600' : 'bg-purple-600'} text-white text-xs`}>
            {content.type === 'film' ? 'Film' : 'Serie'}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2 right-2 opacity-100 group-hover:opacity-0 transition-opacity">
          <div className="flex items-center gap-1 text-amber-400 text-xs">
            <StarIcon filled /> {content.rating}
          </div>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-white font-medium text-sm truncate">{content.title}</h3>
        <div className="flex items-center justify-between text-xs text-stone-400">
          <span>{content.year}</span>
          <span className="text-amber-400 flex items-center gap-1">
            <StarIcon filled /> {content.rating}
          </span>
        </div>
        <Badge variant="outline" className="mt-1 border-stone-700 text-stone-400 text-xs">
          {content.genre}
        </Badge>
      </div>
    </Link>
  );
}

// ============ MAIN PAGE ============
function HomePage() {
  const [activeGenre, setActiveGenre] = useState("Tous");

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-b from-black/90 to-transparent">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="LakayTV" className="h-8 w-8 md:h-10 md:w-10" />
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight">LakayTV</span>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-white font-medium hover:text-amber-400 transition-colors">Accueil</a>
              <a href="#films" className="text-stone-400 hover:text-white transition-colors flex items-center gap-2">
                <FilmIcon /> Films
              </a>
              <a href="#series" className="text-stone-400 hover:text-white transition-colors flex items-center gap-2">
                <TvIcon /> Series
              </a>
              <a href="#top" className="text-stone-400 hover:text-white transition-colors flex items-center gap-2">
                <TrophyIcon /> Top 5
              </a>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3 md:gap-4">
              <button className="p-2 text-stone-400 hover:text-white transition-colors">
                <SearchIcon />
              </button>

              {/* Enlaces a paneles */}
              <Link href="/producer">
                <Button variant="outline" className="border-stone-600 text-stone-300 hover:text-white hover:bg-white/10">
                  Producteur
                </Button>
              </Link>
              <Link href="/admin">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  Admin
                </Button>
              </Link>

              <Button variant="ghost" className="lg:hidden text-white p-2">
                <MenuIcon />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[95vh]">
        <div className="absolute inset-0">
          <img
            src={featuredMovie.thumbnail}
            alt={featuredMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
            <div className="max-w-2xl pt-16">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-amber-500 text-black font-bold">
                  <TrophyIcon /> #1 TOP RANKING
                </Badge>
                <Badge variant="outline" className="border-stone-600 text-stone-300">{featuredMovie.language}</Badge>
                <Badge variant="outline" className="border-stone-600 text-stone-300">{featuredMovie.genre}</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                {featuredMovie.title}
              </h1>
              <div className="flex items-center gap-4 text-stone-300 mb-6 text-sm md:text-base">
                <span className="flex items-center gap-1 text-amber-400 text-lg">
                  <StarIcon filled /> {featuredMovie.rating}
                </span>
                <span>{featuredMovie.year}</span>
                <span>{featuredMovie.duration}</span>
              </div>
              <p className="text-base md:text-lg text-stone-300 mb-8 leading-relaxed max-w-xl">
                {featuredMovie.description}
              </p>
              <div className="flex items-center gap-4">
                <Link href={`/watch/${featuredMovie.id}`}>
                  <Button
                    className="bg-white hover:bg-stone-200 text-black px-8 py-6 text-lg font-medium gap-2"
                  >
                    <PlayIcon /> Regarder
                  </Button>
                </Link>
                <Button variant="outline" className="border-stone-600 text-white hover:bg-white/10 px-6 py-6 gap-2 bg-stone-800/50">
                  <HeartIcon /> Ma Liste
                </Button>
              </div>
            </div>
          </div>
        </div>

        <button className="absolute bottom-32 right-12 p-3 border border-stone-500 rounded-full text-stone-300 hover:text-white hover:border-white transition-colors hidden md:block">
          <VolumeIcon />
        </button>
      </section>

      {/* Content Section */}
      <main className="relative z-10 -mt-32 pb-20">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Genre Filter */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {genres.map((genre) => (
              <Button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                variant={activeGenre === genre ? "default" : "outline"}
                className={activeGenre === genre
                  ? "bg-amber-600 hover:bg-amber-700 text-white rounded-full px-5"
                  : "border-stone-700 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full px-5"
                }
              >
                {genre}
              </Button>
            ))}
          </div>

          {/* Top 5 Ranking */}
          <section id="top" className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-500"><TrophyIcon /></span>
                Top 5 Classement
              </h2>
              <a href="#" className="text-stone-400 hover:text-amber-400 flex items-center gap-1 text-sm">
                Voir tout <ChevronRight />
              </a>
            </div>
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {topRanking.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                  showRank={true}
                  rank={content.rank}
                />
              ))}
            </div>
          </section>

          {/* New Releases */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white">Nouveautes</h2>
              <a href="#" className="text-stone-400 hover:text-amber-400 flex items-center gap-1 text-sm">
                Voir tout <ChevronRight />
              </a>
            </div>
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {newReleases.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                />
              ))}
            </div>
          </section>

          {/* Trending Now */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white">Tendances actuelles</h2>
              <a href="#" className="text-stone-400 hover:text-amber-400 flex items-center gap-1 text-sm">
                Voir tout <ChevronRight />
              </a>
            </div>
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {trendingNow.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                />
              ))}
            </div>
          </section>

          {/* Films Section */}
          <section id="films" className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <FilmIcon /> Films Haitiens ({films.length})
              </h2>
              <a href="#" className="text-stone-400 hover:text-amber-400 flex items-center gap-1 text-sm">
                Voir tout <ChevronRight />
              </a>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
              {films.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                />
              ))}
            </div>
          </section>

          {/* Series Section */}
          <section id="series" className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <TvIcon /> Series Haitiennes ({series.length})
              </h2>
              <a href="#" className="text-stone-400 hover:text-amber-400 flex items-center gap-1 text-sm">
                Voir tout <ChevronRight />
              </a>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
              {series.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                />
              ))}
            </div>
          </section>

          {/* Subscription Banner */}
          <section className="mb-12">
            <Card className="bg-gradient-to-r from-amber-900/30 via-amber-800/20 to-amber-900/30 border-amber-700/30 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Abonnez-vous a LakayTV
                    </h2>
                    <p className="text-stone-300 max-w-lg">
                      Acces illimite a tous les films et series haitiens en qualite Full HD.
                      Soutenez les createurs locaux et decouvrez le meilleur du cinema haitien.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-center px-5 py-3 bg-black/30 rounded-lg">
                      <div className="text-2xl font-bold text-amber-400">HTG 500</div>
                      <div className="text-xs text-stone-500">Gourde/mois</div>
                    </div>
                    <div className="text-center px-5 py-3 bg-black/30 rounded-lg">
                      <div className="text-2xl font-bold text-amber-400">$5 USD</div>
                      <div className="text-xs text-stone-500">Dollar/mois</div>
                    </div>
                    <div className="text-center px-5 py-3 bg-black/30 rounded-lg">
                      <div className="text-2xl font-bold text-amber-400">4.50 EUR</div>
                      <div className="text-xs text-stone-500">Euro/mois</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-stone-800 py-12">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Logo y descripcion */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.svg" alt="LakayTV" className="h-8 w-8" />
                <span className="text-lg font-bold text-white">LakayTV</span>
              </div>
              <p className="text-stone-500 text-sm mb-4">
                La plateforme de streaming dediee au contenu haitien. Films et series en Creole et Francais.
              </p>
              {/* Redes Sociales */}
              <div className="flex items-center gap-3">
                {/* GitHub */}
                <a 
                  href="https://github.com/vertiljivenson9/LakayTv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/18096429126" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/share/1XAX547gjx/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Discord */}
                <a 
                  href="https://discord.gg/TytxPNWpe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Navigation */}
            <div>
              <h3 className="font-medium text-white mb-4">Navigation</h3>
              <ul className="space-y-2 text-stone-500 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Accueil</a></li>
                <li><a href="#films" className="hover:text-amber-400 transition-colors">Films</a></li>
                <li><a href="#series" className="hover:text-amber-400 transition-colors">Series</a></li>
                <li><a href="#top" className="hover:text-amber-400 transition-colors">Top Ranking</a></li>
              </ul>
            </div>
            
            {/* Producteurs */}
            <div>
              <h3 className="font-medium text-white mb-4">Producteurs</h3>
              <ul className="space-y-2 text-stone-500 text-sm">
                <li><a href="/producer" className="hover:text-amber-400 transition-colors">Espace Producteur</a></li>
                <li><a href="/producer" className="hover:text-amber-400 transition-colors">Soumettre un film</a></li>
                <li><a href="/producer" className="hover:text-amber-400 transition-colors">Tableau de bord</a></li>
                <li><a href="/producer" className="hover:text-amber-400 transition-colors">Revenus</a></li>
              </ul>
            </div>
            
            {/* Contact et Legal */}
            <div>
              <h3 className="font-medium text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-stone-500 text-sm">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <a href="mailto:vertiljivenson9@gmail.com" className="hover:text-amber-400 transition-colors">vertiljivenson9@gmail.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Cap-Haitien, Haiti</span>
                </li>
              </ul>
              
              <h3 className="font-medium text-white mb-4 mt-6">Legal</h3>
              <ul className="space-y-2 text-stone-500 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Conditions d&apos;utilisation</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Politique de confidentialite</a></li>
                <li><a href="/admin" className="hover:text-amber-400 transition-colors">Admin</a></li>
              </ul>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-stone-800 pt-8 text-center text-stone-600 text-sm">
            <p>2025 LakayTV. Tous droits reserves. Plateforme de streaming haitien.</p>
            <p className="mt-2 text-stone-500">Films et Series en Creole et Francais</p>
            <p className="mt-2 text-stone-500">Fonde par Vertil Jivenson - Cap-Haitien, Haiti</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============ MAIN EXPORT ============
export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasSeenWelcome = localStorage.getItem('lakaytv_welcome_seen');
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
  }, []);

  const handleContinue = () => {
    localStorage.setItem('lakaytv_welcome_seen', 'true');
    setShowWelcome(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (showWelcome) {
    return <WelcomePage onContinue={handleContinue} />;
  }

  return <HomePage />;
}
