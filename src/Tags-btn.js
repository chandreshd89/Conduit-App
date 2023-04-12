import React from "react";

let tagURL = `https://mighty-oasis-08080.herokuapp.com/api/tags`;

class Tagsbtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: null,
    };
  }

  componentDidMount() {
    fetch(tagURL)
      .then((response) => {
        return response.json();
      })
      .then(({ tags }) => {
        this.setState({
          tags,
        });
      });
  }

  render() {
    const { tags } = this.state;

    if (!tags) {
      return <h2>Loading...</h2>;
    }

    return (
      <>
        <div className="tags-card">
          <h2>Popular Tags</h2>{" "}
          {tags
            .filter((tag) => tag.trim())
            .map((tag) => {
              return (
                <button
                  onClick={() => this.props.handleSelectedTag(tag)}
                  className="tags"
                >
                  {tag}
                </button>
              );
            })}
        </div>
      </>
    );
  }
}

export default Tagsbtn;
