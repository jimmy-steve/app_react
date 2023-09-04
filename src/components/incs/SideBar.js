import React from "react";
import LeftBar from "./LeftBar";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <nav>
        <LeftBar />
      </nav>
    </>
  );
};

export default SideBar;
