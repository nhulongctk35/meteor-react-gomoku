import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class Nav extends PureComponent {

  render() {
    return (
      <nav className="my-2 my-md-0 mr-md-3">
        <Link to="/" className="p-2 text-dark">Gomoku</Link>
        <Link to="/about" className="p-2 text-dark">About</Link>
      </nav>
    );
  }
}

export default Nav;
