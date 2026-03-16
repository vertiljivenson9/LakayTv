-- LakayTV Database Schema for Supabase
-- Ejecutar este script en el SQL Editor de Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  avatar_url TEXT,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================
-- GENRES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS genres (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

INSERT INTO genres (name, slug) VALUES
  ('Comédie', 'comedie'),
  ('Drame', 'drame'),
  ('Romance', 'romance'),
  ('Action', 'action'),
  ('Thriller', 'thriller'),
  ('Documentaire', 'documentaire'),
  ('Court-métrage', 'court-metrage'),
  ('Comédie Dramatique', 'comedie-dramatique')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- CONTENT TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  category VARCHAR(20) NOT NULL,
  genre TEXT NOT NULL,
  duration TEXT NOT NULL,
  year INTEGER NOT NULL,
  rating TEXT DEFAULT '0/5',
  director TEXT,
  cast_members JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT FALSE,
  producer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_content_category ON content(category);
CREATE INDEX IF NOT EXISTS idx_content_genre ON content(genre);
CREATE INDEX IF NOT EXISTS idx_content_featured ON content(featured);
CREATE INDEX IF NOT EXISTS idx_content_status ON content(status);

-- ============================================
-- CONTENT_GENRES JUNCTION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS content_genres (
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  genre_id UUID NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
  PRIMARY KEY (content_id, genre_id)
);

-- ============================================
-- SEASONS TABLE (for series)
-- ============================================
CREATE TABLE IF NOT EXISTS seasons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  season_number INTEGER NOT NULL,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(content_id, season_number)
);

-- ============================================
-- EPISODES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS episodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  season_id UUID NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  episode_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  youtube_id TEXT NOT NULL,
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(season_id, episode_number)
);

-- ============================================
-- WATCH_HISTORY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS watch_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  episode_id UUID REFERENCES episodes(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  watched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, content_id, episode_id)
);

CREATE INDEX IF NOT EXISTS idx_watch_history_user ON watch_history(user_id);
CREATE INDEX IF NOT EXISTS idx_watch_history_content ON watch_history(content_id);

-- ============================================
-- FAVORITES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);

-- ============================================
-- RATINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

CREATE INDEX IF NOT EXISTS idx_ratings_content ON ratings(content_id);

-- ============================================
-- SUBSCRIPTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);

-- ============================================
-- SUBMISSIONS TABLE (for producers)
-- ============================================
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  producer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  genre TEXT NOT NULL,
  year INTEGER NOT NULL,
  duration TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_submissions_producer ON submissions(producer_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);

