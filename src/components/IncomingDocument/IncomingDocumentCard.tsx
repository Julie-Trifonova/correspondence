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

export const IncomingDocumentCard = ({ document }: any) => {

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );
    const dispatch = useDispatch();
  return (
    <div>
      <Box sx={{ minWidth: 275 }}>
            <Card variant='outlined'>
                <NavLink to={`${document.id}`}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {document.organizationName}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {document.name}{bull}{document.organizationEmail}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {document.deadline}
                    </Typography>
                    <Typography variant="body2">
                        {document.registeredEmployeeFullName}
                        <br />
                        {document.registrationDate}
                    </Typography>
                </CardContent>
                </NavLink>
                <CardActions>
                    <Button size="small" onClick={() => {DeleteConfirmation(dispatch, deleteIncomingDocument(document.id));}}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Box>
    </div>
  );
};
