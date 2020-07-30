import React from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import './Setting.css'

import TableSetting from './TableSetting/TableSetting.js'
import MenuSetting from './MenuSetting/MenuSetting.js'

export default function Setting() {
  const { path } = useRouteMatch()
  return (
    <div className="Setting">
      <Switch>
        <Route exact path={`${path}`}>
          <div className="menus">
            <Link to="/setting/table-setting"><button className="setting-buttons">Table Setting</button></Link>
            <Link to="/setting/menu-setting"><button className="setting-buttons">Menu Setting</button></Link>
          </div>
        </Route>
        <Route path={`${path}/table-setting`} component={TableSetting}></Route>
        <Route path={`${path}/menu-setting`} component={MenuSetting}></Route>
      </Switch>
      
    </div>
  )
}

