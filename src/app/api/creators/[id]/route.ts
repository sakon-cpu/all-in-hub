import { NextResponse } from 'next/server';
import { getCreators, setCreators } from '@/lib/kv';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const creators = await getCreators();
        const index = creators.findIndex(c => c.id === id);
        if (index === -1) {
            return NextResponse.json({ error: 'Creator not found' }, { status: 404 });
        }
        creators[index] = { ...body, id };
        await setCreators(creators);
        return NextResponse.json(creators[index]);
    } catch (e: unknown) {
        const error = e as Error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const creators = await getCreators();
        const filtered = creators.filter(c => c.id !== id);
        await setCreators(filtered);
        return NextResponse.json({ success: true });
    } catch (e: unknown) {
        const error = e as Error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
