'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Icons
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const FilmIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>;
const TvIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>;
const StarIcon = ({ filled = false }: { filled?: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const TrophyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3h14a1 1 0 0 1 1 1v3a5 5 0 0 1-5 5h-1v3h3v2H7v-2h3v-3H9a5 5 0 0 1-5-5V4a1 1 0 0 1 1-1z"/></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

// Data
const featuredMovie = { id: "featured-1", title: "ENSANSIB", description: "Une production de Magic Film par Steeve Bicot.", year: 2024, duration: "1h 45min", rating: 4.9, language: "Creole", genre: "Drame", youtubeId: "JOcNyL5tUO4", thumbnail: "https://img.youtube.com/vi/JOcNyL5tUO4/maxresdefault.jpg" };

const topRanking = [
  { id: "top1", title: "ENSANSIB", year: 2024, type: "film", rating: 4.9, youtubeId: "JOcNyL5tUO4", genre: "Drame", description: "Film haitien.", rank: 1 },
  { id: "top2", title: "LANMO MANMAN M", year: 2024, type: "serie", rating: 4.8, youtubeId: "ZUM4UKnspCg", genre: "Drame", description: "Feyton.", rank: 2 },
  { id: "top3", title: "2 FRERES JALOUX", year: 2025, type: "film", rating: 4.7, youtubeId: "PoUe8bCHGRo", genre: "Drame", description: "Film.", rank: 3 },
  { id: "top4", title: "MANMAN ZONBI", year: 2024, type: "film", rating: 4.6, youtubeId: "F43oGHZM1A4", genre: "Horreur", description: "Horreur.", rank: 4 },
  { id: "top5", title: "PASYANS", year: 2024, type: "film", rating: 4.6, youtubeId: "i-tEGbafd0c", genre: "Drame", description: "Film.", rank: 5 }
];

const films = [
  { id: "f1", title: "ENSANSIB", year: 2024, type: "film", rating: 4.9, youtubeId: "JOcNyL5tUO4", genre: "Drame", description: "Film haitien" },
  { id: "f2", title: "2 FRERES JALOUX", year: 2025, type: "film", rating: 4.7, youtubeId: "PoUe8bCHGRo", genre: "Drame", description: "Film" },
  { id: "f3", title: "MANMAN ZONBI", year: 2024, type: "film", rating: 4.6, youtubeId: "F43oGHZM1A4", genre: "Horreur", description: "Horreur" },
  { id: "f4", title: "TRAHISON", year: 2024, type: "film", rating: 4.5, youtubeId: "WHX983z6ZqQ", genre: "Drame", description: "Drame" },
  { id: "f5", title: "PASYANS", year: 2024, type: "film", rating: 4.6, youtubeId: "i-tEGbafd0c", genre: "Drame", description: "Drame" },
  { id: "f6", title: "REYALITE", year: 2024, type: "film", rating: 4.4, youtubeId: "WMi_1_6guVs", genre: "Drame", description: "Drame" },
  { id: "f7", title: "TRET MAKIYE", year: 2024, type: "film", rating: 4.5, youtubeId: "7_8svqjHfqY", genre: "Court-metrage", description: "Court-metrage" },
  { id: "f8", title: "VWAZEN AN", year: 2024, type: "film", rating: 4.3, youtubeId: "1n5GWkYZN00", genre: "Comedie", description: "Comedie" },
  { id: "f9", title: "SAW FE SE LI OU WE", year: 2024, type: "film", rating: 4.4, youtubeId: "161oBU5v70A", genre: "Drame", description: "Drame" },
  { id: "f10", title: "SONY SAN MATIRITE", year: 2024, type: "film", rating: 4.2, youtubeId: "GWmTi2m-_-U", genre: "Comedie", description: "Comedie" },
  { id: "f11", title: "MEILLEUR FILM HAITIEN", year: 2024, type: "film", rating: 4.3, youtubeId: "Bakp4mqafJU", genre: "Drame", description: "Cinema" },
  { id: "f12", title: "MIRACLE DE LA FOI", year: 2024, type: "film", rating: 4.4, youtubeId: "YOCkCoaJxo4", genre: "Drame", description: "Foi" }
];

const series = [
  { id: "s1", title: "LANMO MANMAN M", year: 2024, type: "serie", rating: 4.8, youtubeId: "ZUM4UKnspCg", genre: "Drame", description: "Feyton" },
  { id: "s2", title: "ENSANSIB SERIE", year: 2024, type: "serie", rating: 4.7, youtubeId: "PoUe8bCHGRo", genre: "Drame", description: "Serie" },
  { id: "s3", title: "MANMAN M TOUYE MENNAJ MWEN", year: 2024, type: "serie", rating: 4.6, youtubeId: "evVTfc5S3G8", genre: "Drame", description: "Drame" },
  { id: "s4", title: "MIZE LUMIE", year: 2024, type: "serie", rating: 4.5, youtubeId: "etSBxOlUEx8", genre: "Drame", description: "Drame" },
  { id: "s5", title: "ISTWA LAVI TI CHOLINE", year: 2024, type: "serie", rating: 4.4, youtubeId: "4BGcFV8O8w0", genre: "Drame", description: "Drame" },
  { id: "s6", title: "MANMANM MECHAN", year: 2024, type: "serie", rating: 4.5, youtubeId: "Ue-neeTE7nM", genre: "Drame", description: "Drame" },
  { id: "s7", title: "FOS LANMOU", year: 2024, type: "serie", rating: 4.3, youtubeId: "lrQfzikSc2Y", genre: "Romance", description: "Romance" },
  { id: "s8", title: "MA RIVALE", year: 2024, type: "serie", rating: 4.4, youtubeId: "MPJV7h7ad8I", genre: "Drame", description: "Drame" }
];

const trendingNow = [
  { id: "t1", title: "LANMO MANMAN M", year: 2024, type: "serie", rating: 4.8, youtubeId: "ZUM4UKnspCg", genre: "Drame" },
  { id: "t2", title: "ENSANSIB", year: 2024, type: "film", rating: 4.9, youtubeId: "JOcNyL5tUO4", genre: "Drame" },
  { id: "t3", title: "2 FRERES JALOUX", year: 2025, type: "film", rating: 4.7, youtubeId: "PoUe8bCHGRo", genre: "Drame" },
  { id: "t4", title: "MANMAN ZONBI", year: 2024, type: "film", rating: 4.6, youtubeId: "F43oGHZM1A4", genre: "Horreur" },
  { id: "t5", title: "PASYANS", year: 2024, type: "film", rating: 4.6, youtubeId: "i-tEGbafd0c", genre: "Drame" },
  { id: "t6", title: "MIZE LUMIE", year: 2024, type: "serie", rating: 4.5, youtubeId: "etSBxOlUEx8", genre: "Drame" },
  { id: "t7", title: "TRAHISON", year: 2024, type: "film", rating: 4.5, youtubeId: "WHX983z6ZqQ", genre: "Drame" },
  { id: "t8", title: "REYALITE", year: 2024, type: "film", rating: 4.4, youtubeId: "WMi_1_6guVs", genre: "Drame" }
];

const newReleases = [
  { id: "n1", title: "2 FRERES JALOUX", year: 2025, type: "film", rating: 4.7, youtubeId: "PoUe8bCHGRo", genre: "Drame" },
  { id: "n2", title: "ENSANSIB EP 13", year: 2024, type: "serie", rating: 4.8, youtubeId: "ndRQ8khNE5E", genre: "Drame" },
  { id: "n3", title: "TRET MAKIYE", year: 2024, type: "film", rating: 4.5, youtubeId: "7_8svqjHfqY", genre: "Court-metrage" },
  { id: "n4", title: "VWAZEN AN", year: 2024, type: "film", rating: 4.3, youtubeId: "1n5GWkYZN00", genre: "Comedie" },
  { id: "n5", title: "MANMANM MECHAN EP23", year: 2024, type: "serie", rating: 4.5, youtubeId: "Ue-neeTE7nM", genre: "Drame" },
  { id: "n6", title: "SAW FE SE LI OU WE", year: 2024, type: "film", rating: 4.4, youtubeId: "161oBU5v70A", genre: "Drame" }
];

// Welcome Page
function WelcomePage({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-[#0a0a0a] to-purple-900/20" />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full overflow-hidden border-4 border-amber-500 shadow-2xl shadow-amber-500/30 mb-8">
          <img src="https://res.cloudinary.com/dcclzhsim/image/upload/v1769986641/IMG_1484_h6oqhs.png" alt="Vertil Jivenson" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Vertil Jivenson</h1>
        <p className="text-amber-400 text-lg mb-6">Fondateur de LakayTV</p>
        <div className="flex items-center justify-center gap-2 mb-8">
          <Badge className="bg-blue-600 text-white">Haiti</Badge>
          <Badge className="bg-amber-600 text-white">Cap-Haitien</Badge>
        </div>
        <div className="bg-stone-900/50 backdrop-blur-sm rounded-xl p-6 md:p-8 mb-8 border border-stone-700">
          <p className="text-stone-300 text-lg leading-relaxed mb-4">Je suis <span className="text-amber-400 font-semibold">Vertil Jivenson</span>, ne en Haiti, au Cap-Haitien.</p>
          <p className="text-stone-300 text-lg leading-relaxed mb-4">Mon reve est de construire un pays technologique pour les jeunes.</p>
          <p className="text-amber-300 text-lg font-semibold">Avec la programmation, vous pouvez trouver du travail!</p>
        </div>
        <Button onClick={onContinue} className="bg-amber-600 hover:bg-amber-500 text-white px-10 py-6 text-xl font-semibold rounded-full">Continuer</Button>
        <div className="mt-8 flex items-center justify-center gap-2">
          <img src="/logo.svg" alt="LakayTV" className="h-8 w-8" />
          <span className="text-xl font-bold text-white">LakayTV</span>
        </div>
      </div>
    </div>
  );
}

// Content Card
function ContentCard({ content, showRank, rank }: { content: typeof films[0]; showRank?: boolean; rank?: number }) {
  return (
    <Link href={"/watch/" + content.id} className="group relative flex-shrink-0 w-[160px] md:w-[180px] cursor-pointer block">
      <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-gradient-to-br from-amber-900/20 to-stone-900/40">
        <img src={"https://img.youtube.com/vi/" + content.youtubeId + "/hqdefault.jpg"} alt={content.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-black shadow-lg transform group-hover:scale-110 transition-transform"><PlayIcon /></div>
        </div>
        {showRank && rank && <Badge className="absolute top-2 left-2 bg-amber-500 text-black font-bold text-sm px-2">#{rank}</Badge>}
        <Badge className={"absolute top-2 right-2 " + (content.type === 'film' ? 'bg-blue-600' : 'bg-purple-600') + " text-white text-xs"}>{content.type === 'film' ? 'Film' : 'Serie'}</Badge>
      </div>
      <div className="mt-2">
        <h3 className="text-white font-medium text-sm truncate">{content.title}</h3>
        <div className="flex items-center justify-between text-xs text-stone-400">
          <span>{content.year}</span>
          <span className="text-amber-400 flex items-center gap-1"><StarIcon filled /> {content.rating}</span>
        </div>
      </div>
    </Link>
  );
}

// Home Page
function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="LakayTV" className="h-8 w-8 md:h-10 md:w-10" />
              <span className="text-xl md:text-2xl font-bold text-white">LakayTV</span>
            </div>
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-white font-medium hover:text-amber-400">Accueil</a>
              <a href="#films" className="text-stone-400 hover:text-white flex items-center gap-2"><FilmIcon /> Films</a>
              <a href="#series" className="text-stone-400 hover:text-white flex items-center gap-2"><TvIcon /> Series</a>
              <a href="#top" className="text-stone-400 hover:text-white flex items-center gap-2"><TrophyIcon /> Top 5</a>
            </nav>
            <div className="flex items-center gap-3">
              <button className="p-2 text-stone-400 hover:text-white"><SearchIcon /></button>
              <Link href="/producer"><Button variant="outline" className="border-stone-600 text-stone-300 hover:text-white">Producteur</Button></Link>
              <Link href="/admin"><Button className="bg-amber-600 hover:bg-amber-700 text-white">Admin</Button></Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[85vh] md:h-[95vh]">
        <div className="absolute inset-0">
          <img src={featuredMovie.thumbnail} alt={featuredMovie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
            <div className="max-w-2xl pt-16">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-amber-500 text-black font-bold"><TrophyIcon /> #1 TOP</Badge>
                <Badge variant="outline" className="border-stone-600 text-stone-300">{featuredMovie.genre}</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{featuredMovie.title}</h1>
              <div className="flex items-center gap-4 text-stone-300 mb-6">
                <span className="flex items-center gap-1 text-amber-400 text-lg"><StarIcon filled /> {featuredMovie.rating}</span>
                <span>{featuredMovie.year}</span>
                <span>{featuredMovie.duration}</span>
              </div>
              <p className="text-lg text-stone-300 mb-8 max-w-xl">{featuredMovie.description}</p>
              <div className="flex items-center gap-4">
                <Link href={"/watch/" + featuredMovie.id}><Button className="bg-white hover:bg-stone-200 text-black px-8 py-6 text-lg gap-2"><PlayIcon /> Regarder</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="relative z-10 -mt-32 pb-20">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
          <section id="top" className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 mb-4"><span className="text-amber-500"><TrophyIcon /></span> Top 5</h2>
            <div className="flex gap-3 overflow-x-auto pb-4">{topRanking.map((c) => <ContentCard key={c.id} content={c} showRank={true} rank={c.rank} />)}</div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Nouveautes</h2>
            <div className="flex gap-3 overflow-x-auto pb-4">{newReleases.map((c) => <ContentCard key={c.id} content={c} />)}</div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Tendances</h2>
            <div className="flex gap-3 overflow-x-auto pb-4">{trendingNow.map((c) => <ContentCard key={c.id} content={c} />)}</div>
          </section>

          <section id="films" className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 mb-4"><FilmIcon /> Films ({films.length})</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">{films.map((c) => <ContentCard key={c.id} content={c} />)}</div>
          </section>

          <section id="series" className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 mb-4"><TvIcon /> Series ({series.length})</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">{series.map((c) => <ContentCard key={c.id} content={c} />)}</div>
          </section>

          <section className="mb-12">
            <Card className="bg-gradient-to-r from-amber-900/30 to-amber-900/30 border-amber-700/30">
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Abonnez-vous</h2>
                  <p className="text-stone-300">Acces illimite aux films haitiens.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center px-5 py-3 bg-black/30 rounded-lg"><div className="text-2xl font-bold text-amber-400">HTG 500</div><div className="text-xs text-stone-500">/mois</div></div>
                  <div className="text-center px-5 py-3 bg-black/30 rounded-lg"><div className="text-2xl font-bold text-amber-400">$5 USD</div><div className="text-xs text-stone-500">/mois</div></div>
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
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.svg" alt="LakayTV" className="h-8 w-8" />
                <span className="text-lg font-bold text-white">LakayTV</span>
              </div>
              <p className="text-stone-500 text-sm mb-4">Streaming haitien.</p>
              <div className="flex items-center gap-3">
                <a href="https://github.com/vertiljivenson9/LakayTv" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://wa.me/18096429126" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a href="https://www.facebook.com/share/1XAX547gjx/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://discord.gg/TytxPNWpe" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M20.317 4.37a19.8 19.8 0 00-4.885-1.515.07.07 0 00-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.08.08 0 00-.079-.037 19.74 19.74 0 00-4.885 1.515.07.07 0 00-.032.027C.533 9.046-.32 13.58.1 18.058a.08.08 0 00.031.057c2.053 1.507 4.041 2.422 5.993 3.029a.08.08 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.08.08 0 00-.042-.106c-.652-.248-1.274-.549-1.872-.892a.08.08 0 01-.007-.128c.126-.094.252-.192.372-.291a.07.07 0 01.078-.011c3.928 1.793 8.18 1.793 12.061 0a.07.07 0 01.078.01c.12.099.246.198.373.292a.08.08 0 01-.007.128 12.3 12.3 0 01-1.873.891.08.08 0 00-.041.107c.36.698.772 1.363 1.225 1.993a.08.08 0 00.084.028c1.961-.607 3.949-1.521 6.002-3.029a.08.08 0 00.031-.055c.5-5.177-.838-9.674-3.548-13.66a.07.07 0 00-.032-.028z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">Navigation</h3>
              <ul className="space-y-2 text-stone-500 text-sm">
                <li><a href="#" className="hover:text-amber-400">Accueil</a></li>
                <li><a href="#films" className="hover:text-amber-400">Films</a></li>
                <li><a href="#series" className="hover:text-amber-400">Series</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">Producteurs</h3>
              <ul className="space-y-2 text-stone-500 text-sm">
                <li><a href="/producer" className="hover:text-amber-400">Espace Producteur</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-stone-500 text-sm">
                <li><a href="mailto:vertiljivenson9@gmail.com" className="hover:text-amber-400">vertiljivenson9@gmail.com</a></li>
                <li>Cap-Haitien, Haiti</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-8 text-center text-stone-600 text-sm">
            <p>2025 LakayTV. Tous droits reserves.</p>
            <p className="mt-2 text-stone-500">Fonde par Vertil Jivenson</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Main Export

// Main Export
export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasSeenWelcome = localStorage.getItem("lakaytv_welcome_seen");
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
  }, []);

  const handleContinue = () => {
    localStorage.setItem("lakaytv_welcome_seen", "true");
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
