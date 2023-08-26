import React from "react";
import SideBar from "../incs/SideBar";
import Footer from "../incs/Footer";
import NavBarBootstrap from "../incs/NavBarBootstrap";
import Hero from "../incs/Hero";
import Featured from "../incs/Featured";

const BlockChain = () => {
  return (
    <>
      <div className="container-fluid position-relative p-0">
        <SideBar />
        <div class="content">
          <NavBarBootstrap pageTitle="BlockChain" />
          <div class="container-fluid px-4 bg-light">
            <div class="row g-4">
              <Hero />
              <Featured />
              {/* <div className="col-md-12 mt-5">

                </div> */}
            </div>
          </div>
        </div>
        <button class="btn btn-lg btn-lg-square back-to-top">
          <i class="bi bi-arrow-up"></i>
        </button>
      </div>
      <Footer />
    </>
  );
};

export default BlockChain;
