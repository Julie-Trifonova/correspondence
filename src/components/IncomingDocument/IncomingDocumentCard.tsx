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
  return (
    <div>
      <Box className={s.box}>
            <Card variant='outlined'
                  sx={{
                      margin: '20px',
                      boxSizing: 'border-box',
                      borderRadius: '8px',
                      background: '#eff4db',
                      border: `${4}px solid transparent`,
                      boxShadow: `${0}px ${2}px ${2}px ${'#99b9fd'}`,
                      display: 'block',
                      transitionProperty: 'all',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                      transitionDuration: '400ms',
                      '&:hover': {
                          cursor: 'pointer',
                          boxShadow: `${0}px ${6}px ${6}px ${'#99b9fd'}`,
                          border: `${4}px solid ${'#dfeabb'}`,
                      }
                  }}
            >
                <NavLink to={`${document.id}`} className={s.link_to_card_box}>
                <CardContent>
                    <Typography sx={{
                        textOverflow: 'ellipsis',
                        paddingLeft: '7px',
                        boxSizing: 'border-box',
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        color: '#645A38',
                        letterSpacing: '1px',
                        background: '#F4E2DB',
                        border: `${0.5}px solid transparent`,
                        boxShadow: `${0}px ${2}px ${2}px ${'#99b9fd'}`,
                    }}>
                        {document.organizationName}
                    </Typography>
                    <Typography variant="h5"
                                component="div"
                                sx={{
                                    textOverflow: 'ellipsis',
                                    marginTop: '10px',
                                    paddingLeft: '7px',
                                    boxSizing: 'border-box',
                                    fontFamily: 'IBM Plex Sans, sans-serif',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    color: '#7F3E54',
                                    letterSpacing: '1px',
                                    background: '#ECD127',
                                    border: `${0.5}px solid transparent`,
                                    boxShadow: `${0}px ${2}px ${2}px ${'#99b9fd'}`,
                                }}
                    >
                        {document.name}
                        <br />
                        {document.organizationEmail}
                    </Typography>
                    <Typography sx={{
                        textOverflow: 'ellipsis',
                        mb: 1.5,
                        marginTop: '10px',
                        paddingLeft: '7px',
                        boxSizing: 'border-box',
                        fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        color: '#682B3A',
                        letterSpacing: '1px',
                        background: '#E3DF7B',
                        border: `${0.5}px solid transparent`,
                        boxShadow: `${0}px ${2}px ${2}px ${'#99b9fd'}`,
                    }}>
                        {document.deadline}
                    </Typography>
                    <Typography variant="body2"
                                sx={{
                                    textOverflow: 'ellipsis',
                                    marginTop: '10px',
                                    paddingLeft: '7px',
                                    boxSizing: 'border-box',
                                    fontFamily: 'IBM Plex Sans, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    color: '#59214B',
                                    letterSpacing: '1px',
                                    background: '#C0D61A',
                                    border: `${0.5}px solid transparent`,
                                    boxShadow: `${0}px ${2}px ${2}px ${'#99b9fd'}`,
                                }}
                    >
                        {document.registeredEmployeeFullName}
                        {bull}
                        {document.registrationDate}
                    </Typography>
                </CardContent>
                </NavLink>
                <CardActions sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                }}>
                    <Button onClick={() => {DeleteConfirmation(dispatch, deleteIncomingDocument(document.id));}}
                            sx={{
                                boxSizing: 'border-box',
                                fontSize: 'medium',
                                color: '#627957',
                                background: 'transparent',
                                boxShadow: `${0}px ${2}px ${2}px ${'#99b9fd'}`,
                                transitionProperty: 'all',
                                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDuration: '400ms',
                                '&:hover': {
                                    cursor: 'pointer',
                                    boxShadow: `${0}px ${6}px ${6}px ${'#99b9fd'}`,
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
