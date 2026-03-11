import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Required for Cloudflare Pages
export const runtime = 'edge';

// GET - Obtener contenido
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (type) {
      where.type = type;
    }

    const contents = await db.content.findMany({
      where,
      include: {
        producer: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        genres: {
          include: {
            genre: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ success: true, contents });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la recuperation' },
      { status: 500 }
    );
  }
}

// POST - Crear contenido
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      type,
      language,
      youtubeUrl,
      thumbnailUrl,
      duration,
      releaseYear,
      producerId,
    } = body;

    // Validaciones
    if (!title || !youtubeUrl || !type || !producerId) {
      return NextResponse.json(
        { success: false, error: 'Titre, URL YouTube, type et producteur sont requis' },
        { status: 400 }
      );
    }

    // Extraer ID de YouTube
    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) {
      return NextResponse.json(
        { success: false, error: 'URL YouTube invalide. Formats acceptes: youtube.com/watch?v=XXX ou youtu.be/XXX' },
        { status: 400 }
      );
    }

    // Crear contenido
    const content = await db.content.create({
      data: {
        title,
        description: description || null,
        type: type as 'MOVIE' | 'SERIES' | 'TRAILER',
        language: (language || 'CREOLE') as 'FRENCH' | 'CREOLE' | 'BOTH',
        videoUrl: youtubeUrl,
        trailerUrl: youtubeUrl,
        thumbnailUrl: thumbnailUrl || `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
        duration: duration || 0,
        releaseYear: releaseYear || new Date().getFullYear(),
        status: 'PENDING',
        quality: 'FHD',
        producerId,
      }
    });

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error('Error creating content:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la creation' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar estado
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'ID et statut requis' },
        { status: 400 }
      );
    }

    const content = await db.content.update({
      where: { id },
      data: { status: status as 'PENDING' | 'APPROVED' | 'REJECTED' }
    });

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise a jour' },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID requis' },
        { status: 400 }
      );
    }

    await db.content.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}

// Extraer ID de YouTube
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}
