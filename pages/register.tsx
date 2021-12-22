/** @format */

import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { FieldError, useRegisterMutation } from '../generated/graphql';
import { toErrorMar } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [{}, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (value, { setErrors }) => {
          const response = await register(value);
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
