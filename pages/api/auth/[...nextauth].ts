import nextAuth, { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';
import refreshAccessToken from '../../../lib/refreshAccessToken';
import { LOGIN_URL } from '../../../lib/spotify';

interface User {
   username?: string;
   accessToken?: string;
   refreshToken?: string;
}

interface ExtendedJWT extends JWT {
   username: string;
   accessToken: string;
   refreshToken: string;
   tokenExpires: number;
}

export const authOptions: NextAuthOptions = {
   providers: [
      SpotifyProvider({
         clientId: process.env.SPOTIFY_CLIENT_ID ?? '',
         clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
         authorization: LOGIN_URL,
      }),
   ],
   secret: process.env.JWT_SECRET,
   pages: {
      signIn: '/login',
   },
   callbacks: {
      async jwt({ token, account, user }) {
         const typedToken = (
            !account
               ? token
               : {
                    ...token,
                    username: account.providerAccountId,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    tokenExpires: (account.expires_at ?? 0) * 1000,
                 }
         ) as ExtendedJWT;

         if (account && user) {
            return typedToken;
         }

         if (Date.now() < typedToken.tokenExpires) {
            return typedToken;
         }

         return await refreshAccessToken(typedToken);
      },
      async session({ session, token, user }) {
         const typedUser = session.user as User;
         const typedToken = token as ExtendedJWT;

         typedUser.username = typedToken.username;
         typedUser.accessToken = typedToken.accessToken;
         typedUser.refreshToken = typedToken.refreshToken;

         return session;
      },
   },
};

export type { ExtendedJWT };
export default nextAuth(authOptions);
