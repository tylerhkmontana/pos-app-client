import React, { Component } from 'react'

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

    const sectionStyle = {
      border: '1px solid black',
      display: 'flex',
      flex: 1
    }

    return (
      <div className="MenuSetting" style={containerStyle}>
        <div style={sectionStyle}>
          <CategorySection />
        </div>
       
        <div style={sectionStyle}>
          <ItemSection />
        </div>
           
      </div>
    )
  }
}
