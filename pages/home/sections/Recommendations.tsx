import styled from 'styled-components';
import tw from 'twin.macro';
import views from '../views';

interface Props {
   children: any;
   view: number;
   setView: (arg0: number) => void;
}
const Recommendations = ({ children, view, setView }: Props) => {
   const returnClass = (type: number) => {
      return view === type ? 'selected' : '';
   };

   return (
      <section className="user-recommendations">
         <div className="options-switch" tw="border-b border-black">
            <Switch>
               <li className={returnClass(views.Overview)}>
                  <button onClick={() => setView(views.Overview)}>Overview</button>
               </li>
               <li className={returnClass(views.Songs)}>
                  <button onClick={() => setView(views.Songs)}>Songs</button>
               </li>
               <li className={returnClass(views.Album)}>
                  <button onClick={() => setView(views.Album)}>Album</button>
               </li>
               <li className={returnClass(views.Artist)}>
                  <button onClick={() => setView(views.Artist)}>Artist</button>
               </li>
            </Switch>
         </div>
         {children}
      </section>
   );
};

export default Recommendations;

const Switch = styled.ul`
   ${tw`
      flex justify-between
      mt-8 mb-2
      text-gray-600
   `}

   li {
      ${tw`
         relative
         px-2
         after:absolute
         after:(
            bg-lightOrange
            bottom-0 left-0
            w-full h-0 
         )
      `}

      &,
      &::after {
         transition: 0.2s;
      }

      &:hover,
      &.selected {
         ${tw`
            after:h-3/5
         `}
      }

      &.selected {
         ${tw`
            text-black font-semibold
         `}
      }

      button {
         ${tw`
            relative
            z-10
         `}
      }
   }
`;
