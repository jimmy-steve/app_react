import Navbar from "./incs/Navbar";

import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import React, { Suspense } from "react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    height: 200vh;
  }
`;

const Container = styled.div`
  height: 100%;
  scroll-snap-align: center;
  width: 1400px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Left = styled.div`
  margin-left: 100px;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    flex: 1;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 70px;

  @media only screen and (max-width: 768px) {
    text-align: center;
  }
  
    @media only screen and (max-width: 1400px) {
    font-size: 50px;
      
    }
`;


const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Line = styled.img`
  height: 5px;
`;

const Subtitle = styled.h2`
  color: #e95420;
`;

const Desc = styled.p`
  font-size: 24px;
  color: lightgray;
  @media only screen and (max-width: 768px) {
    padding: 20px;
    text-align: center;
  }
`;

const Button = styled.button`
  background-color: #e95420;
  color: white;
  font-weight: 500;
  width: auto;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 3;
  position: relative;
  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const Img = styled.img`
  width: 600px;
  height: 400px;
  object-fit: contain;
  position: absolute;
  top: -10%;
  bottom: 0;
  left: 50%;
  right: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;

  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
    top: 200%;
    left:8%;
  }

  @media only screen and (max-width: 380px) {
    top: 225%;
  }

  @media only screen and (max-width: 320px) {
    top: 250%;
  }

  @media only screen and (max-width: 1400px) {
    width: 300px;
    height: 300px;
    top: 10%;
  }

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;

