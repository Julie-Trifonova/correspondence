export type documentType = {
  id: string;
  name: string;
  registrationNumber: number;
  registrationDate: string;
  registeredEmployeeFullName: string;
  organizationName: string;
  organizationEmail: string;
  organizationPhoneNumber: string;
  organizationAdditionalInformation: string;
  documentIsReading: null;
  status: string;
  deliveryDate: string;
  deliveryService: string;
  deadline: string;
  storagePlace: string;
  subDocuments: string;
  links: string;
};

export type fieldPropsType = {
  onChange?: () => void;
  type?: string;
  defaultChecked?: boolean;
  checked?: boolean;
};

export type paginatorDataType = {
  totalDocumentsCount: number;
  pageSize: number;
  currentPage?: number;
  onPageChanged: (page: number) => void;
  portionSize: number;
};
