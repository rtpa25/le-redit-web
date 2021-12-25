/** @format */

import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useVoteMutation } from '../generated/graphql';

interface PostProps {
  title: string;
  textSnippet: string;
  creatorUsername: string;
  points: number;
  id: string;
}

const Post: React.FC<PostProps> = ({
  title,
  textSnippet,
  creatorUsername,
  points,
  id,
}) => {
  const [loadingState, setLoadingState] = useState<
    'upLoading' | 'downLoading' | 'notLoading'
  >('notLoading');
  const [{}, vote] = useVoteMutation();
  console.log(id, points);

  return (
    <Box p={5} shadow={'md'} borderWidth={'1px'}>
      <Flex>
        <Flex
          flexDirection={'column'}
          flex={1}
          mt={-1}
          mr={4}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <IconButton
            aria-label='Search database'
            icon={<TriangleUpIcon />}
            h={7}
            isLoading={loadingState === 'upLoading'}
            color={'green'}
            cursor={'pointer'}
            onClick={async () => {
              setLoadingState('upLoading');
              vote({
                postId: id,
                value: 1,
              });
              setLoadingState('notLoading');
            }}
          />
          <Box>{points}</Box>
          <IconButton
            aria-label='Search database'
            icon={<TriangleDownIcon />}
            color={'red'}
            isLoading={loadingState === 'downLoading'}
            h={7}
            cursor={'pointer'}
            onClick={async () => {
              setLoadingState('upLoading');
              vote({
                postId: id,
                value: -1,
              });
              setLoadingState('notLoading');
            }}
          />
        </Flex>
        <Box flex={15}>
          <Heading fontSize={'xl'} cursor={'pointer'}>
            {title}
          </Heading>
          <Flex justifyContent={'space-between'}>
            <Text cursor={'pointer'} mt={4}>
              {textSnippet}
            </Text>
            <Text cursor={'pointer'} mt={4}>
              Posted By: {creatorUsername}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Post;
