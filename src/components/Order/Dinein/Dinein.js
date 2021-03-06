import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import tableService from '../../../services/tableSetting.service.js'
import PlaceOrder from '../PlaceOrder/PlaceOrder.js'
import './Dinein.css'

class Dinein extends Component {
  state = {
    tableSettings: []
  }

  async componentDidMount() {
    try {
      const tableSettings = (await tableService.getTableSetting()).data
      this.setState({ tableSettings })
    } catch(err) {
      console.log(err)
    }
  }
  
  render() {

    return (
      <div>
        <div className="section-nav">
          {
            this.state.tableSettings.map(setting => {
              return <NavLink activeClassName="selected-section-route" className="section-route" to={`/order/dine-in/${setting._id}`} key={setting._id}>
                {setting.section}
              </NavLink>
            })
          }
        </div>
        <Switch>
          {
            this.state.tableSettings.map(setting => {
              const tables = []
              var tableIndex = 0
              for(var y = 0; y < setting.size_y; y++) {
                var tableRow = []
                for(var x = 0; x < setting.size_x; x++) {
                  const isAvailable = setting.tableStructure[tableIndex].available
                  const tableNumber = setting.tableStructure[tableIndex].tNumber
                  tableRow.push(
                    <NavLink 
                      to={`/order/dine-in/${setting._id}/${tableIndex}`}
                      className="table" 
                      key={tableIndex} 
                      style={{ visibility: isAvailable ? 'visible' : 'hidden', textDecoration: 'none', color: 'wheat'}}>
                      <p style={{ marginTop: '5px'}}>#{tableNumber}</p>    
                    </NavLink>
                  )
                  tableIndex++
                }   
                tables.push(<div className="table-row" key={x+y}>{tableRow}</div>)
              }
              return <Route exact path={`/order/dine-in/${setting._id}`} key={setting._id}>
                {tables}
              </Route>
            })
          }
          {
            this.state.tableSettings.map(setting => (
              <Route path={`/order/:orderType/${setting._id}/:tableIndex`} component={PlaceOrder} key={setting._id}/>
            ))
          }
        </Switch>
      </div>
    )
  }
}

export default Dinein