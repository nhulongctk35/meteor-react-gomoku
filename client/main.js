import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import RootApp from './../imports/startup/client/app.jsx';
// import './scss/app.scss'

const renderRootApp = () => {
  return (
    render(
      <RootApp />,
      document.getElementById('render-target')
    )
  );
}
 
Meteor.startup(renderRootApp);
