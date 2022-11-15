import { useContext } from 'react';
import tw from 'twin.macro';
import SongPreview from '../../../components/SongPreview';
import HomeResponseContext from '../contexts/HomeResponseContext';

const Songs = () => {
   const response = useContext(HomeResponseContext);

   const { songs } = response;
   return (
      <>
         <h2 tw="pt-6 text-3xl font-semibold">Your songs</h2>
         <p tw="pb-6 text-gray-700">Some of your favorites songs</p>
         <div className="options-viewer">
            <div className="songs">
               {songs.body.items.slice(0, 10).map(item => (
                  <SongPreview key={item.track.id} item={item.track} />
               ))}
            </div>
         </div>
      </>
   );
};

export default Songs;
