import { pgTable, uuid, text, integer, boolean, timestamp, varchar, jsonb } from 'drizzle-orm/pg-core';

// Users table - synced with Supabase Auth
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  role: varchar('role', { length: 20 }).default('user').notNull(), // user, producer, admin
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Content table - Films, Series, Documentaries
export const content = pgTable('content', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  thumbnail: text('thumbnail').notNull(),
  youtubeId: text('youtube_id').notNull(),
  category: varchar('category', { length: 20 }).notNull(), // movie, series, documentary, short
  genre: text('genre').notNull(),
  duration: text('duration').notNull(),
  year: integer('year').notNull(),
  rating: text('rating').default('0/5'),
  director: text('director'),
  cast: jsonb('cast').$type<string[]>().default([]),
  featured: boolean('featured').default(false),
  producerId: uuid('producer_id').references(() => users.id),
  status: varchar('status', { length: 20 }).default('active').notNull(), // active, pending, rejected
  viewCount: integer('view_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Genres table
export const genres = pgTable('genres', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
});

// Content-Genres junction table
export const contentGenres = pgTable('content_genres', {
  contentId: uuid('content_id').references(() => content.id, { onDelete: 'cascade' }).notNull(),
  genreId: uuid('genre_id').references(() => genres.id, { onDelete: 'cascade' }).notNull(),
});

// Seasons table (for series)
export const seasons = pgTable('seasons', {
  id: uuid('id').primaryKey().defaultRandom(),
  contentId: uuid('content_id').references(() => content.id, { onDelete: 'cascade' }).notNull(),
  seasonNumber: integer('season_number').notNull(),
  title: text('title'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Episodes table
export const episodes = pgTable('episodes', {
  id: uuid('id').primaryKey().defaultRandom(),
  seasonId: uuid('season_id').references(() => seasons.id, { onDelete: 'cascade' }).notNull(),
  episodeNumber: integer('episode_number').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  thumbnail: text('thumbnail'),
  youtubeId: text('youtube_id').notNull(),
  duration: text('duration'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Watch History
export const watchHistory = pgTable('watch_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  contentId: uuid('content_id').references(() => content.id, { onDelete: 'cascade' }).notNull(),
  episodeId: uuid('episode_id').references(() => episodes.id, { onDelete: 'cascade' }),
  progress: integer('progress').default(0), // seconds watched
  completed: boolean('completed').default(false),
  watchedAt: timestamp('watched_at').defaultNow().notNull(),
});

// Favorites
export const favorites = pgTable('favorites', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  contentId: uuid('content_id').references(() => content.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User Ratings
export const ratings = pgTable('ratings', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  contentId: uuid('content_id').references(() => content.id, { onDelete: 'cascade' }).notNull(),
  rating: integer('rating').notNull(), // 1-5
  review: text('review'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Subscriptions
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  plan: varchar('plan', { length: 20 }).notNull(), // free, basic, pro
  status: varchar('status', { length: 20 }).default('active').notNull(), // active, expired, cancelled
  startedAt: timestamp('started_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at'),
});

// Content Submissions (for producers)
export const submissions = pgTable('submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  producerId: uuid('producer_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  youtubeUrl: text('youtube_url').notNull(),
  genre: text('genre').notNull(),
  year: integer('year').notNull(),
  duration: text('duration').notNull(),
  contactEmail: text('contact_email').notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(), // pending, approved, rejected
  adminNotes: text('admin_notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  reviewedAt: timestamp('reviewed_at'),
});

// Type exports
export type User = typeof users.$inferSelect;
export type Content = typeof content.$inferSelect;
export type Genre = typeof genres.$inferSelect;
export type Season = typeof seasons.$inferSelect;
export type Episode = typeof episodes.$inferSelect;
export type WatchHistory = typeof watchHistory.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
export type Rating = typeof ratings.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type Submission = typeof submissions.$inferSelect;
