// Shared type definitions for CMS content.
// This file is safe to import from both server and client components.

export interface Work {
    id: string;
    no: string;
    titleJa: string;
    titleEn: string;
    synopsisJa: string;
    synopsisEn: string;
    thumbnail: string;
    date: string;
    youtubeId?: string;
    category?: string;
}

export interface NewsItem {
    id: string;
    date: string;
    titleJa: string;
    titleEn: string;
    type: 'info' | 'update' | 'recruit';
    contentJa?: string;
    contentEn?: string;
}

export interface Note {
    id: string;
    slug: string;
    titleJa: string;
    titleEn: string;
    excerptJa: string;
    excerptEn: string;
    contentJa: string;
    contentEn: string;
    author: string;
    category: string;
    date: string;
}
