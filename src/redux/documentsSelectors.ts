export const getDocuments = (state: any) => {
  return state.incomingCorrespondencePage.documents;
};
export const getPageSize = (state: any) => {
  return state.incomingCorrespondencePage.pageSize;
};
export const getTotalDocumentsCount = (state: any) => {
  return state.incomingCorrespondencePage.totalDocumentsCount;
};
export const getCurrentPage = (state: any) => {
  return state.incomingCorrespondencePage.currentPage;
};
export const getIsFetching = (state: any) => {
  return state.incomingCorrespondencePage.isFetching;
};
export const getDocumentsFilter = (state: any) => {
  return state.incomingCorrespondencePage.filter;
};
export const getCurrentDocument = (state: any) => {
  return state.incomingCorrespondencePage.document;
};
