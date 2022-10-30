import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalStyles } from 'twin.macro';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface CustomProps extends AppProps {
   pageProps: { session: Session };
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: CustomProps) {
   return (
      <>
         <SessionProvider session={session}>
            <GlobalStyles />
            <Component {...pageProps} />
         </SessionProvider>
      </>
   );
}

export default MyApp;
