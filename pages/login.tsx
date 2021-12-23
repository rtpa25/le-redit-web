/** @format */

import { Formik, Form } from 'formik';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { FieldError, useLoginMutation } from '../generated/graphql';
import { toErrorMar } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlCleint';
import NextLink from 'next/link';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [{}, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (value, { setErrors }) => {
          const response = await login(value);
          if (response.data?.login?.errors) {
            setErrors(toErrorMar(response.data.login.errors as FieldError[]));
          } else if (response.data?.login?.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next);
            } else {
              router.push('/');
            }
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
                name={'password'}
                placeholder={'password'}
                label={'Password'}
                type={'password'}
                kind={'password'}
              />
            </Box>
            <Flex alignItems={'flex-end'} justifyContent={'space-between'}>
              <Button
                mt={4}
                type='submit'
                isLoading={isSubmitting}
                colorScheme='teal'>
                Login
              </Button>
              <NextLink href={'/forgot-password'}>
                <Link>Forgot Password?</Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
