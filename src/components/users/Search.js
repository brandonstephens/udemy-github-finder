import React from "react";
import PropTypes from "prop-types";

export default class Search extends React.Component {
  state = {
    text: ""
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    event.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Empty Search", "light");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: "" });
    }
  };

  render() {
    const { showClear, clearUsers } = this.props;

    return (
      <>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="search users"
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="search"
            className="btn btn-dark btn-block"
          />
        </form>
        {showClear && (
          <button className="btn btn-light btn-block" onClick={clearUsers}>
            Clear
          </button>
        )}
      </>
    );
  }
}
