/** @format */

import { FieldError } from '../generated/graphql';

export const toErrorMar = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};

  errors.forEach(({ field, message }: any) => {
    errorMap[field] = message;
  });
  return errorMap;
};
