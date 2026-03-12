"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, Plus, Edit, Trash2, Search, Film, Tv, 
  FileVideo, Upload, Image as ImageIcon, Youtube, 
  CheckCircle, AlertTriangle, X, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { contents, Content } from "@/data/content";

// Function to parse YouTube URL and extract video ID
function parseYouTubeUrl(url: string): { videoId: string; thumbnailUrl: string } | null {
  if (!url) return null;
  
  let videoId: string | null = null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
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
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  };
}

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [userFilms, setUserFilms] = useState<Content[]>([]);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    thumbnailUrl: "",
    genre: "",
    year: "",
    category: "movie",
    duration: "",
  });
  const [youtubePreview, setYoutubePreview] = useState<{ videoId: string; thumbnailUrl: string } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load films from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lakaytv_submitted_films");
    if (saved) {
      try {
        setUserFilms(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading films:", e);
      }
    }
  }, []);

  // Handle YouTube URL change
  const handleYoutubeUrlChange = (url: string) => {
    setFormData({ ...formData, youtubeUrl: url });
    
    const parsed = parseYouTubeUrl(url);
    if (parsed) {
      setYoutubePreview(parsed);
      if (!formData.thumbnailUrl) {
        setFormData(prev => ({ ...prev, thumbnailUrl: parsed.thumbnailUrl }));
      }
    } else {
      setYoutubePreview(null);
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsed = parseYouTubeUrl(formData.youtubeUrl);
    if (!parsed) {
      alert("URL YouTube invalide");
      return;
    }
    
    const newFilm: Content = {
      id: `admin_${Date.now()}`,
      title: formData.title,
      description: formData.description,
      thumbnail: formData.thumbnailUrl || parsed.thumbnailUrl,
      youtubeId: parsed.videoId,
      year: parseInt(formData.year) || new Date().getFullYear(),
      category: formData.category as Content["category"],
      genre: formData.genre,
      duration: formData.duration || "N/A",
      rating: "Nouveau",
    };
    
    const updatedFilms = [newFilm, ...userFilms];
    setUserFilms(updatedFilms);
    localStorage.setItem("lakaytv_submitted_films", JSON.stringify(updatedFilms));
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      youtubeUrl: "",
      thumbnailUrl: "",
      genre: "",
      year: "",
      category: "movie",
      duration: "",
    });
    setYoutubePreview(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    const updatedFilms = userFilms.filter(f => f.id !== id);
    setUserFilms(updatedFilms);
    localStorage.setItem("lakaytv_submitted_films", JSON.stringify(updatedFilms));
  };

  // Combine all content
  const allContent = [...userFilms, ...contents];
  
  const filteredContent = allContent.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: allContent.length,
    movies: allContent.filter((c) => c.category === "movie").length,
    series: allContent.filter((c) => c.category === "series").length,
    documentaries: allContent.filter((c) => c.category === "documentary").length,
    userAdded: userFilms.length,
  };

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
              <h1 className="text-2xl md:text-3xl font-bold text-white">Administration</h1>
              <p className="text-gray-400">Gérer le contenu LakayTV</p>
            </div>
          </div>
          <Button 
            className="bg-primary hover:bg-primary-600"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un film
          </Button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
            <p className="text-green-400">Film ajouté avec succès!</p>
          </div>
        )}

        {/* Warning */}
        <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-400 font-medium">Note sur la persistance</p>
              <p className="text-yellow-400/70 text-sm">
                Les films ajoutés sont stockés en localStorage. Une base de données sera nécessaire pour une persistance permanente.
              </p>
            </div>
          </div>
        </div>

        {/* Add Film Form */}
        {showAddForm && (
          <Card className="bg-dark-50 border-gray-800 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-primary" />
                    Ajouter un nouveau film
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Remplissez le formulaire pour ajouter un film
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowAddForm(false)}>
                  <X className="h-5 w-5 text-gray-400" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Titre *</label>
                    <Input
                      type="text"
                      placeholder="Titre du film"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-dark border-gray-700 text-white"
                      required
                    />
                  </div>
                  
                  {/* YouTube URL */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">
                      <Youtube className="h-4 w-4 inline mr-1" />
                      URL YouTube *
                    </label>
                    <Input
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      value={formData.youtubeUrl}
                      onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                      className="bg-dark border-gray-700 text-white"
                      required
                    />
                    {youtubePreview && (
                      <p className="text-green-400 text-xs mt-1 flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Video ID: {youtubePreview.videoId}
                      </p>
                    )}
                  </div>
                  
                  {/* Genre */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Genre *</label>
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
                  
                  {/* Category */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Catégorie *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-md text-white"
                      required
                    >
                      <option value="movie">Film</option>
                      <option value="series">Série</option>
                      <option value="documentary">Documentaire</option>
                      <option value="short">Court-métrage</option>
                    </select>
                  </div>
                  
                  {/* Year */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Année *</label>
                    <Input
                      type="number"
                      placeholder="2024"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="bg-dark border-gray-700 text-white"
                      required
                    />
                  </div>
                  
                  {/* Duration */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">Durée</label>
                    <Input
                      type="text"
                      placeholder="1h 30min"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="bg-dark border-gray-700 text-white"
                    />
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Description *</label>
                  <textarea
                    placeholder="Description du film..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full h-24 px-3 py-2 bg-dark border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                {/* Thumbnail URL */}
                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    <ImageIcon className="h-4 w-4 inline mr-1" />
                    URL de l&apos;image (optionnel)
                  </label>
                  <Input
                    type="url"
                    placeholder="Auto-détecté depuis YouTube"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    className="bg-dark border-gray-700 text-white"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Laissez vide pour utiliser la miniature YouTube automatique
                  </p>
                </div>
                
                {/* Preview */}
                {youtubePreview && (
                  <div className="flex items-start space-x-4 p-4 bg-dark rounded-lg border border-gray-700">
                    <div className="relative w-32 h-20 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={formData.thumbnailUrl || youtubePreview.thumbnailUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{formData.title || "Titre du film"}</p>
                      <p className="text-gray-400 text-sm">{formData.genre} • {formData.year || "2024"}</p>
                      <p className="text-green-400 text-xs mt-1 flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Prêt à ajouter
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter le film
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Film className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Film className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Films</p>
                  <p className="text-2xl font-bold text-white">{stats.movies}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Tv className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Séries</p>
                  <p className="text-2xl font-bold text-white">{stats.series}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <FileVideo className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Docs</p>
                  <p className="text-2xl font-bold text-white">{stats.documentaries}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Upload className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Ajoutés</p>
                  <p className="text-2xl font-bold text-white">{stats.userAdded}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher du contenu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-dark-50 border-gray-700 text-white"
            />
          </div>
        </div>

        {/* Content Table */}
        <Card className="bg-dark-50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Contenu ({filteredContent.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left text-gray-400 font-medium py-3 px-2">Miniature</th>
                    <th className="text-left text-gray-400 font-medium py-3 px-2">Titre</th>
                    <th className="text-left text-gray-400 font-medium py-3 px-2">Catégorie</th>
                    <th className="text-left text-gray-400 font-medium py-3 px-2">Genre</th>
                    <th className="text-left text-gray-400 font-medium py-3 px-2">Année</th>
                    <th className="text-right text-gray-400 font-medium py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContent.map((content) => (
                    <tr key={content.id} className="border-b border-gray-800 hover:bg-dark-100">
                      <td className="py-3 px-2">
                        <div className="relative w-16 h-10 rounded overflow-hidden">
                          <Image
                            src={content.thumbnail}
                            alt={content.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-white">{content.title}</span>
                        {content.id.startsWith('admin_') && (
                          <span className="ml-2 px-1.5 py-0.5 bg-primary/20 text-primary text-xs rounded">Nouveau</span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-dark rounded text-gray-300 text-sm">
                          {content.category === "movie" ? "Film" : 
                           content.category === "series" ? "Série" :
                           content.category === "documentary" ? "Doc" : "Court"}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-gray-400">{content.genre}</td>
                      <td className="py-3 px-2 text-gray-400">{content.year}</td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex justify-end space-x-2">
                          <Link href={`/film/${content.id}`}>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {content.id.startsWith('admin_') && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-gray-400 hover:text-red-500"
                              onClick={() => handleDelete(content.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
