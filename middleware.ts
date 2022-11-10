import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import refreshAccessToken from './lib/refreshAccessToken';
import { ExtendedJWT } from './pages/api/auth/[...nextauth]';

export async function middleware(req: NextRequest) {
   const token = await getToken({ req, secret: process.env.JWT_SECRET });
   const typedToken = token as ExtendedJWT;

   const { pathname } = req.nextUrl;

   if (typedToken && Date.now() > typedToken.tokenExpires) {
      refreshAccessToken(typedToken);
   }

   if (pathname.includes('/api/auth') || token || pathname.startsWith('/_next')) {
      return NextResponse.next();
   } else if (!token && !pathname.includes('/login')) {
      req.nextUrl.pathname = '/login';
      return NextResponse.redirect(req.nextUrl);
   }
}
