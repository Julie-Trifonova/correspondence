import React, {useState} from "react";
import Button, {buttonClasses} from '@mui/base/Button';
import {styled} from '@mui/system';
import Stack from '@mui/material/Stack';
import {NavLink} from "react-router-dom";
import s from './Header.module.css'

export const Header = () => {

    const CustomButton = styled(Button)(
        ({theme}) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 16px;
  box-sizing: border-box;
  background: ${'#ffffff'};
  padding: 12px 24px;
  border-radius: 12px;
  color: ${'#a19118'};
  transition: all 150ms ease;
  cursor: pointer;
  border: 3px groove ${'#b8a2f3'};
  box-shadow: 0 2px 2px #848d84;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
  
  &.active {
        background-color: ${'#e7f3e8'};
    },

  &:hover {
    background: ${'#e7f3e8'};
    box-shadow: 0 4px 4px #848d84;
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
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
                    className={active === 'outgoing correspondence' ? 'active' : ''}
                    onClick={() => setActive('outgoing correspondence')}
                >
                    Исходящая корреспонденция
                </CustomButton>
            </NavLink>
        </Stack>
        );
};
