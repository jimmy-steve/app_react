import React from "react";
import NavBarBootstrap from "../incs/NavBarBootstrap";
import Axios from "axios";
import { Navigate } from "react-router-dom";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      redirect: false,
      errors: [],
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value }, () => {
      // console.log(this.state.name);
    });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value }, () => {
      // console.log(this.state.email);
    });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value }, () => {
      // console.log(this.state.password);
    });
  };

  handleConfirmPasswordChange = (event) => {
    this.setState({ confirm_password: event.target.value }, () => {
      // console.log(this.state.confirm_password);
    });
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ redirect: true });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");

    let bodyFormData = new FormData();
    bodyFormData.set("name", this.state.name);
    bodyFormData.set("email", this.state.email);
    bodyFormData.set("password", this.state.password);
    bodyFormData.set("confirm_password", this.state.confirm_password);

    Axios.post(
      "https://de-lafontaine.ca/mealplanner/public/api/register",
      bodyFormData
    )
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.api_token);
        this.setState({ redirect: true });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.setState({ errors: error.response.data.errors }, () => {
            console.log(this.state.errors);
          });
        }
        console.log(error.response);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/login" />;
    }

    return (
      <>
        <NavBarBootstrap />
        <div className="container">
          <div className="row">
            <div className="card mt-5 p-4 col-6 mx-auto">
              <h3>Register</h3>
              <form method="POST" onSubmit={this.handleSubmit}>
                <div className="form-group mt-4">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      this.state.errors && this.state.errors.name
                        ? "is-invalid"
                        : ""
                    }`}
                    id="name"
                    name="name"
                    aria-describedby="emailHelp"
                    placeholder="Enter your name"
                    onChange={this.handleNameChange}
                  />
                  {this.state.errors && this.state.errors.name && (
                    <div className="invalid-feedback">
                      {this.state.errors.name}
                    </div>
                  )}
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className={`form-control ${
                      this.state.errors && this.state.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    name="email"
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
                <div className="form-group mt-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      this.state.errors && this.state.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handlePasswordChange}
                  />
                  {this.state.errors && this.state.errors.password && (
                    <div className="invalid-feedback">
                      {this.state.errors.password}
                    </div>
                  )}
                </div>

                <div className="form-group mt-4">
                  <label htmlFor="confirm_password">
                    Password confirmation
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      this.state.errors && this.state.errors.confirm_password
                        ? "is-invalid"
                        : ""
                    }`}
                    id="confirm_password"
                    placeholder="Password confirmation"
                    onChange={this.handleConfirmPasswordChange}
                  />
                  {this.state.errors && this.state.errors.confirm_password && (
                    <div className="invalid-feedback">
                      {this.state.errors.confirm_password}
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary mt-4">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
