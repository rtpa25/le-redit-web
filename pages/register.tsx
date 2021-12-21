/** @format */

import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(value) => {
          console.log(value);
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name={'username'}
              placeholder={'username'}
              label={'Username'}
            />
            <Box mt={4}>
              <InputField
                name={'password'}
                placeholder={'password'}
                label={'Password'}
                type={'password'}
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
