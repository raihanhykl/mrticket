/** @format */
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { auth } from '@/auth';
// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await auth();
  const user = session?.user;
  const { pathname } = request.nextUrl;

  if (
    user?.id &&
    (pathname === '/login' ||
      pathname === '/register' ||
      pathname.startsWith('/verification'))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (
    !user &&
    (pathname === '/my-tickets' ||
      pathname === '/carts' ||
      pathname === '/profile' ||
      pathname === '/review')
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (
    (!user || user?.roleId === 1) &&
    (pathname === '/createEvent' ||
      pathname.startsWith('/update-event') ||
      pathname.startsWith('/dashboard') ||
      pathname.startsWith('/dashboard-event'))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/register',
    '/createEvent',
    '/update-event/:path*',
    '/dashboard',
    '/dashboard-event/:path*',
    '/my-tickets',
    '/carts',
    '/profile',
    '/review',
    '/verification/:path*',
  ],
};
