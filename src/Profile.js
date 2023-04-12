import { format } from "date-fns";

import React from "react";
import { NavLink } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: "",
      articles: null,
    };
  }

  componentDidMount() {
    fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/articles?author=${this.props.slug}`
    )
      .then((response) => {
        return response.json();
      })
      .then(({ articles }) => {
        this.setState({
          articles,
        });
      });
  }

  render() {
    return (
      <>
        <div className="user ">
          <div className="container flex-col">
            <img
              className="userImg"
              src={this.props.user?.image}
              alt={this.props.user?.username}
            />
            <p>{this.props.slug}</p>
            <span>{this.props.user?.bio}</span>{" "}
            <button className="flexEnd">
              <i className="fa-solid fa-gear" />
              <NavLink to="/settings"> Edit Profile settings</NavLink>
            </button>
          </div>
        </div>
        <div>
          {this.state.articles ? (
            <>
              <div className="feedContainer ">
                <h3>My Feed</h3>
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
            </>
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </>
    );
  }
}

export default Profile;
