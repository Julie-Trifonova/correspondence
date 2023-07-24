import React from "react";

import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {DeleteConfirmation} from "../../common/DeleteConfirmation/DeleteConfirmation";
import {deleteIncomingDocument} from "../../redux/incomingCorrespondenceReducer";
import {useDispatch} from "react-redux";
import s from './IncomingDocumentCard.module.css'
import DeleteIcon from '@mui/icons-material/Delete';

export const IncomingDocumentCard = ({ document }: any) => {

    const bull = (
        <Box
            component="span"
            sx={{
                display: 'inline-block',
                mx: '2px',
                transform: 'scale(0.8)',
                marginLeft: '5px',
                marginRight: '5px',
        }}
        >
            •
        </Box>
    );

    const dispatch = useDispatch();

    const dataStyle = {
        display: 'inline-block',
        height: '28px',
        padding: '4px',
        marginTop: '8px',
        textOverflow: 'ellipsis',
        paddingLeft: '7px',
        boxSizing: 'border-box',
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontSize: '14px',
        fontWeight: 'bold',
        borderRadius: '8px',
        letterSpacing: '1px',
        border: `${0.5}px solid transparent`,
        boxShadow: `inset ${1}px ${2}px ${2}px ${'#6c9ea9'}`,
        color: '#4F1DC7',
    }

    const dataUnknown = () => {
        return (
        <Typography component="div"
                    sx={{
                        display: 'inline-block',
                        padding: '4px',
                        textOverflow: 'ellipsis',
                        marginTop: '10px',
                        paddingLeft: '7px',
                        boxSizing: 'border-box',
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        letterSpacing: '1px',
                        border: `${0.5}px solid transparent`,
                        boxShadow: `inset ${1}px ${2}px ${2}px ${'#5151dc'}`,
                        color: '#4F1DC7',
                    }}
        >
            Не указано
        </Typography>
    )
    }
  return (
    <div>
      <Box className={s.box}>
            <Card variant='outlined'
                  sx={{
                      margin: '20px',
                      // height: '230px',
                      boxSizing: 'border-box',
                      borderRadius: '4px',
                      boxShadow: `${2}px ${2}px ${2}px ${'#8b79d3'}`,
                      display: 'block',
                      transitionProperty: 'all',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                      transitionDuration: '150ms',
                      color: '#4F1DC7',
                      '&:hover': {
                          cursor: 'pointer',
                          color: '#4F1DC7',
                          boxShadow: `${2}px ${4}px ${4}px ${'#8b79d3'}`,
                      },
                  }}
            >
                <NavLink to={`${document.id}`} className={s.link_to_card_box}>
                <CardContent>
                    <div>
                        {document.organizationName
                            ? <Typography component="div"
                                         sx={dataStyle}>
                                {document.organizationName}
                            </Typography>
                            : dataUnknown()
                        }
                    </div>
                    <div>
                        {document.name
                        ? <Typography component="div"
                                      sx={dataStyle}
                            >
                                {document.name}
                            </Typography>
                        : dataUnknown()
                        }
                    </div>
                    <div>
                        {document.organizationEmail
                        ? <Typography component="div"
                                     sx={dataStyle}
                            >
                                {document.organizationEmail}
                            </Typography>
                        : dataUnknown()
                        }
                    </div>
                    <div>
                        {document.deadline
                        ? <Typography component="div"
                                     sx={dataStyle}>
                                {document.deadline}
                            </Typography>
                        : dataUnknown()
                        }
                    </div>
                    <div>
                        {document.registeredEmployeeFullName
                        ? <Typography component="div"
                                      sx={dataStyle}
                            >
                                {document.registeredEmployeeFullName}
                            </Typography>
                        : dataUnknown()
                        }
                        {bull}
                        {document.registrationDate
                        ? <Typography component="div"
                                     sx={dataStyle}
                            >
                                {document.registrationDate}
                            </Typography>
                        : dataUnknown()
                        }
                    </div>
                </CardContent>
                </NavLink>
                <CardActions sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                }}>
                    <Button onClick={() => {DeleteConfirmation(dispatch, deleteIncomingDocument(document.id));}}
                            size='small'
                            sx={{
                                boxSizing: 'border-box',
                                color: '#4F1DC7',
                                background: 'transparent',
                                boxShadow: `${0}px ${2}px ${2}px ${'#8b79d3'}`,
                                transitionProperty: 'all',
                                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDuration: '400ms',
                                '&:hover': {
                                    cursor: 'pointer',
                                    boxShadow: `${0}px ${6}px ${6}px ${'#8b79d3'}`,
                                    background: 'transparent',
                                }
                            }}
                    >
                        <DeleteIcon/>
                    </Button>
                </CardActions>
            </Card>
        </Box>
    </div>
  );
};
