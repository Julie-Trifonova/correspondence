import { instance } from "@components/api/api";
import { Simulate } from "react-dom/test-utils";

export const incomingCorrespondenceAPI = {
  getIncomingCorrespondencePage(
    currentPage: any,
    pageSize: any,
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
        // `incomingCorrespondenceDocuments?_limit=${pageSize}&_page=${currentPage}` + ((term === '' || 'undefined' ? '' : type = term) + (_sort=type) + (_order=DESC)
      )
      .then((response) => response.data);
  },
  getIncomingCorrespondence() {
    return instance
      .get(`incomingCorrespondenceDocuments`)
      .then((response) => response.data);
  },
  getCurrentDocument(documentId: any) {
    return instance
      .get(`incomingCorrespondenceDocuments/` + documentId)
      .then((response) => response.data);
  },
  updateIncomingDocument(documentId: any, formData: any) {
    return instance
      .patch(`incomingCorrespondenceDocuments/${documentId}`, formData)
      .then((response) => response.data);
  },
  addIncomingDocument(document: any) {
    return instance
      .post("incomingCorrespondenceDocuments", document)
      .then((response) => response.data);
  },
  deleteIncomingDocument(documentId: any) {
    return instance
      .delete("incomingCorrespondenceDocuments/" + documentId)
      .then((response) => response.data);
  },
};
