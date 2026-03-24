import { NextResponse } from 'next/server';
import { getNews, setNews } from '@/lib/kv';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const news = await getNews();
        const idx = news.findIndex(n => n.id === id);
        if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        news[idx] = { ...news[idx], ...body };
        await setNews(news);
        return NextResponse.json(news[idx]);
    } catch (e: unknown) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const news = await getNews();
        const filtered = news.filter(n => n.id !== id);
        await setNews(filtered);
        return NextResponse.json({ success: true });
    } catch (e: unknown) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}
