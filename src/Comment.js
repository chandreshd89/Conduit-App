import { format } from "date-fns";
import React from "react";
import { NavLink } from "react-router-dom";

let commentURL = `https://mighty-oasis-08080.herokuapp.com/api/articles`;

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: "",
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

  fetchComment = () => {
    fetch(commentURL + `/${this.props.slug}/comments`)
      .then((res) => res.json())
      .then((data) => {
        if (data.comments) {
          this.setState({
            comments: data.comments,
          });
        }
      });
  };

  commentHandler = (e) => {
    e.preventDefault();
    const { slug } = this.props;
    fetch(commentURL + `/${slug}/comments`, {
      method: "POST",
      headers: {
        authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: {
          body: this.state.comment,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.comment) {
          this.fetchComment();
          this.setState({
            comment: "",
          });
        } else {
          alert("Something went wrong creating comment");
        }
      });
  };

  componentDidMount() {
    this.fetchComment();
  }

  render() {
    return (
      <div>
        <div>
          {this.props.user ? (
            <>
              <form onSubmit={this.commentHandler}>
                <textarea
                  className="comment"
                  cols="5"
                  rows="2"
                  name="comment"
                  value={this.state.comment}
                  onChange={this.getData}
                  placeholder="comment here"
                />
                <button type="submit" className="btn">
                  Add Comment
                </button>
              </form>
            </>
          ) : (
            <p>
              <strong>
                <NavLink className="none" to="/signup">
                  Sign up
                </NavLink>
              </strong>{" "}
              or{" "}
              <strong>
                <NavLink className="none" to="/signin">
                  Sign in
                </NavLink>
              </strong>{" "}
              to add comments on this article.
            </p>
          )}
        </div>
        <div>
          {this.state.comments.map((comment) => (
            <div className="articlepara ">
              <div className="userdetails flex">
                <img src={comment.author.image} alt={comment.author.username} />
                <h4>{comment.author.username}</h4>
                <small>
                  {format(new Date(comment.createdAt), "E MMM d yyyy")}
                </small>
              </div>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Comment;
