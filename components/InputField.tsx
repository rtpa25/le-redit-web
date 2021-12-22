/** @format */

import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  kind: string;
  placeholder: string;
};

// '' => false
// 'ererre' => true
const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField<any>(props);
  return (
    <div>
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
        <Input
          {...field}
          id={field.name}
          placeholder={props.placeholder}
          type={props.kind}
        />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    </div>
  );
};

export default InputField;
