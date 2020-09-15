import React, { useState, useEffect } from 'react'
import { NavLink, Route, useLocation } from 'react-router-dom'
import PlaceOrder from '../PlaceOrder/PlaceOrder.js'
import './Takeout.css'

const Takeout = () => {
  const [currOrders, setCurrOrders] = useState([])
  const location = useLocation()
  
  useEffect(() => {
    setCurrOrders(JSON.parse(localStorage.getItem('orders')))
  }, [location])

  return (
    <div className="Takeout">
      <div style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' }}>
        <h1>Take-out</h1>
        <NavLink to={'/order/take-out/place-order'} className="place-order-button">Place an Order</NavLink>
      </div>
      
      <Route exact path="/order/take-out">
        {
          currOrders.map(order => (<p>{order.orderType}</p>))
        }
        <button onClick={() => localStorage.clear()}>Clear</button>
      </Route>
      <Route path={'/order/:orderType/place-order'} component={PlaceOrder}/>
    </div>
  )
}

export default Takeout
