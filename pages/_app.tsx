/** @format */

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
});
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider value={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default MyApp;
