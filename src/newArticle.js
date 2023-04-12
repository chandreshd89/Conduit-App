import React from "react";
import User from "./components/User/User";
import { withRouter } from "react-router-dom";

const loginURL = `https://mighty-oasis-08080.herokuapp.com/api/articles`;

class Newarticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: [],
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

  publish = (e) => {
    e.preventDefault();
    const { title, description, body, tagList } = this.state;
    const { token } = this.props.user;

    fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tagList.split(",").map((tag) => tag.trim()),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("cant create new article");
        }
        return res.json();
      })
      .then(({ article }) => {
        this.props.history.push("/");
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    return (
      <>
        <form className="newArticle">
          <input
            className="mt-1"
            type="text"
            placeholder="Article Title"
            name="title"
            onChange={this.getData}
            value={this.state.title}
          />
          <input
            className="mt-1"
            type="text"
            placeholder="What's this article about?"
            name="description"
            onChange={this.getData}
            value={this.state.description}
          />
          <textarea
            className="mt-1"
            rows="5"
            placeholder="Write your article (in markdown)"
            name="body"
            onChange={this.getData}
            value={this.state.body}
          />
          <input
            className="mt-1"
            type="text"
            placeholder="Enter Tags"
            name="tagList"
            onChange={this.getData}
            value={this.state.tagList}
          />
          <div className="btn-primary">
            <button onClick={this.publish}>Publish Article</button>
          </div>
        </form>
      </>
    );
  }
}

export default withRouter(Newarticle);
