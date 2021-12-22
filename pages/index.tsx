/** @format */

import type { NextPage } from 'next';
import Navbar from '../components/Navbar';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlCleint';

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
