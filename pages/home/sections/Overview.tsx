import { useContext } from 'react';
import tw from 'twin.macro';
import PlaylistPreview from '../../../components/PlaylistPreview';
import SongPreview from '../../../components/SongPreview';
import HomeResponseContext from '../contexts/HomeResponseContext';

const Overview = ({}) => {
   const response = useContext(HomeResponseContext);

   const { playlists, songs } = response;
   return (
      <>
         <h2 tw="pt-6 text-3xl font-semibold">Quick selects</h2>
         <p tw="text-gray-700">Start listening right now</p>
         <div className="options-viewer">
            <div className="playlist" tw="overflow-scroll flex px-2 gap-[5%] pb-12">
               {playlists.body &&
                  [...playlists.body.items, ...playlists.body.items]
                     .slice(0, 8)
                     .map((item, i) => <PlaylistPreview key={i} item={item} />)}
            </div>
            <div className="songs">
               {songs.body.items.slice(0, 4).map(item => (
                  <SongPreview key={item.track.id} item={item.track} />
               ))}
            </div>
         </div>
      </>
   );
};

export default Overview;
