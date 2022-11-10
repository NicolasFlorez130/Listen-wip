import { GetServerSideProps, NextPage } from 'next';
import { getToken } from 'next-auth/jwt';
import { BuiltInProviderType } from 'next-auth/providers';
import {
   ClientSafeProvider,
   getProviders,
   LiteralUnion,
   signIn,
   signOut,
   useSession,
} from 'next-auth/react';
import { useEffect } from 'react';
import spotifyApi from '../../lib/spotify';

interface Props {
   providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
   // providers: any;
}

const Login = ({ providers }: Props) => {
   // console.log(providers?.spotify);

   const { data: session } = useSession();

   useEffect(() => {
      // console.log(session);
      // spotifyApi.setAccessToken(1);
      session
         ? spotifyApi.getAlbum('5U4W9E5WsYb2jUQWePT8Xm').then(
              data => {
                 console.log('Album information', data.body);
              },
              err => {
                 console.error(err);
              }
           )
         : spotifyApi.resetAccessToken();
   }, [session]);

   return (
      <>
         <button onClick={() => signIn(providers?.spotify.id, { callbackUrl: '/home' })}>login</button>
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async () => {
   const providers = await getProviders();

   return {
      props: {
         providers,
      },
   };
};

export default Login;
