import React, { useState } from "react";

import Input from "@mui/base/Input";
import Option, { optionClasses } from "@mui/base/Option";
import Popper from "@mui/base/Popper";
import Select, { SelectProps, selectClasses } from "@mui/base/Select";
import { SelectOption } from "@mui/base/useOption";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";

import s from "./IncomingCorrespondenceFilterForm.module.css";
import { getDocumentsFilter } from "../../redux/documentsSelectors";
import { FilterType } from "../../redux/incomingCorrespondenceReducer";

type FormType = {
  term: string;
  type: string;
};
const filterFormValidate = (values: any) => {
  const errors = {};
  return errors;
};
type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

export const IncomingCorrespondenceFilterForm: React.FC<PropsType> = ({
  onFilterChanged,
}) => {
  const filter = useSelector(getDocumentsFilter);
  const [inputData, setInputData] = useState({
    inputTerm: filter.term,
    inputType: filter.type,
  });
  const [state, setState] = useState(false);

  const onSubmit = (
    values: { term: string; type: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const filter: FilterType = {
      term: inputData.inputTerm,
      type: inputData.inputType,
    };
    onFilterChanged(filter);
    setSubmitting(false);
  };

  const onChangeTermInput = (e: any) => {
    setInputData({ ...inputData, inputTerm: e.target.value });
    setState(true);
  };
  const onChangeTypeInput = (e: any) => {
    if (e.target.innerText === "Совпадения в тексте") {
      setInputData({ ...inputData, inputType: "q" });
    } else if (e.target.innerText === "Название") {
      setInputData({ ...inputData, inputType: "name" });
    } else if (e.target.innerText === "Срочность") {
      setInputData({ ...inputData, inputType: "urgency" });
    }

    setState(true);
  };

  return (
    <div>
      <Formik
        initialValues={{
          term: inputData.inputTerm,
          type: inputData.inputType,
        }}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validate={filterFormValidate}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <UnstyledInputIntroduction
              className={s.text_input}
              onChangeTermInput={onChangeTermInput}
            />
            <div></div>
            <UnstyledSelectCustomRenderValue
              className={s.filter_input}
              onChangeTypeInput={onChangeTypeInput}
            />
            <IconButton
              type="submit"
              className={s.button_form}
              disabled={isSubmitting}
              sx={{
                color: "#ad5473",
                marginTop: "8px",
                transitionProperty: "all",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDuration: "400ms",
                "&:hover": { color: "#830B2D" },
              }}
              aria-label="search and filter"
            >
              <SearchIcon fontSize="large" />
            </IconButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const CustomInput = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <Input slots={{ input: StyledInputElement }} {...props} ref={ref} />;
});

function UnstyledInputIntroduction({ onChangeTermInput }: any) {
  return (
    <CustomInput
      name="term"
      onChange={(e) => {
        onChangeTermInput(e);
      }}
      aria-label="Demo input"
      placeholder="Что ищем?"
    />
  );
}

// color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
// background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
// border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};

const StyledInputElement = styled("input")(
  ({ theme }) => `
    width: 320px;
    height: 50px;
    box-sizing: border-box;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${"#698c4a"};
  letter-spacing: 1px;
  background: ${"#ffffff"};
  border: 0.5px solid transparent;
  box-shadow: 2px 2px 2px ${"#8b79d3"};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 400ms;

  &:hover {
    cursor: pointer;
    background: ${"#e7f3e8"};
    color: ${"#830B2D"};
    box-shadow: 2px 4px 4px ${"#8b79d3"};
  }

  &:focus {
    background: ${"#e7f3e8"};
    color: ${"#830B2D"};
    box-shadow: 2px 4px 4px ${"#8b79d3"};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

function UnstyledSelectCustomRenderValue({ onChangeTypeInput }: any) {
  return (
    <CustomSelect
      renderValue={renderValue}
      name="type"
      onChange={(e) => {
        onChangeTypeInput(e);
      }}
    >
      <StyledOption value={10}>Совпадения в тексте</StyledOption>
      <StyledOption value={20}>Название</StyledOption>
      <StyledOption value={30}>Срочность</StyledOption>
    </CustomSelect>
  );
}

function CustomSelect(props: SelectProps<number, false>) {
  const slots: SelectProps<number, false>["slots"] = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <Select {...props} slots={slots} />;
}

function renderValue(option: SelectOption<number | string> | null) {
  if (option == null) {
    return <span>Тип сортировки</span>;
  }

  return <span>{option.label}</span>;
}

const StyledButton = styled("button")(
  ({ theme }) => `
    width: 320px;
    height: 50px;
    margin-top: 8px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 16px;
  font-weight: bold;
  box-sizing: border-box;
  padding: 12px;
  text-align: left;
  line-height: 1.5;
  border-radius: 8px;
  color: ${"#698c4a"};
  letter-spacing: 1px;
  background: ${"#ffffff"};
  border: 0.5px solid transparent;
  box-shadow: 2px 2px 2px ${"#8b79d3"};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 400ms;

  &:hover {
    cursor: pointer;
    background: ${"#e7f3e8"};
    color: ${"#830B2D"};
    box-shadow: 2px 4px 4px ${"#8b79d3"};
  }
  
  &.${selectClasses.focusVisible} {
    background: ${"#99b9fd"};
    color: ${"#ffffff"};
    box-shadow: 2px 4px 4px ${"#8b79d3"};
    border: 1px solid ${"#338396"};
  }

  &.${selectClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  overflow: auto;
  outline: 0px;
  width: 320px;
    min-height: calc(1.5em + 22px);
  font-family: IBM Plex Sans, sans-serif;
  font-size: 16px;
  font-weight: bold;
  box-sizing: border-box;
  padding: 12px;
  text-align: left;
  line-height: 1.5;
  border-radius: 8px;
  color: ${"#698c4a"};
  letter-spacing: 1px;
  background: ${"#ffffff"};
  box-shadow: inset 2px 2px 2px ${"#8b79d3"};
  border: 3px solid ${"#80a5c0"};
  `
);

const StyledOption = styled(Option)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background: ${"#dee8f6"};
  }

  &.${optionClasses.highlighted} {
  
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    
  }

  &.${optionClasses.disabled} {
    color: grey;
  }

  &:hover:not(.${optionClasses.disabled}) {
    background: ${"#dee8f6"};
  }  
  `
);

const StyledPopper = styled(Popper)`
  z-index: 1;
`;
