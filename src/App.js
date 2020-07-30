import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav/Nav.js'
import Message from './components/Message/Message.js'

// Routing Components
import Management from './components/Management/Management.js'
import Order from './components/Order/Order.js'
import Setting from './components/Setting/Setting.js'
import Home from './components/Home/Home.js'

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Message index={0}/>
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

export default App;
