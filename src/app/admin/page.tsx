'use client'

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// SVG Icons
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const FilmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
    <line x1="7" y1="2" x2="7" y2="22"/>
    <line x1="17" y1="2" x2="17" y2="22"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
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
  releaseYear: number;
  createdAt: string;
  producer: {
    id: string;
    name: string | null;
    email: string;
  };
}

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [pendingContent, setPendingContent] = useState<Content[]>([]);
  const [approvedContent, setApprovedContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      // Cargar pendientes
      const pendingRes = await fetch('/api/content?status=PENDING');
      const pendingData = await pendingRes.json();
      if (pendingData.success) {
        setPendingContent(pendingData.contents);
      }

      // Cargar aprobados
      const approvedRes = await fetch('/api/content?status=APPROVED');
      const approvedData = await approvedRes.json();
      if (approvedData.success) {
        setApprovedContent(approvedData.contents);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'APPROVED' }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Succes",
          description: "Contenu approuve",
        });
        loadContent();
      } else {
        toast({
          title: "Erreur",
          description: data.error,
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
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    setProcessingId(id);
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'REJECTED' }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Succes",
          description: "Contenu refuse",
        });
        loadContent();
      } else {
        toast({
          title: "Erreur",
          description: data.error,
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
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce contenu?')) return;

    try {
      const response = await fetch(`/api/content?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Succes",
          description: "Contenu supprime",
        });
        loadContent();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive",
      });
    }
  };

  // Extraer ID de YouTube para mostrar preview
  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-stone-800 bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-2">
                <img src="/logo.svg" alt="LakayTV" className="h-8 w-8" />
                <span className="text-xl font-bold text-white">LakayTV</span>
              </a>
              <span className="text-stone-600">|</span>
              <span className="text-red-400 font-medium">Administration</span>
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

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-stone-900/50 border-stone-800">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-400">{pendingContent.length}</p>
                <p className="text-stone-400 text-sm">En attente</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-stone-900/50 border-stone-800">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-400">{approvedContent.length}</p>
                <p className="text-stone-400 text-sm">Approuves</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-stone-900/50 border-stone-800">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{pendingContent.length + approvedContent.length}</p>
                <p className="text-stone-400 text-sm">Total</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenido pendiente */}
        <Card className="bg-stone-900/50 border-stone-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertIcon /> Contenus en attente ({pendingContent.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12 text-stone-400">Chargement...</div>
            ) : pendingContent.length === 0 ? (
              <div className="text-center py-12 text-stone-500">
                <CheckIcon />
                <p className="mt-4">Aucun contenu en attente</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingContent.map((content) => {
                  const youtubeId = extractYouTubeId(content.videoUrl);
                  return (
                    <div
                      key={content.id}
                      className="flex flex-col sm:flex-row gap-4 p-4 bg-stone-800/50 rounded-lg"
                    >
                      {/* Preview */}
                      <div className="w-full sm:w-48 h-28 rounded overflow-hidden bg-stone-700 flex-shrink-0">
                        {youtubeId && (
                          <img
                            src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                            alt={content.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-white font-medium">{content.title}</h3>
                            <p className="text-stone-400 text-sm mt-1 line-clamp-2">
                              {content.description || 'Pas de description'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Badge variant="outline" className="border-stone-600 text-stone-300">
                            {content.type}
                          </Badge>
                          <Badge variant="outline" className="border-stone-600 text-stone-300">
                            {content.language}
                          </Badge>
                          <span className="text-stone-500 text-xs">
                            {content.releaseYear}
                          </span>
                        </div>
                        <p className="text-stone-500 text-xs mt-2">
                          Par: {content.producer.name || content.producer.email}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex sm:flex-col gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleApprove(content.id)}
                          disabled={processingId === content.id}
                        >
                          <CheckIcon />
                          <span className="ml-1">Approuver</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(content.id)}
                          disabled={processingId === content.id}
                        >
                          <XIcon />
                          <span className="ml-1">Refuser</span>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contenido aprobado */}
        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FilmIcon /> Contenus approuves ({approvedContent.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {approvedContent.length === 0 ? (
              <div className="text-center py-12 text-stone-500">
                <FilmIcon />
                <p className="mt-4">Aucun contenu approuve</p>
              </div>
            ) : (
              <div className="space-y-4">
                {approvedContent.map((content) => {
                  const youtubeId = extractYouTubeId(content.videoUrl);
                  return (
                    <div
                      key={content.id}
                      className="flex items-center gap-4 p-4 bg-stone-800/50 rounded-lg"
                    >
                      <div className="w-20 h-14 rounded overflow-hidden bg-stone-700 flex-shrink-0">
                        {youtubeId && (
                          <img
                            src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                            alt={content.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">{content.title}</h3>
                        <p className="text-stone-500 text-sm">
                          {content.type} - {content.language} - {content.releaseYear}
                        </p>
                      </div>
                      <Badge className="bg-green-600">Approuve</Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleDelete(content.id)}
                      >
                        <XIcon />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
