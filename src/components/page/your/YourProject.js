import React, { useState, useEffect } from "react";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import SideBar from "../../incs/common/SideBar";
import Footer from "../../incs/common/Footer";
import Eclipse1 from "../../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../../assets/img/small-eclipse.svg";
import AddProjectModal from "../../incs/modal/AddProjectModal";
import axios from "axios";
import TriangleLoader from "../../incs/loader/TriangleLoader";
import { Link } from "react-router-dom";
import DeleteModal from "../../incs/modal/DeleteModal";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Pagination component
function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="row justify-content-center mt-3 pagination-container">
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <li
                            className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
                            key={i}
                        >
                            <button
                                className="page-link"
                                onClick={() => onPageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}


// Table content component
function TableContent({ projects, handleDeleteClick }) {
    const formatDate = (dateString) => {

        if (!dateString) {
            return ''; // ou une valeur par défaut
        }

        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return ''; // ou une valeur par défaut
        }
        return format(date, "d MMMM yyyy", { locale: fr });
    };



    return (
        <table className="table table-hover border border-dark">
            <thead>
            <tr className="table-dark">
                <th scope="col">ID</th>
                <th scope="col">Nom</th>
                <th scope="col">Statut</th>
                <th scope="col">Created Date</th>
                <th scope="col" className="text-end pe-5">
                    Action
                </th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project) => (
                <tr key={project.id} className="table-active">
                    <th scope="row">{project.id}</th>
                    <td>{project.nom}</td>
                    <td>{project.statut}</td>
                    <td>{formatDate(project.created_at)}</td>

                    <td className="text-end">
                        <Link to={`/projects/${project.id}`}>
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
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

const YourProject = () => {
    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true); // Ajoutez un état pour le chargement initial
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [redirect, setRedirect] = useState(false);
    const [projects, setProjects] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projetToDeleteId, setProjetToDeleteId] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState("");

    const handleDeleteClick = (id) => {
        console.log("id", id);
        setProjetToDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleProjectAdded = (newProject) => {
        setProjects([...projects, newProject]);
    };

    const handleAddConfirm = () => {
        setShowAddProjectModal(false);
    };

    const handleDeleteConfirm = () => {
        axios
            .delete(`https://de-lafontaine.ca/mealplanner/public/api/projects/${projetToDeleteId}`)
            .then(() => {
                const updatedProjects = projects.filter((project) => project.id !== projetToDeleteId);
                setProjects(updatedProjects);
                // setShowDeleteModal(false);
                setTotalPages(totalPages - 1); // Update total pages after deletion
                setConfirmationMessage("Le projet a été supprimé avec succès.");

                setTimeout(() => {
                    setConfirmationMessage("");
                }, 3000);
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de l'article : ", error);
            });
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
                    setProjects(response.data.data);
                    setTotalPages(response.data.last_page);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des articles:", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [currentPage,projects]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const destroyProjet = (projetId) => {
        axios.delete(`https://de-lafontaine.ca/mealplanner/public/api/projects/${projetId}`)
            .then((response) => {
                // Supprimez l'article de la liste locale
                const updatedprojets = projects.filter((projet) => projet.id !== projetId);
                setProjects(updatedprojets);
                setTotalPages(response.data.last_page);

                // Mettez à jour le message de confirmation
                setConfirmationMessage("Le projet a été supprimé avec succès.");

                // Supprimez le message de confirmation après 3 secondes
                setTimeout(() => {
                    setConfirmationMessage("");
                }, 3000);
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de l'article : ", error);
            });
    }


    return (
        <>
            <NavBarBootstrap pageTitle="About" />
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-2 p-0 sidebar">
                        <SideBar />
                    </div>
                    <div className="col-md-10">
                        <div className="content">
                            <img className="big-circle" src={Eclipse1} alt="{Eclipse1}" />
                            <img className="medium-circle" src={Eclipse2} alt="medium-circle" />
                            <img className="small-circle" src={Eclipse3} alt="small-circle" />

                            {confirmationMessage && (
                                <div className="alert alert-success mt-3">
                                    {confirmationMessage}
                                </div>
                            )}
                            <div className="container-fluid px-4">
                                <div className="row g-4">
                                    <div className="col-12">
                                        <div className="container-fluid mt-3">
                                            {isLoading ? (
                                                <div className="d-flex justify-content-center mt-5">
                                                    <TriangleLoader />
                                                </div>
                                            ) : (
                                                <>
                                                    {projects.length === 0 ? (
                                                        <div className="alert alert-danger">
                                                            Désolé, aucune recettes trouvée.
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <TableContent projects={projects} handleDeleteClick={handleDeleteClick} />
                                                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                                                        </>
                                                    )}
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
                <a type="button" onClick={() => setShowAddProjectModal(true)}>
                    <i className="fa-solid fa-square-plus"></i>
                </a>
            </div>

            <AddProjectModal
                show={showAddProjectModal}
                onHide={() => setShowAddProjectModal(false)}
                onDelete={handleAddConfirm}
                onProjectAdded={handleProjectAdded}
            />

            <Footer />
        </>
    );
};

export default YourProject;