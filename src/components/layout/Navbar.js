import React from 'react'
import PropTypes from 'prop-types'

export default class Navbar extends React.Component {
  static defaultProps = {
    title: 'Shenanigans',
    icon: 'fa fa-laugh-squint'
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }

  render() {
    return (
      <nav className="navbar bg-primary">
        <h1><i className={this.props.icon} /> {this.props.title}</h1>
      </nav>
    )
  }
}