-- ============================================
-- INSERT INITIAL CONTENT DATA
-- ============================================
INSERT INTO content (id, title, description, thumbnail, youtube_id, category, genre, duration, year, rating, featured) VALUES
  ('00000001-0000-0000-0000-000000000001', 'Tonton Dezirab - Lang Long', 'Un film haïtien complet en créole 4K du canal FXPRO ENTERTAINMENT. Une comédie haïtienne hilarante qui vous fera rire aux éclats.', 'https://i.ytimg.com/vi/qqL1cfj9ZP4/hqdefault.jpg', 'qqL1cfj9ZP4', 'movie', 'Comédie', '1h 15min', 2025, '4.8/5', TRUE),
  ('00000001-0000-0000-0000-000000000002', 'Lang Long - Version #2', 'La deuxième version du film Lang Long par FXPRO ENTERTAINMENT. Une comédie haïtienne en créole avec une qualité 4K exceptionnelle.', 'https://i.ytimg.com/vi/05scOrldMw4/hqdefault.jpg', '05scOrldMw4', 'movie', 'Comédie', '1h 20min', 2025, '4.7/5', TRUE),
  ('00000001-0000-0000-0000-000000000003', 'KOUT BA - Film Ayisyen 2026', 'Un film haïtien complet de la série Tonton Dezirab par FXPRO ENTERTAINMENT.', 'https://i.ytimg.com/vi/inOB-Jl_LnA/hqdefault.jpg', 'inOB-Jl_LnA', 'movie', 'Comédie', '1h 10min', 2026, '4.6/5', TRUE),
  ('00000001-0000-0000-0000-000000000004', 'Tòg Chòv - Dezirab', 'Un film complet en créole haïtien. Une histoire émouvante de famille.', 'https://i.ytimg.com/vi/LjoXumlw1GA/hqdefault.jpg', 'LjoXumlw1GA', 'movie', 'Drame', '1h 25min', 2024, '4.5/5', FALSE),
  ('00000001-0000-0000-0000-000000000005', 'DEZIRAB - Film Ayisyen Romantik', 'Un film romantique haïtien en 4K. Une belle histoire damour.', 'https://i.ytimg.com/vi/UdkvaRkvwDM/hqdefault.jpg', 'UdkvaRkvwDM', 'movie', 'Romance', '1h 05min', 2025, '4.4/5', FALSE),
  ('00000001-0000-0000-0000-000000000006', 'Tonton Dezirab - BRI SAPAT', 'Un film complet de la série Tonton Dezirab. Une comédie haïtienne familiale.', 'https://i.ytimg.com/vi/lxCsUDGR-j8/hqdefault.jpg', 'lxCsUDGR-j8', 'movie', 'Comédie', '1h 30min', 2024, '4.6/5', FALSE),
  ('00000001-0000-0000-0000-000000000007', 'EPISODE #6 AWOUSA KOUT BA', 'Un épisode de la série EKLEZIAS avec Tonton Dezirab.', 'https://i.ytimg.com/vi/-vYqMjhv6Is/hqdefault.jpg', '-vYqMjhv6Is', 'series', 'Comédie Dramatique', '45min', 2026, '4.5/5', FALSE),
  ('00000001-0000-0000-0000-000000000008', 'JISTIS POU CHACHA', 'Un film de la série Tonton Dezirab sur la justice et la famille.', 'https://i.ytimg.com/vi/7C7Ew9tyeFk/hqdefault.jpg', '7C7Ew9tyeFk', 'movie', 'Comédie', '55min', 2025, '4.4/5', FALSE),
  ('00000001-0000-0000-0000-000000000009', 'Tonton Dezirab - MON KOMPÈ', 'Episode #3 Nèg Anwo - Un film de la série Tonton Dezirab.', 'https://i.ytimg.com/vi/P-cavpxha-E/hqdefault.jpg', 'P-cavpxha-E', 'series', 'Comédie', '40min', 2025, '4.3/5', FALSE),
  ('00000001-0000-0000-0000-000000000010', 'NéG Anro - Film Haitian', 'Episode #9 de la série avec Tonton Dezirab et Mazora.', 'https://i.ytimg.com/vi/1lLMLg9L3iE/hqdefault.jpg', '1lLMLg9L3iE', 'series', 'Comédie', '35min', 2025, '4.3/5', FALSE),
  ('00000001-0000-0000-0000-000000000011', 'REKONSILYASYON', 'Un film haïtien complet sur le thème de la réconciliation.', 'https://i.ytimg.com/vi/OdVabqus_XQ/hqdefault.jpg', 'OdVabqus_XQ', 'movie', 'Drame', '1h', 2025, '4.4/5', FALSE),
  ('00000001-0000-0000-0000-000000000012', 'TONTON DEZIRAB - KONSEYE', 'Comédie haïtienne avec des conseils hilarants.', 'https://i.ytimg.com/vi/duoW68S-RRc/hqdefault.jpg', 'duoW68S-RRc', 'movie', 'Comédie', '50min', 2025, '4.5/5', FALSE)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE watch_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Content is readable by everyone" ON content
  FOR SELECT USING (status = 'active');

CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Users can read own favorites" ON favorites
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete own favorites" ON favorites
  FOR DELETE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can read own history" ON watch_history
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own history" ON watch_history
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own history" ON watch_history
  FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Ratings are readable by everyone" ON ratings
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own ratings" ON ratings
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own ratings" ON ratings
  FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Genres are readable by everyone" ON genres
  FOR SELECT USING (true);

-- ============================================
-- GRANT PERMISSIONS
-- ============================================
GRANT SELECT ON content TO anon;
GRANT SELECT ON genres TO anon;
GRANT SELECT ON ratings TO anon;
GRANT SELECT ON seasons TO anon;
GRANT SELECT ON episodes TO anon;

GRANT SELECT ON content TO authenticated;
GRANT SELECT ON genres TO authenticated;
GRANT SELECT ON ratings TO authenticated;
GRANT SELECT ON seasons TO authenticated;
GRANT SELECT ON episodes TO authenticated;
GRANT ALL ON users TO authenticated;
GRANT ALL ON favorites TO authenticated;
GRANT ALL ON watch_history TO authenticated;
GRANT ALL ON ratings TO authenticated;
GRANT ALL ON subscriptions TO authenticated;
GRANT ALL ON submissions TO authenticated;
