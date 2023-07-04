import React, { useEffect, useState } from "react";

import { ExportToExel } from "@components/IncomingDocument/ExportToExel";
import { IncomingDocumentDataFormReduxForm } from "@components/IncomingDocument/IncomingDocumentDataForm";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { change } from "redux-form";

import { DeleteConfirmation } from "../../common/DeleteConfirmation/DeleteConfirmation";
import { getCurrentDocument } from "../../redux/documentsSelectors";
import {
  addIncomingDocument,
  deleteIncomingDocument,
  getCurrentIncomingDocument,
  updateIncomingDocument,
} from "../../redux/incomingCorrespondenceReducer";

const IncomingDocument = () => {
  const dispatch = useDispatch();
  let document = useSelector(getCurrentDocument);
  let location = useLocation();
  let navigate = useNavigate();

  if (!!location.state) {
    const { newDocument } = location.state;
    document = newDocument;
  }

  const [_root, _incomingCorrespondence, documentIdString]: Array<string> =
    location.pathname.split("/");
  const documentId = Number(documentIdString);

  const updateFormData = (field: any, value: any) => {
    dispatch(change("incomingDocumentForm", field, value));
  };

  useEffect(() => {
    if (!location.state) {
      dispatch(getCurrentIncomingDocument(documentId));
    }
  }, [documentId]);

  const getInitialState = () => {
    // return localStorage.getItem("SelectedOption") || "0";
    return "0";
  };
  let [editMode, setEditMode] = useState(getInitialState());
  const setSelectedOption = (option: string) => {
    localStorage.setItem("SelectedOption", option);
    setEditMode(option);
  };
  const handleSubmit = () => {
    if (!!location.state) {
      dispatch(addIncomingDocument(documentId, document)).then(() => {
        setSelectedOption("0");
      });
    } else {
      dispatch(updateIncomingDocument(documentId)).then(() => {
        setSelectedOption("0");
      });
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={() =>
            DeleteConfirmation(dispatch, deleteIncomingDocument(documentId))
          }
        >
          Delete
        </button>
      </div>
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      {Number(editMode) ? (
        //@ts-ignore
        <IncomingDocumentDataFormReduxForm
          initialValues={document}
          onSubmit={handleSubmit}
          //@ts-ignore
          document={document}
          updateFormData={updateFormData}
        />
      ) : (
        <IncomingDocumentData
          goToEditMode={() => setSelectedOption("1")}
          document={document}
        />
      )}
    </div>
  );
};

export const IncomingDocumentData = ({ goToEditMode, document }: any) => {
  return (
    <div>
      {<ExportToExel data={[document]} />}
      {/*<button onClick={() => ExportDataToExel([document])}>Импортировать в Exel</button>*/}
      <button onClick={goToEditMode}>edit</button>
      <div>
        <span>Входящий документ. </span>
      </div>
      <div>
        <span>Название: </span>
        <div>{document.name}</div>
      </div>
      <div>
        <span>Регистрационыый номер: </span>
        <div>{document.registrationNumber}</div>
      </div>
      <div>
        <span>Дата регистрации: </span>
        <div>{document.registrationDate}</div>
      </div>
      <div>
        <span>Зарегистрировал: </span>
        <div>{document.registeredEmployeeFullName}</div>
      </div>
      <div>
        <span>Контрагент: </span>
        <div>{document.organizationName}</div>
      </div>
      <div>
        <div>
          <span>Контакты: </span>
        </div>
        <div>
          <span>E-mail: </span>
          <div>{document.organizationEmail}</div>
        </div>
        <div>
          <span>Телефон: </span>
          <div>{document.organizationPhoneNumber}</div>
        </div>
      </div>
      <div>
        <span>Дополнительная информация:</span>
        <div>{document.organizationAdditionalInformation}</div>
      </div>
      <div>
        <span>Прочитано/не прочитано</span>
        <div>{document.documentIsReading ? "Прочитано" : "Не прочитано"}</div>
      </div>
      <div>
        <span>Статус: </span>
        <div>
          {document.status === "consideration"
            ? "На рассмотрении"
            : document.status === "sent response"
            ? "Отправлен ответ"
            : "Не указано"}
        </div>
      </div>
      <div>
        <span>Дата получения: </span>
        <div>{document.deliveryDate}</div>
      </div>
      <div>
        <span>Способ доставки: </span>
        <div>
          {document.deliveryService === "fax"
            ? "Факс"
            : document.deliveryService === "paper"
            ? "Бумага"
            : "Не указано"}
        </div>
      </div>
      <div>
        <span>Срочность: (не установлено/срочно/день/неделя/месяц) </span>
        <div>
          {document.deadline === "month"
            ? "Месяц"
            : document.deadline === "week"
            ? "Неделя"
            : document.deadline === "day"
            ? "День"
            : document.deadline === "urgent"
            ? "Срочно"
            : document.deadline === "unspecified"
            ? "Не установлено"
            : "Не установлено"}
        </div>
      </div>
      <div>
        <span>Место хранения: </span>
        <div>{document.storagePlace}</div>
      </div>
      <div>
        <span>Вложения: </span>
        <div>{document.subDocuments}</div>
      </div>
      <div>
        <span>Ссылки: </span>
        <div>{document.links}</div>
      </div>
    </div>
  );
};

export { IncomingDocument };
