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
import dynamic from 'next/dynamic';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';

const EmailPasswordAuthNoSSR = dynamic(
  new Promise((res) => res(EmailPassword.EmailPasswordAuth)) as any,
  { ssr: false }
);

const CreatePost = () => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
  return (
    <EmailPasswordAuthNoSSR>
      <Layout variant='small'>
        <Formik
          initialValues={{ title: '', text: '' }}
          onSubmit={async (value, { setErrors }) => {
            const { errors } = await createPost({
              variables: value,
              update: (cache) => {
                cache.evict({ fieldName: 'posts' }); //this simply means you are re-fetching posts
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
    </EmailPasswordAuthNoSSR>
  );
};

export default createWithApollo({ ssr: false })(CreatePost);
