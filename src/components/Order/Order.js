import React from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import OrderType from './OrderType.js'

// Route Components
import Delivery from './Delivery/Delivery.js'
import Dinein from './Dinein/Dinein.js'
import Takeout from './Takeout/Takeout.js'

export default function Order(){
  const { path } = useRouteMatch()

  return (
      <div>
        <OrderType/>
        <Switch>
          <Route path={`${path}/dine-in`} component={Dinein}/>
          <Route path={`${path}/take-out`} component={Takeout}/>
          <Route path={`${path}/delivery`} component={Delivery}/>
        </Switch>
      </div>
  )
}