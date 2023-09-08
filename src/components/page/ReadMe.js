import React from "react";
import SideBar from "../incs/SideBar";
import NavBarBootstrap from "../incs/NavBarBootstrap";
import Footer from "../incs/Footer";

const Readme = () => {
  return (
      <>
        <NavBarBootstrap pageTitle="README.md" />
        <div className="container-fluid m-1">
          <div className="row">
            <div className="col-2 p-0 sidebar">
              <SideBar />
            </div>
            <div className="col-md-10">
              <div className="content">
                <div className="container-fluid px-4">
                  <div className="row g-4">
                    <div className="col-md-12 mt-5">
                      <h1 className="display-4">Titre de votre Projet</h1>
                      <p className="lead">
                        Ceci est une description de votre projet. Vous pouvez
                        expliquer brièvement de quoi il s'agit et pourquoi il est
                        intéressant.
                      </p>
                      <hr />
                      <h2>Installation</h2>
                      <p>
                        Expliquez comment installer et configurer votre projet.
                        Donnez des instructions claires pour que les utilisateurs
                        puissent commencer à l'utiliser rapidement.
                      </p>
                      <h2>Utilisation</h2>
                      <p>
                        Détaillez comment utiliser votre projet. Fournissez des
                        exemples, des commandes ou des captures d'écran pour
                        montrer son fonctionnement.
                      </p>
                      <h2>Contributions</h2>
                      <p>
                        Si vous autorisez les contributions à votre projet,
                        expliquez comment les gens peuvent contribuer. Cela peut
                        inclure des informations sur les problèmes ouverts, le
                        processus de demande de tirage, etc.
                      </p>
                      <h2>License</h2>
                      <p>
                        Indiquez la licence sous laquelle votre projet est publié.
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

export default Readme;
