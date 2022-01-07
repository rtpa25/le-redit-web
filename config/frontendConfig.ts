/** @format */

import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword';
import SessionReact from 'supertokens-auth-react/recipe/session';
import { appInfo } from './appinfo';

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      EmailPasswordReact.init({
        signInAndUpFeature: {
          signUpForm: {
            formFields: [
              {
                id: 'username',
                label: 'Username',
                placeholder: 'username goes here',
              },
            ],
          },
        },
      }),
      SessionReact.init(),
    ],
  };
};
