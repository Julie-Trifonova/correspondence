import React from "react";

import Excel from "exceljs";
import { saveAs } from "file-saver";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const ExportToExel = ({ data }: any) => {
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
      key: `${(col: any) =>
        col.documentIsReading ? "Прочитано" : "Не прочитано"}`,
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
  const workBookName = `${data[0].name}`;
  const myInputId = "myInput";

  const workbook = new Excel.Workbook();

  const saveExcel = async () => {
    try {
      const myInput: any = document.getElementById(myInputId);
      const fileName = workBookName || myInput.value;

      const worksheet = workbook.addWorksheet(workSheetName);
      worksheet.columns = columns;

      worksheet.getRow(1).font = { bold: true };

      worksheet.columns.forEach((column: any) => {
        column.width = column.header.length + 5;
        column.alignment = { horizontal: "center" };
      });

      data.forEach((singleData: any) => {
        worksheet.addRow(singleData);
      });

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
    <>
      <style>
        {`
            table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            textAlign: center;
          }
           th, td { 
             padding: 4px;
           }
        `}
      </style>
      <div
      // style={{ textAlign: "center" }}
      >
        {/*<div>*/}
        {/*  /!*Export to excel from table*!/*/}
        {/*  <br />*/}
        {/*  <br />*/}
        {/*  Export to : <input id={myInputId} defaultValue={workBookName} /> .xlsx*/}
        {/*</div>*/}
        {/*<br />*/}
        <div>
          <button onClick={ExportConfirmation}>Export</button>
        </div>
        {/*<br />*/}
        {/*<div>*/}
        {/*  <table style={{ margin: "0 auto" }}>*/}
        {/*    <tr>*/}
        {/*      {columns.map(({ header }) => {*/}
        {/*        return <th>{header}</th>;*/}
        {/*      })}*/}
        {/*    </tr>*/}
        {/*    {data.map((uniqueData: any) => {*/}
        {/*      return (*/}
        {/*        <tr>*/}
        {/*          {Object.entries(uniqueData).map((eachData) => {*/}
        {/*            const value: any = eachData[1];*/}
        {/*            return <td>{value}</td>;*/}
        {/*          })}*/}
        {/*        </tr>*/}
        {/*      );*/}
        {/*    })}*/}
        {/*  </table>*/}
        {/*</div>*/}
      </div>
    </>
  );
};
