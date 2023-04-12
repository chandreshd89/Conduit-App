import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { validations } from "./Validations";
import { withRouter } from "react-router-dom";

let loginURL = `https://mighty-oasis-08080.herokuapp.com/api/users`;

class Signup extends React.Component {
  constructor(props) {
    super(props);
  }

  getData = (e) => {
    const { value, name } = e.target;

    this.setState(() => {
      return {
        ...this.state,
        [name]: value,
      };
    });
  };

  signUpUser = (e) => {
    e.preventDefault();
    const { username, useremail, userpassword } = this.state.user;
    const body = {
      user: {
        username: username,
        email: useremail,
        password: userpassword,
      },
    };

    fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data && data?.user?.token) {
          localStorage.setItem("token", data.user.token);
          this.props.loggedUser(data.user);
          this.props.history.push("/");
        }
      });

    // const { userName, userEmail, userPassword } = this.state;

    // if (userName === "") {
    //   alert("name cannot be blank");
    // } else if (userName.length < 5) {
    //   alert("userName cannot be less than 5 characters");
    // } else if (userEmail === "") {
    //   alert("email cannot be blank");
    // } else if (validations(userEmail)) {
    //   alert("email cannot be blank");
    // } else if (userPassword === "") {
    //   alert("password cannot be blank");
    // } else if (userPassword.length < 5) {
    //   alert("password cannot be less than 5 characters");
    // } else {
    // console.log("data added successfully");
    // localStorage.setItem(
    //   "userDetails",
    //   JSON.stringify([...this.state.data, this.state])
    // );
  };

  render() {
    return (
      <>
        <form className="signUp">
          <h4>Sign Up</h4>
          <h5>
            <NavLink className="none" to="/signin">
              Have an Account?
            </NavLink>
          </h5>
          <input
            type="text"
            name="userName"
            id="username"
            placeholder="Enter Username"
            value={this.props.username}
            onChange={this.getData}
          />
          <input
            type="email"
            name="userEmail"
            id="email"
            placeholder="Enter Email"
            value={this.props.useremail}
            onChange={this.getData}
          />
          <input
            type="password"
            name="userPassword"
            id="password"
            placeholder="Enter password"
            value={this.props.userpassword}
            onChange={this.getData}
          />
          <button onClick={this.signUpUser}>Sign Up</button>
        </form>
      </>
    );
  }
}

export default withRouter(Signup);
