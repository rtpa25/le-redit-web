/** @format */

import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { useIsAuth } from '../utils/useIsAuth';
import { createWithApollo } from '../utils/withApollo';

interface CreatePostArgs {}

const CreatePost: React.FC<CreatePostArgs> = () => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (value, { setErrors }) => {
          console.log(value);
          const { errors } = await createPost({
            variables: value,
            update: (cache) => {
              cache.evict({ fieldName: 'posts' });
            },
          });
          if (
            errors?.forEach((error) => {
              error.message === 'Please write a valid post';
            })
          ) {
            setErrors({
              title: 'Please write a valid post',
              text: 'Please write a valid post',
            });
          }
          if (!errors) {
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

export default createWithApollo({ ssr: false })(CreatePost);
