import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import axios from 'axios'
import Alert from './components/layout/Alert'
import About from './components/pages/About'

const App = props => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)
  const [repos, setRepos] = useState([])

  const searchUsers = async text => {
    setLoading(true)
    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    setUsers(response.data.items)
    setLoading(false)
  }

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

  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  const setAlertWithTimeout = (msg, type) => {
    setAlert({
      msg,
      type,
    })

    setTimeout(() => setAlert(null), 5000)
  }

  return (
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
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={setAlertWithTimeout}
                  />
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
  )
}

export default App
