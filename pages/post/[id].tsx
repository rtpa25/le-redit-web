/** @format */

import { withUrqlClient } from 'next-urql';
import React from 'react';
import { createUrqlClient } from '../../utils/createUrqlCleint';
import { useRouter } from 'next/router';
import {
  useMeQuery,
  usePostDeleteMutation,
  usePostQuery,
} from '../../generated/graphql';
import Layout from '../../components/Layout';
import { Box, Flex, Heading, IconButton } from '@chakra-ui/react';
import {
  TriangleUpIcon,
  TriangleDownIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';

interface PostPageProps {}

const PostPage: React.FC<PostPageProps> = () => {
  const router = useRouter();
  const [{ data: _data, fetching: _fetching }] = useMeQuery();
  const intId = typeof router.query.id === 'string' ? router.query.id : -1;

  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: router.query.id as string,
    },
  });
  const [{ fetching: _deletePostLoading }, deletePost] =
    usePostDeleteMutation();
  if (fetching) {
    return <Layout>Loading...</Layout>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  }
  return (
    <Layout variant={'regular'}>
      <Box
        p={5}
        shadow={'md'}
        borderWidth={'1px'}
        boxShadow={'lg'}
        overflow={'hidden'}
        borderRadius={'md'}>
        <Flex flexDirection={'column'} justifyContent={'space-between'}>
          <Flex flex={5} flexDirection={'column'} justifyContent={'center'}>
            <Flex justifyContent={'space-between'}>
              <Heading fontSize={'xl'} cursor={'pointer'}>
                {data.post.title}
              </Heading>
              {_data?.me?.username === data.post.creator.username && (
                <IconButton
                  aria-label='Edit Post'
                  color='teal'
                  icon={<EditIcon />}
                  onClick={() => {
                    router.replace(`
                      /post/edit/${router.query.id}
                    `);
                  }}>
                  Edit Post
                </IconButton>
              )}
            </Flex>
            <Flex justifyContent={'space-between'}>
              <Box cursor={'pointer'} mt={4} flexWrap={'wrap'}>
                {data.post.text}
              </Box>
              <Box cursor={'pointer'} mt={4}>
                Posted By: {data.post.creator.username}
              </Box>
            </Flex>
          </Flex>
          <Flex justifyContent={'space-between'} flex={1}>
            <Flex
              mt={-1}
              mr={4}
              justifyContent={'flex-start'}
              alignItems={'center'}>
              <IconButton
                aria-label='Search database'
                icon={<TriangleUpIcon />}
                h={7}
                color={'green'}
                cursor={'pointer'}
              />
              <Box>{data.post.points}</Box>
              <IconButton
                aria-label='Search database'
                icon={<TriangleDownIcon />}
                color={'red'}
                h={7}
                cursor={'pointer'}
              />
            </Flex>
            {_data?.me?.username === data.post.creator.username && (
              <IconButton
                aria-label='delete post'
                icon={<DeleteIcon />}
                isLoading={_deletePostLoading}
                h={7}
                color={'red'}
                cursor={'pointer'}
                onClick={async () => {
                  await deletePost({
                    id: router.query.id as string,
                  });
                  router.replace('/');
                }}
              />
            )}
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(PostPage);
