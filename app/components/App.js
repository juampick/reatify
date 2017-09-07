import React from 'react';
import PropTypes from 'prop-types';
import Favicon from 'react-favicon';
import {connect} from 'react-redux';
import Header from './partials/header/Header';
import Footer from './partials/footer/Footer';
import {FAVICON_SPOTIFY} from '../favicon';

// This component handles the App template used on every page.
class App extends React.Component {
  render(){
    return (
      <div>
        <Favicon url={[FAVICON_SPOTIFY]}/>
        <Header/>
        <div className="container-fluid">
          {this.props.children}
        </div>
        <hr />
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default connect()(App);
