import React from "react";

import preloaderImg from "../../assets/images/gif-loading.gif";

export const Preloader: React.FC = () => {
  return (
    <div>
      <img src={preloaderImg} alt="" />
    </div>
  );
};
