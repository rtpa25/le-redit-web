/** @format */

import { __isProd__ } from '../utils/types';

export const appInfo = {
  // learn more about this on https://supertokens.io/docs/emailpassword/appinfo
  appName: 'ether',
  apiDomain: __isProd__
    ? 'https://api.etherapp.social'
    : 'http://localhost:4000',
  websiteDomain: __isProd__
    ? 'https://www.etherapp.social'
    : 'http://localhost:3000',
};
