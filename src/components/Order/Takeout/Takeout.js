import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import PlaceOrder from '../PlaceOrder/PlaceOrder.js'
import './Takeout.css'

const Takeout = () => {
  return (
    <div className="Takeout">
      <div style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' }}>
        <h1>Take-out</h1>
        <NavLink to={'/order/take-out/place-order'} className="place-order-button">Place an Order</NavLink>
      </div>
      
      <Route exact path="/order/take-out">
        <p>Current Orders</p>
      </Route>
      <Route path={'/order/:orderType/place-order'} component={PlaceOrder}/>
    </div>
  )
}

export default Takeout
