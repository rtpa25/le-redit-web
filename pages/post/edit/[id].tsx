/** @format */

import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../../../components/InputField';
import Layout from '../../../components/Layout';
import {
  usePostQuery,
  useUpdatePostMutation,
} from '../../../generated/graphql';
import { useIsAuth } from '../../../utils/useIsAuth';
import { createWithApollo } from '../../../utils/withApollo';

const EditPost = ({}) => {
  const router = useRouter();
  useIsAuth();
  const intId = typeof router.query.id === 'string' ? router.query.id : -1;

  const { data } = usePostQuery({
    skip: intId === -1,
    variables: {
      id: router.query.id as string,
    },
  });
  const [updatePost] = useUpdatePostMutation();
  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: data?.post?.title, text: data?.post?.text }}
        onSubmit={async (value, { setErrors }) => {
          console.log(value);
          const { errors } = await updatePost({
            variables: {
              title: value.title,
              text: value.text,
              id: router.query.id as string,
            },
          });
          if (errors) {
            setErrors({
              title: 'something went wrong',
            });
          }
          if (!errors) {
            router.back();
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name={'title'}
              placeholder={data?.post?.title as string}
              label={'Title'}
              kind={'text'}
            />
            <Box mt={4}>
              <InputField
                name={'text'}
                placeholder={data?.post?.text as string}
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
                Edit Post
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

export default createWithApollo({ ssr: false })(EditPost);
