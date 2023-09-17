import React from "react";
import SideBar from "./incs/common/SideBar";
import NavBarBootstrap from "./incs/common/NavBarBootstrap";
import {Link} from "react-router-dom";
import Footer from "./incs/common/Footer";
import {Howl, Howler} from "howler";
import ClicSound from "../assets/mp3/sound1.wav";
import Banner from "./incs/banner/Banner";
import Eclipse1 from "../assets/img/big-eclipse.svg";
import Eclipse2 from "../assets/img/mid-eclipse.svg";
import Eclipse3 from "../assets/img/small-eclipse.svg";
import {useState} from "react";



const Home = () => {
    // Fonction pour jouer le son
    const playMusic = () => {
        const sound = new Howl({
            src: [ClicSound],
            autoplay: true,
            mute: false,
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


    return (
        <>
            <NavBarBootstrap pageTitle="De-Lafontaine"/>
            <div className="container-fluid m-1">
                <div className="row">
                    <div className="col-2 p-0 sidebar">
                        <SideBar/>
                    </div>
                    <div className="col">
                        <div className="content">

                            <img className="big-circle" src={Eclipse1} alt="{Eclipse1}"/>
                            <img className="medium-circle" src={Eclipse2} alt="medium-circle"/>
                            <img className="small-circle" src={Eclipse3} alt="small-circle"/>


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

                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        <img className="super-logo" src={process.env.PUBLIC_URL + '/logo512.png'} alt="Logo React" />
                                        <h1 className="display-4">Hello my Friend !</h1>
                                        <p className="lead text-muted">
                                            Eh bien, bien, bien, regardez qui est arrivé dans mon saloon numérique.
                                        </p>
                                        <p className="lead">
                                            Je m'appelle <strong>Rusty</strong>, et je ne suis pas seulement de la
                                            rouille, je suis aussi un cowboy du React. <br/>
                                            Ouais, c'est ma petite portion de la frontière numérique.
                                        </p>
                                        <hr/>
                                        <p className="lead">
                                            Laissez-moi vous raconter une histoire à propos de ce petit coin de
                                            cyberespace. C'est comme mélanger une soupe React, vous voyez ? Jetez-y
                                            quelques légumes JSX, une pincée d'épices d'état, et laissez mijoter pour
                                            une fête frontale.
                                        </p>
                                        <p className="lead">
                                            Voici pour une fiesta de site web bien animée !
                                        </p>
                                        <p className="lead text-end">
                                            <button className="btn btn-primary btn-lg" onClick={playMusic}>
                                                Découvrir la Sagesse
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default Home;
