import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request = NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ['/login', '/signup', '/forgetpassword', '/', '/resetpassword', '/verifyemail'];
  const token = request.cookies.get('token')?.value || '';

  if (publicPaths.includes(path) && token) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }

  if (!publicPaths.includes(path) && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/profile/:path*',
    '/verifyemail',
    '/createprojectpost',
    '/resetpassword',
    '/checkemail',
    '/posts/:path*',
    '/home',
    '/posts',
    '/yourposts',
    '/yourposts/:path*'
  ],
};
