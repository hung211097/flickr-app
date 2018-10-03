import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Home from './pages/home';
import Detail from './pages/detail';
import Tag from './pages/tag';
import {Header, Footer} from './component/index'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Redirect from='/explore' to='/' />
            <Route exact path='/' component={Home} />
            <Route exact path='/photo/:id' component={Detail} />
            <Route exact path='/photo/tags/:tagName' component={Tag} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
