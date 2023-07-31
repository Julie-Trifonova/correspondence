import React, { useEffect, useState } from "react";

import { IncomingDocumentData } from "@components/IncomingDocument/IncomingDocumentData";
import { IncomingDocumentDataFormReduxForm } from "@components/IncomingDocument/IncomingDocumentDataForm";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { change, FormSubmitHandler, SubmitHandler } from "redux-form";

import { getCurrentDocument } from "../../redux/documentsSelectors";
import {
  addIncomingDocument,
  getCurrentIncomingDocument,
  updateIncomingDocument,
} from "../../redux/incomingCorrespondenceReducer";
import { documentType } from "../../types/types";

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

  useEffect(() => {
    if (!location.state) {
      dispatch(getCurrentIncomingDocument(documentId));
    }
    navigate(`/incomingCorrespondence/${documentId}`);
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
      {Number(editMode) ? (
        <IncomingDocumentDataFormReduxForm
          initialValues={document}
          onSubmit={handleSubmit}
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
