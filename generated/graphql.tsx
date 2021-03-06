/** @format */

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
const defaultOptions = {};
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
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
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

export type UnvoteMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;

export type UnvoteMutation = {
  __typename?: 'Mutation';
  unVote?: boolean | null | undefined;
};

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
}>;

export type UpdatePostMutation = {
  __typename?: 'Mutation';
  postUpdate?:
    | {
        __typename?: 'Post';
        id: string;
        title: string;
        text: string;
        textSnippet: string;
      }
    | null
    | undefined;
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
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePostMutation,
    CreatePostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options
  );
}
export type CreatePostMutationHookResult = ReturnType<
  typeof useCreatePostMutation
>;
export type CreatePostMutationResult =
  Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>;
export const PostDeleteDocument = gql`
  mutation PostDelete($id: ID!) {
    postDelete(id: $id)
  }
`;
export type PostDeleteMutationFn = Apollo.MutationFunction<
  PostDeleteMutation,
  PostDeleteMutationVariables
>;

/**
 * __usePostDeleteMutation__
 *
 * To run a mutation, you first call `usePostDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postDeleteMutation, { data, loading, error }] = usePostDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostDeleteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PostDeleteMutation,
    PostDeleteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PostDeleteMutation, PostDeleteMutationVariables>(
    PostDeleteDocument,
    options
  );
}
export type PostDeleteMutationHookResult = ReturnType<
  typeof usePostDeleteMutation
>;
export type PostDeleteMutationResult =
  Apollo.MutationResult<PostDeleteMutation>;
export type PostDeleteMutationOptions = Apollo.BaseMutationOptions<
  PostDeleteMutation,
  PostDeleteMutationVariables
>;
export const UnvoteDocument = gql`
  mutation Unvote($postId: ID!) {
    unVote(postId: $postId)
  }
`;
export type UnvoteMutationFn = Apollo.MutationFunction<
  UnvoteMutation,
  UnvoteMutationVariables
>;

/**
 * __useUnvoteMutation__
 *
 * To run a mutation, you first call `useUnvoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnvoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unvoteMutation, { data, loading, error }] = useUnvoteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useUnvoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnvoteMutation,
    UnvoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UnvoteMutation, UnvoteMutationVariables>(
    UnvoteDocument,
    options
  );
}
export type UnvoteMutationHookResult = ReturnType<typeof useUnvoteMutation>;
export type UnvoteMutationResult = Apollo.MutationResult<UnvoteMutation>;
export type UnvoteMutationOptions = Apollo.BaseMutationOptions<
  UnvoteMutation,
  UnvoteMutationVariables
>;
export const UpdatePostDocument = gql`
  mutation UpdatePost($id: ID!, $title: String, $text: String) {
    postUpdate(id: $id, title: $title, text: $text) {
      id
      title
      text
      textSnippet
    }
  }
`;
export type UpdatePostMutationFn = Apollo.MutationFunction<
  UpdatePostMutation,
  UpdatePostMutationVariables
>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument,
    options
  );
}
export type UpdatePostMutationHookResult = ReturnType<
  typeof useUpdatePostMutation
>;
export type UpdatePostMutationResult =
  Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<
  UpdatePostMutation,
  UpdatePostMutationVariables
>;
export const VoteDocument = gql`
  mutation Vote($postId: ID!, $value: Int!) {
    vote(options: { postId: $postId, value: $value })
  }
`;
export type VoteMutationFn = Apollo.MutationFunction<
  VoteMutation,
  VoteMutationVariables
>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VoteMutation, VoteMutationVariables>(
    VoteDocument,
    options
  );
}
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<
  VoteMutation,
  VoteMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
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

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(
  baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
}
export function usePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(
    PostDocument,
    options
  );
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
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

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(
  baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostsQuery, PostsQueryVariables>(
    PostsDocument,
    options
  );
}
export function usePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(
    PostsDocument,
    options
  );
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<
  PostsQuery,
  PostsQueryVariables
>;
