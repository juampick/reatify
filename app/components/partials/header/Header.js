import React from 'react';
import PropTypes from 'prop-types';
import {Link, IndexLink} from 'react-router';

const Header = () => {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <IndexLink to="/" activeClassName="navbar-brand" className="navbar-brand">
            ReatifyApp
          </IndexLink>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <IndexLink to="/" activeClassName="active"><i className="fa fa-home"/> Home</IndexLink>
          </li>
          <li>
            <Link to="/about" activeClassName="active"><i className="fa fa-address-book"/> About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Header.propTypes = {
  //
};

export default Header;
