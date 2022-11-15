import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { mapRange } from '../lib/maths';
import Card from './Card';

interface Props {
   item: SpotifyApi.TrackObjectFull;
}

const rotation = () => mapRange(Math.random(), 0, 1, -2, 2);

const SongPreview = ({ item }: Props) => {
   const duration = new Date(item.duration_ms);
   const durationInMinutes = `${duration.getMinutes()}:${duration
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;

   const nameAsArray = item.name.split('');

   return (
      <Container>
         <Card chains={1}>
            <div className="img-side">
               <div className="song-cover">
                  <Image
                     src={item.album.images[0].url}
                     alt={item.name + ' cover image'}
                     layout="fill"
                     objectFit="contain"
                  />
               </div>
            </div>
            <div className="info-side">
               <p tw="font-semibold text-sm">
                  {item.artists.map(
                     (artist, i) => `${artist.name}${i < item.artists.length - 1 ? ', ' : ''}`
                  )}
               </p>
               <h4 tw="text-lg text-gray-700">
                  {nameAsArray.slice(0, 35)}
                  {nameAsArray.length > 35 && '...'}
               </h4>
            </div>
            <div className="duration | h-min" tw="self-end text-gray-600 pr-2">
               <p>{durationInMinutes}</p>
            </div>
         </Card>
      </Container>
   );
};

export default React.memo(SongPreview);

const Container = styled.div`
   .card {
      ${tw`
         mb-6 ml-6
      `}

      &-chain {
         rotate: ${() => mapRange(Math.random(), 0, 1, -90, -40)}deg;
         transform-origin: right;

         ${tw`
            top-[-1rem]
            translate-y-[-35%]
         `}

         &-wire {
            ${tw`
               h-8
            `}
         }
      }

      &-content {
         ${tw`
            grid grid-cols-[auto 1fr auto]
            px-4 py-6
         `}

         .img-side {
            ${tw`
               ml-2
            `}

            .song-cover {
               aspect-ratio: 1/1;

               ${tw`
                  h-12
                  overflow-hidden
                  relative
                  rounded-lg
               `}
            }
         }

         .info-side{
            ${tw`
               mx-4
            `}
         }
      }

      &-backside {
         ${() => {
            const randomNumber = Math.floor(Math.random() * 10);
            const slice = 9 / 5;
            if (randomNumber <= slice * 1) {
               return tw`bg-lightOrange`;
            } else if (randomNumber <= slice * 2) {
               return tw`bg-turquoise bg-opacity-30`;
            } else if (randomNumber <= slice * 3) {
               return tw`bg-purple-400`;
            } else if (randomNumber <= slice * 4) {
               return tw`bg-green-300`;
            } else {
               return tw`bg-red-300`;
            }
         }}
      }

      &-backside,
      &-content {
         rotate: ${rotation}deg;
      }
   }
`;
