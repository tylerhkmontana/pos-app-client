import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

export default class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <NavLink exact activeClassName="selected-nav-list" className="nav-list" to="/">Home</NavLink>
        <NavLink activeClassName="selected-nav-list" className="nav-list" to="/order/dine-in">Order</NavLink>
        <NavLink activeClassName="selected-nav-list" className="nav-list" to="/management">Management</NavLink>
        <NavLink activeClassName="selected-nav-list" className="nav-list" to="/setting">Setting</NavLink>
      </div>
    )
  }
}
