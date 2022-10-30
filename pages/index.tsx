import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';

const Home: NextPage = () => {
   const { data: session } = useSession();

   // console.log(session && session.user?.image);
   console.log(session);
   // signOut()

   return (
      <>
         {session ? (
            <>
               <button onClick={() => signOut()}>{session.user?.name}</button>
               <img src={session.user?.image ?? ''} alt="" />
               {/* <Image src={session.user?.image ?? ''} alt={'owo'} layout="fill" /> */}
            </>
         ) : (
            <button onClick={() => signIn()}>log in</button>
         )}
      </>
   );
};

export default Home;
