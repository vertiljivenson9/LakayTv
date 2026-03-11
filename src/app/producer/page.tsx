'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// SVG Icons
const FilmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
    <line x1="7" y1="2" x2="7" y2="22"/>
    <line x1="17" y1="2" x2="17" y2="22"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

interface Content {
  id: string;
  title: string;
  description: string | null;
  type: string;
  language: string;
  status: string;
  thumbnailUrl: string | null;
  videoUrl: string;
  createdAt: string;
}

export default function ProducerPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [myContent, setMyContent] = useState<Content[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'MOVIE',
    language: 'CREOLE',
    youtubeUrl: '',
    thumbnailUrl: '',
    duration: '',
    releaseYear: '',
  });

  // Cargar contenido del productor
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // Extraer preview de YouTube
  const handleYoutubeChange = (url: string) => {
    setFormData({ ...formData, youtubeUrl: url });

    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        setPreviewUrl(`https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`);
        return;
      }
    }
    setPreviewUrl(null);
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.youtubeUrl) {
      toast({
        title: "Erreur",
        description: "Le titre et l'URL YouTube sont requis",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          producerId: user?.id,
          duration: parseInt(formData.duration) || 0,
          releaseYear: parseInt(formData.releaseYear) || new Date().getFullYear(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Succes",
          description: "Contenu soumis pour validation",
        });
        setFormData({
          title: '',
          description: '',
          type: 'MOVIE',
          language: 'CREOLE',
          youtubeUrl: '',
          thumbnailUrl: '',
          duration: '',
          releaseYear: '',
        });
        setPreviewUrl(null);
        // Recargar contenido
        loadMyContent();
      } else {
        toast({
          title: "Erreur",
          description: data.error || "Erreur lors de la soumission",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur de connexion",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Cargar mi contenido
  const loadMyContent = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`/api/content?producerId=${user.id}`);
      const data = await response.json();
      if (data.success) {
        setMyContent(data.contents);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  useEffect(() => {
    if (isSignedIn && user?.id) {
      loadMyContent();
    }
  }, [isSignedIn, user?.id]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-stone-800 bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-2">
                <img src="/logo.svg" alt="LakayTV" className="h-8 w-8" />
                <span className="text-xl font-bold text-white">LakayTV</span>
              </a>
              <span className="text-stone-600">|</span>
              <span className="text-amber-400 font-medium">Producteur</span>
            </div>
            <Button
              variant="ghost"
              className="text-stone-400 hover:text-white"
              onClick={() => router.push('/')}
            >
              <ArrowLeftIcon />
              <span className="ml-2 hidden sm:inline">Retour</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Reglas */}
        <Card className="bg-amber-900/20 border-amber-700/50 mb-8">
          <CardContent className="p-6">
            <h2 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
              <AlertIcon /> Regles importantes
            </h2>
            <ul className="text-stone-300 text-sm space-y-2">
              <li>1. Seuls les liens YouTube sont acceptes</li>
              <li>2. La qualite minimale est 1080p (Full HD)</li>
              <li>3. Les contenus en 480p ou moins seront refuses</li>
              <li>4. Le contenu sera visible apres validation par l&apos;administrateur</li>
              <li>5. Langues acceptees: Creole et Francais</li>
            </ul>
          </CardContent>
        </Card>

        {/* Formulario */}
        <Card className="bg-stone-900/50 border-stone-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <UploadIcon /> Ajouter un contenu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Título */}
              <div className="space-y-2">
                <Label className="text-stone-300">Titre *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: ENSANSIB"
                  className="bg-stone-800 border-stone-700 text-white"
                  required
                />
              </div>

              {/* Descripción */}
              <div className="space-y-2">
                <Label className="text-stone-300">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Decrivez votre film ou serie..."
                  className="bg-stone-800 border-stone-700 text-white min-h-[100px]"
                />
              </div>

              {/* Fila: Tipo, Idioma, Año */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-stone-300">Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger className="bg-stone-800 border-stone-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-stone-800 border-stone-700">
                      <SelectItem value="MOVIE">Film</SelectItem>
                      <SelectItem value="SERIES">Serie</SelectItem>
                      <SelectItem value="TRAILER">Bande-annonce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-stone-300">Langue</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                  >
                    <SelectTrigger className="bg-stone-800 border-stone-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-stone-800 border-stone-700">
                      <SelectItem value="CREOLE">Creole</SelectItem>
                      <SelectItem value="FRENCH">Francais</SelectItem>
                      <SelectItem value="BOTH">Bilingue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-stone-300">Annee</Label>
                  <Input
                    type="number"
                    value={formData.releaseYear}
                    onChange={(e) => setFormData({ ...formData, releaseYear: e.target.value })}
                    placeholder="2024"
                    className="bg-stone-800 border-stone-700 text-white"
                  />
                </div>
              </div>

              {/* URL YouTube */}
              <div className="space-y-2">
                <Label className="text-stone-300">URL YouTube *</Label>
                <Input
                  value={formData.youtubeUrl}
                  onChange={(e) => handleYoutubeChange(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="bg-stone-800 border-stone-700 text-white"
                  required
                />
                <p className="text-stone-500 text-xs">
                  Format: youtube.com/watch?v=XXX ou youtu.be/XXX
                </p>
              </div>

              {/* Preview */}
              {previewUrl && (
                <div className="space-y-2">
                  <Label className="text-stone-300">Apercu</Label>
                  <div className="relative aspect-video max-w-md rounded-lg overflow-hidden bg-stone-800">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Thumbnail personalizado */}
              <div className="space-y-2">
                <Label className="text-stone-300">Image personnalisee (optionnel)</Label>
                <Input
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                  placeholder="https://... (laissez vide pour utiliser l'image YouTube)"
                  className="bg-stone-800 border-stone-700 text-white"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white w-full"
                disabled={loading}
              >
                {loading ? 'Envoi en cours...' : 'Soumettre pour validation'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Mi contenido */}
        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FilmIcon /> Mes contenus ({myContent.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {myContent.length === 0 ? (
              <div className="text-center py-12 text-stone-500">
                <FilmIcon />
                <p className="mt-4">Aucun contenu soumis</p>
                <p className="text-sm">Vos soumissions apparaitront ici</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myContent.map((content) => (
                  <div
                    key={content.id}
                    className="flex items-center gap-4 p-4 bg-stone-800/50 rounded-lg"
                  >
                    <div className="w-20 h-14 rounded bg-stone-700 overflow-hidden flex-shrink-0">
                      {content.thumbnailUrl && (
                        <img
                          src={content.thumbnailUrl}
                          alt={content.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{content.title}</h3>
                      <p className="text-stone-500 text-sm">
                        {content.type} - {content.language}
                      </p>
                    </div>
                    <div>
                      {content.status === 'PENDING' && (
                        <Badge className="bg-yellow-600">En attente</Badge>
                      )}
                      {content.status === 'APPROVED' && (
                        <Badge className="bg-green-600">Approuve</Badge>
                      )}
                      {content.status === 'REJECTED' && (
                        <Badge className="bg-red-600">Refuse</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
