/** @format */

import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { FieldError, useLoginMutation } from '../generated/graphql';
import { toErrorMar } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

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
                name={'password'}
                placeholder={'password'}
                label={'Password'}
                type={'password'}
                kind={'password'}
              />
            </Box>
            <Button
              mt={4}
              type='submit'
              isLoading={isSubmitting}
              colorScheme='teal'>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
