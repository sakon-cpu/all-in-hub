import { NextResponse } from 'next/server';
import { getWorks, setWorks, type Work } from '@/lib/kv';
import { nanoid } from 'nanoid';

export async function GET() {
    try {
        const works = await getWorks();
        return NextResponse.json(works);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const works = await getWorks();
        const newWork: Work = { ...body, id: nanoid() };
        works.unshift(newWork);
        await setWorks(works);
        return NextResponse.json(newWork, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
