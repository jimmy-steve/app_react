import React from "react";
import LeftBar from "./LeftBar";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div class="sidebar pe-4 pb-3">
      <nav class="navbar navbar-dark">
        <div class="navbar-brand mx-4 mb-3">
          <Link className="" to="/">
            <h3 class="font__sickness">
              <i class="fa-solid fa-skull-crossbones fa-lg me-2"></i>De-La
            </h3>
          </Link>
        </div>
        {/* <div class="d-flex align-items-center ms-4 mb-4">
          <div class="position-relative">
            <img class="rounded-circle" src="..." alt="..." />
            <div class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div class="ms-3">
            <span>Jimmy</span>
            <h6 class="mb-0">Guest</h6>
          </div>
        </div> */}
        <LeftBar />
      </nav>
    </div>
  );
};

export default SideBar;
