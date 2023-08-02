import { AppStateType } from "./reduxStore";

export const getDocuments = (state: AppStateType) => {
  return state.incomingCorrespondencePage.documents;
};
export const getPageSize = (state: AppStateType) => {
  return state.incomingCorrespondencePage.pageSize;
};
export const getTotalDocumentsCount = (state: AppStateType) => {
  return state.incomingCorrespondencePage.totalDocumentsCount;
};
export const getCurrentPage = (state: AppStateType) => {
  return state.incomingCorrespondencePage.currentPage;
};
export const getIsFetching = (state: AppStateType) => {
  return state.incomingCorrespondencePage.isFetching;
};
export const getDocumentsFilter = (state: AppStateType) => {
  return state.incomingCorrespondencePage.filter;
};
export const getCurrentDocument = (state: AppStateType) => {
  return state.incomingCorrespondencePage.document;
};
