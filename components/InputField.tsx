/** @format */

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  kind: string;
  placeholder: string;
  isTextArea?: boolean;
};

// '' => false
// 'ererre' => true
const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField<any>(props);

  let InputOrTextField: any = Input;
  if (props.isTextArea) {
    InputOrTextField = Textarea;
  }
  return (
    <div>
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
        <InputOrTextField
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
