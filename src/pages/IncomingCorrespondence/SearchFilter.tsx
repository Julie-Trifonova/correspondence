import * as React from 'react';
import useAutocomplete, { UseAutocompleteProps } from '@mui/base/useAutocomplete';
import Button from '@mui/base/Button';
import Popper from '@mui/base/Popper';
import { styled } from '@mui/system';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import s from "./IncomingCorrespondenceFilterForm.module.css";

const CustomAutocomplete = React.forwardRef(function CustomAutocomplete(
    props: UseAutocompleteProps<(typeof top100Films)[number], false, false, false>,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const {
        disableClearable = false,
        disabled = false,
        readOnly = false,
        ...other
    } = props;

    const {
        getRootProps,
        getInputProps,
        getPopupIndicatorProps,
        getClearProps,
        getListboxProps,
        getOptionProps,
        dirty,
        id,
        popupOpen,
        focused,
        anchorEl,
        setAnchorEl,
        groupedOptions,
    } = useAutocomplete({
        ...props,
        componentName: 'BaseAutocompleteIntroduction',
    });

    const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;

    const rootRef = useForkRef(ref, setAnchorEl);

    return (
        <React.Fragment>
            <StyledAutocompleteRoot
                {...getRootProps(other)}
                ref={rootRef}
                className={focused ? 'focused' : undefined}
            >
                <StyledInput
                    id={id}
                    ref={setAnchorEl}
                    disabled={disabled}
                    readOnly={readOnly}
                    {...getInputProps()}
                />
                {hasClearIcon && (
                    <StyledClearIndicator {...getClearProps()}>
                        <ClearIcon />
                    </StyledClearIndicator>
                )}
                <StyledPopupIndicator
                    {...getPopupIndicatorProps()}
                    className={popupOpen ? 'popupOpen' : undefined}
                >
                    <ArrowDropDownIcon />
                </StyledPopupIndicator>
            </StyledAutocompleteRoot>
            {anchorEl ? (
                <Popper
                    open={popupOpen}
                    anchorEl={anchorEl}
                    slots={{
                        root: StyledPopper,
                    }}
                    modifiers={[{ name: 'flip', enabled: false }]}
                >
                    <StyledListbox {...getListboxProps()}>
                        {(groupedOptions as typeof top100Films).map((option, index) => {
                            const optionProps = getOptionProps({ option, index });
                            return <StyledOption {...optionProps} value={option.year}>{option.label}</StyledOption>;
                        })}

                        {groupedOptions.length === 0 && (
                            <StyledNoOptions>No results</StyledNoOptions>
                        )}
                    </StyledListbox>
                </Popper>
            ) : null}
        </React.Fragment>
    );
});

export default function AutocompleteIntroduction() {
    return <CustomAutocomplete options={top100Films} />;
}

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
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

const StyledAutocompleteRoot = styled('div')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  border-radius: 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  display: flex;
  gap: 5px;
  padding-right: 5px;
  overflow: hidden;
  width: 320px;

  &.focused {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledInput = styled('input')(
    ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 12px 12px;
  outline: 0;
  flex: 1 0 auto;
`,
);

// ComponentPageTabs has z-index: 1000
const StyledPopper = styled('div')`
  position: relative;
  z-index: 1001;
  width: 320px;
`;

const StyledListbox = styled('ul')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  max-height: 300px;
  z-index: 1;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

const StyledOption = styled('li')(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
  }

  &[aria-selected=true] {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.Mui-focused,
  &.Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.Mui-focusVisible {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &[aria-selected=true].Mui-focused,
  &[aria-selected=true].Mui-focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `,
);

const StyledPopupIndicator = styled(Button)(
    ({ theme }) => `
    margin-top: 5px;
    margin-bottom: 5px;
    outline: 0;
    box-shadow: none;
    border: 0;
    border-radius: 7px;
    background-color: transparent;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[700] : blue[100]};
      cursor: pointer;
    }

    & > svg {
      transform: translateY(1px);
    }

    &.popupOpen > svg {
      transform: translateY(1px) rotate(180deg);
    }
  `,
);

const StyledClearIndicator = styled(Button)(
    ({ theme }) => `
    margin-top: 5px;
    margin-bottom: 5px;
    outline: 0;
    box-shadow: none;
    border: 0;
    border-radius: 7px;
    background-color: transparent;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[700] : blue[100]};
      cursor: pointer;
    }

    & > svg {
      transform: translateY(1px);
    }
  `,
);

const StyledNoOptions = styled('li')`
  list-style: none;
  padding: 8px;
  cursor: default;
`;

const top100Films = [
    { label: 'Все документы', year: "" },
    { label: 'Совпадения в тексте', year: "q" },
    { label: 'Название', year: "name" },
    { label: 'Срочность', year: "urgency" },
];