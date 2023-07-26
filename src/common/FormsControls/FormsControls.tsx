import React from "react";

import { FieldValidatorType } from "@utils/validators/validators";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import FormControl, { FormControlState } from '@mui/base/FormControl';
import Input, { inputClasses } from '@mui/base/Input';
import {typographyDataStyle} from "@components/IncomingDocument/IncomingDocumentData";
import {documentType} from "../../types/documentType";


function createField<FormKeysType extends string>(
  placeholder: string,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: React.FC<WrappedFieldProps>, // string | React.Component | React.FC,
  props: documentType,
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

const FormControlCreate: React.FC<FormControlPropsType> = ({
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

export const TextareaCreate: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta }: any = props;

    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };

    const grey = {
        50: '#f6f8fa',
        100: '#eaeef2',
        200: '#d0d7de',
        300: '#afb8c1',
        400: '#8c959f',
        500: '#6e7781',
        600: '#57606a',
        700: '#424a53',
        800: '#32383f',
        900: '#24292f',
    };

    const StyledTextarea = styled(TextareaAutosize)(
        ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
    );

  return (
    // <FormControlCreate {...props} >
      <textarea {...input} {...props} />
        // <StyledTextarea
        //     {...input}
        //     {...props}
        //     maxRows={4}
        //     aria-label="maximum height"
        //     // placeholder="Maximum 4 rows"
        //     // defaultValue=""
        // />
    // </FormControlCreate>
  );
};

const CustomInput = React.forwardRef(function CustomInput(
    props: React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    return <Input slots={{ input: StyledInputElement }}
                  {...props}
                  ref={ref}
    />;
});

export function CreateInput(props: any) {
    const { input, meta } = props;
    return (
    <CustomInput {...input} {...props}
                 aria-label="Demo input"
    />
    )
}

const StyledInputElement = styled('input')(
    ({ theme }) => `
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    justify-self: start,
  font-family: IBM Plex Sans, sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${'#099f72'};
  letter-spacing: 1px;
  background: ${'#ffffff'};
  border: 1px solid ${'#4e7e0e'};
  box-shadow: 1px 1px 1px ${'#abccab'};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    cursor: pointer;
    color: ${'#830B2D'};
    box-shadow: 1px 4px 4px ${'#abccab'};
  }

  &:focus {
    color: ${'#830B2D'};
    box-shadow: 1px 4px 4px ${'#abccab'};
    border-width: 3px;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

export const CheckboxInput: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta } = props;
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <FormControlCreate {...props}>
        <Checkbox color="primary" {...label} {...input} {...props} />
    </FormControlCreate>
  );
};
