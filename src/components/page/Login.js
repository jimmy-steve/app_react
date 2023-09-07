import React from "react";
import NavBarBootstrap from "../incs/NavBarBootstrap";
import Axios from "axios";
import { Navigate } from "react-router-dom";

// const { login } = useAuth();

class Login extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false,
      errors: [],
    };
  }

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

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ redirect: true });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let bodyFormData = new FormData();
    bodyFormData.set("email", this.state.email);
    bodyFormData.set("password", this.state.password);

    Axios.post(
      "https://de-lafontaine.ca/mealplanner/public/api/login",
      bodyFormData
    )
      .then((response) => {
        const userId = response.data.user.id;
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", response.data.user.api_token);

        // Marquez l'utilisateur comme connecté en définissant un drapeau dans localStorage
        localStorage.setItem("userLoggedIn", "true");
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
      return <Navigate to="/" />;
    }

    return (
      <>
        <NavBarBootstrap />
        <div className="container">
          <div className="row">
            <div className=" col-md-6 col-sm-10 col-lg-6 mx-auto">


            <div className="card mt-5 p-4 mx-auto">
              <h3>Login</h3>
              <form method="POST" onSubmit={this.handleSubmit}>
                <div className="form-group mt-4">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className={`form-control ${
                      this.state.errors && this.state.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    id="exampleInputEmail1"
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
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      this.state.errors && this.state.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={this.handlePasswordChange}
                  />
                  {this.state.errors && this.state.errors.password && (
                    <div className="invalid-feedback">
                      {this.state.errors.password}
                    </div>
                  )}
                </div>
                {this.state.errors &&
                this.state.errors === "bad_credentials" ? (
                  <div className="alert alert-warning mt-2">
                    Vos identifiants de connexion sont incorrects.
                  </div>
                ) : (
                  ""
                )}
                <button type="submit" className="btn btn-primary mt-4">
                  Login
                </button>
              </form>
            </div>


            </div>

          </div>
        </div>
        <div className="d-flex justify-content-center mt-5">
          {/* <a href="http://127.0.0.1:8000/auth/redirect/google">
            <img
              src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"
              alt="google login button"
            />
            <GoogleLoginButton style={{ maxWidth: 400, minWidth: 300 }} />
          </a> */}
        </div>
      </>
    );
  }
}

export default Login;
