import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { password } = await request.json();
    const sitePassword = process.env.SITE_PASSWORD || 'allhero2026'; // Default for local dev if not set

    if (password === sitePassword) {
        const response = NextResponse.json({ success: true });

        // Set a secure, HttpOnly cookie that expires in 30 days
        response.cookies.set('hub_auth_token', 'authorized_hub_member', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/',
        });

        return response;
    }

    return NextResponse.json({ success: false }, { status: 401 });
}
