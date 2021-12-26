/** @format */

import { Box, Button, Flex, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const router = useRouter();

  //does not run the hook in case of server side rendering
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFethcing }, logout] = useLogoutMutation();
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
        <Button
          ml={4}
          color={'white'}
          variant={'link'}
          isLoading={logoutFethcing}
          onClick={() => {
            logout();
          }}>
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex
      bg={'teal'}
      p={4}
      position={'sticky'}
      top={0}
      zIndex={54}
      justifyContent={'space-between'}
      alignItems={'flex-end'}>
      {router.pathname !== '/' && (
        <NextLink href={'/'}>
          <Link>
            <Text
              bgGradient='linear(to-l, #ffffff, #00ff55)'
              bgClip='text'
              fontSize='3xl'
              fontWeight='bold'
              cursor={'pointer'}>
              LiReddit
            </Text>
          </Link>
        </NextLink>
      )}

      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};

export default Navbar;
