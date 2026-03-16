import { getSupabaseClient } from '@/lib/supabase';
import type { Content, User, WatchHistory, Favorite, Rating } from './schema';

// ============================================
// CONTENT QUERIES
// ============================================

export async function getAllContent() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Content[];
}

export async function getContentById(id: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('id', id)
    .eq('status', 'active')
    .single();

  if (error) throw error;
  return data as Content | null;
}

export async function getFeaturedContent() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('featured', true)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Content[];
}

export async function getContentByCategory(category: Content['category']) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('category', category)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Content[];
}

export async function getContentByGenre(genre: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('genre', genre)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Content[];
}

export async function searchContent(query: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('status', 'active')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%,genre.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Content[];
}

export async function incrementViewCount(contentId: string) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.rpc('increment_view_count', {
    content_id: contentId
  });

  if (error) {
    // If RPC doesn't exist, update directly
    const { data: current } = await supabase
      .from('content')
      .select('view_count')
      .eq('id', contentId)
      .single();

    if (current) {
      await supabase
        .from('content')
        .update({ view_count: (current.view_count || 0) + 1 })
        .eq('id', contentId);
    }
  }
}

// ============================================
// FAVORITES QUERIES
// ============================================

export async function getUserFavorites(userId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      id,
      created_at,
      content (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addToFavorites(userId: string, contentId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, content_id: contentId })
    .select()
    .single();

  if (error) throw error;
  return data as Favorite;
}

export async function removeFromFavorites(userId: string, contentId: string) {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('content_id', contentId);

  if (error) throw error;
}

export async function isFavorite(userId: string, contentId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('content_id', contentId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return !!data;
}

// ============================================
// WATCH HISTORY QUERIES
// ============================================

export async function getWatchHistory(userId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('watch_history')
    .select(`
      id,
      progress,
      completed,
      watched_at,
      content (*)
    `)
    .eq('user_id', userId)
    .order('watched_at', { ascending: false })
    .limit(20);

  if (error) throw error;
  return data;
}

export async function updateWatchProgress(
  userId: string,
  contentId: string,
  progress: number,
  completed: boolean = false
) {
  const supabase = getSupabaseClient();

  // Upsert watch history
  const { data, error } = await supabase
    .from('watch_history')
    .upsert(
      {
        user_id: userId,
        content_id: contentId,
        progress,
        completed,
        watched_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,content_id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as WatchHistory;
}

export async function getContinueWatching(userId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('watch_history')
    .select(`
      id,
      progress,
      completed,
      watched_at,
      content (*)
    `)
    .eq('user_id', userId)
    .eq('completed', false)
    .order('watched_at', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
}

// ============================================
// RATINGS QUERIES
// ============================================

export async function getUserRatings(userId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('ratings')
    .select(`
      id,
      rating,
      review,
      created_at,
      content (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function rateContent(
  userId: string,
  contentId: string,
  rating: number,
  review?: string
) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('ratings')
    .upsert(
      {
        user_id: userId,
        content_id: contentId,
        rating,
        review,
      },
      { onConflict: 'user_id,content_id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as Rating;
}

export async function getContentRatings(contentId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('ratings')
    .select(`
      id,
      rating,
      review,
      created_at,
      user_id
    `)
    .eq('content_id', contentId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getAverageRating(contentId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('ratings')
    .select('rating')
    .eq('content_id', contentId);

  if (error) throw error;

  if (!data || data.length === 0) return 0;

  const sum = data.reduce((acc: number, curr: { rating: number }) => acc + curr.rating, 0);
  return sum / data.length;
}

// ============================================
// GENRES QUERIES
// ============================================

export async function getAllGenres() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('genres')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
}

// ============================================
// USER QUERIES
// ============================================

export async function createUser(email: string, name?: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('users')
    .insert({ email, name })
    .select()
    .single();

  if (error) throw error;
  return data as User;
}

export async function getUserById(id: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as User | null;
}

export async function getUserByEmail(email: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data as User | null;
}
