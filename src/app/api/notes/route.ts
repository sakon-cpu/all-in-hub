import { NextResponse } from 'next/server';
import { getNotes, setNotes, type Note } from '@/lib/kv';
import { nanoid } from 'nanoid';

export async function GET() {
    try {
        const notes = await getNotes();
        return NextResponse.json(notes);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const notes = await getNotes();
        const newNote: Note = { ...body, id: nanoid() };
        notes.unshift(newNote);
        await setNotes(notes);
        return NextResponse.json(newNote, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
