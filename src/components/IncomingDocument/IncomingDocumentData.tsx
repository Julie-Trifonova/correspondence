import React from "react";

import { ExportToExel } from "@components/IncomingDocument/ExportToExel";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LinkIcon from "@mui/icons-material/Link";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import StorageIcon from "@mui/icons-material/Storage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import s from "./IncomingDocumentCard.module.css";
import { DeleteConfirmation } from "../../common/DeleteConfirmation/DeleteConfirmation";
import {
  getCurrentPage,
  getDocumentsFilter,
  getPageSize,
} from "../../redux/documentsSelectors";
import { deleteIncomingDocument } from "../../redux/incomingCorrespondenceReducer";

export const bull = (
  <Box
    component="span"
    sx={{
      display: "inline-block",
      mx: "2px",
      transform: "scale(0.8)",
      margin: `${0}px ${5}px`,
    }}
  >
    •
  </Box>
);
export const unspecified = () => {
  return (
    <Typography component="span" sx={typographyDataStyle}>
      Не указано
    </Typography>
  );
};
export const actionButtonsStyle = {
  fontFamily: "IBM Plex Sans, sans-serif",
  fontSize: "12px",
  fontWeight: "bold",
  borderRadius: "2px",
  color: "#645A38",
  letterSpacing: "1px",
  border: `${4}px solid ${"#ece3be"}`,
  boxShadow: `inset ${2}px ${2}px ${2}px ${"#b9b782"}`,
  transitionProperty: "all",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "200ms",
  "&:hover": {
    cursor: "pointer",
    boxShadow: `inset ${4}px ${4}px ${4}px ${"#b9b782"}`,
    background: "transparent",
  },
};
export const typographyTypeStyle = {
  // margin: `20px 0px`,
  fontFamily: "IBM Plex Sans, sans-serif",
  fontSize: "16px",
  fontWeight: 400,
  color: "#4F1DC7",
  letterSpacing: "3px",
  justifySelf: "end",
  lineHeight: "16px",
};
export const typographyDataStyle = {
  fontFamily: "IBM Plex Sans, sans-serif",
  fontSize: "18px",
  fontWeight: 400,
  color: "#099f72",
  letterSpacing: "1px",
  lineHeight: "16px",
};
export const iconsStyle = {
  color: "#4F1DC7",
  marginBottom: "-5px",
};
const typographyMarginStyle = {
  display: "inline-block",
  margin: `${6}px ${0}px`,
};

