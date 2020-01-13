import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext'

const Search = ({ setAlert }) => {
  const githubContext = useContext(GithubContext)
  const [text, setText] = useState('')

  const onChange = event => {
    setText(event.target.value)
  }

  const onSubmit = event => {
    event.preventDefault()
    if (text === '') {
      setAlert('Empty Search', 'light')
    } else {
      githubContext.searchUsers(text)
      setText('')
    }
  }

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <input type="text" name="text" placeholder="search users" value={text} onChange={onChange} />
        <input type="submit" value="search" className="btn btn-dark btn-block" />
      </form>
      {githubContext.users.length > 0 && (
        <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>
          Clear
        </button>
      )}
    </>
  )
}

Search.propTypes = {
  setAlert: PropTypes.func.isRequired,
}

export default Search
