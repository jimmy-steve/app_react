import React from "react";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import SideBar from "../../incs/common/SideBar";
import Footer from "../../incs/common/Footer";
import Eclipse1 from "../../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../../assets/img/small-eclipse.svg";
import AddProjectModal from "../../incs/modal/AddProjectModal";
import {useState, useEffect} from "react";
import axios from "axios";
import TriangleLoader from "../../incs/loader/TriangleLoader";
import {Link} from "react-router-dom";
import DeleteModal from "../../incs/modal/DeleteModal";
import {format} from "date-fns";
import {fr} from "date-fns/locale";

const Project = () => {
    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true); // Ajoutez un état pour le chargement initial
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [redirect, setRedirect] = useState(false);
    const [projects, setProjects] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteClick = (id) => {
        setShowDeleteModal(true);
        // setRecipeToDeleteId(id);
    };


    const handleDeleteConfirm = () => {
        // destroyRecipe(recipeId);
        setShowDeleteModal(false);
    };

    const handleAddClick = () => {
        setShowAddProjectModal(true);
        console.log("Add button clicked");
    }

    const handleAddConfirm = () => {
        setShowAddProjectModal(false);
    };

    const handleModalClose = () => {
        setShowAddProjectModal(false);
    };

    const handleModalDeleteClose = () => {
        setShowDeleteModal(false);
    };


    useEffect(() => {
        let headers = {
            headers: {
                "API-TOKEN": localStorage.getItem("token"),
            },
        };

        if (localStorage.getItem("token")) {
            axios
                .get(`https://de-lafontaine.ca/mealplanner/public/api/projects?page=${currentPage}`, headers)
                .then((response) => {
                    console.log(response.data);
                    setProjects(response.data.data);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des articles:", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setRedirect(true);
        }
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
        <>
            {/* Barre de navigation */}
            <NavBarBootstrap pageTitle="About"/>
            <div className="container-fluid m-1">
                <div className="row">
                    {/* Barre latérale */}
                    <div className="col-2 p-0 sidebar">
                        <SideBar/>
                    </div>
                    <div className="col-md-10">
                        <div className="content">

                            <img className="big-circle" src={Eclipse1} alt="{Eclipse1}"/>
                            <img className="medium-circle" src={Eclipse2} alt="medium-circle"/>
                            <img className="small-circle" src={Eclipse3} alt="small-circle"/>
                            <div className="container-fluid px-4">
                                <div className="row g-4">
                                    {/* Section de présentation */}
                                    <div className="col-12">
                                        <div className="container-fluid mt-3">
                                            {isLoading ? ( // Affichez l'indicateur de chargement si isLoading est vrai
                                                <div className="d-flex justify-content-center mt-5">
                                                    <TriangleLoader/>
                                                </div>
                                            ) : (
                                                <>
                                                    {projects.length === 0 ? ( // Vérifiez si la liste des pictures est vide
                                                        <div className="alert alert-danger">
                                                            Désolé, aucune recettes trouvée.
                                                        </div>
                                                    ) : (
                                                        <table className="table table-hover border border-dark">
                                                            <thead>
                                                            <tr className="table-dark">
                                                                <th scope="col">ID</th>
                                                                <th scope="col">Nom</th>
                                                                <th scope="col">Statut</th>
                                                                <th scope="col">Created Date</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {projects.map((project) => (
                                                                <tr key={project.id} className="table-active">
                                                                    <th scope="row">{project.id}</th>
                                                                    <td>{project.nom}</td>
                                                                    <td>{project.statut}</td>
                                                                    <td>{project.created_at}</td>

                                                                    <td>
                                                                        <Link to={`/project/${project.id}`}>
                                                                            <i className="fa-solid fa-code ms-1 btn btn-sm btn-outline-dark"></i>
                                                                        </Link>
                                                                        <Link>
                                                                            <i className="fa-solid fa-pencil ms-1 btn btn-sm btn-outline-warning"></i>
                                                                        </Link>
                                                                        <DeleteModal
                                                                            id={project.id}
                                                                            name={project.nom}
                                                                            type="project"
                                                                        />
                                                                        <i
                                                                            className="fa-solid fa-delete-left ms-1 btn btn-sm btn-outline-danger"
                                                                            onClick={() => handleDeleteClick(project.id)}
                                                                        ></i>
                                                                        <DeleteModal
                                                                            show={showDeleteModal}
                                                                            onHide={handleModalDeleteClose}
                                                                            onDelete={handleDeleteConfirm}
                                                                        />
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
                                                    )}

                                                    {/* Pagination */}
                                                    <div className="pagination-container">
                                                        <ul className="pagination">
                                                            {Array.from({length: totalPages}, (_, i) => (
                                                                <li
                                                                    className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
                                                                    key={i}
                                                                >
                                                                    <button
                                                                        className="page-link"
                                                                        onClick={() => handlePageChange(i + 1)}
                                                                    >
                                                                        {i + 1}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div className="add-btn-container bg-success">
                                                        <Link to="/recipes/new">
                                                            <i className="fa-solid fa-square-plus"></i>
                                                        </Link>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                <div className="add-btn-container bg-success">
                    <a type="button" onClick={() => handleAddClick()}>
                        <i className="fa-solid fa-square-plus"></i>
                    </a>
                </div>
                <AddProjectModal
                    show={showAddProjectModal}
                    onHide={handleModalClose}
                    onDelete={handleAddConfirm}
                />
            {/* Pied de page */}
            <Footer/>
        </>
    );
}

export default Project;