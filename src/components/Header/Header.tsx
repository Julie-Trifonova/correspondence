import React, {useState} from "react";
import Button, {buttonClasses} from '@mui/base/Button';
import {styled} from '@mui/system';
import Stack from '@mui/material/Stack';
import {NavLink} from "react-router-dom";
import s from './Header.module.css'

export const Header = () => {
    const blue = {
        500: '#769f8c',
        600: '#4a7dc4',
        700: '#22848a',
    };

// &.active {
//         background-color: ${blue[700]};
//     }

    const CustomButton = styled(Button)(
        ({theme}) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 16px;
  box-sizing: border-box;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 12px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  opacity: 0.6;
  box-shadow: 0 2px 2px #848d84;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;

  &:hover {
    background-color: ${blue[600]};
    opacity: 0.6;
    box-shadow: 0 4px 4px #848d84;
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }
  `,
    );

    const [active, setActive] = useState('')

    return (
        <Stack className={s.box} spacing={2} direction="row">
            <NavLink to="/incomingCorrespondence">
                <CustomButton
                    className={active === 'incoming correspondence' ? 'active' : ''}
                    onClick={() => setActive('incoming correspondence')}
                >
                    Входящая корреспонденция
                </CustomButton>
            </NavLink>
            <NavLink to="/outgoingCorrespondence">
                <CustomButton
                    class={active === 'outgoing correspondence' ? 'active' : ''}
                    onClick={() => setActive('outgoing correspondence')}
                >
                    Исходящая корреспонденция
                </CustomButton>
            </NavLink>
        </Stack>
        );
};
