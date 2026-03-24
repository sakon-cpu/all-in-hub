import { NextResponse } from 'next/server';
import { getCreators, setCreators, type Creator } from '@/lib/kv';
import { nanoid } from 'nanoid';

export async function GET() {
    try {
        const creators = await getCreators();
        return NextResponse.json(creators);
    } catch (e: unknown) {
        const error = e as Error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const creators = await getCreators();
        const newCreator: Creator = { ...body, id: nanoid() };
        creators.push(newCreator);
        await setCreators(creators);
        return NextResponse.json(newCreator, { status: 201 });
    } catch (e: unknown) {
        const error = e as Error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
