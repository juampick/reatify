import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import queryString from 'query-string';
import {Row, Col, Panel, Alert, PageHeader, Button} from 'react-bootstrap';
import * as sessionActions from '../../../actions/sessionActions';

class LoginPage extends React.Component {
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

    if (pathname.includes('login')) { //When enter by login
      console.log('createAuthorizeURL .. login');
      sessionActions.createAuthorizeURL();
    }

    if (pathname.includes('callback')) {
      console.log('checkCallbackResponse');
      sessionActions.checkCallbackResponse(queryString.parse(hash), query);
    }
  }

  dismissAlert() {
    this.setState({
      sessionExpiredAlertVisible: false
    });
  }

  renderHeading() {
    return (
      <PageHeader>Welcome</PageHeader>
    );
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
        <Col md={6} mdOffset={3} sm={6}>
          {this.renderHeading()}
          {this.renderSessionExpiredAlert()}
          <Panel bsStyle="primary" header="Login using Spotify Credentials">
            <p>This demo app explores uses the Spotify Web API.</p>
            <p>To use it, you need to sign in with your Spotify account.</p>
            <Button bsStyle="success" href={authorizeUrl} block >
              <i className="fa fa-spotify"/> Authorize with Spotify
            </Button>
            <hr />
            <Button href="https://www.spotify.com/signup/" bsStyle="warning" bsSize="small" target="_blank">
              Don't have an Account? please register
            </Button>
          </Panel>
        </Col>
      </Row>
    );
  }
}
//="btn btn-success center-block"

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
