import SideBar from "../incs/common/SideBar";
import NavBarBootstrap from "../incs/common/NavBarBootstrap";
import React, {useState, useEffect} from "react";
import axios from "axios";
import AppLoader from "../incs/loader/AppLoader"; // Importez votre composant d'indicateur de chargement

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true); // Ajoutez un état pour le chargement initial
    const [totalPages, setTotalPages] = useState(1); // Total number of pages

    const [newProject, setNewProject] = useState({
        id: 24,
        nom: "test",
        description: "description",
        date_debut: "2023-09-16",
        date_fin: null,
        statut: "En cours",
        user_id: "2",
        created_at: "2023-09-16T02:41:04.000000Z",
        updated_at: "2023-09-16T02:41:04.000000Z"
    });

    const onProjectDrop = (event, cat) => {
        event.preventDefault();

        // Obtenez les données du projet glissé
        const projectId = newProject.id;
        const projectName = newProject.nom;

        // Créez une copie des tâches existantes avec le nouveau projet
        const updatedTasks = [...tasks, { name: projectName, category: cat, bgcolor: "lightblue" }];

        // Mettez à jour l'état des tâches avec les nouvelles tâches
        setTasks(updatedTasks);

        // Réinitialisez l'état du nouveau projet
        setNewProject({
            id: null,
            nom: "",
            description: "",
            date_debut: "",
            date_fin: null,
            statut: "",
            user_id: "",
            created_at: "",
            updated_at: ""
        });
    };



    //state with default data
    const [tasks, setTasks] = useState([
        { name: "STORY-4513: Add tooltip", category: "wip", bgcolor: "lightblue" },
        {
            name: "STORY-4547: Fix search bug",
            category: "wip",
            bgcolor: "lightgrey",
        },
        {
            name: "STORY-4525: New filter option",
            category: "complete",
            bgcolor: "lightgreen",
        },
        {
            name: "STORY-4526: Remove region filter",
            category: "complete",
            bgcolor: "#ee9090",
        },
        {
            name: "STORY-4520: Improve performance",
            category: "complete",
            bgcolor: "#eeed90",
        },
    ]);

    //this event is for the dragged task card.
    //this is required to save unique id in the dom event so that when we drop it we would know the card id
    const onDragStart = (event, id) => {
        event.dataTransfer.setData("id", id);
    };

    //fetches the card id and based on that update the status/category of that card in tasks state
    const onDrop = (event, cat) => {
        let id = event.dataTransfer.getData("id");
        let newTasks = tasks.filter((task) => {
            if (task.name === id) {
                task.category = cat;
            }
            return task;
        });

        setTasks([...newTasks]);
    };

    //method to filter tasks beased on their status
    const getTask = () => {
        const tasksToRender = {
            wip: [],
            complete: [],
        };

        tasks.forEach((t) => {
            tasksToRender[t.category].push(
                <div
                    key={t.name}
                    onDragStart={(e) => onDragStart(e, t.name)}
                    draggable
                    className="task-card"
                    style={{ backgroundColor: t.bgcolor }}
                >
                    {t.name}
                </div>
            );
        });

        return tasksToRender;
    };

    useEffect(() => {
        // Effectuez la requête API pour récupérer les articles
        axios.get(`https://de-lafontaine.ca/mealplanner/public/api/projects?page=${currentPage}`)
            .then((response) => {
                console.log(response.data.data);
                // Mettez à jour l'état articles avec les données de l'API
                // setArticles(response.data.data);
                // setTotalPages(response.data.last_page);
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

                                    <div className="drag-drop-container">
                                        <h2 className="drag-drop-header">JIRA BOARD: Sprint 21U</h2>
                                        <div className="drag-drop-board">
                                            <div
                                                className="wip"
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={(e) => {
                                                    onDrop(e, "wip");
                                                }}
                                            >
                                                <div className="task-header">In-PROGRESS</div>
                                                {getTask().wip}
                                            </div>
                                            <div
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={(e) => onDrop(e, "complete")}
                                            >
                                                <div className="task-header">COMPLETED</div>
                                                {getTask().complete}
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

export default Dashboard;
