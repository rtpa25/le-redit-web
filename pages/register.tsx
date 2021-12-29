/** @format */

import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import {
  FieldError,
  MeDocument,
  MeQuery,
  useRegisterMutation,
} from '../generated/graphql';
import { toErrorMar } from '../utils/toErrorMap';
import { createWithApollo } from '../utils/withApollo';

const Register = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={async (value, { setErrors }) => {
          const response = await register({
            variables: value,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.register?.user,
                },
              });
              cache.evict({ fieldName: 'posts' });
            },
          });
          if (response.data?.register?.errors) {
            setErrors(
              toErrorMar(response.data.register.errors as FieldError[])
            );
          } else if (response.data?.register?.user) {
            router.push('/');
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name={'username'}
              placeholder={'username'}
              label={'Username'}
              kind={'text'}
            />
            <Box mt={4}>
              <InputField
                name={'email'}
                placeholder={'email'}
                label={'email'}
                type={'email'}
                kind={'email'}
              />
            </Box>
            <Box mt={4}>
              <InputField
                name={'password'}
                placeholder={'password'}
                label={'Password'}
                type={'password'}
                kind={'password'}
              />
            </Box>
            <Flex alignItems={'end'} justifyContent={'space-between'}>
              <Button
                mt={4}
                type='submit'
                isLoading={isSubmitting}
                colorScheme='teal'>
                Register
              </Button>
              <Link href='/login'>Already a user sign in</Link>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default createWithApollo({ ssr: false })(Register);
