/** @format */

import {
  DeleteIcon,
  EditIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import {
  useMeQuery,
  usePostDeleteMutation,
  usePostQuery,
  useVoteMutation,
} from '../../generated/graphql';
import { createWithApollo } from '../../utils/withApollo';

const PostPage = () => {
  const router = useRouter();

  const { data: _data, loading: _fetching } = useMeQuery();

  const intId = typeof router.query.id === 'string' ? router.query.id : -1;

  //loading state for voting
  const [loadingState, setLoadingState] = useState<
    'upLoading' | 'downLoading' | 'notLoading'
  >('notLoading');

  const [vote] = useVoteMutation();
  const { data, loading } = usePostQuery({
    skip: intId === -1,
    variables: {
      id: router.query.id as string,
    },
  });
  const [deletePost, { loading: _deletePostLoading }] = usePostDeleteMutation();
  if (loading) {
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
                isLoading={loadingState === 'upLoading'}
                color={'green'}
                background={
                  data.post.voteStatus === 1 ? 'green.200' : undefined
                }
                cursor={'pointer'}
                onClick={async () => {
                  if (data?.post?.voteStatus === 1) {
                    return;
                  }
                  setLoadingState('upLoading');
                  await vote({});
                  setLoadingState('notLoading');
                }}
              />
              <Box>{data.post.points}</Box>
              <IconButton
                aria-label='Search database'
                icon={<TriangleDownIcon />}
                color={'red'}
                isLoading={loadingState === 'downLoading'}
                background={data.post.voteStatus === -1 ? 'red.200' : undefined}
                h={7}
                cursor={'pointer'}
                onClick={async () => {
                  if (data?.post?.voteStatus === -1) {
                    return;
                  }
                  setLoadingState('upLoading');
                  await vote({
                    variables: {
                      postId: router.query.id as string,
                      value: -1,
                    },
                  });
                  setLoadingState('notLoading');
                }}
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
                    variables: { id: router.query.id as string },
                    //evict it from the cache
                    update: (cache) => {
                      cache.evict({
                        id: ('Post:' + router.query.id) as string,
                      });
                    },
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

export default createWithApollo({ ssr: true })(PostPage);
