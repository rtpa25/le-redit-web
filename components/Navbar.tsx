/** @format */

import { Box, Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useMeQuery } from '../generated/graphql';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  //data is loading
  if (fetching) {
    //user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href={'/login'}>
          <Link color={'white'} mr={4}>
            Login
          </Link>
        </NextLink>
        <NextLink href={'/register'}>
          <Link color={'white'}>Register</Link>
        </NextLink>
      </>
    );
    //user is logged in
  } else {
    body = (
      <Flex>
        <Box color={'white'} mr={4}>
          {data.me.username}
        </Box>
        <Button ml={4} color={'white'} variant={'link'}>
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg={'teal'} p={4}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};

export default Navbar;
