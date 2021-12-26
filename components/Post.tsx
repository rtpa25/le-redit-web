/** @format */

import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useUnvoteMutation, useVoteMutation } from '../generated/graphql';

interface PostProps {
  title: string;
  textSnippet: string;
  creatorUsername: string;
  points: number;
  id: string;
  voteStatus: number | null;
}

const Post: React.FC<PostProps> = ({
  title,
  textSnippet,
  creatorUsername,
  points,
  id,
  voteStatus,
}) => {
  //loading state for voting
  const [loadingState, setLoadingState] = useState<
    'upLoading' | 'downLoading' | 'notLoading'
  >('notLoading');
  //loading state for unvoting
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [{}, vote] = useVoteMutation();
  const [{}, unvote] = useUnvoteMutation();
  const router = useRouter();

  return (
    <Box
      p={5}
      shadow={'md'}
      borderWidth={'1px'}
      boxShadow={'lg'}
      borderRadius={'md'}>
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
            background={voteStatus === 1 ? 'green.200' : undefined}
            cursor={'pointer'}
            onClick={async () => {
              if (voteStatus === 1) {
                return;
              }
              setLoadingState('upLoading');
              await vote({
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
            background={voteStatus === -1 ? 'red.200' : undefined}
            h={7}
            cursor={'pointer'}
            onClick={async () => {
              if (voteStatus === -1) {
                return;
              }
              setLoadingState('upLoading');
              await vote({
                postId: id,
                value: -1,
              });
              setLoadingState('notLoading');
            }}
          />
        </Flex>
        <Box flex={15}>
          <Flex justifyContent={'space-between'}>
            <Heading
              fontSize={'xl'}
              cursor={'pointer'}
              onClick={() => {
                router.push(`/post/${id}`);
              }}>
              {title}
            </Heading>

            <Button
              isLoading={isLoading}
              onClick={async () => {
                setIsLoading(true);
                await unvote({
                  postId: id,
                });
                setIsLoading(false);
              }}>
              Unvote
            </Button>
          </Flex>

          <Flex
            justifyContent={'space-between'}
            onClick={() => {
              router.push(`/post/${id}`);
            }}>
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
