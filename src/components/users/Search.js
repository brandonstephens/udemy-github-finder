import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({ showClear, clearUsers, setAlert, searchUsers }) => {
  const [text, setText] = useState('')

  const onChange = event => {
    setText(event.target.value)
  }

  const onSubmit = event => {
    event.preventDefault()
    if (text === '') {
      setAlert('Empty Search', 'light')
    } else {
      searchUsers(text)
      setText('')
    }
  }

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <input type="text" name="text" placeholder="search users" value={text} onChange={onChange} />
        <input type="submit" value="search" className="btn btn-dark btn-block" />
      </form>
      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </>
  )
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
}

export default Search
