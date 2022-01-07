/** @format */

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import SuperTokensReact from 'supertokens-auth-react';
import { frontendConfig } from '../config/frontendConfig';

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
