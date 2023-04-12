import React from "react";
import { NavLink, withRouter } from "react-router-dom";
// import { validations } from "./Validations";

let loginURL = `https://mighty-oasis-08080.herokuapp.com/api/users/login`;

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
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

  signInUser = (e) => {
    e.preventDefault();

    const body = {
      user: {
        email: this.state.userEmail,
        password: this.state.userPassword,
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
        if (data && data?.user?.token) {
          localStorage.setItem("token", data.user.token);
          this.props.loggedUser(data.user);
          this.props.history.push("/");
        }
      });
  };

  // addData = (e) => {
  //   e.preventDefault();

  // const getUserArr = localStorage.getItem("userDetails");
  // console.log(getUserArr);
  // const { userEmail, userPassword } = this.state;

  // if (userEmail === "") {
  //   alert("email cannot be blank");
  // } else if (userPassword === "") {
  //   alert("password cannot be blank");
  // } else if (userPassword.length < 5) {
  //   alert("password cannot be less than 5 characters");
  // } else {
  //   if (getUserArr && getUserArr.length) {
  //     const userData = JSON.parse(getUserArr);
  //     console.log(userData);
  //     const userLogin = userData.filter((elm) => {
  //       console.log(elm.userEmail, userEmail);
  //       return (
  //         elm.userEmail === userEmail && elm.userPassword === userPassword
  //       );
  //     });
  //     if (userLogin.length === 0) {
  //       alert("invalid details");
  //     } else {
  //       alert("user logged in successfully");
  //     }
  //   }
  // }
  // };
  render() {
    return (
      <>
        <form className="signIn">
          <h4>Sign In</h4>
          <h5>
            <NavLink className="none" to="/signup">
              Need an Account?
            </NavLink>
          </h5>
          <input
            className="input"
            type="email"
            name="userEmail"
            id="email"
            placeholder="Enter Email"
            value={this.state.userEmail}
            onChange={this.getData}
          />
          <input
            className="input"
            type="password"
            name="userPassword"
            id="password"
            placeholder="Enter password"
            value={this.state.userPassword}
            onChange={this.getData}
          />
          <button onClick={this.signInUser}>Sign In</button>
        </form>
      </>
    );
  }
}

export default withRouter(Signin);
