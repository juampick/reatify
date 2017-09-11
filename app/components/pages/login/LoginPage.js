import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import queryString from 'query-string';
import {Row, Col, Panel, Alert, Button} from 'react-bootstrap';
import * as sessionActions from '../../../actions/sessionActions';
import './LoginPage.scss';

export class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sessionExpiredAlertVisible: true
    };

    this.dismissAlert = this.dismissAlert.bind(this);
  }

  componentWillMount() {
    const {location, sessionActions} = this.props;
    const {pathname, hash, query} = location;

    if (pathname.includes('login')) { //When enter by Login.
      sessionActions.createAuthorizeURL();
    }

    if (pathname.includes('callback')) { //When returning from Spotify callback.
      sessionActions.checkCallbackResponse(queryString.parse(hash), query);
    }
  }

  dismissAlert() {
    this.setState({
      sessionExpiredAlertVisible: false
    });
  }

  renderSessionExpiredAlert() {
    const {sessionExpired} = this.props;
    const {sessionExpiredAlertVisible} = this.state;

    if (sessionExpired && sessionExpiredAlertVisible) {
      return (
        <Alert bsStyle="danger">
          <h4>Session Expired</h4>
          <p>Please login in, again.</p>
          <Button onClick={this.dismissAlert}>Hide Alert</Button>
        </Alert>
      );
    }
  }

  render() {
    const {authorizeUrl} = this.props;
    return (
      <Row>
        <Col md={6} mdOffset={3} sm={6} smOffset={3} lg={6} lgOffset={3}>
          {this.renderSessionExpiredAlert()}
          <Panel bsStyle="primary" className="panel-login" header="Login using Spotify Credentials">
            <p>This demo app explores uses the Spotify Web API.</p>
            <p>To use it, you need to sign in with your Spotify account.</p>
            <Button bsStyle="success" href={authorizeUrl} block>
              <i className="fa fa-spotify"/> Authorize with Spotify
            </Button>
            <hr />
            <Button href="https://www.spotify.com/signup/" bsStyle="warning" bsSize="small" target="_blank" block>
              <i className="fa fa-user-plus" />&nbsp;Don't have an Account? Please register
            </Button>
          </Panel>
        </Col>
      </Row>
    );
  }
}

LoginPage.propTypes = {
  sessionActions: PropTypes.object,
  location: PropTypes.object,
  authorizeUrl: PropTypes.string,
  sessionExpired: PropTypes.bool
};

function mapStatesToProps(state) {
  return {
    authorizeUrl: state.auth.authorizeUrl,
    sessionExpired: state.auth.sessionExpired.expired
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sessionActions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(LoginPage);
