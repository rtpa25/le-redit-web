/** @format */

import { QueryInput } from '@urql/exchange-graphcache';

export function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return (cache as any).updateQuery(qi, (data: Query) => fn(result, data));
}
