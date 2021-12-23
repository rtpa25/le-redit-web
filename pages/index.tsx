/** @format */

import type { NextPage } from 'next';
import Navbar from '../components/Navbar';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlCleint';
import { usePostsQuery } from '../generated/graphql';

const Home: NextPage = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <Navbar />
      {!data ? (
        <div>Loading....</div>
      ) : (
        data.posts?.map((post) => {
          return <div key={post?.id}>{post?.title}</div>;
        })
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
