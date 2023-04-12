import React from "react";

const loginURL = `https://mighty-oasis-08080.herokuapp.com/api/user`;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef;
    this.state = {
      bio: "",
      image: "",
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

  updateUser = (e) => {
    e.preventDefault();
    const { token } = this.props.user;

    fetch(loginURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        user: {
          bio: this.state.bio,
          image: this.state.image,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data?.user?.token) {
          localStorage.setItem("token", data.user.token);
          this.props.loggedUser(data.user);
        }
      });
  };

  componentDidMount() {
    this.setState({
      ...this.props.user,
    });
  }

  render() {
    return (
      <>
        <form className="settings">
          <header>
            <h2>your Settings</h2>
          </header>
          <input
            className="mt-1"
            type="text"
            placeholder="URL of profile picture"
            name="image"
            value={this.state.image}
            onChange={this.getData}
          />
          <input
            className="mt-1"
            type="text"
            placeholder={this.props.user.username}
            disabled
          />
          <textarea
            rows="5"
            cols="48"
            placeholder="Short bio about you "
            name="bio"
            value={this.state.bio}
            onChange={this.getData}
          />
          <input
            className="mt-1"
            type="email"
            placeholder={this.props.user.email}
            disabled
          />
          <input
            className="mt-1"
            type="password"
            placeholder="Password"
            name="Password"
            onChange={this.getData}
          />
          <div className="btn-primary">
            <button onClick={this.updateUser}>Update Settings</button>
          </div>
        </form>
      </>
    );
  }
}

export default Settings;
