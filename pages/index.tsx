/** @format */

import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useMeQuery, usePostsQuery } from '../generated/graphql';
import { createWithApollo } from '../utils/withApollo';

const Home = () => {
  const { data, loading, error, fetchMore, variables } = usePostsQuery({
    variables: { limit: 10, cursor: undefined },
    notifyOnNetworkStatusChange: true,
  });
  const { data: _data, loading: _fetching } = useMeQuery();
  if (!loading && !data) {
    return <div>{error?.message}</div>;
  }
  console.log(loading);

  return (
    <Layout variant='regular'>
      <Flex justifyContent={'space-between'} alignItems={'center'} mb={10}>
        <Text
          bgGradient='linear(to-l,  #00ff55,#000000)'
          bgClip='text'
          fontSize='6xl'
          fontWeight='bold'
          cursor={'pointer'}
          onClick={() => {
            window.location.reload();
          }}>
          Ether
        </Text>
        <NextLink href={'/create-post'}>
          <Button
            background={'teal'}
            color={'white'}
            _hover={{
              background: 'black',
              color: 'rgb(0, 233, 0)',
            }}>
            Create Post
          </Button>
        </NextLink>
      </Flex>
      {!data && loading ? (
        <div>Loading....</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts?.posts?.map((post) =>
            !post ? null : (
              <Post
                key={post?.id}
                title={post!.title}
                textSnippet={post?.textSnippet as string}
                creatorUsername={post?.creator.username as string}
                points={post?.points as number}
                id={post?.id as string}
                voteStatus={
                  post?.voteStatus !== null ? (post?.voteStatus as number) : 0
                }
              />
            )
          )}
        </Stack>
      )}
      {data && data.posts?.hasMorePosts ? (
        <Flex justifyContent={'center'}>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor: parseInt(
                    data!.posts!.posts![
                      (data.posts?.posts!.length as number) - 1
                    ]?.id as string
                  ),
                },
              });
            }}
            isLoading={loading}
            mt={10}
            mb={10}>
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(Home);
