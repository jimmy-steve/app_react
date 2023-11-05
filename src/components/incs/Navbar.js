import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.token = null;
    }
    logout = () => {
        localStorage.setItem("token", "");
        localStorage.clear();
        this.setState({ token: null });
        // localStorage.removeItem("token");
        // window.location = "/";
    };

    render() {
        // Access the prop value using this.props.argumentToDisplay
        const { pageTitle } = this.props;

        return (
            <>
                <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to={"/"}>Frank</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link active" to={"/"}>Home
                                        <span className="visually-hidden">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/#skills">Skills</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/#projects">Projects</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"contact-me"}>Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

export default Navbar;
