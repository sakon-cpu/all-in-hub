import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin2126';

    if (password === adminPassword) {
        const response = NextResponse.json({ success: true });
        response.cookies.set('hub_admin_token', 'authorized_admin', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 8, // 8 hours
            path: '/',
        });
        return response;
    }

    return NextResponse.json({ success: false }, { status: 401 });
}
