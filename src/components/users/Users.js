import React, { useContext } from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import GithubContext from '../../context/github/githubContext'

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '1rem',
}

const Users = () => {
  const githubContext = useContext(GithubContext)
  const { loading, users } = githubContext

  return (
    <div className="container">
      {loading && <Spinner />}

      {!loading && (
        <div style={userStyle}>
          {users.map(user => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Users
