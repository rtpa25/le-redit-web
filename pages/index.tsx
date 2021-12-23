/** @format */

import type { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlCleint';
import { usePostsQuery } from '../generated/graphql';
import Layout from '../components/Layout';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

const Home: NextPage = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <NextLink href={'/create-post'}>
        <Link>Create Post</Link>
      </NextLink>
      {!data ? (
        <div>Loading....</div>
      ) : (
        data.posts?.map((post) => {
          return <div key={post?.id}>{post?.title}</div>;
        })
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
