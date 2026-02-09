import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'amous-admin-secret-key-2024'
);
const COOKIE_NAME = 'amous_admin_token';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin/login은 인증 불필요
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // /admin/* 경로에 대한 인증 체크
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      // 토큰 없으면 로그인 페이지로 리다이렉트
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // 토큰 검증
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      // 토큰 무효하면 로그인 페이지로
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
