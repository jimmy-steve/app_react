import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("token", "myToken");
    // const data = {
    //   email: this.state.email,
    //   password: this.state.password,
    // };
  };

  render() {
    return (
      <>
        <h1>Login</h1>
        <form method="POST" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="email" id="email" name="email" />

          <input
            placeholder="password"
            type="password"
            id="password"
            name="password"
          />
          <button type="submit">Login</button>
        </form>
      </>
    );
  }
}
export default Login;
