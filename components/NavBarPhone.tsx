import styled from 'styled-components';
import tw from 'twin.macro';
import DiscIcon from '../icons/DiscIcon';
import HeartIcon from '../icons/HeartIcon';
import HomeIcon from '../icons/HomeIcon';
import Card from './Card';

const NavBarPhone = () => {
   return (
      <Container>
         <Card chains={0}>
            <button className="selected">
               <HomeIcon />
            </button>
            <button>
               <HeartIcon />
            </button>
            <button>
               <DiscIcon />
            </button>
         </Card>
      </Container>
   );
};

export default NavBarPhone;

const Container = styled.div`
   ${tw`
      sticky bottom-0 left-0
      p-4
      w-full
      z-50
   `}

   .card {
      &-content {
         ${tw`
            bg-turquoise
            flex justify-between
         `}

         button {
            ${tw`
               m-2 rounded-lg
            `}

            &.selected {
               ${tw`
                  bg-lightOrange
                  border-2 border-black rounded-2xl
               `}

               svg {
                  fill: black;
               }
            }

            svg {
               ${tw`
                  fill-white
                  h-6
                  px-4 py-2 box-content
               `}
            }
         }
      }
   }
`;
