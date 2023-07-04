import { incomingCorrespondenceAPI } from "@components/api/IncomingCorrespondenceAPI";

let initialState = {
  // incomingDocument: null as any | null,
  // incomingDocumentId: '' as string,
  documents: [] as any | null,
  isFetching: true,
  currentPage: 1,
  filter: {
    term: "",
    type: "",
  },
  totalDocumentsCount: "",
  pageSize: 5,
  document: {} as object | any,
};

const incomingCorrespondenceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "CS/INCOMING_CORRESPONDENCE/SET_DOCUMENT": {
      return {
        ...state,
        document: action.document,
      };
    }
    case "CS/INCOMING_CORRESPONDENCE/DELETE_DOCUMENT": {
      return {
        ...state,
        documents: action.documents.filter(
          (d: any) => d.id !== action.documentId
        ),
      };
    }
    case "CS/INCOMING_CORRESPONDENCE/TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case "CS/INCOMING_CORRESPONDENCE/SET_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case "CS/INCOMING_CORRESPONDENCE/SET_FILTER": {
      return {
        ...state,
        filter: action.payload,
      };
    }
    case "CS/INCOMING_CORRESPONDENCE/SET_DOCUMENTS": {
      return {
        ...state,
        documents: action.documents,
      };
    }
    case "CS/INCOMING_CORRESPONDENCE/SET_TOTAL_DOCUMENTS_COUNT": {
      return {
        ...state,
        totalDocumentsCount: action.totalDocumentsCount,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  setCurrentDocumentActionCreator: (document: any) => ({
    type: "CS/INCOMING_CORRESPONDENCE/SET_DOCUMENT",
    document,
  }),
  deleteIncomingDocumentActionCreator: (documentId: any) => ({
    type: "CS/INCOMING_CORRESPONDENCE/DELETE_DOCUMENT",
    documentId,
    documents: [],
  }),

  toggleIsFetchingIncomingCorrespondenceActionCreator: (
    isFetching: boolean
  ) => ({ type: "CS/INCOMING_CORRESPONDENCE/TOGGLE_IS_FETCHING", isFetching }),
  setCurrentPageIncomingCorrespondenceActionCreator: (currentPage: number) => ({
    type: "CS/INCOMING_CORRESPONDENCE/SET_CURRENT_PAGE",
    currentPage,
  }),
  setFilterIncomingCorrespondenceActionCreator: (filter: FilterType) => ({
    type: "CS/INCOMING_CORRESPONDENCE/SET_FILTER",
    payload: filter,
  }),
  setDocumentsIncomingCorrespondenceActionCreator: (documents: Array<any>) => ({
    type: "CS/INCOMING_CORRESPONDENCE/SET_DOCUMENTS",
    documents,
  }),
  setTotalDocumentsCountIncomingCorrespondenceActionCreator: (
    totalDocumentsCount: number
  ) => ({
    type: "CS/INCOMING_CORRESPONDENCE/SET_TOTAL_DOCUMENTS_COUNT",
    totalDocumentsCount,
  }),
};

export const getDocumentsIncomingCorrespondence =
  (): any => async (dispatch: any) => {
    dispatch(actions.toggleIsFetchingIncomingCorrespondenceActionCreator(true));
    const data = await incomingCorrespondenceAPI.getIncomingCorrespondence();
    dispatch(
      actions.toggleIsFetchingIncomingCorrespondenceActionCreator(false)
    );
    dispatch(
      actions.setTotalDocumentsCountIncomingCorrespondenceActionCreator(
        data.length
      )
    );
  };

export const getDocumentsIncomingCorrespondencePage =
  (currentPage: number, pageSize: number, filter: FilterType): any =>
  async (dispatch: any) => {
    dispatch(actions.toggleIsFetchingIncomingCorrespondenceActionCreator(true));
    dispatch(
      actions.setCurrentPageIncomingCorrespondenceActionCreator(currentPage)
    );
    dispatch(actions.setFilterIncomingCorrespondenceActionCreator(filter));

    const data = await incomingCorrespondenceAPI.getIncomingCorrespondencePage(
      currentPage,
      pageSize,
      filter.term,
      filter.type
    );
    dispatch(
      actions.toggleIsFetchingIncomingCorrespondenceActionCreator(false)
    );
    dispatch(actions.setDocumentsIncomingCorrespondenceActionCreator(data));
  };

export const getCurrentIncomingDocument =
  (documentId: any): any =>
  async (dispatch: any) => {
    const data = await incomingCorrespondenceAPI.getCurrentDocument(documentId);
    dispatch(actions.setCurrentDocumentActionCreator(data));
  };

export const updateIncomingDocument =
  (documentId: any): any =>
  async (dispatch: any, getState: any) => {
    const formData = getState().form.incomingDocumentForm.values;
    await incomingCorrespondenceAPI.updateIncomingDocument(
      documentId,
      formData
    );
    getCurrentIncomingDocument(documentId);
  };

export const addIncomingDocument =
  (documentId: number, document: any): any =>
  async (dispatch: any) => {
    await incomingCorrespondenceAPI.addIncomingDocument(document);
    const data = await incomingCorrespondenceAPI.getCurrentDocument(documentId);
    dispatch(actions.setCurrentDocumentActionCreator(data));
  };

export const deleteIncomingDocument =
  (documentId: number): any =>
  async (dispatch: any, getState: any) => {
    const data = await incomingCorrespondenceAPI.deleteIncomingDocument(
      documentId
    );
    dispatch(actions.deleteIncomingDocumentActionCreator(documentId));
  };

export { incomingCorrespondenceReducer };

export type FilterType = typeof initialState.filter;
