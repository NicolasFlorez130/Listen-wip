import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import PlayIcon from '../icons/PlayIcon';
import { mapRange } from '../lib/maths';
import Card from './Card';

interface Props {
   item: SpotifyApi.PlaylistObjectSimplified;
}

const rotation = () => mapRange(Math.random(), 0, 1, -4, 4);

const PlaylistPreview = ({ item }: Props) => {
   return (
      <Container tw="w-[47.5%] flex-none">
         <Card chains={1}>
            <div className="playlist-cover">
               <Image
                  priority
                  src={item.images[0].url}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
               />
            </div>
            <div className="playlist-info">
               <PlayIcon />
               <p className="songs-quantity" tw="text-xs text-gray-700">
                  {item.tracks.total} Songs
               </p>
               <h3 className="name" tw="self-start">
                  {item.name}
               </h3>
            </div>
         </Card>
      </Container>
   );
};

export default React.memo(PlaylistPreview);

const Container = styled.div`
   .card {
      aspect-ratio: 5/6;
      ${tw`
         mt-10
      `}

      &-chain {
         left: ${() => mapRange(Math.random(), 0, 1, 20, 80)}%;
         rotate: ${() => mapRange(Math.random(), 0, 1, -8, 8)}deg;

         ${tw`
            translate-x-[-50%] translate-y-[-65%]
         `}

         &-wire {
            ${tw`
               h-10
            `}
         }
      }

      &-content {
         ${tw`
            box-border
            grid grid-rows-[auto 1fr]
            p-2
         `}

         .playlist {
            &-cover {
               aspect-ratio: 3/2;

               ${tw`
               relative
               rounded-xl
               overflow-hidden
               w-full
            `};
            }

            &-info {
               ${tw`
                  grid
                  h-auto
                  mt-3
                  relative
               `}

               svg {
                  ${tw`
                     absolute
                     mr-3
                     right-0
                     w-6
                  `}
               }
            }
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
