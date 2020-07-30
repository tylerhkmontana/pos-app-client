import React from 'react'
import { NavLink } from 'react-router-dom'
import './OrderType.css'

const OrderType = () => {
  return (
    <div className="OrderType">
      <NavLink
        activeClassName="selected-order-category" 
        className="order-category" 
        to="/order/dine-in">Dine-in</NavLink>
      <NavLink
        activeClassName="selected-order-category" 
        className="order-category" 
        to="/order/take-out">Take-out</NavLink>
      <NavLink
        activeClassName="selected-order-category" 
        className="order-category" 
        to="/order/delivery">Delivery</NavLink>
    </div>
  )
}

export default OrderType