import React, {useState} from "react";
import {ChevronDownIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {Link} from "react-router-dom";

const JSIcon = require("../../assets/icons/JSIcon.png");
const TSIcon = require("../../assets/icons/TSIcon.png");
const JsonIcon = require("../../assets/icons/icons8-json-30.png");
const GitIgnoreIcon = require("../../assets/icons/gitignore-vector.png");
const FolderIcon = require("../../assets/icons/icons8-folder-48.png");
const InfoIcon = require("../../assets/icons/icons8-info-48.png");

const LeftBar = () => {
    const [showWebList, setShowWebList] = useState(true);
    const [showProjectsList, setShowProjectsList] = useState(true);
    const [showNewProjectList, setShowNewProjectList] = useState(true);
    const [showContactList, setContactList] = useState(true);

    const MyAppList = () => {
        const isLoggedIn = localStorage.getItem("token");

        return (
            <div className="left-list-group list-group bg-light ms-4">
                {isLoggedIn ? (
                    <>
                        {/*On affiche la liste des applications privées*/}
                        <Link to="/your-blog" className="">
                            <img
                                src={TSIcon}
                                alt="Ts Icon"
                                className="text-yellow_vs me-1"
                                style={{width: "20px"}}
                            />
                            this->Articles
                        </Link>
                        <Link to="/your-picture" className="">
                            <img
                                src={JSIcon}
                                alt="JS Icon"
                                className="text-yellow_vs me-1"
                                style={{width: "20px"}}
                            />
                            this->Pictures
                        </Link>
                        <Link to="/your-recipe" className="">
                            <img
                                src={TSIcon}
                                alt="Ts Icon"
                                className="text-yellow_vs me-1"
                                style={{width: "20px"}}
                            />
                            this->Recipes
                        </Link>
                    </>
                ) : (
                    <>
                        {/*On affiche la liste des applications publiques*/}
                        <Link to="/readme" className="">
                            <img
                                src={InfoIcon}
                                alt="Info Icon"
                                className="text-yellow_vs ms-2 me-1"
                                style={{width: "20px"}}
                            />
                            README.md
                        </Link>
                    </>
                )}
            </div>
        );
    };

    const NewProjectList = () => (
        <div className="left-list-group list-group bg-light ms-4">
            <Link to="/blog" className="">
                <img
                    src={JSIcon}
                    alt="JS Icon"
                    className="text-yellow_vs me-1"
                    style={{width: "20px"}}
                />
                Blog
            </Link>
            <Link to="/recipes" className="">
                <img
                    src={TSIcon}
                    alt="TS Icon"
                    className="text-yellow_vs me-1"
                    style={{width: "20px"}}
                />
                Recipe
            </Link>
            <Link to="/pokedex" className="">
                <img
                    src={JSIcon}
                    alt="JS Icon"
                    className="text-yellow_vs me-1"
                    style={{width: "20px"}}
                />
                Pokedex
            </Link>
            <Link to="/album" className="">
                <img
                    src={TSIcon}
                    alt="TS Icon"
                    className="text-yellow_vs me-1"
                    style={{width: "20px"}}
                />
                Photo Gallery
            </Link>
        </div>
    );

    const ContactList = () => (
        <div className="left-list-group list-group bg-light ms-4">
            <a href="/" className="">
                <img
                    src={JSIcon}
                    alt="JS Icon"
                    className="text-yellow_vs me-1"
                    style={{width: "20px"}}
                />
                script.js
            </a>
        </div>
    );

    return (
        <div className="card">
            <div>
                <div
                    className="directory"
                    onClick={() => setShowProjectsList(!showProjectsList)}
                >
                    {showProjectsList ? (
                        <ChevronDownIcon className="mr-1" style={{width: "50px"}}/>
                    ) : (
                        <ChevronRightIcon className="mr-1" style={{width: "50px"}}/>
                    )}
                    Projects
                </div>
                {showProjectsList ? (
                    <>
                        <div className="" onClick={() => setShowWebList(!showWebList)}>
                            {showWebList ? (
                                <ChevronDownIcon
                                    className="mr-1  ms-2"
                                    style={{width: "50px"}}
                                />
                            ) : (
                                <ChevronRightIcon
                                    className="mr-1  ms-2"
                                    style={{width: "50px"}}
                                />
                            )}
                            Your stuff
                        </div>

                        {showWebList ? <MyAppList/> : null}
                    </>
                ) : null}
            </div>

            <div
                className="directory"
                onClick={() => setShowNewProjectList(!showNewProjectList)}
            >
                {showNewProjectList ? (
                    <ChevronDownIcon className="" style={{width: "50px"}}/>
                ) : (
                    <ChevronRightIcon className="" style={{width: "50px"}}/>
                )}
                Our Stuff
            </div>
            {showNewProjectList ? <NewProjectList/> : null}

            <div className="directory" onClick={() => setContactList(!showContactList)}>
                {showContactList ? (
                    <ChevronDownIcon className="" style={{width: "50px"}}/>
                ) : (
                    <ChevronRightIcon className="" style={{width: "50px"}}/>
                )}
                My Stuff
            </div>
            {showContactList ? <ContactList/> : null}
        </div>
    );
};

export default LeftBar;
