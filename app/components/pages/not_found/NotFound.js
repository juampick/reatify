import React from 'react';
import {Link} from 'react-router';
import {Col} from 'react-bootstrap';

const NotFound = () => {
  return (
    <Col lg={6} lgOffset={3}>
      <h2>404 Not Found</h2>
      <p>Sorry, the page you were looking for is not available.</p>
      <p>Please try again or go to &nbsp;
        <Link to="/" activeClassName="active"><i className="glyphicon glyphicon-home"/> Home</Link>
      </p>
    </Col>
  );
};

export default NotFound;
