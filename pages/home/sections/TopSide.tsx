import tw from 'twin.macro';
import SearchBar from '../../../components/SearchBar';

const TopSide = () => {
   return (
      <>
         <section className="top-side">
            <h1 tw="text-2xl">Listening Everyday</h1>
            <p tw="mb-4 mt-2  text-gray-600">
               Explore millions of music according to your taste
            </p>
         </section>
         <SearchBar />
      </>
   );
};

export default TopSide;
