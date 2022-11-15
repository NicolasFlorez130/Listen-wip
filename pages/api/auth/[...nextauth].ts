import nextAuth, { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import refreshAccessToken from '../../../lib/refreshAccessToken';
import spotifyApi, { scopes } from '../../../lib/spotify';
import { ExtendedJWT, User } from './types';

export const authOptions: NextAuthOptions = {
   providers: [
      SpotifyProvider({
         clientId: process.env.SPOTIFY_CLIENT_ID ?? '',
         clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
         authorization: spotifyApi.createAuthorizeURL(scopes, 'random-state-owo'),
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

         return typedToken;
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
