import React from 'react';
import PropTypes from 'prop-types';
import './HomePage.scss';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>Reatify</h1>
        <p>React Redux Javascript Client using Spotify Web API</p>
      </div>
    );
  }
}

export default HomePage;