function Home() {
    const [email, setEmail] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const location = useLocation();

    useEffect(() => {
        // Écoutez les changements de route
        if (location.hash === "#skills") {
            // Faites défiler la page jusqu'à la section "Skills"
            const skillsSection = document.getElementById("skills");
            if (skillsSection) {
                skillsSection.scrollIntoView({ behavior: "smooth" });
            }
        }
        if (location.hash === "#projects") {
            // Faites défiler la page jusqu'à la section "Projects"
            const projectsSection = document.getElementById("projects");
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
            }

        }
    }, [location.hash]);

    const handleAlertClick = () => {
        // Masquer l'alerte lorsque l'utilisateur clique dessus
        setShowAlert(false);
    };

    const subscribe = () => {
        // Validation de l'adresse e-mail
        if (!email || !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
            setConfirmationMessage("Veuillez saisir une adresse e-mail valide.");
            setShowAlert(true, setTimeout(() => {
                setShowAlert(false);
            }, 3000));

            return;
        }

        Axios.get(
            `https://de-lafontaine.ca/mealplanner/public/api/subscribe?email=${email}`
        )
            .then((response) => {
                setConfirmationMessage("Souscription réussie, email de confirmation envoyé.");
                // Réinitialisez l'adresse e-mail après la soumission réussie
                setEmail("");
                setShowAlert(true, setTimeout(() => {
                    setShowAlert(false);
                }, 3000));
            })
            .catch((error) => {
                console.log(error.response);
                setConfirmationMessage("Une erreur s'est produite lors de la soumission.");
                setShowAlert(true, setTimeout(() => {
                    setShowAlert(false);
                }, 3000));
            });
    };

    return (
      <>
        <Navbar />
        <div className={"container-fluid"}>
          <div className={"row"}>
            <div className={"col-md-12 col-lg-6 col-sm-12 container-left"}>
                <Title>Hey there, I'm <br/><span className={"my-name text-primary"}>Francis Lafontaine!</span></Title>
                <WhatWeDo>
                  <Line src="./img/line.png" />
                  <Subtitle>Digital Experience Wizard</Subtitle>
                </WhatWeDo>
                <Desc>
                    I'm on a mission to create digital magic that brings smiles and amazement. With a coffee in hand and a sprinkle of code, I turn pixels into adventures. Join me on this pixel-perfect journey! 🚀
                </Desc>
                <button type="button" className="btn btn-outline-primary p-1 m-1">Github</button>
                <button type="button" className="btn btn-outline-primary p-1 m-1">Twitter</button>
                <button type="button" className="btn btn-outline-primary p-1 m-1">Youtube</button>
                <button type="button" className="btn btn-outline-primary p-1 m-1">LinkedIn</button>
                <button type="button" className="btn btn-outline-primary p-1 m-1">Email</button>
            </div>

            <div className={"col-md-12 col-lg-6 col-sm-12 container-right"}>
                <Canvas>
                  <Suspense fallback={null}>
                    <OrbitControls enableZoom={false} />
                    <ambientLight intensity={1} />
                    <directionalLight position={[3, 2, 1]} />
                    <Sphere args={[1, 100, 200]} scale={2.4}>
                      <MeshDistortMaterial
                          color="#e95420"
                          attach="material"
                          distort={0.5}
                          speed={2}
                      />
                    </Sphere>
                  </Suspense>
                </Canvas>
                <Img src="/../img/moon.png" />
            </div>
          </div>
        </div>
        <div className={"container-fluid"} id={"skills"}>
          <h2 className={"text-center text-primary mb-4 border-bottom border-primary pb-4"}>Skills</h2>
          <div className={"row"}>
              <div className={"col-md-4 col-sm-12 m-1 mx-auto"}>
                  <div className="card border-primary mb-3" >
                      <div className="card-header">Header</div>
                      <div className="card-body">
                          <h4 className="card-title">Primary card title</h4>
                          <p className="card-text">Some quick example text to build on the card title and make up the
                              bulk of the card's content.</p>
                      </div>
                  </div>
              </div>

              <div className={"col-md-3 col-sm-12 m-1 mx-auto"}>
                  <div className="card border-primary mb-3" >
                      <div className="card-header">Header</div>
                      <div className="card-body">
                          <h4 className="card-title">Primary card title</h4>
                          <p className="card-text">Some quick example text to build on the card title and make up the
                              bulk of the card's content.</p>
                      </div>
                  </div>
              </div>

              <div className={"col-md-4 col-sm-12 m-1 mx-auto"}>
                  <div className="card border-primary mb-3" >
                      <div className="card-header">Header</div>
                      <div className="card-body">
                          <h4 className="card-title">Primary card title</h4>
                          <p className="card-text">Some quick example text to build on the card title and make up the
                              bulk of the card's content.</p>
                      </div>
                  </div>
              </div>

          </div>
        </div>

          <div className={"container-fluid"} id={"projects"}>
              <h2 className={"text-center text-primary mb-4 border-bottom border-primary pb-4"}>Projects</h2>
              <div className={"row"}>
                  <div className={"col-4 m-1 mx-auto"}>
                      <div className="card border-primary mb-3" >
                          <div className="card-header">Header</div>
                          <div className="card-body">
                              <h4 className="card-title">Primary card title</h4>
                              <p className="card-text">Some quick example text to build on the card title and make up the
                                  bulk of the card's content.</p>
                          </div>
                      </div>
                  </div>

                  <div className={"col-3 m-1 mx-auto"}>
                      <div className="card border-primary mb-3" >
                          <div className="card-header">Header</div>
                          <div className="card-body">
                              <h4 className="card-title">Primary card title</h4>
                              <p className="card-text">Some quick example text to build on the card title and make up the
                                  bulk of the card's content.</p>
                          </div>
                      </div>
                  </div>

                  <div className={"col-4 m-1 mx-auto"}>
                      <div className="card border-primary mb-3" >
                          <div className="card-header">Header</div>
                          <div className="card-body">
                              <h4 className="card-title">Primary card title</h4>
                              <p className="card-text">Some quick example text to build on the card title and make up the
                                  bulk of the card's content.</p>
                          </div>
                      </div>
                  </div>

              </div>
          </div>

          <div className={"container-fluid"} id={"contact"}>
              <h2 className={"text-center text-primary mb-4 border-bottom border-primary pb-4"}>Contact</h2>
              <div className={"row"}>




                  <section>
                      <div className="container-fluid row-subscribe">
                          <div className="row">
                              <div className="col-md-4 mx-auto">
                                  <div className="input-group form-floating mb-2 ">
                                      <input name="email" type="email" className="form-control input-subscribe" id="email"
                                             placeholder="Saisir votre émail"
                                             value={email}
                                             onChange={(e) => setEmail(e.target.value)} required
                                             pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
                                      <label htmlFor="email" className="form-label label-subscribe">Email address</label>
                                      <button className="btn btn-primary border-light" type="button" onClick={subscribe} id="button-addon2">Subscribe</button>
                                  </div>
                              </div>
                          </div>

                          <div className="row">
                              {/* Affichage de l'alerte Bootstrap */}
                              {showAlert && (
                                  <div
                                      className="alert alert-success alert-dismissible fade show col-4 mx-auto super-alert"
                                      role="alert"
                                      onClick={handleAlertClick} // Gestionnaire d'événements pour masquer l'alerte lors du clic
                                  >
                                      {confirmationMessage}
                                      <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="alert"
                                          aria-label="Close"
                                      ></button>
                                  </div>
                              )}
                          </div>
                      </div>
                  </section>


              </div>
          </div>


          <div className="container-fluid ">
              <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                  <p className="col-md-4 mb-0 text-light">© 2022 Jimy-Steve, Inc</p>

                  <a href="/"
                     className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                  </a>

                  <ul className="nav col-md-4 justify-content-end">
                      <li className="nav-item"><a href="#" className="nav-link px-2 text-light">Home</a></li>
                      <li className="nav-item"><a href="#" className="nav-link px-2 text-light">Features</a></li>
                  </ul>
              </footer>
          </div>

      </>
  );
}

export default Home;
