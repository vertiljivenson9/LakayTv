import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET - Obtener contenido aprobado para el catálogo público
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Por ahora, retornamos contenido hardcodeado hasta que haya datos en la BD
    // En producción, esto vendría de la base de datos
    const mockContent = [
      {
        id: 'featured-1',
        title: 'ENSANSIB',
        description: 'Une production de Magic Film, ecrit et realise par Steeve Bicot.',
        type: 'MOVIE',
        language: 'CREOLE',
        rating: 4.9,
        youtubeId: 'JOcNyL5tUO4',
        thumbnailUrl: 'https://img.youtube.com/vi/JOcNyL5tUO4/maxresdefault.jpg',
        releaseYear: 2024,
        viewCount: 150000,
      }
    ];

    return NextResponse.json({ 
      success: true, 
      contents: mockContent,
      message: 'Connectez-vous en tant que producteur pour ajouter du contenu'
    });
  } catch (error) {
    console.error('Error fetching public content:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur' },
      { status: 500 }
    );
  }
}
