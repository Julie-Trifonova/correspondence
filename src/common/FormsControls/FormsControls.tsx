import React from "react";

import { typographyDataStyle } from "@components/IncomingDocument/IncomingDocumentData";
import FormControl, { FormControlState } from "@mui/base/FormControl";
import Input, { inputClasses } from "@mui/base/Input";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import { FieldValidatorType } from "@utils/validators/validators";
import {
  change,
  Field,
  WrappedFieldMetaProps,
  WrappedFieldProps,
} from "redux-form";
import { FormAction } from "redux-form/lib/actions";

import s from "./FormsControls.module.css";
import { documentType, fieldPropsType } from "../../types/types";

function createField<FormKeysType extends string>(
  placeholder: string,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: React.FC<WrappedFieldProps>, // string | React.Component | React.FC,
  props: fieldPropsType,
  text = "",
  documentProps: documentType,
  updateFormData: any
  //     (
  //   field: string,
  //   value: documentType
  // ) => () => (
  //   form: string,
  //   field: string,
  //   value: documentType,
  //   touch?: boolean,
  //   persistentSubmitErrors?: boolean
  // ) => () => void
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

// type FormControlPropsType = {
//   meta: {
//     touched: boolean;
//     error?: string;
//   };
//   // meta: WrappedFieldMetaProps,
//   children: React.ReactNode;
// };

// const FormControlCreate: React.FC<FormControlPropsType> = ({
//   meta: { touched, error },
//   children,
// }) => {
//   const hasError = touched && error;
//   return (
//     <div>
//       <div>{children}</div>
//       {hasError && <span>{error}</span>}
//     </div>
//   );
// };

export const TextareaCreate: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta }: WrappedFieldProps = props;
  return <textarea {...input} {...props} className={s.textarea} />;
};

const CustomInput = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <Input slots={{ input: StyledInputElement }} {...props} ref={ref} />;
});

export function CreateInput(props: WrappedFieldProps) {
  const { input, meta } = props;
  return <CustomInput {...input} {...props} aria-label="Demo input" />;
}

const StyledInputElement = styled("input")(
  ({ theme }) => `
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    justify-self: start;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${"#099f72"};
  letter-spacing: 1px;
  background: ${"#ffffff"};
  border: 1px solid ${"#4e7e0e"};
  box-shadow: 1px 1px 1px ${"#abccab"};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    cursor: pointer;
    color: ${"#830B2D"};
    box-shadow: 1px 4px 4px ${"#abccab"};
  }

  &:focus {
    color: ${"#830B2D"};
    box-shadow: 1px 4px 4px ${"#abccab"};
    border-width: 3px;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export const CheckboxInput: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta } = props;
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return <Checkbox color="primary" {...label} {...input} {...props} />;
};
