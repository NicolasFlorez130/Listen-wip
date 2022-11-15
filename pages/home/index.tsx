import type { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import spotifyApi from '../../lib/spotify';
import { ExtendedJWT } from '../api/auth/[...nextauth]';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setUser } from '../../features/user/user-slice';
import tw from 'twin.macro';
import NavBarPhone from '../../components/NavBarPhone';
import TopSide from './sections/TopSide';
import Recommendations from './sections/Recommendations';
import Overview from './sections/Overview';
import HomeResponseContext from './contexts/HomeResponseContext';
import views from './views';
import Header from '../../components/Header';
import Songs from './sections/Songs';

interface Props {
   me: Awaited<ReturnType<typeof spotifyApi.getMe>>;
   playlists: Awaited<ReturnType<typeof spotifyApi.getUserPlaylists>>;
   songs: Awaited<ReturnType<typeof spotifyApi.getMySavedTracks>>;
}

const Index = ({ me, playlists, songs }: Props) => {
   const dispatch = useAppDispatch();
   const [view, setView] = useState(views.Overview);

   const { body: webUser } = me;

   useEffect(() => {
      dispatch(
         setUser({
            id: webUser.id,
            name: webUser.display_name ?? 'Unknown',
            email: webUser.email,
            image: webUser.images?.at(0)?.url ?? '',
            uri: webUser.uri,
         })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         <Header />
         <main>
            <TopSide />
            <Recommendations view={view} setView={setView}>
               <HomeResponseContext.Provider value={{ me, playlists, songs }}>
                  {view === views.Overview ? <Overview /> : view === views.Songs ? <Songs /> : null}
               </HomeResponseContext.Provider>
            </Recommendations>
            <NavBarPhone />
         </main>
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
   const token = (await getToken({ req, secret: process.env.JWT_SECRET })) as ExtendedJWT;
   // NextResponse.redirect('/login');

   if (Date.now() >= token.tokenExpires) {
      spotifyApi
         .refreshAccessToken()
         .then(data => spotifyApi.setAccessToken(data.body.access_token));
   } else {
      spotifyApi.setAccessToken(token.accessToken);
      spotifyApi.setRefreshToken(token.refreshToken);
   }

   const playlists = await spotifyApi.getUserPlaylists();
   const songs = await spotifyApi.getMySavedTracks();
   const me = await spotifyApi.getMe();

   return {
      props: {
         me,
         songs,
         playlists,
      },
   };
};

export default Index;

export type { Props as HomeProps };
