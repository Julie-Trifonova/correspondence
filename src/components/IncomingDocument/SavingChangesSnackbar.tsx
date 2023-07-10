import * as React from 'react';
import { Transition } from 'react-transition-group';
import { styled } from '@mui/system';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/base/Snackbar';
import { SnackbarCloseReason } from '@mui/base/useSnackbar';
import Button from "@mui/material/Button";

export default function SavingChangesSnackbar() {
    const [open, setOpen] = React.useState(false);
    const [exited, setExited] = React.useState(true);
    const nodeRef = React.useRef(null);

    const handleClose = (_: any, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleOnEnter = () => {
        setExited(false);
    };

    const handleOnExited = () => {
        setExited(true);
    };

    return (
        <React.Fragment>
            <TriggerButton type="button" onClick={handleClick}>
                <Button size="medium" type='submit'>Сохранить</Button>
                {/*Сохранить*/}
            </TriggerButton>
            <StyledSnackbar
                autoHideDuration={5000}
                open={open}
                onClose={handleClose}
                exited={exited}
            >
                <Transition
                    timeout={{ enter: 400, exit: 400 }}
                    in={open}
                    appear
                    unmountOnExit
                    onEnter={handleOnEnter}
                    onExited={handleOnExited}
                    nodeRef={nodeRef}
                >
                    {(status) => (
                        <SnackbarContent
                            style={{
                                transform: positioningStyles[status],
                                transition: 'transform 300ms ease',
                            }}
                            ref={nodeRef}
                        >
                            <CheckRoundedIcon
                                sx={{
                                    color: 'success.main',
                                    flexShrink: 0,
                                    width: '1.25rem',
                                    height: '1.5rem',
                                }}
                            />
                            <div className="snackbar-message">
                                <p className="snackbar-title">Notifications sent</p>
                                <p className="snackbar-description">
                                    Everything was sent to the desired address.
                                </p>
                            </div>

                            {/*<CloseIcon onClick={handleClose} className="snackbar-close-icon" />*/}
                        </SnackbarContent>
                    )}
                </Transition>
            </StyledSnackbar>
        </React.Fragment>
    );
}

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

const blue = {
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const TriggerButton = styled('button')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 6px 12px;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? blue[900] : '#FFF'};
  border: 1px solid ${theme.palette.mode === 'dark' ? blue[800] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[100] : grey[900]};
  box-shadow: ${
        theme.palette.mode === 'dark'
            ? '0px 2px 2px rgba(0, 0, 0, 0.2), inset 0px 4px 4px rgba(0, 0, 0, 0.1)'
            : '0px 2px 2px rgba(205, 210, 215, 0.2), inset 0px 4px 4px rgba(205, 210, 215, 0.1)'
    };

  &:hover {
    background: ${theme.palette.mode === 'dark' ? blue[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? blue[700] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `,
);

const StyledSnackbar = styled(Snackbar)`
  position: fixed;
  z-index: 5500;
  display: flex;
  bottom: 16px;
  right: 16px;
  max-width: 560px;
  min-width: 300px;
`;

const SnackbarContent = styled('div')(
    ({ theme }) => `
  display: flex;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: ${
        theme.palette.mode === 'dark'
            ? `0 2px 16px rgba(0,0,0, 0.5)`
            : `0 2px 16px ${grey[200]}`
    };
  padding: 0.75rem;
  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;

  & .snackbar-message {
    flex: 1 1 0%;
    max-width: 100%;
  }

  & .snackbar-title {
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .snackbar-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
  }

  & .snackbar-close-icon {
    cursor: pointer;
    flex-shrink: 0;
    padding: 2px;
    border-radius: 4px;

    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }
  }
  `,
);

const positioningStyles = {
    entering: 'translateX(0)',
    entered: 'translateX(0)',
    exiting: 'translateX(500px)',
    exited: 'translateX(500px)',
    unmounted: 'translateX(500px)',
};