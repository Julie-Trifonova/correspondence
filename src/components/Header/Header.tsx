import React from "react";
import {NavLink} from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const buttons = [
    <Button key="one">
        <NavLink to="/incomingCorrespondence">
            Входящая корреспонденция
        </NavLink>
    </Button>,
    <Button key="two">
        <NavLink to="/outgoingCorrespondence">
            Исходящая корреспонденция
        </NavLink>
    </Button>
];

export const Header = () => {
    return (
        <Box sx={{display: 'flex', '& > *': {m: 1,},}}>
            <ButtonGroup orientation="vertical" aria-label="vertical contained button group" variant="text">
                {buttons}
            </ButtonGroup>
        </Box>

    );
};
