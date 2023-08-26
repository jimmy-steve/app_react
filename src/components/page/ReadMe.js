import React from "react";
import SideBar from "../incs/SideBar";
import NavBarBootstrap from "../incs/NavBarBootstrap";

const Readme = () => {
  return (
    <>
      <div className="container-fluid position-relative p-0">
        <SideBar />
        <div class="content">
          <NavBarBootstrap />
          <div class="container-fluid px-4">
            <div class="row g-4">
              <div className="col-md-12 mt-5">Read Me</div>
            </div>
          </div>
        </div>
        <button class="btn btn-lg btn-lg-square back-to-top">
          <i class="bi bi-arrow-up"></i>
        </button>
      </div>
    </>
  );
};

export default Readme;
