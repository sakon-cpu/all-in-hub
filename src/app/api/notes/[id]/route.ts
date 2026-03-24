import { NextResponse } from 'next/server';
import { getNotes, setNotes } from '@/lib/kv';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const notes = await getNotes();
        const idx = notes.findIndex(n => n.id === id);
        if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        notes[idx] = { ...notes[idx], ...body };
        await setNotes(notes);
        return NextResponse.json(notes[idx]);
    } catch (e: unknown) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const notes = await getNotes();
        const filtered = notes.filter(n => n.id !== id);
        await setNotes(filtered);
        return NextResponse.json({ success: true });
    } catch (e: unknown) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}
