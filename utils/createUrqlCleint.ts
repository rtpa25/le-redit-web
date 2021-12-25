/** @format */

import { cacheExchange, Resolver } from '@urql/exchange-graphcache';
import { relayPagination } from '@urql/exchange-graphcache/extras';
import Router from 'next/router';
import {
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from 'urql';
import { pipe, tap } from 'wonka';
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from '../generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes('unauthenticated user')) {
          Router.replace('/login');
        }
      })
    );
  };

//resolver that checks for data in the cache and then queries the server to get posts
// and pushes that to the data that we need
const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey); //this will bring all the Queries in the cache
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName); //filter just the post queries
    const size = fieldInfos.length;
    //if no data in the cache return undefined
    if (size === 0) {
      return undefined;
    }
    //check if the data in the cache return it from the cache
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      'posts'
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, 'posts') as string[];
      const hasMorePosts = cache.resolve(key, 'hasMorePosts') as boolean;
      if (!hasMorePosts) {
        hasMore = hasMorePosts;
      }
      results.push(...data);
    });
    return {
      __typename: 'PaginatedPosts',
      hasMorePosts: hasMore,
      posts: results,
    };
  };
};

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        PaginatedPosts: () => null,
      },
      resolvers: {
        Query: {
          //should match to the name of query
          posts: cursorPagination(),
        },
      },
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache as any,
              { query: MeDocument },
              _result,
              () => {
                return { me: null };
              }
            );
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache as any,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login?.errors) {
                  return query;
                } else {
                  return {
                    me: result.login?.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache as any,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register?.errors) {
                  return query;
                } else {
                  return {
                    me: result.register?.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    errorExchange,
    dedupExchange,
    ssrExchange,
    fetchExchange,
  ],
});
