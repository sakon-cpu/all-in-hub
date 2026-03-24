import { NextResponse } from 'next/server';
import { getWorks, setWorks } from '@/lib/kv';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const works = await getWorks();
        const idx = works.findIndex(w => w.id === id);
        if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        works[idx] = { ...works[idx], ...body };
        await setWorks(works);
        return NextResponse.json(works[idx]);
    } catch (e: unknown) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const works = await getWorks();
        const filtered = works.filter(w => w.id !== id);
        await setWorks(filtered);
        return NextResponse.json({ success: true });
    } catch (e: unknown) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}
