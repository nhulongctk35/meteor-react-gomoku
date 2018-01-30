import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  Header,
  Footer,
  DefaultLayout,
} from './../ui/components/index.js';

import { GomokuContainer, About } from './../ui/pages/index';

class RootApp extends Component {

  render() {
    return (
      <Router>
        <div>
          <Header />
          <DefaultLayout>
            <Switch>
              <Route
                exact
                name="index"
                path="/"
                component={GomokuContainer} />
              <Route
                path="/about"
                component={About} /> 
            </Switch>
            <Footer />
          </DefaultLayout>
        </div>
      </Router>
    )
  }
}

export default RootApp;
