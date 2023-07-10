import React from "react";

import {
  dateValidator,
  maxLengthValidator,
  required,
} from "@utils/validators/validators";
import { useDispatch } from "react-redux";
import { reduxForm } from "redux-form";

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
import {bull, unspecified} from "./IncomingDocumentData";
import SavingChangesSnackbar from "@components/IncomingDocument/SavingChangesSnackbar";

const IncomingDocumentDataForm = ({
  initialValues,
  onSubmit,
  document,
  updateFormData,
}: any) => {
  const [checkedDocumentIsReading, setCheckedDocumentIsReading] =
    React.useState(document.documentIsReading);
  const [checkedDeliveryService, setCheckedDeliveryService] = React.useState(
    document.deliveryService
  );
  const [checkedDeadline, setCheckedDeadline] = React.useState(
    document.deadline
  );
  const [checkedStatus, setStatus] = React.useState(document.status);

  return (
        <form onSubmit={onSubmit}>
        <Box sx={{minWidth: 275}}>
          <Card variant="outlined">
            <CardContent>
              <CardActions>
                {/*<SavingChangesSnackbar/>*/}
                <Button size="medium" type='submit'>Сохранить</Button>
              </CardActions>
              <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                Входящий документ
              </Typography>
              <div>
                <Typography variant="h5" color="text.secondary" component="span">
                  Название {bull}
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
              <div>
                {checkedDocumentIsReading
                    ? <Typography sx={{fontSize: 18}} color="primary" component="span">
                      Прочитано
                      <MarkEmailReadIcon/>
                    </Typography>
                    : <Typography sx={{fontSize: 18}} color="error" component="span">
                      Не прочитано
                      <MarkEmailUnreadIcon/>
                    </Typography>
                }
                {createField(
                    "",
                    "documentIsReading",
                    [],
                    CheckboxInput,
                    {
                      type: "checkbox",
                      defaultChecked: !!document.documentIsReading,
                      checked: checkedDocumentIsReading,
                      // onClick: () =>
                      //     setCheckedDocumentIsReading(!document.documentIsReading),
                     onChange: () =>
                          setCheckedDocumentIsReading(!document.documentIsReading),
                    },
                    "",
                    checkedDocumentIsReading,
                    updateFormData
                )}
              </div>
              <div>
                <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                  Регистрационный номер {bull}
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

              <div>
                <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                  Дата регистрации {bull}
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
              <div>
                <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                  Контрагент {bull}
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
              <div>
                <Typography sx={{fontSize: 18}} color="text.secondary" component="div">
                  Контакты
                </Typography>
              </div>
              <div>
                <div>
                  <AlternateEmailIcon color='primary'/>
                  <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                    E-mail {bull}
                  </Typography>
                </div>
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
              <div>
                <div>
                  <LocalPhoneIcon color='success'/>
                  <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                    Телефон {bull}
                  </Typography>
                </div>
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
              <div>
                <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                  Дополнительная информация {bull}
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
              <div>
                <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                  Статус {bull}
                </Typography>
              </div>
              <div>
                <Typography sx={{fontSize: 18}} color="primary" component="span">
                  На рассмотрении {bull}
                </Typography>
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
                        if (checkedDeadline === "consideration") {
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
              </div>
              <div>
                <Typography sx={{fontSize: 18}} color="primary" component="span">
                  Отправлен ответ {bull}
                </Typography>
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
              </div>
              <div>
                <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                  Дата получения {bull}
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
              <div>
              <div>
                <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                  Способ доставки {bull}
                </Typography>
              </div>
              <div>
                <Typography sx={{fontSize: 18}} color="primary" component="span">
                  Факс
                </Typography>
                {createField(
                    "",
                    "deliveryService",
                    [maxLengthValidator(20)],
                    CheckboxInput,
                    {
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
              </div>
              <div>
                <Typography sx={{fontSize: 18}} color="primary" component="span">
                  Бумага
                </Typography>
                {createField(
                    "",
                    "deliveryService",
                    [maxLengthValidator(20)],
                    CheckboxInput,
                    {
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
              </div>
              </div>

              <div>
                <Typography sx={{fontSize: 18}} color="text.secondary" component="span">
                  Срочность {bull}
                </Typography>
                <div>
                  <Typography sx={{fontSize: 18}} color="primary" component="span">
                    Не установлено
                  </Typography>
                  {createField(
                      "",
                      "deadline",
                      [],
                      CheckboxInput,
                      {
                        defaultChecked: !checkedDeadline || "unspecified",
                        checked: checkedDeadline === "unspecified",
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
                </div>
                <div>
                  <Typography sx={{fontSize: 18}} color="primary" component="span">
                    Срочно
                  </Typography>
                  {createField(
                      "",
                      "deadline",
                      [],
                      CheckboxInput,
                      {
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
                </div>
                <div>
                  <Typography sx={{fontSize: 18}} color="primary" component="span">
                    День
                  </Typography>
                  {createField(
                      "",
                      "deadline",
                      [],
                      CheckboxInput,
                      {
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
                </div>
                <div>
                  <Typography sx={{fontSize: 18}} color="primary" component="span">
                    Неделя
                  </Typography>
                  {createField(
                      "",
                      "deadline",
                      [],
                      CheckboxInput,
                      {
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
                </div>
                <div>
                  <Typography sx={{fontSize: 18}} color="primary" component="span">
                    Месяц
                  </Typography>
                  {createField(
                      "",
                      "deadline",
                      [],
                      CheckboxInput,
                      {
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
                </div>
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
              <div>
                <Typography sx={{fontSize: 16}} color="text.secondary" component="span">
                  Зарегистрировал {bull}
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
