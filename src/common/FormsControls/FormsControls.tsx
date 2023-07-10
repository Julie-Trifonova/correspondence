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
    <FormControlCreate {...props} >
      {/*<textarea {...input} {...props} />*/}
        <StyledTextarea
            {...input}
            {...props}
            maxRows={4}
            aria-label="maximum height"
            // placeholder="Maximum 4 rows"
            // defaultValue=""
        />
    </FormControlCreate>
  );
};
export const CreateInput: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta } = props;

    const StyledInput = styled(Input)(
        ({ theme }) => `
  
  display: inline-block;

  .${inputClasses.input} {
    width: 320px;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    border-radius: 8px;
    padding: 12px 12px;

    &:hover {
      background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
    }
  }

  &.filled .${inputClasses.input} {
    box-shadow: 0 0 2px 2px rgba(125, 200, 0, 0.25);
  }
`,
    );

    const OkMark = styled('span')`
  margin-left: 8px;
  margin-top: 10px;
  position: absolute;
  color: rgb(125 200 0 / 1);
`;

    const blue = {
        100: '#DAECFF',
        200: '#80BFFF',
        400: '#3399FF',
        600: '#0072E5',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E7EBF0',
        200: '#E0E3E7',
        300: '#CDD2D7',
        400: '#B2BAC2',
        500: '#A0AAB4',
        600: '#6F7E8C',
        700: '#3E5060',
        800: '#2D3843',
        900: '#1A2027',
    };

  return (
    // <FormControlCreate {...props}>
    //   <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
      //   <TextField id="outlined-required"{...input} {...props}/>
      // </Box>
    // </FormControlCreate>
      <FormControl defaultValue="" {...input} {...props}>
          {({ filled, focused }: FormControlState) => (
              <>
                  <StyledInput {...input} {...props} className={filled ? 'filled' : ''} />
                  {filled && !focused && <OkMark>✔</OkMark>}
                  </>
          )}
      </FormControl>


  );
};
export const CheckboxInput: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta } = props;
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <FormControlCreate {...props}>
        <Checkbox color="primary" {...label} {...input} {...props} />
    </FormControlCreate>
  );
};
