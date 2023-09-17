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
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const YourProject = () => {
    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [projects, setProjects] = useState([]);
    const [projectToDeleteId, setProjectToDeleteId] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "d MMMM yyyy", {locale: fr}); // Utilisez le locale "fr" pour le français
    };

    const handleShow = (id) => {
        setShow(true);
        setProjectToDeleteId(id);
    };

    const handleProjectAdded = (newProject) => {
        setProjects([...projects, newProject]);
    };

    const handleAddConfirm = () => {
        setShowAddProjectModal(false);
    };

    const handleDeleteClick = (id) => {
        setProjectToDeleteId(id);
        handleDeleteConfirm();
        //close the door
        setShow(false);
    };

    const handleDeleteConfirm = () => {
        // Envoyez la requête DELETE à l'API
        axios
            .delete(`https://de-lafontaine.ca/mealplanner/public/api/projects/${projectToDeleteId}`)
            .then(() => {
                // Supprimez le projet de la liste des projets
                const updatedProjects = projects.filter((project) => project.id !== projectToDeleteId);
                setProjects(updatedProjects);
                setTotalPages(totalPages - 1); // Mettez à jour le nombre total de pages après la suppression
                setConfirmationMessage("Le projet a été supprimé avec succès.");
                setProjectToDeleteId(null); // Réinitialisez projectToDeleteId après la suppression

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
    }, [currentPage, projects]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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


                                                                        <Link className="" onClick={() => handleShow(project.id)}>
                                                                            <i className="fa-solid fa-delete-left btn btn-sm btn-outline-danger"></i>
                                                                        </Link>

                                                                        <Modal show={show} onHide={handleClose}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Confirmation de suppression</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>Woohoo, Êtes-vous sûr de vouloir supprimer cet élément ?</Modal.Body>
                                                                            <Modal.Footer>
                                                                                <Button variant="secondary" onClick={handleClose}>
                                                                                    Close
                                                                                </Button>
                                                                                <Button variant="primary" onClick={handleDeleteClick}>
                                                                                    Save Changes
                                                                                </Button>
                                                                            </Modal.Footer>
                                                                        </Modal>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
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
                <button type="button" onClick={() => setShowAddProjectModal(true)}>
                    <i className="fa-solid fa-square-plus"></i>
                </button>
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
