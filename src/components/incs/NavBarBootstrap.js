import React from "react";
import { Link } from "react-router-dom";
import BlogDropdown from "./BlogDropdown"; // Importez votre composant BlogDropdown
import FLogo from "../../assets/logos/f-low-resolution-logo-black-on-transparent-background.png";
import { Howl} from "howler";
import ClicSound from "../../assets/mp3/sound1.wav";

// Fonction pour jouer le son
const playMusic = () => {
  const sound = new Howl({
    src: [ClicSound],
    autoplay: true,
    mute: false,
  });
};



class NavbarBootstrap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.token = null;
  }


  logout = () => {
    localStorage.setItem("token", "");
    localStorage.clear();

    this.setState({ token: null });
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userName");

    // localStorage.removeItem("token");
    window.location = "/";
  };

  render() {
    // Access the prop value using this.props.argumentToDisplay
    const { pageTitle } = this.props;
    const userName = localStorage.getItem("userName"); // Récupérez le nom de l'utilisateur depuis le localStorage
    const currentTime = new Date().getHours();
    let greetingMessage = "Bonjour";

    if (currentTime >= 12 && currentTime < 17) {
      greetingMessage = "Bon après-midi";
    } else if (currentTime >= 17) {
      greetingMessage = "Bonsoir";
    }

    return (
      <>
        <nav className="navbar m-1 navbar-expand-lg bg-light">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <h2 className="ms-1 mt-2 font__sicknes">
              <Link to="/">
                <img className={"f-logo"} src={FLogo} alt="logo" />
            </Link>
              {pageTitle}
            </h2>



            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar"
                 aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><i className="fa-solid fa-skull-crossbones me-2 mt-1"></i> De-Lafontaine</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 me-1">

                    {localStorage.getItem("token") ? (
                        <>
                          <li className="nav-item">
                            <span className="btn btn-sm btn-outline-success me-3">
                                {greetingMessage}, {userName}
                              </span>
                          </li>


                          <li className="nav-item">
                            <Link
                                className="btn btn-sm btn-outline-info me-3"
                                to="/recipes"
                            >
                              <i className="fa-solid fa-burger"></i><span className="hide-desktop"> Recipe</span>
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link
                                className="btn btn-sm btn-outline-warning me-3"
                                to="/album"
                            >
                              <i className="fa-solid fa-images"></i><span className="hide-desktop"> Picture</span>
                            </Link>
                          </li>


                          <li className="nav-item">
                            <Link
                                className="btn btn-sm btn-outline-success me-3"
                                to="/blog"
                            >
                              <i className="fa-solid fa-blog"></i><span className="hide-desktop"> Blog</span>
                            </Link>
                          </li>


                          <li className="nav-item">
                            <Link
                                className="btn btn-sm btn-outline-danger me-3"
                                to="/dashboard"
                            >
                              <i className="fa-solid fa-house-user"></i><span className="hide-desktop"> Dashboard</span>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <button
                                className="btn btn-sm btn-outline-dark me-2"
                                onClick={() => this.logout()}
                            >
                              Déconnexion
                            </button>
                          </li>
                        </>
                    ) : (
                        <>

                          <li className="nav-item me-2">
                            <BlogDropdown />
                            </li>
                          <li className="nav-item">
                            <Link
                                className="btn btn-sm btn-outline-warning me-3 mt-1"
                                to="#"
                            >
                              <i className="fa-solid fa-radiation"></i><span className="hide-desktop"> News</span>
                            </Link>
                          </li>


                          <li className="nav-item">
                            <Link
                                className="btn btn-sm btn-outline-danger me-3 mt-1"
                                to="/about"
                            >
                              <i className="fa-solid fa-code"></i><span className="hide-desktop"> About</span>
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link
                                className="btn btn-sm btn-outline-success me-3 mt-1"
                                to="/"
                            >
                              <i className="fa-solid fa-tree-city"></i><span className="hide-desktop"> Home</span>
                            </Link>
                          </li>


                          <li className="nav-item mt-1 btn-connect">
                            <Link className="btn btn-sm btn-outline-dark me-3" onClick={playMusic} to="/login">
                              Connexion
                            </Link>
                          </li>
                          <li className="nav-item mt-1">
                            <Link className="btn btn-sm btn-outline-dark" to="/register">
                              Register
                            </Link>
                          </li>
                        </>
                    )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default NavbarBootstrap;
