import React from "react";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import Comment from "./Comment";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
    };
  }
  deleteHandler = (e) => {
    e.preventDefault();
    const { slug } = this.props.match.params;

    const deleteFetch = `https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`;
    fetch(deleteFetch, {
      method: "DELETE",
      headers: {
        authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  };
  fetchArticle = () => {
    const { slug } = this.props.match.params;
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`)
      .then((response) => {
        return response.json();
      })
      .then(({ article }) => {
        this.setState({
          article,
        });
      });
  };

  componentDidMount() {
    this.fetchArticle();
  }

  render() {
    const { slug } = this.props.match.params;

    const { article } = this.state;

    if (!article) {
      return <h2>Loading...</h2>;
    }
    return (
      <>
        <div className="article ">
          <div className="article-header ">
            <h2>{article.title.toUpperCase()}</h2>
            <div className="flex">
              <img src={article.author.image} alt={article.author.username} />
              <div>
                <h4>{article.author.username}</h4>
                <small>
                  {format(new Date(article.createdAt), "E MMM d yyyy")}
                </small>
                <button className="flexEnd" onClick={this.deleteHandler}>
                  <i className="fa-solid fa-trash"></i> Delete Article
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>{article.body}</p>
          </div>
        </div>
        <Comment slug={slug} user={this.props.user} />
      </>
    );
  }
}

export default Article;
