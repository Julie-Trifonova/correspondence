import React, { useEffect, useState } from "react";

import { IncomingDocumentData } from "@components/IncomingDocument/IncomingDocumentData";
import { IncomingDocumentDataFormReduxForm } from "@components/IncomingDocument/IncomingDocumentDataForm";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { getCurrentDocument } from "../../redux/documentsSelectors";
import {
  addIncomingDocument,
  getCurrentIncomingDocument,
  updateIncomingDocument,
} from "../../redux/incomingCorrespondenceReducer";

const IncomingDocument = () => {
  const dispatch = useDispatch();
  let document = useSelector(getCurrentDocument);
  let location = useLocation();
  let navigate = useNavigate();

  // if (!!location.state) {
  //   const { newDocument } = location.state;
  //   document = newDocument;
  // }

  const [
    _root,
    _correspondence_system,
    _incomingCorrespondence,
    documentIdString,
  ]: Array<string> = location.pathname.split("/");
  let documentId = Number(documentIdString);

  useEffect(() => {
    dispatch(getCurrentIncomingDocument(documentId));
    if (!!location.state && !!document.id) {
      documentId = document.id;
      navigate(0);
      navigate(`/correspondence_system/incomingCorrespondence/${documentId}`, {
        replace: true,
      });
    }
  }, [dispatch, location.state, navigate, documentId]);

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
