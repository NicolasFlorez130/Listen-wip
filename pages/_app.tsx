import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalStyles } from 'twin.macro';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { Provider } from 'react-redux';
import store from '../app/store';

interface CustomProps extends AppProps {
   pageProps: { session: Session };
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: CustomProps) {
   return (
      <>
         <Provider store={store}>
            <SessionProvider session={session}>
               <GlobalStyles />
               <Component {...pageProps} />
            </SessionProvider>
         </Provider>
      </>
   );
}

export default MyApp;
