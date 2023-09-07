import SideBar from "../incs/SideBar";
import NavBarBootstrap from "../incs/NavBarBootstrap";
import React from "react";

const Dashboard = () => {

    return (
        <>
            <NavBarBootstrap pageTitle="Dashboard" />
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-2 p-0 sidebar">
                        <SideBar />
                    </div>
                    <div className="col-md-10">
                        <div className="container-fluid px-4">
                            <h1>super Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>












        </>
    );
};

export default Dashboard;
