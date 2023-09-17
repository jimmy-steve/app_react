import SideBar from "../../incs/common/SideBar";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TriangleLoader from "../../incs/loader/TriangleLoader";


const AdminDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [totalData, setTotalData] = useState(null); // Ajoutez un état pour stocker les données totales


    useEffect(() => {
        axios.get(`https://de-lafontaine.ca/mealplanner/public/api/total`)
            .then((response) => {
                // Stockez les données totales dans l'état totalData
                setTotalData(response.data.total);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données totales:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <NavBarBootstrap pageTitle="Dashboard"/>
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-2 p-0 sidebar">
                        <SideBar/>
                    </div>
                    <div className="col-md-10">
                        <div className="container-fluid mt-3">
                            {isLoading ? (
                                <div className="d-flex justify-content-center mt-5">
                                    <TriangleLoader/>
                                </div>
                            ) : (
                                <>
                                    <h1>Admin Dashboard</h1>
                                    {/* Affichez les chiffres dans des blocs ou des cartes */}


                                    <div className="row">
                                        <div className="col-md-3 text-center p-2">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Total Users : <span className="badge bg-success">{totalData.totalUser}</span></h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-3 text-center p-2">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Total Articles : <span className="badge bg-success">{totalData.totalArticle}</span></h5>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-md-3 text-center p-2">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Total Category : <span className="badge bg-success">{totalData.totalCategory}</span></h5>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-md-3 text-center p-2">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Total Recipes : <span className="badge bg-success">{totalData.totalRecipe}</span></h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-3 text-center p-2">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Total Ingredients : <span className="badge bg-success">{totalData.totalIngredient}</span></h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-3 text-center p-2">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Total Pictures : <span className="badge bg-success">{totalData.totalPicture}</span></h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-3 text-center p-2">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Total Projets : <span className="badge bg-success">{totalData.totalProject}</span></h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-3 text-center p-2">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Total Tasks : <span className="badge bg-success">{totalData.totalTask}</span></h5>
                                                </div>
                                        </div>
                                        </div>



                                    </div>

                                    <div className="add-btn-container bg-success">
                                        <i className="fa-solid fa-square-plus fa-2xl"></i>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
