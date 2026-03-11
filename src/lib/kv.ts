import { Redis } from '@upstash/redis';
import type { Work, NewsItem, Note } from './types';

export type { Work, NewsItem, Note };

let redis: Redis | null = null;

function getRedis(): Redis {
    if (!redis) {
        const url = process.env.UPSTASH_REDIS_REST_URL;
        const token = process.env.UPSTASH_REDIS_REST_TOKEN;
        if (!url || !token) {
            throw new Error('Upstash Redis is not configured. Please add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables.');
        }
        redis = new Redis({ url, token });
    }
    return redis;
}

// --- Works ---
export async function getWorks(): Promise<Work[]> {
    const db = getRedis();
    const data = await db.get<Work[]>('works');
    return data ?? [];
}

export async function setWorks(works: Work[]): Promise<void> {
    const db = getRedis();
    await db.set('works', works);
}

// --- News ---
export async function getNews(): Promise<NewsItem[]> {
    const db = getRedis();
    const data = await db.get<NewsItem[]>('news');
    return data ?? [];
}

export async function setNews(news: NewsItem[]): Promise<void> {
    const db = getRedis();
    await db.set('news', news);
}

// --- Notes ---
export async function getNotes(): Promise<Note[]> {
    const db = getRedis();
    const data = await db.get<Note[]>('notes');
    return data ?? [];
}

export async function setNotes(notes: Note[]): Promise<void> {
    const db = getRedis();
    await db.set('notes', notes);
}
