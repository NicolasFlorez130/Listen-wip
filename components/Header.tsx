import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useContext } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useAppSelector } from '../hooks/reduxHooks';
import HomeResponseContext from '../pages/home/contexts/HomeResponseContext';
import Button from './Button';

const Header = () => {
   const { image } = useAppSelector(store => store.user);

   return (
      <StyledHeader>
         <section>
            <Button>
               <div className="circle" />
               <div className="circle" />
               <div className="circle" />
               <div className="circle" />
            </Button>
            <p>Home</p>
            <Button onClick={() => signOut()}>
               {image && (
                  <div className="image-container">
                     <Image src={image} alt="profile picture" layout="fill" objectFit="cover" />
                  </div>
               )}
            </Button>
         </section>
      </StyledHeader>
   );
};

export default Header;

const StyledHeader = styled.header`
   section {
      ${tw`
         grid grid-cols-[auto 1fr auto]
         mt-2
         py-4
         w-full
      `}

      .styledButton {
         &:first-child {
            ${tw`
             bg-turquoise bg-opacity-40
               grid grid-cols-2
            `}

            .circle {
               aspect-ratio: 1/1;
               ${tw`
                  relative
                  w-[.7rem]
               `};

               &:before {
                  ${tw`
                     content-['']

                     absolute
                     bg-black 
                     top-[-10%]
                     left-[-10%]
                     w-[120%]
                     h-[120%]
                     rounded-full
                  `}
               }

               &::after {
                  ${tw`
                     content-['']

                     absolute
                     bg-lightOrange
                     border border-black rounded-full
                     inset-0
                     z-10
                  `}
               }
            }
         }

         &:last-child {
            aspect-ratio: 1/1;
            ${tw`
               border
               h-full
               overflow-hidden
               p-0
               shadow-lg
            `}

            .image-container {
               ${tw`
                  relative
                  h-full w-full
               `}
            }
         }
      }

      p {
         ${tw`
            self-center
            text-center text-xl
         `}
      }
   }
`;
