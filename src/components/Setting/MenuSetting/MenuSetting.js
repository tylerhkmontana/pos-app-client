import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import CategorySection from './CategorySection/CategorySection.js'
import ItemSection from './ItemSection/ItemSection.js'

export default class MenuSetting extends Component {
  render() {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '70vh',
      width: '100vw'
    }

    return (
      <div className="MenuSetting" style={containerStyle}>
        <CategorySection />
        <Switch>
          <Route path="/setting/menu-setting/:category_id" component={ItemSection}/>
        </Switch>
      </div>
    )
  }
}
