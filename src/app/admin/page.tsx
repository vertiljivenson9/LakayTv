'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// SVG Icons
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
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

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

interface Content {
  id: string;
  title: string;
  youtubeId: string;
  type: 'FILM' | 'SERIE';
  language: string;
  rating: number;
  year: number;
  description: string;
  genre: string;
  episodes?: number;
}

// Contenido inicial de demostración
const initialContent: Content[] = [
  { id: 'f1', title: 'ENSANSIB', youtubeId: 'JOcNyL5tUO4', type: 'FILM', language: 'Creole', rating: 4.9, year: 2024, description: 'Tragique histoire de couple', genre: 'Drame' },
  { id: 'f2', title: '2 FRERES JALOUX', youtubeId: 'PoUe8bCHGRo', type: 'FILM', language: 'Creole', rating: 4.7, year: 2025, description: 'Jalousie fraternelle', genre: 'Drame' },
  { id: 'f3', title: 'MANMAN ZONBI', youtubeId: 'F43oGHZM1A4', type: 'FILM', language: 'Creole', rating: 4.6, year: 2024, description: 'Horreur vaudou', genre: 'Horreur' },
  { id: 'f4', title: 'TRAHISON', youtubeId: 'WHX983z6ZqQ', type: 'FILM', language: 'Creole', rating: 4.5, year: 2024, description: 'Trahison et redemption', genre: 'Drame' },
  { id: 's1', title: 'LANMO MANMAN M', youtubeId: 'ZUM4UKnspCg', type: 'SERIE', language: 'Creole', rating: 4.8, year: 2024, description: 'Feyton populaire', genre: 'Drame', episodes: 26 },
];

