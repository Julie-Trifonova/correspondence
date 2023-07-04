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
      <div>
        <button type="submit">save</button>
      </div>
      <div>
        <div>
          <span>Входящий документ. </span>
        </div>
        <div>
          <span>Название</span>
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
        </div>
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
    </form>
  );
};

let IncomingDocumentDataFormReduxForm = reduxForm({
  form: "incomingDocumentForm",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
})(IncomingDocumentDataForm);

export { IncomingDocumentDataFormReduxForm };
