import { NavLink } from "react-router-dom";

function User(props) {
  const { user } = props;
  return (
    <>
      <div className="container flex-space">
        <h1>conduit</h1>
        <ul className="nav flex">
          <button>
            <NavLink className="none" to="/" exact>
              Home
            </NavLink>
          </button>
          <button>
            <NavLink activeClassName="active" className="none" to="/newArticle">
              New Article
            </NavLink>
          </button>
          <button>
            <NavLink activeClassName="active" className="none" to="/settings">
              Settings
            </NavLink>
          </button>
          <img src={user?.image} alt={user?.username} />
          <button>
            <NavLink
              activeClassName="active"
              className="none"
              to={`/profile/${user.username}`}
            >
              {user?.username}
            </NavLink>
          </button>
          <div className="logOut">
            <button onClick={props.logOut}>LogOut</button>
          </div>
        </ul>
      </div>
    </>
  );
}

export default User;