export default function AdminPage() {
  const [content, setContent] = useState<Content[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    youtubeId: '',
    type: 'FILM' as 'FILM' | 'SERIE',
    language: 'Creole',
    rating: 4.5,
    year: 2024,
    description: '',
    genre: 'Drame',
    episodes: 1,
  });

  // Cargar contenido del localStorage al iniciar
  useEffect(() => {
    const savedContent = localStorage.getItem('lakaytv_content');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    } else {
      setContent(initialContent);
      localStorage.setItem('lakaytv_content', JSON.stringify(initialContent));
    }
  }, []);

  // Guardar contenido en localStorage cuando cambia
  useEffect(() => {
    if (content.length > 0) {
      localStorage.setItem('lakaytv_content', JSON.stringify(content));
    }
  }, [content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingContent) {
      // Actualizar contenido existente
      setContent(content.map(item => 
        item.id === editingContent.id 
          ? { ...formData, id: editingContent.id }
          : item
      ));
    } else {
      // Agregar nuevo contenido
      const newContent: Content = {
        ...formData,
        id: `content_${Date.now()}`,
      };
      setContent([...content, newContent]);
    }
    
    // Resetear formulario
    setFormData({
      title: '',
      youtubeId: '',
      type: 'FILM',
      language: 'Creole',
      rating: 4.5,
      year: 2024,
      description: '',
      genre: 'Drame',
      episodes: 1,
    });
    setShowForm(false);
    setEditingContent(null);
  };

  const handleEdit = (item: Content) => {
    setEditingContent(item);
    setFormData({
      title: item.title,
      youtubeId: item.youtubeId,
      type: item.type,
      language: item.language,
      rating: item.rating,
      year: item.year,
      description: item.description,
      genre: item.genre,
      episodes: item.episodes || 1,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contenu?')) {
      setContent(content.filter(item => item.id !== id));
    }
  };

  const stats = {
    totalFilms: content.filter(c => c.type === 'FILM').length,
    totalSeries: content.filter(c => c.type === 'SERIE').length,
    totalContent: content.length,
    avgRating: content.length > 0 
      ? (content.reduce((sum, c) => sum + c.rating, 0) / content.length).toFixed(1)
      : '0',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Button variant="ghost" className="text-white hover:text-amber-400">
                <ArrowLeftIcon />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="LakayTV" className="h-8 w-8" />
              <span className="text-xl font-bold text-white">Admin LakayTV</span>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-stone-900 border-stone-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <FilmIcon />
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">Films</p>
                    <p className="text-2xl font-bold text-white">{stats.totalFilms}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-stone-900 border-stone-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <TvIcon />
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">Series</p>
                    <p className="text-2xl font-bold text-white">{stats.totalSeries}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-stone-900 border-stone-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-600/20 rounded-lg">
                    <StarIcon />
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">Note Moyenne</p>
                    <p className="text-2xl font-bold text-white">{stats.avgRating}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-stone-900 border-stone-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-600/20 rounded-lg">
                    <UsersIcon />
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">Total Contenu</p>
                    <p className="text-2xl font-bold text-white">{stats.totalContent}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add Content Button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Gestion du Contenu</h2>
            <Button 
              className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
              onClick={() => {
                setEditingContent(null);
                setFormData({
                  title: '',
                  youtubeId: '',
                  type: 'FILM',
                  language: 'Creole',
                  rating: 4.5,
                  year: 2024,
                  description: '',
                  genre: 'Drame',
                  episodes: 1,
                });
                setShowForm(true);
              }}
            >
              <PlusIcon /> Ajouter Contenu
            </Button>
          </div>

          {/* Form Modal */}
          {showForm && (
            <Card className="bg-stone-900 border-stone-800 mb-6">
              <CardHeader>
                <CardTitle className="text-white">
                  {editingContent ? 'Modifier le Contenu' : 'Ajouter du Contenu'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-stone-400 text-sm mb-1 block">Titre *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-stone-400 text-sm mb-1 block">YouTube Video ID *</label>
                      <input
                        type="text"
                        value={formData.youtubeId}
                        onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })}
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-white"
                        placeholder="Ex: JOcNyL5tUO4"
                        required
                      />
                      <p className="text-stone-500 text-xs mt-1">
                        L&apos;ID est la partie après v= dans l&apos;URL YouTube
                      </p>
                    </div>
                    <div>
                      <label className="text-stone-400 text-sm mb-1 block">Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as 'FILM' | 'SERIE' })}
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="FILM">Film</option>
                        <option value="SERIE">Serie</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-stone-400 text-sm mb-1 block">Genre</label>
                      <select
                        value={formData.genre}
                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="Drame">Drame</option>
                        <option value="Comedie">Comedie</option>
                        <option value="Horreur">Horreur</option>
                        <option value="Action">Action</option>
                        <option value="Romance">Romance</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Court-metrage">Court-metrage</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-stone-400 text-sm mb-1 block">Langue</label>
                      <select
                        value={formData.language}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="Creole">Creole</option>
                        <option value="Francais">Francais</option>
                        <option value="Anglais">Anglais</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-stone-400 text-sm mb-1 block">Annee</label>
                      <input
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-white"
                        min="1900"
                        max="2030"
                      />
                    </div>
                    <div>
                      <label className="text-stone-400 text-sm mb-1 block">Note (1-5)</label>
                      <input
                        type="number"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-white"
                        min="1"
                        max="5"
                        step="0.1"
                      />
                    </div>
                    {formData.type === 'SERIE' && (
                      <div>
                        <label className="text-stone-400 text-sm mb-1 block">Nombre d&apos;episodes</label>
                        <input
                          type="number"
                          value={formData.episodes}
                          onChange={(e) => setFormData({ ...formData, episodes: parseInt(e.target.value) })}
                          className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-white"
                          min="1"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-stone-400 text-sm mb-1 block">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-white"
                      rows={3}
                    />
                  </div>
                  
                  {/* Preview */}
                  {formData.youtubeId && (
                    <div className="p-4 bg-stone-800 rounded-lg">
                      <p className="text-stone-400 text-sm mb-2">Apercu:</p>
                      <img
                        src={`https://img.youtube.com/vi/${formData.youtubeId}/hqdefault.jpg`}
                        alt="Preview"
                        className="w-48 rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.jpg';
                        }}
                      />
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                      {editingContent ? 'Modifier' : 'Ajouter'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-stone-700 text-white"
                      onClick={() => {
                        setShowForm(false);
                        setEditingContent(null);
                      }}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Content List */}
          <div className="space-y-4">
            {content.map((item) => (
              <Card key={item.id} className="bg-stone-900 border-stone-800">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                      alt={item.title}
                      className="w-32 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold">{item.title}</h3>
                        <Badge className={item.type === 'FILM' ? 'bg-blue-600' : 'bg-purple-600'}>
                          {item.type === 'FILM' ? 'Film' : 'Serie'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-stone-400 text-sm mb-2">
                        <span>{item.year}</span>
                        <span className="text-amber-400">★ {item.rating}</span>
                        <span>{item.genre}</span>
                        {item.episodes && <span>{item.episodes} episodes</span>}
                      </div>
                      <p className="text-stone-500 text-sm">{item.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-stone-700 text-white"
                        onClick={() => handleEdit(item)}
                      >
                        <EditIcon />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-700 text-red-400 hover:bg-red-900/50"
                        onClick={() => handleDelete(item.id)}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {content.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-500">Aucun contenu. Cliquez sur &quot;Ajouter Contenu&quot; pour commencer.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
