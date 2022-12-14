import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
   const token = await getToken({ req, secret: process.env.JWT_SECRET });

   const { pathname } = req.nextUrl;

   if (pathname.includes('/api/auth') || token || pathname.startsWith('/_next')) {
      return NextResponse.next();
   } else if (!token && !pathname.includes('/login')) {
      req.nextUrl.pathname = '/login';
      return NextResponse.redirect(req.nextUrl);
   }
}
