/** @format */

import { ApolloClient, InMemoryCache } from '@apollo/client';
import withApollo from './createWithApollo';
import { PaginatedPosts } from '../generated/graphql';
import { NextPageContext } from 'next';
import { isServer } from './isServer';
import { __isProd__ } from './types';

const createClient = (ctx: NextPageContext) => {
  let cookie = '';
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie as string;
  }

  return new ApolloClient({
    uri: __isProd__
      ? 'https://api.etherapp.social/graphql'
      : 'http://localhost:4000/graphql',
    credentials: 'include',
    headers: cookie
      ? {
          cookie,
        }
      : undefined,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: false, //in this way even the data do not get storred twice
              //in the cache being more expressive an empty array also works
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts
              ): PaginatedPosts {
                return {
                  ...incoming,
                  posts: [...(existing?.posts || []), ...incoming?.posts!],
                };
              },
            },
          },
        },
      },
    }),
  });
};
export const createWithApollo = withApollo(createClient as any);
