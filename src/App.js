import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import menuSettingService from './services/menuSetting.service'

import Nav from './components/Nav/Nav.js'
import Message from './components/Message/Message.js'

// Routing Components
import Management from './components/Management/Management.js'
import Order from './components/Order/Order.js'
import Setting from './components/Setting/Setting.js'
import Home from './components/Home/Home.js'

import './App.css';

class App extends Component {
  async componentDidMount() {
    try {
      const { items, categories } = (await menuSettingService.getMenu()).data
      this.props.populate_menu(categories, items)
    } catch(err) {
      console.log(err)
      this.props.add_errMsg(typeof err.response === 'undefined' ? err.message : err.response.data)
    }
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Message />
          <h1 style={{ marginTop: '15px' }}>POS-APP</h1>
          <Nav />     
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/order" component={Order}/>
            <Route path="/management" component={Management}/>
            <Route path="/setting" component={Setting}/>
          </Switch>     
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add_successMsg: (msg) => dispatch({ type: 'ADD_MESSAGE', payload: { msg_type: 'success', msg } }),
    add_errMsg: (msg) => dispatch({ type: 'ADD_MESSAGE', payload: { msg_type: 'error', msg } }),
    populate_menu: (categories, items) => dispatch({ type: 'POPULATE_MENU', payload: { categories, items } })
  }
}

export default connect(null, mapDispatchToProps)(App);
