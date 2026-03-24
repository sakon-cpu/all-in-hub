import { NextResponse } from 'next/server';
import { getNews, setNews, type NewsItem } from '@/lib/kv';
import { nanoid } from 'nanoid';

export async function GET() {
    try {
        const news = await getNews();
        return NextResponse.json(news);
    } catch (e: unknown) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const news = await getNews();
        const newItem: NewsItem = { ...body, id: nanoid() };
        news.unshift(newItem);
        await setNews(news);
        return NextResponse.json(newItem, { status: 201 });
    } catch (e: unknown) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}
