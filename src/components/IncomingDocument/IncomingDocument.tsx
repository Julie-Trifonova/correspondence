import React, { useEffect, useState } from "react";

import { IncomingDocumentDataFormReduxForm } from "@components/IncomingDocument/IncomingDocumentDataForm";
import { useDispatch, useSelector } from "react-redux";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import { change } from "redux-form";

import { DeleteConfirmation } from "../../common/DeleteConfirmation/DeleteConfirmation";
import {
  getCurrentDocument, getCurrentPage,
  getDocumentsFilter,
  getPageSize,
  getTotalDocumentsCount
} from "../../redux/documentsSelectors";
import {
  addIncomingDocument,
  deleteIncomingDocument,
  getCurrentIncomingDocument,
  updateIncomingDocument,
} from "../../redux/incomingCorrespondenceReducer";
import {IncomingDocumentData} from "@components/IncomingDocument/IncomingDocumentData";
import {documentType} from "../../types/types";

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

  const updateFormData = (field: string, value: documentType) => {
    dispatch(change("incomingDocumentForm", field, value));
  };

  useEffect(() => {
    if (!location.state) {
      dispatch(getCurrentIncomingDocument(documentId));
    }
    navigate(`/incomingCorrespondence/${documentId}`)
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
  const handleSubmit = (e: any) => {
    // e.preventDefault();
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

export { IncomingDocument };
