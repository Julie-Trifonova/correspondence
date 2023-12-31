import React, { useState } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";

import s from "./Paginator.module.css";
import { paginatorDataType } from "../../types/types";

export const Paginator = ({
  totalDocumentsCount,
  pageSize,
  currentPage = 1,
  onPageChanged,
  portionSize,
}: paginatorDataType) => {
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
    <div className={s.paginator}>
      {portionNumber > 1 && (
        <IconButton
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
          aria-label="change portion back"
          size="medium"
          sx={{
            color: "#6292ff",
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "120ms",
            "&:hover": { color: "#830B2D" },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      )}

      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <IconButton
              className={s.page_number}
              key={p}
              onClick={() => onPageChanged(p)}
              aria-label="change page"
              size="medium"
              sx={{
                color: "#6292ff",
                transitionProperty: "all",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDuration: "120ms",
                "&:hover": { color: "#830B2D" },
              }}
            >
              {p}
            </IconButton>
          );
        })}

      {portionCount > portionNumber && (
        <IconButton
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
          sx={{
            color: "#6292ff",
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "120ms",
            "&:hover": { color: "#830B2D" },
          }}
          aria-label="change portion forward"
          size="medium"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      )}
    </div>
  );
};
