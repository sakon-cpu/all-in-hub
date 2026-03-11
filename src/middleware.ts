import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Paths that are always allowed
    const publicPaths = ['/login', '/api/auth', '/_next', '/favicon.ico', '/hero-background.mp4', '/drone-neokabukicho.mp4', '/nexus_protocol_thumb.png', '/corporate_work_1.png'];

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
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
