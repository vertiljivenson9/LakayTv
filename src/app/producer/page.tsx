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

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
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

const DollarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

interface ProducerContent {
  id: string;
  title: string;
  youtubeId: string;
  type: 'FILM' | 'SERIE';
  status: 'pending' | 'approved' | 'rejected';
  views: number;
  revenue: number;
  submittedAt: string;
  thumbnail: string;
}

// Contenido de demostración para el productor
const initialProducerContent: ProducerContent[] = [
  { 
    id: 'p1', 
    title: 'MON PREMIER FILM', 
    youtubeId: 'dQw4w9WgXcQ', 
    type: 'FILM', 
    status: 'approved', 
    views: 15420, 
    revenue: 125.50,
    submittedAt: '2024-01-15',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
  },
  { 
    id: 'p2', 
    title: 'MA SERIE EPISODE 1', 
    youtubeId: 'JOcNyL5tUO4', 
    type: 'SERIE', 
    status: 'pending', 
    views: 0, 
    revenue: 0,
    submittedAt: '2024-01-20',
    thumbnail: 'https://img.youtube.com/vi/JOcNyL5tUO4/hqdefault.jpg'
  },
];

export default function ProducerPage() {
  const [content, setContent] = useState<ProducerContent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    youtubeId: '',
    type: 'FILM' as 'FILM' | 'SERIE',
    description: '',
  });

  // Cargar contenido del localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem('lakaytv_producer_content');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    } else {
      setContent(initialProducerContent);
      localStorage.setItem('lakaytv_producer_content', JSON.stringify(initialProducerContent));
    }
  }, []);

  // Guardar cambios
  useEffect(() => {
    if (content.length > 0) {
      localStorage.setItem('lakaytv_producer_content', JSON.stringify(content));
    }
  }, [content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newContent: ProducerContent = {
      id: `producer_${Date.now()}`,
      title: formData.title,
      youtubeId: formData.youtubeId,
      type: formData.type,
      status: 'pending',
      views: 0,
      revenue: 0,
      submittedAt: new Date().toISOString().split('T')[0],
      thumbnail: `https://img.youtube.com/vi/${formData.youtubeId}/hqdefault.jpg`,
    };
    
    setContent([...content, newContent]);
    setFormData({ title: '', youtubeId: '', type: 'FILM', description: '' });
    setShowForm(false);
  };

  const stats = {
    totalContent: content.length,
    approved: content.filter(c => c.status === 'approved').length,
    pending: content.filter(c => c.status === 'pending').length,
    totalViews: content.reduce((sum, c) => sum + c.views, 0),
    totalRevenue: content.reduce((sum, c) => sum + c.revenue, 0),
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600"><CheckIcon /> Approuve</Badge>;
      case 'pending':
        return <Badge className="bg-amber-600"><ClockIcon /> En attente</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600">Refuse</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
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
              <span className="text-xl font-bold text-white">Espace Producteur</span>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Banner */}
          <Card className="bg-gradient-to-r from-amber-900/30 to-amber-800/20 border-amber-700/30 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Bienvenue, Producteur!
                  </h1>
                  <p className="text-stone-300">
                    Soumettez vos films et series haitiens et gagnez de l&apos;argent avec votre contenu.
                  </p>
                </div>
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
                  onClick={() => setShowForm(true)}
                >
                  <UploadIcon /> Soumettre un Contenu
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="bg-stone-900 border-stone-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-600/20 rounded-lg">
                    <FilmIcon />
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">Contenu</p>
                    <p className="text-2xl font-bold text-white">{stats.totalContent}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-stone-900 border-stone-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-600/20 rounded-lg">
                    <CheckIcon />
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">Approuve</p>
                    <p className="text-2xl font-bold text-white">{stats.approved}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-stone-900 border-stone-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <EyeIcon />
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">Vues</p>
                    <p className="text-2xl font-bold text-white">{stats.totalViews.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-stone-900 border-stone-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <DollarIcon />
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">Revenus</p>
                    <p className="text-2xl font-bold text-white">${stats.totalRevenue.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-stone-900 border-stone-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-600/20 rounded-lg">
                    <ClockIcon />
                  </div>
                  <div>
                    <p className="text-stone-400 text-sm">En Attente</p>
                    <p className="text-2xl font-bold text-white">{stats.pending}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submit Form Modal */}
          {showForm && (
            <Card className="bg-stone-900 border-stone-800 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Soumettre un Nouveau Contenu</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-stone-400 text-sm mb-1 block">Titre du contenu *</label>
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
                        L&apos;ID est la partie apres v= dans l&apos;URL YouTube
                      </p>
                    </div>
                    <div>
                      <label className="text-stone-400 text-sm mb-1 block">Type de contenu</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as 'FILM' | 'SERIE' })}
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="FILM">Film</option>
                        <option value="SERIE">Serie / Feyton</option>
                      </select>
                    </div>
                  </div>

                  {/* Preview */}
                  {formData.youtubeId && (
                    <div className="p-4 bg-stone-800 rounded-lg">
                      <p className="text-stone-400 text-sm mb-2">Apercu de la miniature:</p>
                      <img
                        src={`https://img.youtube.com/vi/${formData.youtubeId}/hqdefault.jpg`}
                        alt="Preview"
                        className="w-64 rounded"
                      />
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                      Soumettre pour Revision
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-stone-700 text-white"
                      onClick={() => setShowForm(false)}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Content List */}
          <h2 className="text-xl font-bold text-white mb-4">Mon Contenu</h2>
          <div className="space-y-4">
            {content.map((item) => (
              <Card key={item.id} className="bg-stone-900 border-stone-800">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-40 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold">{item.title}</h3>
                        <Badge className={item.type === 'FILM' ? 'bg-blue-600' : 'bg-purple-600'}>
                          {item.type === 'FILM' ? 'Film' : 'Serie'}
                        </Badge>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="flex items-center gap-4 text-stone-400 text-sm mb-2">
                        <span className="flex items-center gap-1">
                          <EyeIcon /> {item.views.toLocaleString()} vues
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarIcon /> ${item.revenue.toFixed(2)}
                        </span>
                        <span>Soumis le {item.submittedAt}</span>
                      </div>
                    </div>
                    <Link href={`/watch/${item.id}`}>
                      <Button variant="outline" className="border-stone-700 text-white">
                        Voir
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {content.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-500 mb-4">Vous n&apos;avez pas encore soumis de contenu.</p>
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
                onClick={() => setShowForm(true)}
              >
                <PlusIcon /> Soumettre votre premier contenu
              </Button>
            </div>
          )}

          {/* Info Section */}
          <Card className="bg-stone-900 border-stone-800 mt-8">
            <CardHeader>
              <CardTitle className="text-white">Comment ca marche?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-amber-400">1</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Soumettez votre contenu</h3>
                  <p className="text-stone-400 text-sm">
                    Ajoutez le lien YouTube de votre film ou serie haitienne.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-amber-400">2</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Revision</h3>
                  <p className="text-stone-400 text-sm">
                    Notre equipe verifie que le contenu respecte nos criteres.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-amber-400">3</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Gagnez de l&apos;argent</h3>
                  <p className="text-stone-400 text-sm">
                    Recevez des revenus pour chaque vue de votre contenu.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
