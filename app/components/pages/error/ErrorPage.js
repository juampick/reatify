import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';

export class ErrorPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {error, errorMessage} = this.props;
    if (error){
      return (
        <div className="error">
          <h1>Error</h1>
          <div className="alert alert-danger" role="alert">{errorMessage}</div>
          <hr />
          <p>You can try again via Login page:</p>
          <Link className="btn btn-primary btn-lg" to="/login">Back lo Login.</Link>
        </div>
      );
    }
    return null;
  }
}

ErrorPage.propTypes = {
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

function mapStatesToProps(state) {
  return {
    error: state.auth.error,
    errorMessage: state.auth.errorMessage
  };
}
export default connect(mapStatesToProps, null)(ErrorPage);
