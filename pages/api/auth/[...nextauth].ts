import nextAuth, { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

interface ExtendedSession extends Session {
   accessToken: string;
}

export const authOptions: NextAuthOptions = {
   providers: [
      SpotifyProvider({
         clientId: process.env.SPOTIFY_CLIENT_ID ?? '',
         clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
         // authorization: LOGIN_URL
      }),
   ],
   callbacks: {
      async jwt({ token, account }) {
         if (account) {
            token.accessToken = account.access_token;
         }
         return token;
      },
      async session({ session, token, user }) {
         (session as ExtendedSession).accessToken = token.accessToken as string;
         return session;
      },
   },
};

export default nextAuth(authOptions);
