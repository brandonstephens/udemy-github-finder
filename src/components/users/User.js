import React from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos"

export default class User extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUsersRepos(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUsersRepos: PropTypes.func.isRequired
  };

  render() {
    const { loading, repos } = this.props;
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      company,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user;

    return (
      <div className="container">
        <div>
          <Link to="/" className="btn btn-light">
            Back to Search
          </Link>
        </div>
        {loading && <Spinner />}
        {!loading && (
          <>
            <div className="card grid-2">
              <div className="all-center">
                <img
                  src={avatar_url}
                  alt={login}
                  className="round-img"
                  style={{ width: "150px" }}
                />
                <h1>{name}</h1>
                <p>Location: {location}</p>
              </div>
              <div>
                {bio && (
                  <>
                    <h3>Bio</h3>
                    <p>{bio}</p>
                  </>
                )}
                <div />
                <ul>
                  <li>
                    <strong>Hireable: </strong>
                    {hireable ? (
                      <i className="fas fa-check text-success" />
                    ) : (
                      <i className="fas fa-times-circle text danger" />
                    )}
                  </li>
                  <li>
                    {login && (
                      <>
                        <strong>Username: </strong> {login}
                      </>
                    )}
                  </li>
                  <li>
                    {company && (
                      <>
                        <strong>Company: </strong> {company}
                      </>
                    )}
                  </li>
                  <li>
                    {blog && (
                      <>
                        <strong>Website: </strong> {blog}
                      </>
                    )}
                  </li>
                  <div>
                    <a href={html_url} className="btn btn-dark my-1">
                      Github Profile
                    </a>
                  </div>
                </ul>
              </div>
            </div>
            <div className="card text-center">
              <div className="badge badge-primary">Followers: {followers}</div>
              <div className="badge badge-primary">Following: {following}</div>
              <div className="badge badge-primary">
                Public Repos: {public_repos}
              </div>
              <div className="badge badge-primary">
                Public Gists: {public_gists}
              </div>
            </div>
            <Repos repos={repos} />
          </>
        )}
      </div>
    );
  }
}
