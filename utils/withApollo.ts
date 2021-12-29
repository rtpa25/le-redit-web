/** @format */

import { ApolloClient, InMemoryCache } from '@apollo/client';
import withApollo from './createWithApollo';
import { PaginatedPosts } from '../generated/graphql';
import { NextPageContext } from 'next';
import { isServer } from './isServer';

const createClient = (ctx: NextPageContext) => {
  let cookie = '';
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie as string;
  }
  return new ApolloClient({
    uri: 'https://api.etherapp.social/graphql',
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
              keyArgs: [],
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
