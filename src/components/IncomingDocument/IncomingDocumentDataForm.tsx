import React from "react";

import {
  dateValidator,
  maxLengthValidator,
  required,
} from "@utils/validators/validators";
import { useDispatch } from "react-redux";
import { reduxForm } from "redux-form";

import {
  createField,
  Input,
  Textarea,
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

      <>
        <form onSubmit={onSubmit}>
        <Box sx={{minWidth: 275}}>
          <Card variant="outlined">
            <CardContent>
              <CardActions>
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
                    Input,
                    {},
                    "",
                    document.name,
                    updateFormData
                )}
                {/*{document.name*/}
                {/*    ? <Typography variant="h5" color="primary" component="span">*/}
                {/*      <DriveFileRenameOutlineIcon color='primary'/>*/}
                {/*      {document.name}*/}
                {/*    </Typography>*/}
                {/*    : unspecified()}*/}
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
        </form>



    {/*<form onSubmit={onSubmit}>*/}
      {/*<div>*/}
      {/*  <button type="submit">save</button>*/}
      {/*</div>*/}
      <div>
        {/*<div>*/}
        {/*  <span>Входящий документ. </span>*/}
        {/*</div>*/}
        {/*<div>*/}
          {/*<span>Название</span>*/}
          {/*{createField(*/}
          {/*  "Название",*/}
          {/*  "name",*/}
          {/*  [required, maxLengthValidator(40)],*/}
          {/*  Input,*/}
          {/*  {},*/}
          {/*  "",*/}
          {/*  document.name,*/}
          {/*  updateFormData*/}
          {/*)}*/}
        {/*</div>*/}
        <div>
          <span>Регистрационный номер: </span>
          {createField(
            "",
            "registrationNumber",
            [maxLengthValidator(20)],
            Input,
            {},
            "",
            document.registrationNumber,
            updateFormData
          )}
        </div>
        <div>
          <span>Дата регистрации: </span>
          {createField(
            "дд.мм.гггг",
            "registrationDate",
            [dateValidator("dd.mm.yyyy")],
            Input,
            {},
            "",
            document.registrationDate,
            updateFormData
          )}
        </div>
        <div>
          <span>Зарегистрировал: </span>
          {createField(
            "Иванов М.В.",
            "registeredEmployeeFullName",
            [maxLengthValidator(20)],
            Input,
            {},
            "",
            document.registeredEmployeeFullName,
            updateFormData
          )}
        </div>
        <div>
          <span>Контрагент: </span>
          {createField(
            "ООО Ромашка",
            "organizationName",
            [maxLengthValidator(40)],
            Input,
            {},
            "",
            document.organizationName,
            updateFormData
          )}
        </div>
        <div>
          <span>Контакты: </span>
        </div>
        <div>
          <span>E-mail: </span>
          {createField(
            "e-mail",
            "organizationEmail",
            [],
            Input,
            {},
            "",
            document.organizationEmail,
            updateFormData
          )}
        </div>
        <div>
          <span>Телефон: </span>
          {createField(
            "",
            "organizationPhoneNumber",
            [],
            Input,
            {},
            "",
            document.organizationPhoneNumber,
            updateFormData
          )}
        </div>
        <div>
          <span>Дополнительная информация: </span>
          {createField(
            "",
            "organizationAdditionalInformation",
            [maxLengthValidator(150)],
            Textarea,
            {},
            "",
            document.organizationAdditionalInformation,
            updateFormData
          )}
        </div>
        <div>
          <span>Прочитано</span>
          {createField(
            "",
            "documentIsReading",
            [],
            Input,
            {
              type: "checkbox",
              defaultChecked: !!document.documentIsReading,
              checked: !!checkedDocumentIsReading,
              onChange: () =>
                setCheckedDocumentIsReading(!document.documentIsReading),
            },
            "",
            checkedDocumentIsReading,
            updateFormData
          )}
        </div>
        <div>
          <span>Не прочитано</span>
          {createField(
            "",
            "documentIsReading",
            [],
            Input,
            {
              type: "checkbox",
              defaultChecked: !document.documentIsReading,
              checked: !checkedDocumentIsReading,
              onChange: () =>
                setCheckedDocumentIsReading(!document.documentIsReading),
            },
            "",
            checkedDocumentIsReading,
            updateFormData
          )}
        </div>
        <div>
          <span>Статус:</span>
        </div>
        <div>
          <span>на рассмотрении</span>
          {createField(
            "",
            "status",
            [],
            Input,
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
          <span>отправлен ответ</span>
          {createField(
            "",
            "status",
            [],
            Input,
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
          <span>Дата получения: </span>
          {createField(
            "дд.мм.гггг",
            "deliveryDate",
            [dateValidator("dd.mm.yyyy")],
            Input,
            {},
            "",
            document.deliveryDate,
            updateFormData
          )}
        </div>
        <div>
          <span>Способ доставки</span>
        </div>
        <div>
          <span>Факс</span>
          {createField(
            "",
            "deliveryService",
            [maxLengthValidator(20)],
            Input,
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
        </div>
        <div>
          <span>Бумага</span>
          {createField(
            "",
            "deliveryService",
            [maxLengthValidator(20)],
            Input,
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
        </div>
        <div>Срочность:</div>
        <div>
          <span>не установлено</span>
          {createField(
            "",
            "deadline",
            [],
            Input,
            {
              type: "checkbox",
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
          <span>срочно</span>
          {createField(
            "",
            "deadline",
            [],
            Input,
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
        </div>
        <div>
          <span>день</span>
          {createField(
            "",
            "deadline",
            [],
            Input,
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
        </div>
        <div>
          <span>неделя</span>
          {createField(
            "",
            "deadline",
            [],
            Input,
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
        </div>
        <div>
          <span>месяц</span>
          {createField(
            "",
            "deadline",
            [],
            Input,
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
        </div>
        <div>
          <span>Место хранения: </span>
          {document.storagePlace}
        </div>
        <div>
          <span>Вложения: </span>
          {document.subDocuments}
        </div>
        <div>
          <span>Ссылки: </span>
          {document.links}
        </div>
      </div>
    {/*</form>*/}
        </>
  );
};

let IncomingDocumentDataFormReduxForm = reduxForm({
  form: "incomingDocumentForm",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
})(IncomingDocumentDataForm);

export { IncomingDocumentDataFormReduxForm };
