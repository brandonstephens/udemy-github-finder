import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import About from './components/pages/About'
import Alert from './components/layout/Alert'
import Navbar from './components/layout/Navbar'
import Search from './components/users/Search'
import User from './components/users/User'
import Users from './components/users/Users'

import GithubState from './context/github/GithubState'

import './App.css'

const App = props => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)
  const [repos, setRepos] = useState([])

  const getUser = async username => {
    setLoading(true)
    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
        process.env.REACT_APP_GITHUB_CLIENT_SECRET
      }`
    )
    setUser(response.data)
    setLoading(false)
  }

  const getUsersRepos = async username => {
    setLoading(true)
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&per_page=5&sort=created:asc`
    )
    setRepos(response.data)
    setLoading(false)
  }

  const setAlertWithTimeout = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 5000)
  }

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <>
                  <div className="container">
                    <Search setAlert={setAlertWithTimeout} />
                    <Alert alert={alert} />
                  </div>
                  <Users loading={loading} users={users} />
                </>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  user={user}
                  repos={repos}
                  loading={loading}
                  getUsersRepos={getUsersRepos}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    </GithubState>
  )
}

export default App
