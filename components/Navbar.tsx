/** @format */

import { useApolloClient } from '@apollo/client';
import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { signOut } from 'supertokens-auth-react/recipe/emailpassword';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);
  //does not run the hook in case of server side rendering
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  const apollo = useApolloClient();
  let body = null;
  //data is loading
  if (loading) {
    //user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href={'/auth'}>
          <Link color={'white'} mr={4}>
            Login
          </Link>
        </NextLink>
        <NextLink href={'/auth'}>
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
          isLoading={logoutLoading}
          onClick={async () => {
            setLogoutLoading(true);
            await signOut();
            setLogoutLoading(false);
            await apollo.resetStore();
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
              Ether
            </Text>
          </Link>
        </NextLink>
      )}

      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};

export default Navbar;
