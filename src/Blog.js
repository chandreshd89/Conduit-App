import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { format } from "date-fns";
import Pagination from "../src/Pagination";

let articleURL = `https://mighty-oasis-08080.herokuapp.com/api/articles`;
let feedURL = `https://mighty-oasis-08080.herokuapp.com/api/articles/feed`;

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      articlesCount: 0,
      articlesPerPage: 10,
      activePageIndex: 1,
      activeTab: "global",
      updateCurrentPage: "",
      toggle: false,
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
          this.state.activeTab === "global" ||
          this.state.activeTab === "user_feed"
            ? ""
            : `&tag=${this.props.tag}`;

        const url = this.state.activeTab === "user_feed" ? feedURL : articleURL;

        fetch(
          url + `?offset=${(this.state.activePageIndex - 1) * 20}${tagParam}`,
          {
            headers: {
              authorization: `Token ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
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

  ToggleButton() {
    this.setState({ toggle: !this.state.toggle });
  }

  updateCurrentPage = (page) => {
    this.setState({
      activePageIndex: page,
    });
  };

  handleDelete = () => {
    this.setState({ tag: "" });
  };
  render() {
    const { tag } = this.props;
    // if (!this.state.articles) {
    //   return (
    //     <section className="global-feed">
    //       <h2>Loading...</h2>
    //     </section>
    //   );
    // }

    return (
      <div className="global-feed ">
        <section>
          <div className="tabs">
            {this.props.isLoggedIn ? (
              <button
                className={`global ${
                  this.state.activeTab === "user_feed" ? "active" : ""
                }`}
                onClick={() => {
                  this.setState({
                    activeTab: "user_feed",
                  });
                }}
              >
                Your Feed
              </button>
            ) : null}
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
              Global Feed
            </button>
            {this.props.tag ? (
              <div className="flex">
                {" "}
                <button
                  className={`feed ${
                    this.state.activeTab === this.props.tag ? "active" : ""
                  }`}
                  onClick={() => {
                    this.setState({
                      activeTab: this.props.tag,
                    });
                  }}
                >
                  {tag}
                  <span onClick={() => this.handleDelete(tag)}>❌</span>
                </button>
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
                            <h4
                              onClick={() =>
                                this.props.history.push(
                                  `/profile/${article.author.username}`
                                )
                              }
                            >
                              {article.author.username}
                            </h4>
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
                          {article.favoritesCount}
                        </div>
                      </div>
                      <h5>{article.slug}</h5>
                      <span>{article.author.username}</span>{" "}
                      <div className="flex-space">
                        <button className="readMore-btn">
                          <NavLink
                            className="none"
                            to={`/article/${article.slug}`}
                          >
                            ReadMore...
                          </NavLink>
                        </button>
                        <div>
                          {article.tagList.map(
                            (t) =>
                              t && <button className="tags-btn">{t}</button>
                          )}
                        </div>
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

export default withRouter(Blog);
