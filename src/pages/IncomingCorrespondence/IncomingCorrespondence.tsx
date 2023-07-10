import React, { useEffect } from "react";

import { IncomingDocumentCard } from "@components/IncomingDocument/IncomingDocumentCard";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import s from "./IncomingCorrespondence.module.css";
import { IncomingCorrespondenceFilterForm } from "./IncomingCorrespondenceFilterForm";
import { Paginator } from "../../common/Paginator/Paginator";
import { Preloader } from "../../common/Preloader/Preloader";
import {
  getCurrentPage,
  getDocuments,
  getDocumentsFilter,
  getIsFetching,
  getPageSize,
  getTotalDocumentsCount,
} from "../../redux/documentsSelectors";
import {
  deleteIncomingDocument,
  FilterType,
  getDocumentsIncomingCorrespondence,
  getDocumentsIncomingCorrespondencePage,
} from "../../redux/incomingCorrespondenceReducer";

import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type QueryParamsType = {
  filter: { type?: string };
  _page?: string;
  _sort?: string;
};

const IncomingCorrespondence = () => {
  const documents = useSelector(getDocuments);
  const filter = useSelector(getDocumentsFilter);
  const totalDocumentsCount = useSelector(getTotalDocumentsCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const isFetching = useSelector(getIsFetching);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const newDocument = {
    id: 0,
    name: "Новый Документ",
    registrationNumber: "",
    registrationDate: "",
    registeredEmployeeFullName: "",
    organizationName: "",
    organizationEmail: "",
    organizationPhoneNumber: "",
    organizationAdditionalInformation: "",
    documentIsReading: null,
    status: "",
    deliveryDate: "",
    deliveryService: "",
    deadline: "",
    storagePlace: "",
    subDocuments: "",
    links: "",
  };

  useEffect(() => {
    if (currentPage !== 1) {
      navigate({
        search: `_limit=${pageSize}&_page=${currentPage}&${filter.type}=${filter.term}&_sort=${filter.type}&_order=DESC`,
      });
    }
  }, [filter, currentPage]);

  useEffect(() => {
    const parsed = new URLSearchParams(location.search.substring(1) as any);
    // const parsed = new URLSearchParams(location.search.substring(1) as QueryParamsType);
    let actualPage = currentPage;
    let actualFilter = filter;

    if (!!parsed.get("_page")) actualPage = Number(parsed.get("_page"));
    if (!!parsed.get(`${filter.type}`))
      actualFilter = {
        ...actualFilter,
        term: parsed.get(`${filter.type}`) as string,
      };
    dispatch(getDocumentsIncomingCorrespondence());
    dispatch(
      getDocumentsIncomingCorrespondencePage(actualPage, pageSize, filter)
    );

    switch (parsed.get(`${filter.type}`)) {
      case "deadline":
        actualFilter = { ...actualFilter, type: "deadline" };
        break;
      case "registrationDate":
        actualFilter = { ...actualFilter, type: "registrationDate" };
        break;
      case "deliveryDate":
        actualFilter = { ...actualFilter, type: "deliveryDate" };
        break;
      case "updateTime":
        actualFilter = { ...actualFilter, type: "updateTime" };
        break;
      case "name":
        actualFilter = { ...actualFilter, type: "name" };
        break;
      case "id":
        actualFilter = { ...actualFilter, type: "id" };
        break;
      case "documentIsReading":
        actualFilter = { ...actualFilter, type: "documentIsReading" };
        break;
    }
    dispatch(
      getDocumentsIncomingCorrespondencePage(actualPage, pageSize, filter)
    );
  }, []);

  useEffect(() => {
    const query: QueryParamsType = { filter };

    if (!!filter.term) query.filter.type = filter.type;
    if (filter.type !== null || undefined) query._sort = filter.type;
    if (currentPage !== 1) query._page = String(currentPage);

    navigate({
      search: `_limit=${pageSize}&_page=${currentPage}&${filter.type}=${filter.term}&_sort=${filter.type}&_order=DESC`,
    });
  }, [filter, currentPage]);

  const onPageChanged = (pageNumber: number) => {
    dispatch(getDocumentsIncomingCorrespondence());
    dispatch(
      getDocumentsIncomingCorrespondencePage(pageNumber, pageSize, filter)
    );
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getDocumentsIncomingCorrespondencePage(1, pageSize, filter));
  };

  return (
    <div>
      {isFetching ? <Preloader /> : null}
      <IncomingCorrespondenceFilterForm onFilterChanged={onFilterChanged} />
      <Paginator
        className={s.paginator}
        totalDocumentsCount={totalDocumentsCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        portionSize={2}
      />
      <div>
        <Link
          to={`${totalDocumentsCount + 1}`}
          state={{ newDocument: newDocument }}
        >
          <Button variant="outlined" endIcon={<AddCircleOutlineIcon />}>
            Добавить
          </Button>
        </Link>
      </div>
      <div>
        {documents.map((d: any) => (
          <div>
            <IncomingDocumentCard document={d} />
          </div>
        ))}
      </div>
      <Paginator
          className={s.paginator}
          totalDocumentsCount={totalDocumentsCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
          portionSize={2}
      />
    </div>
  );
};

export { IncomingCorrespondence };
