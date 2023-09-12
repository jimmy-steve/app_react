import SideBar from "../incs/common/SideBar";
import NavBarBootstrap from "../incs/common/NavBarBootstrap";
import React, {useState, useEffect} from "react";
import axios from "axios";
import AppLoader from "../incs/loader/AppLoader"; // Importez votre composant d'indicateur de chargement

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true); // Ajoutez un état pour le chargement initial
    const [totalPages, setTotalPages] = useState(1); // Total number of pages

    useEffect(() => {
        // Effectuez la requête API pour récupérer les articles
        axios.get(`https://de-lafontaine.ca/mealplanner/public/api/articles?page=${currentPage}`)
            .then((response) => {
                // Mettez à jour l'état articles avec les données de l'API
                setArticles(response.data.data);
                setTotalPages(response.data.last_page);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des articles:", error);
            })
            .finally(() => {
                setIsLoading(false); // Mettez à jour isLoading une fois la requête terminée
            });
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
                            {isLoading ? ( // Affichez l'indicateur de chargement si isLoading est vrai
                                <div className="d-flex justify-content-center mt-5">
                                    <AppLoader/>
                                </div>
                            ) : (
                                <>
                                    <h1>Dashboard</h1>

                                    {/*<table className="table table-hover border border-dark">*/}
                                    {/*    <thead>*/}
                                    {/*    <tr className="table-dark">*/}
                                    {/*        <th scope="col">ID</th>*/}
                                    {/*        <th scope="col">Title</th>*/}
                                    {/*        <th scope="col">Action</th>*/}
                                    {/*        <th scope="col">Status</th>*/}
                                    {/*    </tr>*/}
                                    {/*    </thead>*/}
                                    {/*    <tbody>*/}
                                    {/*    {articles.map((article) => (*/}
                                    {/*        <tr key={article.id} className="table-active">*/}
                                    {/*            <th scope="row">{article.id}</th>*/}
                                    {/*            <td>{article.title}</td>*/}
                                    {/*            <td>*/}
                                    {/*                <i className="fa-solid fa-pen-to-square ms-1"></i>*/}
                                    {/*                <i className="fa-solid fa-delete-left ms-3"></i>*/}
                                    {/*            </td>*/}
                                    {/*            <td>{article.status === "1" ? "Active" : "Inactive"}</td>*/}
                                    {/*        </tr>*/}
                                    {/*    ))}*/}
                                    {/*    </tbody>*/}
                                    {/*</table>*/}

                                    {/* Pagination */}
                                    {/*<div className="pagination-container">*/}
                                    {/*    <ul className="pagination">*/}
                                    {/*        {Array.from({ length: totalPages }, (_, i) => (*/}
                                    {/*            <li*/}
                                    {/*                className={`page-item ${i + 1 === currentPage ? "active" : ""}`}*/}
                                    {/*                key={i}*/}
                                    {/*            >*/}
                                    {/*                <button*/}
                                    {/*                    className="page-link"*/}
                                    {/*                    onClick={() => handlePageChange(i + 1)}*/}
                                    {/*                >*/}
                                    {/*                    {i + 1}*/}
                                    {/*                </button>*/}
                                    {/*            </li>*/}
                                    {/*        ))}*/}
                                    {/*    </ul>*/}
                                    {/*</div>*/}

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

export default Dashboard;
