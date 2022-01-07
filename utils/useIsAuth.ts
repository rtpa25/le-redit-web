/** @format */

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMeQuery } from '../generated/graphql';

export const useIsAuth = () => {
  const { loading, data } = useMeQuery();

  console.log(data);

  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace('/auth?next=' + router.pathname);
    }
  }, [data?.me, loading, router]);
};
