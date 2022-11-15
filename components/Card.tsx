import styled from 'styled-components';
import tw from 'twin.macro';

interface Props {
   children: any;
   chains: number;
}

const Card = ({ children, chains }: Props) => {
   return (
      <Container className="card">
         {[...Array(chains)].map(i => (
            <div key={i} className="card-chain">
               <div className="card-chain-hole" />
               <div className="card-chain-wire" />
               <div className="card-chain-hole" />
            </div>
         ))}
         <div className="main-squares" tw="grid">
            <div className="card-content">{children}</div>
            <div className="card-backside" />
         </div>
      </Container>
   );
};

export default Card;

const Container = styled.div`
   ${tw`
      grid
      relative
   `}

   .card {
      &-backside,
      &-content {
         ${tw`
            bg-white
            border-2 border-black rounded-2xl
         `}
      }

      &-content {
         ${tw`
            cursor-pointer
            h-full
            relative
            z-20
         `}
      }

      &-backside {
         ${tw`
            absolute
            bottom-[-.4rem]
            justify-self-center
            w-[96%] h-full
            z-10
         `}
      }

      &-chain {
         ${tw`
            grid justify-items-center
            absolute
            w-min
            z-30
         `}

         &-wire {
            ${tw`
               border border-black rounded-full
               bg-white
               relative
               top-2
               w-[.35rem] h-8
               z-10
            `}
         }

         &-hole {
            ${tw`
               bg-black
               border-2 border-white rounded-full
               relative
               w-4 h-4
            `};

            &:first-child {
               ${tw`
                  top-4
               `}
            }
         }
      }
   }
`;
