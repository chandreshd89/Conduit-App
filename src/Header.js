import React from "react";
import { NavLink } from "react-router-dom";
import User from "./components/User/User";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return !this.props.isLoggedIn ? (
      <>
        {" "}
        <div className="container flex-space">
          <h1>conduit</h1>
          <ul className="nav flex">
            <button>
              <NavLink className="none" to="/" exact>
                Home
              </NavLink>
            </button>
            <button>
              <NavLink activeClassName="active" className="none" to="/signin">
                Sign In
              </NavLink>
            </button>
            <button>
              <NavLink activeClassName="active" className="none" to="/signup">
                SignUp{" "}
              </NavLink>
            </button>
          </ul>
        </div>
      </>
    ) : (
      <>
        <User
          user={this.props.user}
          loggedUser={this.props.loggedUser}
          logOut={this.props.logOut}
        />
      </>
    );
  }
}

export default Header;
