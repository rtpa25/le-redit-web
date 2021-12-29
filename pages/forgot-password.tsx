/** @format */

import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import React, { useState } from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createWithApollo } from '../utils/withApollo';

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const [complete, setComplete] = useState<boolean>(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (value, { setErrors }) => {
          await forgotPassword({ variables: value });
          setComplete(true);
        }}>
        {({ isSubmitting }) =>
          complete ? (
            <Box>Check your inbox to reset your password</Box>
          ) : (
            <Form>
              <InputField
                name={'email'}
                placeholder={'email'}
                label={'Email'}
                kind={'email'}
              />
              <Flex alignItems={'flex-end'} justifyContent={'space-between'}>
                <Button
                  mt={4}
                  type='submit'
                  isLoading={isSubmitting}
                  colorScheme='teal'>
                  Send Validation Email
                </Button>
                <NextLink href={'/register'}>
                  <Link>Register</Link>
                </NextLink>
              </Flex>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default createWithApollo({ ssr: false })(ForgotPassword);
