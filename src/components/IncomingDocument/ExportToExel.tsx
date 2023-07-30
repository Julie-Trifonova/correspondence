import React, {ReactNode} from "react";

import Excel from "exceljs";
import { saveAs } from "file-saver";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"
import Button from '@mui/material/Button';
import {actionButtonsStyle} from "@components/IncomingDocument/IncomingDocumentData";
import {useSelector} from "react-redux";
import {getCurrentDocument} from "../../redux/documentsSelectors";

export const ExportToExel = () => {
  const currentDocument = useSelector(getCurrentDocument)
  const documentData = {
    id: currentDocument.id,
    name: currentDocument.name,
    registrationNumber: currentDocument.registrationNumber,
    registrationDate: currentDocument.registrationDate,
    registeredEmployeeFullName: currentDocument.registeredEmployeeFullName,
    organizationName: currentDocument.organizationName,
    organizationEmail: currentDocument.organizationEmail,
    organizationPhoneNumber: currentDocument.organizationPhoneNumber,
    organizationAdditionalInformation: currentDocument.organizationAdditionalInformation,
    documentIsReading: currentDocument.documentIsReading ? 'Прочитано' : 'Не прочитано',
    status: currentDocument.status === "consideration" ? "На рассмотрении" : currentDocument.status === "sent response" ? "Отправлен ответ" : "Не указано",
    deliveryDate: currentDocument.deliveryDate,
    deliveryService: currentDocument.deliveryService === "fax" ? "Факс" : currentDocument.deliveryService === "paper" ? "Бумага" : "Не указано",
    deadline: currentDocument.deadline === "month" ? "Месяц" : currentDocument.deadline === "week" ? "Неделя" : currentDocument.deadline === "day" ? "День" : currentDocument.deadline === "urgent" ? "Срочно" : currentDocument.deadline === "unspecified" ? "Не установлено" : "Не установлено",
    storagePlace: currentDocument.storagePlace,
    subDocuments: currentDocument.subDocuments,
    links: currentDocument.links,
  }
  const columns = [
    { header: "", key: "name" },
    { header: "Регистрационный номер", key: "registrationNumber" },
    { header: "Дата регистрации", key: "registrationDate" },
    { header: "Зарегистрировал", key: "registeredEmployeeFullName" },
    { header: "Контрагент", key: "organizationName" },
    { header: "E-mail", key: "organizationEmail" },
    { header: "Телефон", key: "organizationPhoneNumber" },
    {
      header: "Дополнительная информация",
      key: "organizationAdditionalInformation",
    },
    {
      header: "Прочитано/не прочитано",
      key: "documentIsReading"
    },
    { header: "Статус", key: "status" },
    { header: "Дата получения", key: "deliveryDate" },
    { header: "Способ доставки", key: "deliveryService" },
    { header: "Срочность", key: "urgency" },
    { header: "Место хранени", key: "storagePlace" },
    { header: "Вложения", key: "subDocuments" },
    { header: "Ссылки", key: "links" },
  ];

  const workSheetName = "Worksheet-1";
  const workBookName = `${documentData.name}`;

  const workbook = new Excel.Workbook();

  const saveExcel = async () => {
    try {
      const fileName = workBookName;

      const worksheet = workbook.addWorksheet(workSheetName);
      worksheet.columns = columns;

      worksheet.getRow(1).font = { bold: true };

      worksheet.columns.forEach((column: any) => {
        column.width = column.header.length + 5;
        column.alignment = { horizontal: "center" };
      });

      worksheet.addRow(documentData);

      worksheet.eachRow({ includeEmpty: false }, (row: any) => {
        const currentCell = row._cells;

        currentCell.forEach((singleCell: any) => {
          const cellAddress = singleCell._address;

          worksheet.getCell(cellAddress).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });

      const buf = await workbook.xlsx.writeBuffer();

      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } finally {
      // catch (error: any) {
      //   console.error("<<<ERROR>>>", error);
      //   console.error("Something Went Wrong", error.message);
      // }
      workbook.removeWorksheet(workSheetName);
    }
  };
  const ExportConfirmation = () => {
    confirmAlert({
      title: "Подтверждение действия",
      message: "Вы уверены, что хотите экспортировать документ?",
      buttons: [
        {
          label: "Yes",
          onClick: saveExcel,
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div>
          <Button size="medium"
                  onClick={ExportConfirmation}
                  sx={actionButtonsStyle}
                  style={{
                    marginLeft: '8px'
                  }}
          >Exel</Button>
    </div>
  );
};