export const IncomingDocumentData = ({ goToEditMode, document }: any) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const filter = useSelector(getDocumentsFilter);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);

  const navigateToListIncomingCorrespondence = () => {
    navigate(
      `/incomingCorrespondence?_limit=${pageSize}&_page=${currentPage}&${filter.type}=${filter.term}&_sort=${filter.type}&_order=DESC`,
      { replace: true }
    );
  };

  return (
    <div>
      <Box
        className={s.card_box}
        sx={{
          display: "block",
          boxSizing: "border-box",
          margin: `${0}px auto`,
          "@media (min-width: 1201px)": {
            width: "1000px",
          },
          "@media (min-width: 641px) and (max-width: 1200px)": {
            width: "70%",
          },
          "@media (max-width: 640px)": {
            width: "90%",
          },
        }}
      >
        <Card
          variant="outlined"
          sx={{
            padding: `${0}px ${15}px`,
            borderRadius: "2px",
            border: `${4}px solid ${"#ece3be"}`,
          }}
        >
          <CardContent>
            <CardActions
              sx={{
                display: "grid",
                boxSizing: "border-box",
                margin: `${0}px auto`,
                height: "70px",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "minmax(100px, auto)",
                alignItems: "start",
                "@media (min-width: 1201px)": {
                  width: "700px",
                  justifyItems: "center",
                },
                "@media (min-width: 641px) and (max-width: 1200px)": {
                  width: "420px",
                },
                "@media (max-width: 640px)": {
                  width: "200px",
                  height: "117px",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gridTemplateRows: "repeat(2, 1fr)",
                  justifyItems: "center",
                },
              }}
            >
              <Button
                size="medium"
                onClick={() => navigateToListIncomingCorrespondence()}
                sx={actionButtonsStyle}
              >
                Назад
              </Button>
              <Button
                size="medium"
                onClick={goToEditMode}
                sx={actionButtonsStyle}
              >
                Изменить
              </Button>
              <Button
                size="medium"
                onClick={() =>
                  DeleteConfirmation(
                    dispatch,
                    deleteIncomingDocument(document.id)
                  )
                }
                sx={actionButtonsStyle}
              >
                Удалить
              </Button>
              <ExportToExel />
            </CardActions>
            <Typography
              sx={{
                display: "block",
                textAlign: "center",
                fontFamily: "IBM Plex Sans, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: "#4F1DC7",
                letterSpacing: "6px",
              }}
              gutterBottom
            >
              Входящий документ
            </Typography>
            <div className={s.oneLine}>
              <Typography
                component="span"
                sx={typographyTypeStyle}
                style={{
                  display: "inline-block",
                  margin: `${18}px ${0}px`,
                }}
              >
                Название
                {bull}
              </Typography>
              {document.name ? (
                <Typography
                  variant="h5"
                  component="span"
                  sx={typographyDataStyle}
                >
                  {document.name}
                </Typography>
              ) : (
                unspecified()
              )}
            </div>
            <div className={s.oneLine}>
              {document.documentIsReading ? (
                <Typography component="span" sx={typographyDataStyle}>
                  Прочитано{" "}
                  <MarkEmailReadIcon
                    fontSize="small"
                    sx={{
                      marginBottom: "-4px",
                    }}
                  />
                </Typography>
              ) : (
                <Typography
                  component="span"
                  sx={typographyDataStyle}
                  style={{ color: "#bd3131" }}
                >
                  Не прочитано{" "}
                  <MarkEmailUnreadIcon
                    fontSize="small"
                    sx={{
                      marginBottom: "-4px",
                    }}
                  />
                </Typography>
              )}
            </div>
            <div className={s.oneLine}>
              <Typography
                sx={typographyTypeStyle}
                component="span"
                style={typographyMarginStyle}
              >
                Регистрационный номер
                {bull}
              </Typography>
              {document.registrationNumber ? (
                <Typography component="span" sx={typographyDataStyle}>
                  {document.registrationNumber}
                </Typography>
              ) : (
                unspecified()
              )}
            </div>
            <div className={s.oneLine}>
              <Typography
                sx={typographyTypeStyle}
                component="span"
                style={typographyMarginStyle}
              >
                Дата регистрации
                {bull}
              </Typography>
              {document.registrationDate ? (
                <Typography component="span" sx={typographyDataStyle}>
                  {document.registrationDate}
                </Typography>
              ) : (
                unspecified()
              )}
            </div>
            <div className={s.oneLine}>
              <Typography
                sx={typographyTypeStyle}
                component="span"
                style={typographyMarginStyle}
              >
                Контрагент
                {bull}
              </Typography>
              {document.organizationName ? (
                <Typography component="span" sx={typographyDataStyle}>
                  {document.organizationName}
                </Typography>
              ) : (
                unspecified()
              )}
            </div>
            <div className={s.oneLine}>
              <Typography
                sx={typographyTypeStyle}
                component="span"
                style={typographyMarginStyle}
              >
                E-mail
                <AlternateEmailIcon fontSize="small" sx={iconsStyle} />
                {bull}
              </Typography>
              {document.organizationEmail ? (
                <Typography component="span" sx={typographyDataStyle}>
                  {document.organizationEmail}
                </Typography>
              ) : (
                unspecified()
              )}
            </div>
            <div className={s.oneLine}>
              <Typography
                sx={typographyTypeStyle}
                component="span"
                style={typographyMarginStyle}
              >
                Телефон
                <LocalPhoneIcon fontSize="small" sx={iconsStyle} />
                {bull}
              </Typography>
              {document.organizationPhoneNumber ? (
                <Typography component="span" sx={typographyDataStyle}>
                  {document.organizationPhoneNumber}
                </Typography>
              ) : (
                unspecified()
              )}
            </div>
            <div className={s.oneLine}>
              <Typography
                sx={typographyTypeStyle}
                component="span"
                style={typographyMarginStyle}
              >
                Дополнительная информация
                <DriveFileRenameOutlineIcon fontSize="small" sx={iconsStyle} />
                {bull}
              </Typography>
              {document.organizationAdditionalInformation ? (
                <Typography component="span" sx={typographyDataStyle}>
                  {document.organizationAdditionalInformation}
                </Typography>
              ) : (
                unspecified()
              )}
            </div>
            <div className={s.oneLine}>
              <Typography
                sx={typographyTypeStyle}
                component="span"
                style={typographyMarginStyle}
              >
                Статус
                {bull}
              </Typography>
              <Typography component="span" sx={typographyDataStyle}>
                {document.status === "consideration"
                  ? "На рассмотрении"
                  : document.status === "sent response"
                  ? "Отправлен ответ"
                  : "Не указано"}
              </Typography>
            </div>
            <div className={s.oneLine}>
              <Typography
                sx={typographyTypeStyle}
                component="span"
                style={typographyMarginStyle}
              >
                Дата получения
                {bull}
              </Typography>
              {document.deliveryDate ? (
                <Typography component="span" sx={typographyDataStyle}>
                  {document.deliveryDate}
                </Typography>
              ) : (
                unspecified()
              )}
            </div>
            <div className={s.oneLine}>
              <Typography
                sx={typographyTypeStyle}
                component="span"
                style={typographyMarginStyle}
              >
                Способ доставки
                {bull}
              </Typography>
              <Typography component="span" sx={typographyDataStyle}>
                {document.deliveryService === "fax"
                  ? "Факс"
                  : document.deliveryService === "paper"
                  ? "Бумага"
                  : "Не указано"}
              </Typography>
            </div>
            <div className={s.oneLine}>
              <Typography
                sx={typographyTypeStyle}
                component="span"
                style={typographyMarginStyle}
              >
                Срочность
                {bull}
              </Typography>
              <Typography component="span" sx={typographyDataStyle}>
                {document.deadline === "month"
                  ? "Месяц"
                  : document.deadline === "week"
                  ? "Неделя"
                  : document.deadline === "day"
                  ? "День"
                  : document.deadline === "urgent"
                  ? "Срочно"
                  : document.deadline === "unspecified"
                  ? "Не установлено"
                  : "Не установлено"}
              </Typography>
            </div>
            <div className={s.oneLine}>
              <div>
                <Typography
                  sx={typographyTypeStyle}
                  component="span"
                  style={typographyMarginStyle}
                >
                  Место хранения
                  {bull}
                </Typography>
                {document.storagePlace ? (
                  <Typography component="span" sx={typographyDataStyle}>
                    <StorageIcon color="primary" />
                    {document.storagePlace}
                  </Typography>
                ) : (
                  unspecified()
                )}
              </div>
              <div className={s.oneLine}>
                <Typography
                  sx={typographyTypeStyle}
                  component="span"
                  style={typographyMarginStyle}
                >
                  Вложения
                  {bull}
                </Typography>
                {document.subDocuments ? (
                  <Typography component="span" sx={typographyDataStyle}>
                    <AssignmentIcon />
                    {document.subDocuments}
                  </Typography>
                ) : (
                  unspecified()
                )}
              </div>
              <div className={s.oneLine}>
                <Typography
                  sx={typographyTypeStyle}
                  component="span"
                  style={typographyMarginStyle}
                >
                  Ссылки
                  {bull}
                </Typography>
                {document.links ? (
                  <Typography component="span" sx={typographyDataStyle}>
                    <LinkIcon color="primary" />
                    {document.links}
                  </Typography>
                ) : (
                  unspecified()
                )}
              </div>
            </div>
            <div className={s.oneLine}>
              <Typography
                sx={typographyTypeStyle}
                component="span"
                style={typographyMarginStyle}
              >
                Зарегистрировал
                {bull}
              </Typography>
              {document.registeredEmployeeFullName ? (
                <Typography component="span" sx={typographyDataStyle}>
                  {document.registeredEmployeeFullName}
                </Typography>
              ) : (
                unspecified()
              )}
            </div>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};
