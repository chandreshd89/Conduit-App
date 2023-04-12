import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Blog from "./Blog";
import Tags from "./Tags-btn";
import Signin from "./Signin";
import Signup from "./Signup";
import { Switch, Route } from "react-router-dom";
import Article from "./Article";
import Newarticle from "./newArticle";
import Settings from "./Settings";
import Profile from "./Profile";

function NoAuthRoute(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Hero />
        <div className="flex">
          {" "}
          <Blog tag={props.tag} />
          <Tags handleSelectedTag={props.handleSelectedTag} />
        </div>
      </Route>
      <Route path="/signin" exact>
        <Signin loggedUser={props.loggedUser} />
      </Route>
      <Route path="/signup" exact>
        <Signup loggedUser={props.loggedUser} />
      </Route>
      <Route
        path="/article/:slug"
        component={(props) => <Article {...props} />}
      />
      <Route path="*">
        <h2>No Page Found</h2>
      </Route>
    </Switch>
  );
}

function AuthRoute(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Hero />
        <div className="flex">
          {" "}
          <Blog
            tag={props.tag}
            isLoggedIn={props.isLoggedIn}
            user={props.user}
          />
          <Tags handleSelectedTag={props.handleSelectedTag} />
        </div>
      </Route>
      <Route
        path="/article/:slug"
        component={({ match }) => <Article match={match} user={props.user} />}
      />
      <Route path="/newarticle">
        <Newarticle user={props.user} />
      </Route>
      <Route path="/settings">
        <Settings user={props.user} />
      </Route>
      <Route
        path={`/profile/:author`}
        component={({ match }) => (
          <Profile slug={match.params.author} user={props.user} />
        )}
      ></Route>
      <Route path="*">
        <h2>No Page Found</h2>
      </Route>
    </Switch>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentpage: 1,
      selectedTag: "",
      isLoggedIn: false,
      user: null,
      comments: [],
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

  handleSelectedTag = (tag) => {
    this.setState({ selectedTag: tag });
  };

  loggedUser = (user) => {
    this.setState({
      isLoggedIn: true,
      user: user,
    });
  };

  logOut = () => {
    localStorage.clear();
    this.setState({
      isLoggedIn: false,
      user: null,
    });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("https://mighty-oasis-08080.herokuapp.com/api/user", {
        headers: {
          authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.user)
            this.setState({
              isLoggedIn: true,
              user: data.user,
              loading: false,
            });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }

    return (
      <>
        <Header
          loggedUser={this.loggedUser}
          isLoggedIn={this.state.isLoggedIn}
          logOut={this.logOut}
          user={this.state.user}
        />
        <main>
          {this.state.isLoggedIn ? (
            <AuthRoute
              user={this.state.user}
              tag={this.state.selectedTag}
              // tag={this.state.tag}
              handleSelectedTag={this.handleSelectedTag}
              isLoggedIn={this.state.isLoggedIn}
            />
          ) : (
            <NoAuthRoute
              loggedUser={this.loggedUser}
              tag={this.state.selectedTag}
              handleSelectedTag={this.handleSelectedTag}
            />
          )}
        </main>
      </>
    );
  }
}

export default App;
