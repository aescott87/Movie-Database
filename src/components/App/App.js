import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
//Import Components
import Home from '../Home/Home';
import Details from '../Details/Details';
import Edit from '../Edit/Edit';
import { withRouter } from 'react-router';
import { CssBaseline } from '@material-ui/core';

class App extends Component {

  // Renders the entire app on the DOM
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
      <div className="App">
        <Router>
          <Route exact path='/' component={Home} />
          <Route path='/details/:id' component={Details} />
          <Route path='/edit/:id' component={Edit} />
        </Router>
      </div>
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(App));
