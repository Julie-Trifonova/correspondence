import React from "react";

import {
  dateValidator,
  maxLengthValidator,
  required,
} from "@utils/validators/validators";
import { useDispatch } from "react-redux";
import { reduxForm } from "redux-form";
import s from './IncomingDocumentDataForm.module.css'

import {
  CheckboxInput,
  createField,
  CreateInput,
  TextareaCreate,
} from "../../common/FormsControls/FormsControls";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {DeleteConfirmation} from "../../common/DeleteConfirmation/DeleteConfirmation";
import {deleteIncomingDocument} from "../../redux/incomingCorrespondenceReducer";
import {ExportToExel} from "@components/IncomingDocument/ExportToExel";
import Typography from "@mui/material/Typography";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import StorageIcon from "@mui/icons-material/Storage";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LinkIcon from "@mui/icons-material/Link";
import Box from "@mui/material/Box";
import {actionButtonsStyle, bull, iconsStyle, typographyTypeStyle, unspecified} from "./IncomingDocumentData";
import SavingChangesSnackbar from "@components/IncomingDocument/SavingChangesSnackbar";
import {Navigate, NavLink, useNavigate} from "react-router-dom";

const IncomingDocumentDataForm = ({
  initialValues,
  onSubmit,
  document,
  updateFormData,
}: any) => {
  const navigate = useNavigate();
  const [checkedDocumentIsReading, setCheckedDocumentIsReading] =
    React.useState(document.documentIsReading);
  const [checkedDeliveryService, setCheckedDeliveryService] = React.useState(
    document.deliveryService
  );
  const [checkedDeadline, setCheckedDeadline] = React.useState(
    document.deadline
  );
  const [checkedStatus, setStatus] = React.useState(document.status);

  const oneLineStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    margin: `12px 0`,
  }
  const oneLineCheckBoxStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 10fr',
    alignItems: 'center',
  }
  const typographyTypeCheckBoxStyle = {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    color: '#4F1DC7',
    letterSpacing: '3px',
    justifySelf: 'start',
    lineHeight: '16px',
  }
  const dataIconsStyle = {
    color: '#4F1DC7',
    marginBottom: '-5px',
    marginRight: '3px',
  }

  return (
        <form onSubmit={(e) => onSubmit(e)}>
        <Box>
          <Card sx={{
            display: 'block',
            boxSizing: 'border-box',
            margin: `${0}px auto`,
            padding: `${0}px ${15}px`,
            borderRadius: '2px',
            border: `${4}px solid ${'#ece3be'}`,
            boxShadow: `${0}px ${1}px ${1}px transparent`,
            '@media (min-width: 1201px)': {
              width: '1000px',
            },
            '@media (min-width: 641px) and (max-width: 1200px)': {
              width: '70%',
            },
            '@media (max-width: 640px)': {
              width: '90%',
            }
          }}>
            <CardContent>
              <CardActions style={{
                display: 'flex',
                marginBottom: '30px',
                justifyContent: "space-evenly",
                alignItems: 'center',
              }}>
              <Typography sx={{
                // alignSelf: 'center',
                width: '150px',
                display: 'block',
                textAlign: 'center',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                color: '#4F1DC7',
                letterSpacing: '6px',
              }} gutterBottom>
                Входящий документ
              </Typography>
                <Button type='submit'
                        sx={actionButtonsStyle}
                >Сохранить</Button><
                Button type='submit'
                       onClick={() => navigate(-1)}
                        sx={actionButtonsStyle}
                >Назад</Button>
              </CardActions>
              <div style={oneLineStyle}>
                <Typography component="span"
                            sx={typographyTypeStyle}
                >
                  Название
                  {bull}
                </Typography>
                {createField(
                    "Название",
                    "name",
                    [required, maxLengthValidator(40)],
                    CreateInput,
                    {},
                    "",
                    document.name,
                    updateFormData
                )}
              </div>
                <div style={oneLineStyle}>
                <div></div>
                  <div style={oneLineCheckBoxStyle}>
                {createField(
                    "",
                    "documentIsReading",
                    [],
                    CheckboxInput,
                    {
                      type: "checkbox",
                      defaultChecked: !!checkedDocumentIsReading,
                      checked: !!checkedDocumentIsReading,
                     onChange: () =>
                          setCheckedDocumentIsReading(!checkedDocumentIsReading),
                    },
                    "",
                    checkedDocumentIsReading,
                    updateFormData
                )}
                  {checkedDocumentIsReading
                      ? <Typography sx={typographyTypeCheckBoxStyle}
                                    component="span"
                      >
                        <MarkEmailReadIcon fontSize='small' sx={dataIconsStyle}/>
                        Прочитано
                      </Typography>
                      : <Typography sx={typographyTypeCheckBoxStyle} component="span">
                        <MarkEmailUnreadIcon fontSize='small' sx={dataIconsStyle}/>
                        Не прочитано
                      </Typography>
                  }
                </div>
              </div>
              <div style={oneLineStyle}>
                <Typography sx={typographyTypeStyle} component="span">
                  Регистрационный номер
                  {bull}
                </Typography>
                {createField(
                    "",
                    "registrationNumber",
                    [maxLengthValidator(20)],
                    CreateInput,
                    {
                      type: 'number'
                    },
                    "",
                    document.registrationNumber,
                    updateFormData
                )}
              </div>

              <div style={oneLineStyle}>
                <Typography sx={typographyTypeStyle} component="span">
                  Дата регистрации
                  {bull}
                </Typography>
                {createField(
                    "",
                    "registrationDate",
                    [],
                    CreateInput,
                    {
                      type: 'date'
                    },
                    "",
                    document.registrationDate,
                    updateFormData
                )}
              </div>
              <div style={oneLineStyle}>
                <Typography sx={typographyTypeStyle} component="span">
                  Контрагент
                  {bull}
                </Typography>
                {createField(
                    "ООО Ромашка",
                    "organizationName",
                    [maxLengthValidator(40)],
                    CreateInput,
                    {},
                    "",
                    document.organizationName,
                    updateFormData
                )}
              </div>
              <div style={oneLineStyle}>
                  <Typography sx={typographyTypeStyle} component="span">
                    <AlternateEmailIcon fontSize='small' sx={dataIconsStyle}/>
                    E-mail
                    {bull}
                  </Typography>
                {createField(
                    "e-mail",
                    "organizationEmail",
                    [],
                    CreateInput,
                    {
                      type: 'email'
                    },
                    "",
                    document.organizationEmail,
                    updateFormData
                )}
              </div>
              <div style={oneLineStyle}>
                  <Typography sx={typographyTypeStyle} component="span">
                    <LocalPhoneIcon fontSize='small' sx={dataIconsStyle}/>
                    Телефон
                    {bull}
                  </Typography>
                {createField(
                    "",
                    "organizationPhoneNumber",
                    [],
                    CreateInput,
                    {
                      type: 'tel'
                    },
                    "",
                    document.organizationPhoneNumber,
                    updateFormData
                )}
              </div>
              <div style={oneLineStyle}>
                <Typography sx={typographyTypeStyle} component="span">
                  Дополнительная информация
                  {bull}
                </Typography>
                {createField(
                    "",
                    "organizationAdditionalInformation",
                    [maxLengthValidator(150)],
                    TextareaCreate,
                    {},
                    "",
                    document.organizationAdditionalInformation,
                    updateFormData
                )}
              </div>
              <div style={oneLineStyle}>
                <Typography sx={typographyTypeStyle} component="span">
                  Статус
                  {bull}
                </Typography>
              <div className={s.checkboxes}>
                <div style={oneLineCheckBoxStyle}>
                {createField(
                    "",
                    "status",
                    [],
                    CheckboxInput,
                    {
                      type: "checkbox",
                      defaultChecked: document.status === "consideration",
                      checked: checkedStatus === "consideration",
                      onChange: () => {
                        if (checkedStatus === "consideration") {
                          setStatus("");
                        } else {
                          setStatus("consideration");
                        }
                      },
                    },
                    "",
                    checkedStatus,
                    updateFormData
                )}
                  <Typography sx={typographyTypeCheckBoxStyle} component="span">
                    На рассмотрении
                  </Typography>
                </div>
                <div style={oneLineCheckBoxStyle}>
                {createField(
                    "",
                    "status",
                    [],
                    CheckboxInput,
                    {
                      type: "checkbox",
                      defaultChecked: document.status === "sent response",
                      checked: checkedStatus === "sent response",
                      onChange: () => {
                        if (checkedStatus === "sent response") {
                          setStatus("");
                        } else {
                          setStatus("sent response");
                        }
                      },
                    },
                    "",
                    checkedStatus,
                    updateFormData
                )}
                  <Typography sx={typographyTypeCheckBoxStyle} component="span">
                    Отправлен ответ
                  </Typography>
                </div>
              </div>
              </div>
              <div style={oneLineStyle}>
                <Typography sx={typographyTypeStyle} component="span">
                  Дата получения
                  {bull}
                </Typography>
                {createField(
                    "",
                    "deliveryDate",
                    [],
                    CreateInput,
                    {
                      type: 'date'
                    },
                    "",
                    document.deliveryDate,
                    updateFormData
                )}
              </div>
              <div style={oneLineStyle}>
                <Typography sx={typographyTypeStyle} component="span">
                  Способ доставки
                  {bull}
                </Typography>
              <div className={s.checkboxes}>
                <div style={oneLineCheckBoxStyle}>
                {createField(
                    "",
                    "deliveryService",
                    [maxLengthValidator(20)],
                    CheckboxInput,
                    {
                      type: "checkbox",
                      defaultChecked: document.deliveryService === "fax",
                      checked: checkedDeliveryService === "fax",
                      onChange: () => {
                        if (checkedDeliveryService === "fax") {
                          setCheckedDeliveryService("");
                        } else {
                          setCheckedDeliveryService("fax");
                        }
                      },
                    },
                    "",
                    checkedDeliveryService,
                    updateFormData
                )}
                  <Typography sx={typographyTypeCheckBoxStyle} component="span">
                    Факс
                  </Typography>
                </div>
                <div style={oneLineCheckBoxStyle}>
                {createField(
                    "",
                    "deliveryService",
                    [maxLengthValidator(20)],
                    CheckboxInput,
                    {
                      type: "checkbox",
                      defaultChecked: document.deliveryService === "paper",
                      checked: checkedDeliveryService === "paper",
                      onChange: () => {
                        if (checkedDeliveryService === "paper") {
                          setCheckedDeliveryService("");
                        } else {
                          setCheckedDeliveryService("paper");
                        }
                      },
                    },
                    "",
                    checkedDeliveryService,
                    updateFormData
                )}
                  <Typography sx={typographyTypeCheckBoxStyle} component="span">
                    Бумага
                  </Typography>
              </div>
              </div>
              </div>
              <div style={oneLineStyle}>
                <Typography sx={typographyTypeStyle} component="span">
                  Срочность
                  {bull}
                </Typography>
                <div className={s.checkboxes}>
                  <div style={oneLineCheckBoxStyle}>
                  {createField(
                      "",
                      "deadline",
                      [],
                      CheckboxInput,
                      {
                        type: "checkbox",
                        defaultChecked: checkedDeadline === "unspecified" || checkedDeadline === "",
                        checked: checkedDeadline === "unspecified" || checkedDeadline === "",
                        onChange: () => {
                          if (checkedDeadline === "unspecified") {
                            setCheckedDeadline("");
                          } else {
                            setCheckedDeadline("unspecified");
                          }
                        },
                      },
                      "",
                      checkedDeadline,
                      updateFormData
                  )}
                    <Typography sx={typographyTypeCheckBoxStyle} component="span">
                      Не установлено
                    </Typography>
                </div>
                  <div style={oneLineCheckBoxStyle}>
                  {createField(
                      "",
                      "deadline",
                      [],
                      CheckboxInput,
                      {
                        type: "checkbox",
                        defaultChecked: document.deadline === "urgent",
                        checked: checkedDeadline === "urgent",
                        onChange: () => {
                          if (checkedDeadline === "urgent") {
                            setCheckedDeadline("");
                          } else {
                            setCheckedDeadline("urgent");
                          }
                        },
                      },
                      "",
                      checkedDeadline,
                      updateFormData
                  )}
                    <Typography sx={typographyTypeCheckBoxStyle} component="span">
                      Срочно
                    </Typography>
                </div>
                  <div style={oneLineCheckBoxStyle}>
                  {createField(
                      "",
                      "deadline",
                      [],
                      CheckboxInput,
                      {
                        type: "checkbox",
                        defaultChecked: document.deadline === "day",
                        checked: checkedDeadline === "day",
                        onChange: () => {
                          if (checkedDeadline === "day") {
                            setCheckedDeadline("");
                          } else {
                            setCheckedDeadline("day");
                          }
                        },
                      },
                      "",
                      checkedDeadline,
                      updateFormData
                  )}
                    <Typography sx={typographyTypeCheckBoxStyle} component="span">
                      День
                    </Typography>
                </div>
                  <div style={oneLineCheckBoxStyle}>
                  {createField(
                      "",
                      "deadline",
                      [],
                      CheckboxInput,
                      {
                        type: "checkbox",
                        defaultChecked: document.deadline === "week",
                        checked: checkedDeadline === "week",
                        onChange: () => {
                          if (checkedDeadline === "week") {
                            setCheckedDeadline("");
                          } else {
                            setCheckedDeadline("week");
                          }
                        },
                      },
                      "",
                      checkedDeadline,
                      updateFormData
                  )}
                    <Typography sx={typographyTypeCheckBoxStyle} component="span">
                      Неделя
                    </Typography>
                </div>
                  <div style={oneLineCheckBoxStyle}>
                  {createField(
                      "",
                      "deadline",
                      [],
                      CheckboxInput,
                      {
                        type: "checkbox",
                        defaultChecked: document.deadline === "month",
                        checked: checkedDeadline === "month",
                        onChange: () => {
                          if (checkedDeadline === "month") {
                            setCheckedDeadline("");
                          } else {
                            setCheckedDeadline("month");
                          }
                        },
                      },
                      "",
                      checkedDeadline,
                      updateFormData
                  )}
                    <Typography sx={typographyTypeCheckBoxStyle} component="span">
                      Месяц
                    </Typography>
                </div>
              </div>
              </div>
              <div>
                <div style={oneLineStyle}>
                  <Typography sx={typographyTypeStyle} component="span">
                    Место хранения
                    {bull}
                  </Typography>
                  {document.storagePlace
                      ? <Typography sx={{fontSize: 18}} color="primary" component="span">
                        <StorageIcon color="primary"/>
                        {document.storagePlace}
                      </Typography>
                      : unspecified()}
                </div>
                <div style={oneLineStyle}>
                  <Typography sx={typographyTypeStyle} component="span">
                    Вложения
                    {bull}
                  </Typography>
                  {document.subDocuments
                      ? <Typography sx={{fontSize: 18}} color="primary" component="span">
                        <AssignmentIcon/>{document.subDocuments}
                      </Typography>
                      : unspecified()}
                </div>
                <div style={oneLineStyle}>
                  <Typography sx={typographyTypeStyle} component="span">
                    Ссылки
                    {bull}
                  </Typography>
                  {createField(
                      "",
                      "links",
                      [],
                      CreateInput,
                      {
                        type: 'url'
                      },
                      "",
                      document.links,
                      updateFormData
                  )}
                </div>
              </div>
              <div style={oneLineStyle}>
                <Typography sx={typographyTypeStyle} component="span">
                  Зарегистрировал
                  {bull}
                </Typography>
                {createField(
                    "Иванов М.В.",
                    "registeredEmployeeFullName",
                    [maxLengthValidator(20)],
                    CreateInput,
                    {},
                    "",
                    document.registeredEmployeeFullName,
                    updateFormData
                )}
              </div>
            </CardContent>
          </Card>
        </Box>
        </form>
  );
};

let IncomingDocumentDataFormReduxForm = reduxForm({
  form: "incomingDocumentForm",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
})(IncomingDocumentDataForm);

export { IncomingDocumentDataFormReduxForm };
