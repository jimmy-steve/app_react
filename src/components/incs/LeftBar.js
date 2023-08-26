import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

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

  const NewProjectList = () => (
    <div className="list-group ms-4">
      <Link to="/album" className="">
        <img
          src={JSIcon}
          alt="JS Icon"
          className="text-yellow_vs me-1"
          style={{ width: "20px" }}
        />
        Album Photo
      </Link>
        <Link to="/recipes" className="">
            <img
                src={TSIcon}
                alt="TS Icon"
                className="text-yellow_vs me-1"
                style={{ width: "20px" }}
            />
            Recettes
        </Link>
      <Link to="/mealplanner" className="">
        <img
          src={TSIcon}
          alt="TS Icon"
          className="text-yellow_vs me-1"
          style={{ width: "20px" }}
        />
        Meal Planner
      </Link>
      <Link to="/pokedex" className="">
        <img
          src={JSIcon}
          alt="JS Icon"
          className="text-yellow_vs me-1"
          style={{ width: "20px" }}
        />
        Pokedex
      </Link>
      <Link to="/blockchain" className="">
        <img
          src={JSIcon}
          alt="JS Icon"
          className="text-yellow_vs me-1"
          style={{ width: "20px" }}
        />
        BlockChain
      </Link>

      <Link to="/three-d" className="">
        <img
          src={JSIcon}
          alt="JS Icon"
          className="text-yellow_vs me-1"
          style={{ width: "20px" }}
        />
        ThreeD
      </Link>
    </div>
  );

  const ContactList = () => (
    <div className="list-group ms-4">
      <a href="/" className="">
        <img
          src={JSIcon}
          alt="JS Icon"
          className="text-yellow_vs me-1"
          style={{ width: "20px" }}
        />
        script.js
      </a>
      {/* Ajoutez autant d'éléments de sous-menu que nécessaire */}
    </div>
  );

  const MyAppList = () => (
    <div className="list-group ms-4">
      <Link to="/node" className="">
        <img
          src={FolderIcon}
          alt="Folder Icon"
          className="text-yellow_vs ms-2 me-1"
          style={{ width: "20px" }}
        />
        node_modules
      </Link>
      <Link to="/public" className="">
        <img
          src={FolderIcon}
          alt="Folder Icon"
          className="text-yellow_vs ms-2 me-1"
          style={{ width: "20px" }}
        />
        public
      </Link>
      <Link to="/src" className="">
        <img
          src={FolderIcon}
          alt="Folder Icon"
          className="text-yellow_vs ms-2 me-1"
          style={{ width: "20px" }}
        />
        src
      </Link>
      <a href="/gitignore" className="">
        <img
          src={GitIgnoreIcon}
          alt="GitIgnore Icon"
          className="text-yellow_vs ms-2 me-1"
          style={{ width: "20px" }}
        />
        gitignore
      </a>
      <a href="/package" className="">
        <img
          src={JsonIcon}
          alt="Json Icon"
          className="text-yellow_vs ms-2 me-1"
          style={{ width: "20px" }}
        />
        package.json
      </a>
      <a href="/readme" className="">
        <img
          src={InfoIcon}
          alt="Info Icon"
          className="text-yellow_vs ms-2 me-1"
          style={{ width: "20px" }}
        />
        README.md
      </a>
    </div>
  );

  return (
    <div className="">
      <div>
        <div
          className=""
          onClick={() => setShowProjectsList(!showProjectsList)}
        >
          {showProjectsList ? (
            <ChevronDownIcon className="mr-1" style={{ width: "50px" }} />
          ) : (
            <ChevronRightIcon className="mr-1" style={{ width: "50px" }} />
          )}
          Projects
        </div>
        {showProjectsList ? (
          <>
            <div className="" onClick={() => setShowWebList(!showWebList)}>
              {showWebList ? (
                <ChevronDownIcon
                  className="mr-1  ms-2"
                  style={{ width: "50px" }}
                />
              ) : (
                <ChevronRightIcon
                  className="mr-1  ms-2"
                  style={{ width: "50px" }}
                />
              )}
              My App
            </div>
            {showWebList ? <MyAppList /> : null}
          </>
        ) : null}
      </div>

      <div
        className=""
        onClick={() => setShowNewProjectList(!showNewProjectList)}
      >
        {showNewProjectList ? (
          <ChevronDownIcon className="" style={{ width: "50px" }} />
        ) : (
          <ChevronRightIcon className="" style={{ width: "50px" }} />
        )}
        My Projects
      </div>
      {showNewProjectList ? <NewProjectList /> : null}

      <div className="" onClick={() => setContactList(!showContactList)}>
        {showContactList ? (
          <ChevronDownIcon className="" style={{ width: "50px" }} />
        ) : (
          <ChevronRightIcon className="" style={{ width: "50px" }} />
        )}
        Your Files
      </div>
      {showContactList ? <ContactList /> : null}
    </div>
  );
};

export default LeftBar;
