import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const publicPaths = [
        '/login', '/admin',
        '/api/auth', '/api/admin-auth', '/api/works', '/api/news', '/api/notes', '/api/seed', '/api/upload',
        '/_next', '/favicon.ico', '/hero-background.mp4', '/drone-neokabukicho.mp4', '/nexus_protocol_thumb.png', '/corporate_work_1.png', '/uploads'
    ];

    if (publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Check for the auth token cookie
    const authToken = request.cookies.get('hub_auth_token');

    if (!authToken) {
        const loginUrl = new URL('/login', request.url);
        // Remember the original page to redirect back after login
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
