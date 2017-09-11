import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Favicon from 'react-favicon';
import {Grid} from 'react-bootstrap';
import * as sessionActions from '../actions/sessionActions';
import Header from './partials/header/Header';
import Footer from './partials/footer/Footer';
import {FAVICON_SPOTIFY} from '../favicon';
import './App.scss';

// This component handles the App template used on every page.
class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true
    };

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.setState({loading: false}), 1500);
  }

  handleLogOut() {
    this.props.sessionActions.logOut();
  }

  render() {
    const {loading} = this.state;
    const {loggedIn, user} = this.props;

    if (loading) { //When app's not ready, loading null
      return null;
    }

    return (
      <div>
        <Favicon url={[FAVICON_SPOTIFY]}/>
        <Header
          loggedIn={loggedIn}
          onLogout={this.handleLogOut}
          user={user}
        />
        <Grid fluid={true} className="container-full-width">
          {this.props.children}
        </Grid>
        <hr/>
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  sessionActions: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

function mapStatesToProps(state) {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.user.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sessionActions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(App);
