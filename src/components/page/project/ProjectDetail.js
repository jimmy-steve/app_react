import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import Axios from "axios";
import { useParams } from "react-router-dom";
import TriangleLoader from "../../incs/loader/TriangleLoader";

const ProjectDetail = () => {
    const { id } = useParams();
    const [redirect, setRedirect] = useState(false);
    const [project, setProject] = useState(null); // État pour stocker les données du projet
    const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement

    useEffect(() => {
        let headers = {
            headers: {
                "API-TOKEN": localStorage.getItem("token"),
            },
        };

        if (isNaN(id)) {
            setRedirect(true);
            return;
        }

        if (localStorage.getItem("token")) {
            Axios.get(
                `https://de-lafontaine.ca/mealplanner/public/api/projects/${id}`,
                headers
            )
                .then((response) => {
                    setProject(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                })
                .finally(() => {
                    setIsLoading(false); // Définissez isLoading sur false une fois les données chargées
                });
        } else {
            setRedirect(true);
        }
    }, [id]);

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <NavBarBootstrap />
            <div className="projects container-fluid my-2">
                {isLoading ? ( // Affichez le loader pendant le chargement
                    <TriangleLoader />
                ) : (
                    <div>
                        <h1>Project Detail</h1>
                        {project && (
                            <div>
                                <h2>{project.nom}</h2>
                                <p>{project.description}</p>
                                {/* Affichez d'autres détails du projet ici */}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProjectDetail;
