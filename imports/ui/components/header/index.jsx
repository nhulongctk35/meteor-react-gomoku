import React, { PureComponent } from 'react';

import Nav from './components/Nav.jsx';

class Header extends PureComponent {

  render() {
    return (
      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">Meteor Learning</h5>
        <Nav />
      </div>
    )
  }
}

export default Header;
