import React from "react";

import { NavLink } from "react-router-dom";

export const IncomingDocumentCard = ({ document }: any) => {
  return (
    <div>
      <NavLink to={`${document.id}`}>{document.name}</NavLink>
    </div>
  );
};
