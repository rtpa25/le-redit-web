/** @format */

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type AuthOutput = {
  __typename?: 'AuthOutput';
  errors?: Maybe<Array<Maybe<FieldError>>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<AuthOutput>;
  logout?: Maybe<Scalars['Boolean']>;
  postCreate?: Maybe<Post>;
  postDelete: Scalars['Boolean'];
  postUpdate?: Maybe<Post>;
  register?: Maybe<AuthOutput>;
};

export type MutationLoginArgs = {
  options: AuthInput;
};

export type MutationPostCreateArgs = {
  title: Scalars['String'];
};

export type MutationPostDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationPostUpdateArgs = {
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type MutationRegisterArgs = {
  options: AuthInput;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type QueryPostArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type RegularUserFragment = {
  __typename?: 'User';
  id: string;
  username: string;
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login?:
    | {
        __typename?: 'AuthOutput';
        errors?:
          | Array<
              | {
                  __typename?: 'FieldError';
                  field?: string | null | undefined;
                  message?: string | null | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
        user?:
          | { __typename?: 'User'; id: string; username: string }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename?: 'Mutation';
  logout?: boolean | null | undefined;
};

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register?:
    | {
        __typename?: 'AuthOutput';
        errors?:
          | Array<
              | {
                  __typename?: 'FieldError';
                  field?: string | null | undefined;
                  message?: string | null | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
        user?:
          | { __typename?: 'User'; id: string; username: string }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: { __typename?: 'User'; id: string; username: string } | null | undefined;
};

export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
  }
`;
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        ...RegularUser
      }
    }
  }
  ${RegularUserFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const RegisterDocument = gql`
  mutation Register($username: String!, $password: String!) {
    register(options: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        ...RegularUser
      }
    }
  }
  ${RegularUserFragmentDoc}
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
