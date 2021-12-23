/** @format */

import { Box, Flex, Button, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import NextLink from 'next/link';
import InputField from '../components/InputField';
import { useCreatePostMutation, useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlCleint';
import Layout from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';

interface CreatePostArgs {}

const CreatePost: React.FC<CreatePostArgs> = () => {
  const router = useRouter();
  useIsAuth();
  const [{}, createPost] = useCreatePostMutation();
  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (value, { setErrors }) => {
          console.log(value);
          const { error } = await createPost(value);
          if (error?.message.includes('Please write a valid post')) {
            setErrors({
              title: 'Please write a valid post',
              text: 'Please write a valid post',
            });
          }
          if (!error) {
            router.push('/');
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name={'title'}
              placeholder={'title'}
              label={'Title'}
              kind={'text'}
            />
            <Box mt={4}>
              <InputField
                name={'text'}
                placeholder={'Text...'}
                label={'Body'}
                type={'text'}
                kind={'text'}
                isTextArea={true}
              />
            </Box>
            <Flex alignItems={'flex-end'} justifyContent={'space-between'}>
              <Button
                mt={4}
                type='submit'
                isLoading={isSubmitting}
                colorScheme='teal'>
                Create Post
              </Button>
              <NextLink href={'/'}>
                <Link>Back to home</Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
