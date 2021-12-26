/** @format */

import type { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlCleint';
import { usePostsQuery } from '../generated/graphql';
import Layout from '../components/Layout';
import NextLink from 'next/link';
import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import Post from '../components/Post';

const Home: NextPage = () => {
  interface Var {
    limit: number;
    cursor: number | undefined;
  }

  const [vars, setVars] = useState<Var>({ limit: 10, cursor: undefined });
  const [{ data, fetching }] = usePostsQuery({
    variables: vars,
  });
  if (!fetching && !data) {
    return <div>You got no opost for some reason</div>;
  }

  return (
    <Layout variant='regular'>
      <Flex justifyContent={'space-between'} alignItems={'center'} mb={10}>
        <Heading>LiReddit</Heading>
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
      {!data && fetching ? (
        <div>Loading....</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts?.posts?.map((post) => (
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
          ))}
        </Stack>
      )}
      {data && data.posts?.hasMorePosts ? (
        <Flex justifyContent={'center'}>
          <Button
            onClick={() => {
              setVars({
                limit: vars.limit,
                cursor: parseInt(
                  data!.posts!.posts![(data.posts?.posts!.length as number) - 1]
                    ?.id as string
                ),
              });
            }}
            mt={10}
            mb={10}>
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
