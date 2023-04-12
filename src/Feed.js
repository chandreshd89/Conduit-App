import React from "react";
import Pagination from "./Pagination";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";

let articleURL = `https://mighty-oasis-08080.herokuapp.com/api/articles`;

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      articlesCount: 0,
      articlesPerPage: 10,
      activePageIndex: 1,
      updateCurrentPage: "",
      toggle: false,
      activeTab: "feed",
    };
  }

  fetchArticle = () => {
    this.setState(
      {
        articles: null,
        articlesCount: [],
      },
      () => {
        const tagParam =
          this.state.activeTab === "feed" ? "" : `&tag=${this.props.tag}`;

        fetch(
          articleURL +
            `?offset=${(this.state.activePageIndex - 1) * 20}${tagParam}`
        )
          .then((response) => {
            return response.json();
          })
          .then(({ articles, articlesCount }) => {
            this.setState({
              articles,
              articlesCount,
            });
          });
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.tag !== this.props.tag ||
      prevState.activeTab !== this.state.activeTab ||
      prevState.activePageIndex !== this.state.activePageIndex
    ) {
      this.fetchArticle();
    }
  }

  componentDidMount() {
    this.fetchArticle();
  }

  render() {
    // return ({
    // // if (!this.state.articles) {
    // //   return (
    // //     <section className="global-feed">
    // //       <h2>Loading...</h2>
    // //     </section>
    // //   );
    // // }

    return (
      <div className="global-feed ">
        <section>
          <div className="tabs">
            <button
              className={`global ${
                this.state.activeTab === "global" ? "active" : ""
              }`}
              onClick={() => {
                this.setState({
                  activeTab: "global",
                });
              }}
            >
              My Feed
            </button>
            {this.props.tag ? (
              <div className="flex">
                {" "}
                <button
                  className={`global ${
                    this.state.activeTab === "feed" ? "active" : ""
                  }`}
                  onClick={() => {
                    this.setState({
                      activeTab: "feed",
                    });
                  }}
                >
                  {" "}
                  My Feed
                </button>
                <div
                  onClick={() =>
                    this.handleDelete(this.setState({ activeTab: "" }))
                  }
                >
                  x
                </div>
              </div>
            ) : null}
          </div>
          {this.state.articles ? (
            <div className="feedContainer ">
              <div>
                {this.state.articles.map((article) => {
                  return (
                    <div className="details">
                      <div className="flex flex-space">
                        <div className="flex">
                          <img
                            src={article.author.image}
                            alt={article.author.username}
                          />{" "}
                          <div>
                            <h4>{article.author.username}</h4>
                            <small>
                              {format(
                                new Date(article.createdAt),
                                "E MMM d yyyy"
                              )}
                            </small>
                          </div>
                        </div>
                        <div
                          className="click-box flex-center"
                          onClick={() => this.ToggleButton()}
                        >
                          <i className="fa-solid fa-heart"></i>{" "}
                          {this.state.toggle === true ? 1 : 0}
                        </div>
                      </div>
                      <h5>{article.slug}</h5>
                      <span>{article.author.username}</span>
                      <div className="readMore-btn">
                        <button>
                          <NavLink
                            className="none"
                            to={`/article/${article.slug}`}
                          >
                            ReadMore...
                          </NavLink>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <h3>Loading...</h3>
          )}
        </section>
        <Pagination
          articlesCount={this.state.articlesCount}
          activePageIndex={this.state.activePageIndex}
          articlesPerPage={this.state.articlesPerPage}
          updateCurrentPage={this.updateCurrentPage}
        />
      </div>
    );
  }
}

export default Feed;
