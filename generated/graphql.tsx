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

export type AuthOutput = {
  __typename?: 'AuthOutput';
  errors?: Maybe<Array<Maybe<FieldError>>>;
  user?: Maybe<User>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<AuthOutput>;
  forgotPassword: Scalars['Boolean'];
  login?: Maybe<AuthOutput>;
  logout?: Maybe<Scalars['Boolean']>;
  postCreate?: Maybe<Post>;
  postDelete: Scalars['Boolean'];
  postUpdate?: Maybe<Post>;
  register?: Maybe<AuthOutput>;
  unVote?: Maybe<Scalars['Boolean']>;
  vote?: Maybe<Scalars['Boolean']>;
};

export type MutationChangePasswordArgs = {
  options: ChangePasswordInput;
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationLoginArgs = {
  options: SigninAuthInput;
};

export type MutationPostCreateArgs = {
  options: PostInput;
};

export type MutationPostDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationPostUpdateArgs = {
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type MutationRegisterArgs = {
  options: SignupAuthInput;
};

export type MutationUnVoteArgs = {
  postId: Scalars['ID'];
};

export type MutationVoteArgs = {
  options: VoteInput;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMorePosts: Scalars['Boolean'];
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['ID'];
  id: Scalars['ID'];
  points?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  upvote?: Maybe<Array<Upvote>>;
  voteStatus?: Maybe<Scalars['Int']>;
};

export type PostInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts?: Maybe<PaginatedPosts>;
};

export type QueryPostArgs = {
  id: Scalars['ID'];
};

export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
};

export type SigninAuthInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SignupAuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Upvote = {
  __typename?: 'Upvote';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  postId: Scalars['ID'];
  userId: Scalars['ID'];
  value: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  posts?: Maybe<Array<Post>>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type VoteInput = {
  postId: Scalars['ID'];
  value: Scalars['Int'];
};

export type PostSnippetFragment = {
  __typename?: 'Post';
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  points?: number | null | undefined;
  textSnippet: string;
  voteStatus?: number | null | undefined;
  creator: { __typename?: 'User'; id: string; username: string };
};

export type RegularErrorFragment = {
  __typename?: 'FieldError';
  field?: string | null | undefined;
  message?: string | null | undefined;
};

export type RegularUserFragment = {
  __typename?: 'User';
  id: string;
  username: string;
  email: string;
};

export type RegularUserResponseFragment = {
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
    | { __typename?: 'User'; id: string; username: string; email: string }
    | null
    | undefined;
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;

export type ChangePasswordMutation = {
  __typename?: 'Mutation';
  changePassword?:
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
          | { __typename?: 'User'; id: string; username: string; email: string }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  text: Scalars['String'];
}>;

export type CreatePostMutation = {
  __typename?: 'Mutation';
  postCreate?:
    | {
        __typename?: 'Post';
        creatorId: string;
        createdAt: string;
        id: string;
        text: string;
        title: string;
        upvote?:
          | Array<{
              __typename?: 'Upvote';
              value: number;
              userId: string;
              postId: string;
            }>
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type PostDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type PostDeleteMutation = {
  __typename?: 'Mutation';
  postDelete: boolean;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type ForgotPasswordMutation = {
  __typename?: 'Mutation';
  forgotPassword: boolean;
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
          | { __typename?: 'User'; id: string; username: string; email: string }
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
  email: Scalars['String'];
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
          | { __typename?: 'User'; id: string; username: string; email: string }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type UnvoteMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;

export type UnvoteMutation = {
  __typename?: 'Mutation';
  unVote?: boolean | null | undefined;
};

export type VoteMutationVariables = Exact<{
  postId: Scalars['ID'];
  value: Scalars['Int'];
}>;

export type VoteMutation = {
  __typename?: 'Mutation';
  vote?: boolean | null | undefined;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?:
    | { __typename?: 'User'; id: string; username: string; email: string }
    | null
    | undefined;
};

export type PostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type PostQuery = {
  __typename?: 'Query';
  post?:
    | {
        __typename?: 'Post';
        title: string;
        text: string;
        createdAt: string;
        updatedAt: string;
        voteStatus?: number | null | undefined;
        points?: number | null | undefined;
        upvote?:
          | Array<{ __typename?: 'Upvote'; userId: string; value: number }>
          | null
          | undefined;
        creator: { __typename?: 'User'; username: string; id: string };
      }
    | null
    | undefined;
};

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['Int']>;
}>;

export type PostsQuery = {
  __typename?: 'Query';
  posts?:
    | {
        __typename?: 'PaginatedPosts';
        hasMorePosts: boolean;
        posts?:
          | Array<
              | {
                  __typename?: 'Post';
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  title: string;
                  points?: number | null | undefined;
                  textSnippet: string;
                  voteStatus?: number | null | undefined;
                  creator: {
                    __typename?: 'User';
                    id: string;
                    username: string;
                  };
                }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
};

export const PostSnippetFragmentDoc = gql`
  fragment PostSnippet on Post {
    id
    createdAt
    updatedAt
    title
    points
    textSnippet
    voteStatus
    creator {
      id
      username
    }
  }
`;
export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
    email
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on AuthOutput {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(options: { token: $token, newPassword: $newPassword }) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useChangePasswordMutation() {
  return Urql.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument);
}
export const CreatePostDocument = gql`
  mutation CreatePost($title: String!, $text: String!) {
    postCreate(options: { title: $title, text: $text }) {
      creatorId
      createdAt
      id
      text
      title
      upvote {
        value
        userId
        postId
      }
    }
  }
`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument
  );
}
export const PostDeleteDocument = gql`
  mutation PostDelete($id: ID!) {
    postDelete(id: $id)
  }
`;

export function usePostDeleteMutation() {
  return Urql.useMutation<PostDeleteMutation, PostDeleteMutationVariables>(
    PostDeleteDocument
  );
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);
}
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
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
  mutation Register($username: String!, $password: String!, $email: String!) {
    register(
      options: { username: $username, password: $password, email: $email }
    ) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const UnvoteDocument = gql`
  mutation Unvote($postId: ID!) {
    unVote(postId: $postId)
  }
`;

export function useUnvoteMutation() {
  return Urql.useMutation<UnvoteMutation, UnvoteMutationVariables>(
    UnvoteDocument
  );
}
export const VoteDocument = gql`
  mutation Vote($postId: ID!, $value: Int!) {
    vote(options: { postId: $postId, value: $value })
  }
`;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
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
export const PostDocument = gql`
  query Post($id: ID!) {
    post(id: $id) {
      title
      text
      createdAt
      updatedAt
      upvote {
        userId
        value
      }
      creator {
        username
        id
      }
      voteStatus
      points
    }
  }
`;

export function usePostQuery(
  options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
}
export const PostsDocument = gql`
  query Posts($limit: Int!, $cursor: Int) {
    posts(cursor: $cursor, limit: $limit) {
      posts {
        ...PostSnippet
      }
      hasMorePosts
    }
  }
  ${PostSnippetFragmentDoc}
`;

export function usePostsQuery(
  options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
}
