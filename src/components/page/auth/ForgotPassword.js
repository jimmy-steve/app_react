import React from "react";
import NavBarBootstrap from "../../incs/common/NavBarBootstrap";
import Axios from "axios";
import {Navigate} from "react-router-dom";
import {Link} from "react-router-dom";
import Eclipse1 from "../../../assets/img/big-eclipse.svg";
import Eclipse2 from "../../../assets/img/mid-eclipse.svg";
import Eclipse3 from "../../../assets/img/small-eclipse.svg";

// const { login } = useAuth();

class ForgotPassword extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: "",
            redirect: false,
            errors: [],
        };
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value}, () => {
            // console.log(this.state.email);
        });
    };


    handleSubmit = (event) => {
        event.preventDefault();

        let bodyFormData = new FormData();
        bodyFormData.set("email", this.state.email);

        Axios.post(
            "https://de-lafontaine.ca/mealplanner/public/api/forgot-password/",
            bodyFormData
        )
            .then((response) => {
                console.log(response);
                this.setState({redirect: true});
                return <Navigate to="/login"/>;
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                console.log("finally");
                return <Navigate to="/login"/>;
            });


    };


    render() {
        if (this.state.redirect) {
            return <Navigate to="/login"/>;
        }

        return (
            <>

                <NavBarBootstrap/>
                <img className="big-circle" src={Eclipse1} alt="{Eclipse1}"/>
                <img className="medium-circle" src={Eclipse2} alt="medium-circle"/>
                <img className="small-circle" src={Eclipse3} alt="small-circle"/>

                <div className="container">

                    <div className="row">

                        <div className=" col-md-6 col-sm-10 col-lg-6 mx-auto">


                            <div className="card mt-3 p-4 mx-auto">
                                <h3 className="text-center">Write this &&?% email !!</h3>
                                <form method="POST" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <input
                                            type="email"
                                            className={`form-control ${
                                                this.state.errors && this.state.errors.email
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="email"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter email"
                                            onChange={this.handleEmailChange}
                                        />
                                        {this.state.errors && this.state.errors.email && (
                                            <div className="invalid-feedback">
                                                {this.state.errors.email}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-end">
                                        <button type="submit" className="btn btn-primary mt-4">
                                            Give me a 5 box $
                                        </button>
                                        <p className="no-thanks"><Link to="/thanks">No thanks</Link></p>
                                    </div>
                                </form>
                            </div>


                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default ForgotPassword;
