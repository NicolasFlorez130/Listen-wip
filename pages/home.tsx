import type { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Fragment, useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import spotifyApi from '../lib/spotify';
import { ExtendedJWT } from './api/auth/[...nextauth]';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setUser } from '../Features/User/user-slice';
import { usePalette } from 'react-palette';
import tw from 'twin.macro';
import styled from 'styled-components';

interface Props {
   userResponse: Awaited<ReturnType<typeof spotifyApi.getMe>>;
   songSearch: Awaited<ReturnType<typeof spotifyApi.searchAlbums>>;
}

interface StyledSquareType {
   bgColor: string;
}

const StyledSquare = styled.div<StyledSquareType>`
   ${tw`
      w-20 h-20
   `}

   background-color: ${props => props.bgColor};
`;

const Home = ({ userResponse, songSearch }: Props) => {
   const { data: userFromAuth } = useSession();

   const dispatch = useAppDispatch();

   const { data, loading, error } = usePalette(
      songSearch.body.albums?.items[0]?.images[0].url ?? ''
   );

   const { body: webUser } = userResponse;

   // img.src = songSearch.body.albums?.items[0].images[0].url ?? '';
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

   const user = useAppSelector(state => state.user);
   return (
      <>
         <h1>{user.name}</h1>
         <button onClick={() => signOut({ callbackUrl: '/login' })}>Log out</button>
         {Object.entries(data).map(([prop, color]) => {
            return (
               <Fragment key={color}>
                  <p>{prop}</p>
                  <StyledSquare bgColor={color ?? ''}>{color}</StyledSquare>
               </Fragment>
            );
         })}
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
   const token = (await getToken({ req, secret: process.env.JWT_SECRET })) as ExtendedJWT;

   // spotifyApi.resetAccessToken();
   spotifyApi.setAccessToken(token.accessToken);

   const search = await spotifyApi.searchAlbums('artist:"megadeth"  album:"rust"');

   // const topArtist = await spotifyApi.getMyTopArtists();
   // console.log(topArtist);

   const response = await spotifyApi.getMe();
   return {
      props: {
         userResponse: response,
         songSearch: search,
      },
   };
};

export default Home;
