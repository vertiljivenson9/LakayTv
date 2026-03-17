"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, Plus, Film, DollarSign, Eye, TrendingUp,
  Upload, BarChart3, Settings, MessageSquare, Image as ImageIcon, 
  AlertTriangle, CheckCircle, Trash2, X, Mail, Bell, User, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Content } from "@/data/content";

// Function to convert any YouTube URL to embed format and extract video ID
function parseYouTubeUrl(url: string): { videoId: string; embedUrl: string; thumbnailUrl: string } | null {
  if (!url) return null;
  
  let videoId: string | null = null;
  
  // Handle various YouTube URL formats
  const patterns = [
    // Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    // Short URL: https://youtu.be/VIDEO_ID
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    // Embed URL: https://www.youtube.com/embed/VIDEO_ID
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    // Mobile URL: https://m.youtube.com/watch?v=VIDEO_ID
    /(?:m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    // YouTube Shorts: https://www.youtube.com/shorts/VIDEO_ID
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    // Live URL: https://www.youtube.com/live/VIDEO_ID
    /(?:youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      videoId = match[1];
      break;
    }
  }
  
  if (!videoId) return null;
  
  return {
    videoId,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  };
}

export default function ProducerPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    genre: "",
    year: "",
    thumbnailUrl: "",
  });
  
  const [submittedFilms, setSubmittedFilms] = useState<Content[]>([]);
  const [youtubePreview, setYoutubePreview] = useState<{
    videoId: string;
    thumbnail: string;
  } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Modal states
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Ref for scrolling to films section
  const filmsSectionRef = useRef<HTMLDivElement>(null);
  
  // Settings state
  const [producerSettings, setProducerSettings] = useState({
    name: "",
    email: "",
    bio: "",
    website: "",
    notifications: true,
  });

  // Load submitted films from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("lakaytv_submitted_films");
    if (saved) {
      try {
        setSubmittedFilms(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading saved films:", e);
      }
    }
    
    // Load producer settings
    const savedSettings = localStorage.getItem("lakaytv_producer_settings");
    if (savedSettings) {
      try {
        setProducerSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error("Error loading settings:", e);
      }
    }
  }, []);

  // Handle YouTube URL change and auto-extract thumbnail
  const handleYoutubeUrlChange = (url: string) => {
    setFormData({ ...formData, youtubeUrl: url });
    
    const parsed = parseYouTubeUrl(url);
    if (parsed) {
      setYoutubePreview({
        videoId: parsed.videoId,
        thumbnail: parsed.thumbnailUrl
      });
      // Auto-fill thumbnail URL if not manually set
      if (!formData.thumbnailUrl) {
        setFormData(prev => ({ ...prev, thumbnailUrl: parsed.thumbnailUrl }));
      }
    } else {
      setYoutubePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsed = parseYouTubeUrl(formData.youtubeUrl);
    if (!parsed) {
      alert("URL YouTube invalide. Veuillez entrer un lien YouTube valide.");
      return;
    }
    
    // Create new film entry
    const newFilm: Content = {
      id: `user_${Date.now()}`,
      title: formData.title,
      description: formData.description,
      thumbnail: formData.thumbnailUrl || parsed.thumbnailUrl,
      youtubeId: parsed.videoId,
      year: parseInt(formData.year) || new Date().getFullYear(),
      category: "movie",
      genre: formData.genre,
      duration: "N/A",
      rating: "Nouveau",
    };
    
    // Save to localStorage
    const updatedFilms = [newFilm, ...submittedFilms];
    setSubmittedFilms(updatedFilms);
    localStorage.setItem("lakaytv_submitted_films", JSON.stringify(updatedFilms));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('lakaytv_content_updated'));
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      youtubeUrl: "",
      genre: "",
      year: "",
      thumbnailUrl: "",
    });
    setYoutubePreview(null);
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleDeleteFilm = (id: string) => {
    const updatedFilms = submittedFilms.filter(f => f.id !== id);
    setSubmittedFilms(updatedFilms);
    localStorage.setItem("lakaytv_submitted_films", JSON.stringify(updatedFilms));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('lakaytv_content_updated'));
  };

  const handleSaveSettings = () => {
    localStorage.setItem("lakaytv_producer_settings", JSON.stringify(producerSettings));
    setShowSettings(false);
  };

  const scrollToFilms = () => {
    filmsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = {
    films: submittedFilms.length,
    views: submittedFilms.length > 0 ? submittedFilms.length * 2500 + 5000 : 12500,
    revenue: submittedFilms.length > 0 ? submittedFilms.length * 350 + 500 : 1250,
    rating: submittedFilms.length > 0 ? 4.5 + (submittedFilms.length * 0.1) : 4.5,
  };

  // Mock messages data
  const messages = [
    { id: 1, from: "LakayTV Support", subject: "Bienvenue sur LakayTV!", date: "2024-01-15", read: false },
    { id: 2, from: "Équipe Marketing", subject: "Votre film est en vedette!", date: "2024-01-14", read: true },
    { id: 3, from: "Fan Haïti", subject: "J'ai adoré votre dernier film", date: "2024-01-13", read: true },
  ];

  return (
    <div className="min-h-screen bg-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Espace Producteur</h1>
              <p className="text-gray-400">Gérez et publiez vos films sur LakayTV</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
            <div>
              <p className="text-green-400 font-medium">Film soumis avec succès!</p>
              <p className="text-green-400/70 text-sm">Votre film a été ajouté à la liste ci-dessous.</p>
            </div>
          </div>
        )}

        {/* Warning Banner */}
        <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-400 font-medium">Note importante sur la persistance des données</p>
              <p className="text-yellow-400/70 text-sm mt-1">
                Les films soumis sont stockés localement dans votre navigateur (localStorage). 
                Ils ne sont pas sauvegardés sur un serveur et seront perdus si vous effacez 
                les données du navigateur. Une base de données sera ajoutée prochainement 
                pour une persistance permanente.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Film className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Mes Films</p>
                  <p className="text-2xl font-bold text-white">{stats.films}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Vues</p>
                  <p className="text-2xl font-bold text-white">{stats.views.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Revenus (HTG)</p>
                  <p className="text-2xl font-bold text-white">{stats.revenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Note Moyenne</p>
                  <p className="text-2xl font-bold text-white">{stats.rating.toFixed(1)}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Submit New Film */}
          <Card className="bg-dark-50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Upload className="h-5 w-5 mr-2 text-primary" />
                Soumettre un nouveau film
              </CardTitle>
              <CardDescription className="text-gray-400">
                Remplissez le formulaire ci-dessous pour soumettre votre film
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Titre du film</label>
                  <Input
                    type="text"
                    placeholder="Ex: Mon Film Haïtien"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-dark border-gray-700 text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Description</label>
                  <textarea
                    placeholder="Décrivez votre film..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full h-24 px-3 py-2 bg-dark border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    URL YouTube 
                    <span className="text-gray-500 text-xs ml-2">(Tous formats acceptés)</span>
                  </label>
                  <Input
                    type="url"
                    placeholder="https://youtube.com/watch?v=... ou youtu.be/..."
                    value={formData.youtubeUrl}
                    onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                    className="bg-dark border-gray-700 text-white"
                    required
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Formats acceptés: youtube.com/watch, youtu.be, youtube.com/embed, youtube.com/shorts, etc.
                  </p>
                </div>

                {/* YouTube Preview */}
                {youtubePreview && (
                  <div className="p-3 bg-dark-50 border border-gray-700 rounded-lg">
                    <p className="text-gray-400 text-sm mb-2">Aperçu YouTube détecté:</p>
                    <div className="flex items-center space-x-3">
                      <div className="relative w-24 h-16 rounded overflow-hidden">
                        <Image
                          src={youtubePreview.thumbnail}
                          alt="Thumbnail"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white text-sm">Video ID: {youtubePreview.videoId}</p>
                        <p className="text-green-400 text-xs">✓ URL valide</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    <ImageIcon className="h-4 w-4 inline mr-1" />
                    URL de l&apos;image (Miniature)
                    <span className="text-gray-500 text-xs ml-2">(Optionnel - auto-détecté depuis YouTube)</span>
                  </label>
                  <Input
                    type="url"
                    placeholder="https://... (laissez vide pour utiliser la miniature YouTube)"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    className="bg-dark border-gray-700 text-white"
                  />
                  {formData.thumbnailUrl && (
                    <div className="mt-2 relative w-20 h-28 rounded overflow-hidden">
                      <Image
                        src={formData.thumbnailUrl}
                        alt="Aperçu"
                        fill
                        className="object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Genre</label>
                    <select
                      value={formData.genre}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                      className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-md text-white"
                      required
                    >
                      <option value="">Sélectionner</option>
                      <option value="Drame">Drame</option>
                      <option value="Comédie">Comédie</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Romance">Romance</option>
                      <option value="Action">Action</option>
                      <option value="Documentaire">Documentaire</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Année</label>
                    <Input
                      type="number"
                      placeholder="2024"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="bg-dark border-gray-700 text-white"
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-primary hover:bg-primary-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Soumettre le film
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            {/* My Submitted Films */}
            {submittedFilms.length > 0 && (
              <Card ref={filmsSectionRef} className="bg-dark-50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <Film className="h-5 w-5 mr-2 text-primary" />
                    Mes Films Soumis ({submittedFilms.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {submittedFilms.map((film) => (
                      <div key={film.id} className="flex items-center space-x-3 p-2 bg-dark rounded-lg">
                        <div className="relative w-16 h-20 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={film.thumbnail}
                            alt={film.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm truncate">{film.title}</p>
                          <p className="text-gray-500 text-xs">{film.genre} • {film.year}</p>
                          <Link 
                            href={`/film/${film.id}`}
                            className="text-primary text-xs hover:underline"
                          >
                            Voir →
                          </Link>
                        </div>
                        <button
                          onClick={() => handleDeleteFilm(film.id)}
                          className="p-1 text-gray-500 hover:text-red-500"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Creator Program */}
            <Card className="bg-gradient-to-br from-primary/20 to-dark-50 border-gray-800">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-white mb-2">Programme Créateurs LakayTV</h3>
                <p className="text-gray-300 mb-4">
                  Rejoignez notre programme de créateurs et bénéficiez d&apos;avantages exclusifs: 
                  partage des revenus, promotion de vos films, et accès à des ressources de production.
                </p>
                <ul className="space-y-2 text-gray-300 mb-4">
                  <li className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-500 mr-2" />
                    Partage des revenus à 70%
                  </li>
                  <li className="flex items-center">
                    <Eye className="h-4 w-4 text-blue-500 mr-2" />
                    Promotion sur les réseaux sociaux
                  </li>
                  <li className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-purple-500 mr-2" />
                    Support dédié
                  </li>
                </ul>
                <Button className="w-full bg-primary hover:bg-primary-600">
                  En savoir plus
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions - WITH FUNCTIONALITY */}
            <Card className="bg-dark-50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-white hover:bg-dark"
                  onClick={() => setShowAnalytics(true)}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytique
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-white hover:bg-dark"
                  onClick={scrollToFilms}
                >
                  <Film className="h-4 w-4 mr-2" />
                  Mes Films
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-white hover:bg-dark"
                  onClick={() => setShowMessages(true)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-white hover:bg-dark"
                  onClick={() => setShowSettings(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-dark-50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">Conseils pour les créateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Utilisez des miniatures de haute qualité pour attirer plus de spectateurs
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Écrivez des descriptions détaillées pour améliorer le référencement
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Partagez vos films sur les réseaux sociaux pour augmenter votre audience
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Analytics Modal */}
      {showAnalytics && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <Card className="bg-dark-50 border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Analytique
              </CardTitle>
              <button onClick={() => setShowAnalytics(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Chart placeholder */}
                <div className="bg-dark rounded-lg p-4">
                  <h4 className="text-white font-medium mb-4">Vues cette semaine</h4>
                  <div className="flex items-end space-x-2 h-32">
                    {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-primary rounded-t transition-all"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-gray-500 text-xs mt-1">
                          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-dark rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Vues totales</p>
                    <p className="text-2xl font-bold text-white">{stats.views.toLocaleString()}</p>
                    <p className="text-green-400 text-sm">+12% cette semaine</p>
                  </div>
                  <div className="bg-dark rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Temps de visionnage</p>
                    <p className="text-2xl font-bold text-white">{Math.floor(stats.views / 60)}h</p>
                    <p className="text-green-400 text-sm">+8% cette semaine</p>
                  </div>
                  <div className="bg-dark rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Nouveaux abonnés</p>
                    <p className="text-2xl font-bold text-white">{Math.floor(stats.views / 100)}</p>
                    <p className="text-green-400 text-sm">+15% cette semaine</p>
                  </div>
                  <div className="bg-dark rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Taux d&apos;engagement</p>
                    <p className="text-2xl font-bold text-white">4.2%</p>
                    <p className="text-yellow-400 text-sm">-2% cette semaine</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Messages Modal */}
      {showMessages && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <Card className="bg-dark-50 border-gray-800 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                Messages
              </CardTitle>
              <button onClick={() => setShowMessages(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      msg.read ? 'bg-dark' : 'bg-dark border-l-2 border-primary'
                    } hover:bg-dark-80`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {!msg.read && <Bell className="h-4 w-4 text-primary" />}
                        <span className="text-white font-medium text-sm">{msg.from}</span>
                      </div>
                      <span className="text-gray-500 text-xs">{msg.date}</span>
                    </div>
                    <p className="text-gray-300 text-sm mt-1">{msg.subject}</p>
                  </div>
                ))}
              </div>
              
              {/* Compose Message */}
              <div className="mt-6 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-3">Contacter le support</h4>
                <Input
                  placeholder="Votre message..."
                  className="bg-dark border-gray-700 text-white mb-2"
                />
                <Button className="w-full bg-primary hover:bg-primary-600">
                  <Mail className="h-4 w-4 mr-2" />
                  Envoyer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <Card className="bg-dark-50 border-gray-800 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Settings className="h-5 w-5 mr-2 text-primary" />
                Paramètres
              </CardTitle>
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Profile Settings */}
                <div>
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Profil
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-gray-400 text-sm mb-1 block">Nom</label>
                      <Input
                        placeholder="Votre nom"
                        value={producerSettings.name}
                        onChange={(e) => setProducerSettings({...producerSettings, name: e.target.value})}
                        className="bg-dark border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-1 block">Email</label>
                      <Input
                        type="email"
                        placeholder="votre@email.com"
                        value={producerSettings.email}
                        onChange={(e) => setProducerSettings({...producerSettings, email: e.target.value})}
                        className="bg-dark border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-1 block">Bio</label>
                      <textarea
                        placeholder="Parlez-nous de vous..."
                        value={producerSettings.bio}
                        onChange={(e) => setProducerSettings({...producerSettings, bio: e.target.value})}
                        className="w-full h-20 px-3 py-2 bg-dark border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-1 block flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        Site web
                      </label>
                      <Input
                        type="url"
                        placeholder="https://votre-site.com"
                        value={producerSettings.website}
                        onChange={(e) => setProducerSettings({...producerSettings, website: e.target.value})}
                        className="bg-dark border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="pt-4 border-t border-gray-700">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </h4>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-300">Notifications par email</span>
                    <div 
                      className={`w-12 h-6 rounded-full transition-colors ${
                        producerSettings.notifications ? 'bg-primary' : 'bg-gray-600'
                      }`}
                      onClick={() => setProducerSettings({
                        ...producerSettings, 
                        notifications: !producerSettings.notifications
                      })}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                        producerSettings.notifications ? 'translate-x-6' : 'translate-x-1'
                      } mt-0.5`} />
                    </div>
                  </label>
                </div>

                {/* Save Button */}
                <Button 
                  className="w-full bg-primary hover:bg-primary-600 mt-4"
                  onClick={handleSaveSettings}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
