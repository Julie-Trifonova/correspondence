import React, { useState } from "react";

import s from "./Paginator.module.css";

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
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}

      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <span
              className={s.page_number}
              key={p}
              onClick={() => onPageChanged(p)}
            >
              {p}
            </span>
          );
        })}

      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};
