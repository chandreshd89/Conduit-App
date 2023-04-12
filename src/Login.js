import React from "react";
import User from "./components/User/User";
import Blog from "./Blog";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <User />
        <Blog />
      </>
    );
  }
}

export default Login;
