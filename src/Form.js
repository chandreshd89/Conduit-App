import { Switch, Route } from "react-router-dom";
import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Switch>
          <Route path="/signin" exact>
            {" "}
            <Signin handleInput={this.handleInput} errors={this.state.errors} />
          </Route>
          <Route path="/signup" exact>
            <Signup handleInput={this.handleInput} errors={this.state.errors} />
          </Route>
        </Switch>
      </>
    );
  }
}

export default Form;
