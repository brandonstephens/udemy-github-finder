import React from 'react'
import Search from '../users/Search'
import Alert from '../layout/Alert'
import Users from '../users/Users'

const Home = props => {
  return (
    <>
      <div className="container">
        <Search />
        <Alert />
      </div>

      <Users />
    </>
  )
}

export default Home
