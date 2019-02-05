import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from "../../actions";

import "./Sidebar.css";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    // const { username, password } = this.state;
    // this.props.createNote({ username, password });
    // this.setState({ username: "", password: "" });
    // console.log("log");

    event.preventDefault();

    this.props.logIn(
      {
        username: this.state.username.trim(),
        password: this.state.password.trim()
      },
      this.props.history
    );
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="Login">
        <h3 className="Logitle">Enter Your Username and Password To Login:</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            className="Login-Username"
            value={username}
            name="username"
            type="text"
            placeholder="Enter Your Username"
            onChange={this.handleInputChange}
            required
          />
          <br />
          <input
            className="Login-Password"
            value={password}
            name="password"
            type="text"
            placeholder="Enter Your Password"
            onChange={this.handleInputChange}
            required
          />
          <br />
          <Link
            to="/"
            onClick={this.handleSubmit}
            type="submit"
            className="login-submit"
          >
            Login
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { logIn }
)(Login);
