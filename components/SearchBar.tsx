import styled from 'styled-components';
import tw from 'twin.macro';
import Magnifying from '../icons/Magnifying';
import Card from './Card';

const SearchBar = () => {
   return (
      <Container>
         <Card chains={0}>
            <div className="icon-side">
               <label htmlFor="searcher-input">
                  <Magnifying />
               </label>
            </div>
            <div className="input-side">
               <input placeholder="Search music" type="text" id="searcher-input" />
            </div>
         </Card>
      </Container>
   );
};

export default SearchBar;

const Container = styled.div`
   ${tw`
      ml-6
   `}

   .card {
      &-backside,
      &-content {
         ${tw`
            border-r-0
            grid grid-cols-[auto 1fr]
            overflow-hidden
            rounded-r-none
         `}

         .input-side {
            input {
               ${tw`
                  text-xl
                  px-2
                  w-full h-full
                  focus:(outline-none)
               `}
            }
         }
      }

      &-backside {
         ${tw`
            bg-offWhite
            justify-self-end
            w-[98%]
         `}
      }
   }

   .icon-side {
      ${tw`
         border-r-2 border-black
         w-min
         bg-offWhite
      `}

      svg {
         ${tw`
            box-content
            h-4
            p-4
         `}
      }
   }
`;
