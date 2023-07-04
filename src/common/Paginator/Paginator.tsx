import React, { useState } from "react";

import s from "./Paginator.module.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {IconButton} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Paginator = ({
  totalDocumentsCount,
  pageSize,
  currentPage = 1,
  onPageChanged = () => {},
  portionSize,
}: any) => {
  let [portionNumber, setPortionNumber] = useState(1);
  let pagesCount = Math.ceil(totalDocumentsCount / pageSize);
  let portionCount = Math.ceil(pagesCount / portionSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={s.left_button}>
      {portionNumber > 1 && (
        <IconButton onClick={() => {setPortionNumber(portionNumber - 1)}} color="success" aria-label="change portion back">
        <ArrowBackIosNewIcon/>
        </IconButton>
      )}

      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
              <IconButton className={s.page_number} key={p} onClick={() => onPageChanged(p)} color="success" aria-label="change page">
                {p}
              </IconButton>
          );
        })}

      {portionCount > portionNumber && (
          <IconButton onClick={() => {setPortionNumber(portionNumber + 1)}} color="success" aria-label="change portion forward">
              <ArrowForwardIosIcon/>
          </IconButton>
          )}
    </div>
  );
};
