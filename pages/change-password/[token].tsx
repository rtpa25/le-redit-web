/** @format */

import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import {
  FieldError,
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from '../../generated/graphql';
import { toErrorMar } from '../../utils/toErrorMap';
import { createWithApollo } from '../../utils/withApollo';

interface ChangePasswordProps {
  token: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const [tokenError, setTokenError] = useState<string>('');
  return (
    <Wrapper>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (value, { setErrors }) => {
          console.log(value.newPassword);

          const response = await changePassword({
            variables: {
              newPassword: value.newPassword,
              token:
                typeof router.query.token === 'string'
                  ? router.query.token
                  : '',
            },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.changePassword?.user,
                },
              });
              cache.evict({ fieldName: 'posts' });
            },
          });
          if (response.data?.changePassword?.errors) {
            const errorMap = toErrorMar(
              response.data?.changePassword?.errors as FieldError[]
            );
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword?.user) {
            router.push('/');
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name={'newPassword'}
              placeholder={'newPassword'}
              label={'New Password'}
              kind={'password'}
            />
            {tokenError && (
              <Flex justifyContent={'space-between'}>
                <Box color={'red'}>{tokenError}</Box>
                <NextLink href={'/forgot-password'}>
                  <Link>Go to forgot password agin</Link>
                </NextLink>
              </Flex>
            )}
            <Button
              mt={4}
              type='submit'
              isLoading={isSubmitting}
              colorScheme='teal'>
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default createWithApollo({ ssr: false })(ChangePassword as any);
