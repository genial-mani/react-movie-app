import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const FullPageLoader = () => {
  return (
    <div className="full-page-loader">
      <Loader type="Puff" color="#00BFFF" height={100} width={100} />
    </div>
  );
};

export default FullPageLoader;
