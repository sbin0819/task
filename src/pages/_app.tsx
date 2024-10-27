import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { Provider } from 'jotai';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import ReactQueryProviders from 'shared/providers/react-query-provider';
import 'styles/globals.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ReactQueryProviders>
      <Theme>
        <Provider>{getLayout(<Component {...pageProps} />)}</Provider>
      </Theme>
    </ReactQueryProviders>
  );
}
