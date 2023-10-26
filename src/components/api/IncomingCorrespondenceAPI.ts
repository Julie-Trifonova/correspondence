import { instance } from "@components/api/api";
import { useNavigate } from "react-router-dom";

import { documentType } from "../../types/types";

export const incomingCorrespondenceAPI = {
  getIncomingCorrespondencePage(
    currentPage: number,
    pageSize: number,
    term: string = "",
    type: string = ""
  ) {
    return instance
      .get(
        `incomingCorrespondenceDocuments?_limit=${pageSize}&_page=${currentPage}&${
          term === "undefined" || term === "" ? "" : type
        }=${
          term === "undefined" || term === "" ? "" : term
        }&_sort=${type}&_order=ASC`
      )
      .then((response) => response.data);
  },
  getIncomingCorrespondence() {
    return instance
      .get(`incomingCorrespondenceDocuments`)
      .then((response) => response.data);
  },
  getCurrentDocument(documentId: string) {
    return instance
      .get(`incomingCorrespondenceDocuments/${documentId}`)
      .then((response) => response.data);
  },
  updateIncomingDocument(documentId: string, formData: documentType) {
    return instance
      .patch(`incomingCorrespondenceDocuments/${documentId}`, formData)
      .then((response) => response.data);
  },
  addIncomingDocument(document: documentType) {
    return instance
      .post("incomingCorrespondenceDocuments/", document)
      .then((response) => response.data);
  },
  deleteIncomingDocument(documentId: string) {
    return instance
      .delete(`incomingCorrespondenceDocuments/${documentId}`)
      .then((response) => response.data);
  },
};
