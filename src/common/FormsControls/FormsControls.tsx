import React from "react";

import { FieldValidatorType } from "@utils/validators/validators";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType> | string,
  component: React.FC<WrappedFieldProps>, // string | React.Component | React.FC,
  props: any,
  text = "",
  documentProps: any,
  updateFormData: any
) {
  updateFormData(name, documentProps);
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        value={documentProps}
        {...props}
      />
      {text}
    </div>
  );
}

export { createField };

type FormControlPropsType = {
  meta: {
    touched: boolean;
    error?: string;
  };
  // meta: WrappedFieldMetaProps,
  children: React.ReactNode;
};

const FormControl: React.FC<FormControlPropsType> = ({
  meta: { touched, error },
  children,
}) => {
  const hasError = touched && error;
  return (
    <div>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta }: any = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...props} />
    </FormControl>
  );
};
export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta } = props;
  return (
    <FormControl {...props}>
      <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
      >
          <TextField
              // required
              id="outlined-required"
              label="Required"
              // defaultValue="Hello World"
              {...input} {...props}
          />
      </Box>
      {/*<input {...input} {...props} />*/}
    </FormControl>
  );
};
