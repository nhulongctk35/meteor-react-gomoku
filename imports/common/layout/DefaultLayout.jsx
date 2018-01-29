import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const Props = {
  children: PropTypes.node.isRequired,
};

class DefaultLayout extends PureComponent {
  
  render() {
    const { children } = this.props;

    return (
      <div className="container">
        {children}
      </div>
    )
  }
}

DefaultLayout.propTypes = Props;
export default DefaultLayout;
