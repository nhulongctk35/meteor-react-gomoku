import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Header } from './../../ui/components/index';
import {
  GomokuContainer,
  About,
} from './../../ui/pages/index';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <main>
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={GomokuContainer} />
                <Route
                  path="/about"
                  component={About} />
              </Switch>
            </div>
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
