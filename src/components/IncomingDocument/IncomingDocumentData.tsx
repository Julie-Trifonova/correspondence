import React from "react";
import {ExportToExel} from "@components/IncomingDocument/ExportToExel";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import StorageIcon from '@mui/icons-material/Storage';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LinkIcon from '@mui/icons-material/Link';
import {DeleteConfirmation} from "../../common/DeleteConfirmation/DeleteConfirmation";
import {deleteIncomingDocument} from "../../redux/incomingCorrespondenceReducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";

export const bull = (<Box component="span" sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}>•</Box>);
export const unspecified = () => {
    return (
        <Typography sx={{fontSize: 18}} color="primary" component="span">
            Не указано
        </Typography>
    )
}
export const IncomingDocumentData = ({goToEditMode, document}: any) => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    return (
        <div>
            <Box sx={{minWidth: 275}}>
                <Card variant="outlined">
                    <CardContent>
                        <CardActions>
                            <Button size="medium" onClick={() => navigate(-1)}>Назад</Button>
                            <Button size="medium" onClick={goToEditMode}>Внести изменения</Button>
                            <Button size="medium" onClick={() => DeleteConfirmation(dispatch, deleteIncomingDocument(document.id))}>Удалить</Button>
                            <ExportToExel data={[document]}/>
                        </CardActions>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Входящий документ
                        </Typography>
                        <div>
                            <Typography variant="h5" color="text.secondary" component="span">
                                Название {bull}
                            </Typography>
                            {document.name
                            ? <Typography variant="h5" color="primary" component="span">
                                    <DriveFileRenameOutlineIcon color='primary'/>
                                    {document.name}
                                </Typography>
                            : unspecified()}
                        </div>
                        <div>
                            {document.documentIsReading
                                ? <Typography sx={{fontSize: 18}} color="primary" component="span">
                                    Прочитано <MarkEmailReadIcon/>
                                </Typography>
                                : <Typography sx={{fontSize: 18}} color="error" component="span">
                                    Не прочитано <MarkEmailUnreadIcon/>
                                </Typography>
                            }
                        </div>
                        <div>
                            <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                                Регистрационный номер {bull}
                            </Typography>
                            {document.registrationNumber
                            ? <Typography sx={{fontSize: 18}} color="primary" component="span">
                                    {document.registrationNumber}
                                </Typography>
                            : unspecified()}
                        </div>
                        <div>
                            <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                                Дата регистрации {bull}
                            </Typography>
                            {document.registrationDate
                            ? <Typography sx={{fontSize: 18}} color="primary" component="span">
                                    {document.registrationDate}
                                </Typography>
                            : unspecified()}
                        </div>
                        <div>
                            <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                                Контрагент {bull}
                            </Typography>
                            {document.organizationName
                            ? <Typography sx={{fontSize: 18}} color="primary" component="span">
                                    {document.organizationName}
                                </Typography>
                            : unspecified()}
                        </div>
                        <div>
                            <Typography sx={{fontSize: 18}} color="text.secondary" component="div">
                                Контакты
                            </Typography>
                            <div>
                                <span><AlternateEmailIcon color='primary'/></span>
                                <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                                    E-mail {bull}
                                </Typography>
                                {document.organizationEmail
                                ? <Typography sx={{fontSize: 18}} color="primary" component="span">
                                        {document.organizationEmail}
                                    </Typography>
                                : unspecified()}
                            </div>
                            <div>
                                <span><LocalPhoneIcon color='success'/></span>
                                <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                                    Телефон {bull}
                                </Typography>
                                {document.organizationPhoneNumber
                                ? <Typography sx={{fontSize: 18}} color="primary" component="span">
                                        {document.organizationPhoneNumber}
                                    </Typography>
                                : unspecified()}
                            </div>
                        </div>
                        <div>
                            <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                                Дополнительная информация {bull}
                            </Typography>
                            {document.organizationAdditionalInformation
                            ? <Typography sx={{fontSize: 18}} color="primary" component="span">
                                    {document.organizationAdditionalInformation}
                                </Typography>
                            : unspecified()}

                        </div>
                        <div>
                            <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                                Статус {bull}
                            </Typography>
                            <Typography sx={{fontSize: 18}} color="primary" component="span">
                                {document.status === "consideration" ? " На рассмотрении" : document.status === "sent response" ? " Отправлен ответ" : " Не указано"}
                            </Typography>
                        </div>
                        <div>
                            <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                                Дата получения {bull}
                            </Typography>
                            {document.deliveryDate
                            ? <Typography sx={{fontSize: 18}} color="primary" component="span">
                                    {document.deliveryDate}
                                </Typography>
                            : unspecified()}

                        </div>
                        <div>
                            <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                                Способ доставки {bull}
                            </Typography>
                            <Typography sx={{fontSize: 18}} color="primary" component="span">
                                {document.deliveryService === "fax" ? " Факс" : document.deliveryService === "paper" ? " Бумага" : "Не указано"}
                            </Typography>
                        </div>
                        <div>
                            <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                                Срочность {bull}
                            </Typography>
                            <Typography sx={{fontSize: 18}} color="primary" component="span">
                                {document.deadline === "month" ? " Месяц" : document.deadline === "week" ? " Неделя" : document.deadline === "day" ? " День" : document.deadline === "urgent" ? " Срочно" : document.deadline === "unspecified" ? " Не установлено" : " Не установлено"}
                            </Typography>
                        </div>
                        <div>
                            <div>
                                <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                                    Место хранения {bull}
                                </Typography>
                                {document.storagePlace
                                ? <Typography sx={{fontSize: 18}} color="primary" component="span">
                                        <StorageIcon color="primary"/>
                                        {document.storagePlace}
                                    </Typography>
                                : unspecified()}
                            </div>
                            <div>
                                <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                                    Вложения {bull}
                                </Typography>
                                {document.subDocuments
                                ? <Typography sx={{fontSize: 18}} color="primary" component="span">
                                        <AssignmentIcon/>{document.subDocuments}
                                    </Typography>
                                : unspecified()}
                            </div>
                            <div>
                                <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                                    Ссылки {bull}
                                </Typography>
                                {document.links
                                    ? <Typography sx={{fontSize: 18}} color="primary" component="span">
                                    <LinkIcon color="primary"/>{document.links}
                                </Typography>
                                : unspecified()}
                            </div>
                        </div>
                        <div>
                            <Typography sx={{fontSize: 16}} color="text.secondary" component="span">
                                Зарегистрировал {bull}
                            </Typography>
                            {document.registeredEmployeeFullName
                            ? <Typography sx={{fontSize: 16}} color="primary" component="span">
                                    {document.registeredEmployeeFullName}
                                </Typography>
                            : unspecified()}
                        </div>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};