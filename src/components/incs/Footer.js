import React from "react";
import Term from "../page/Term";

const Footer = () => {
  const containerStyle = {
    backgroundColor: "#191c24",
    minHeight: "20vh",
  };

  return (
    <>
      <div class="container-fluid" style={containerStyle}>
        <div class="rounded-top">
          <div class="row">
            <div class="col-md-9 mx-auto">
              <Term />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
