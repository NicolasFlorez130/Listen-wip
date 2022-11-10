import { ExtendedJWT } from '../pages/api/auth/[...nextauth]';
import spotifyApi from './spotify';

const refreshAccessToken = async (token: ExtendedJWT) => {
   try {
      spotifyApi.setAccessToken(token.accessToken);
      spotifyApi.setRefreshToken(token.refreshToken);

      const { body } = await spotifyApi.refreshAccessToken();
      return {
         ...token,
         accessToken: body.access_token,
         refreshToken: body.refresh_token ?? token.refreshToken,
         tokenExpires: Date.now() + body.expires_in * 1000,
      };
   } catch (error) {
      console.error(error);
      return {
         ...token,
         error,
      };
   }
};

export default refreshAccessToken;
