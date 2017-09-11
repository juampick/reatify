import React from 'react';
import PropTypes from 'prop-types';
import {IndexLink} from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';
import './Header.scss';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderDropDownTitle(user) {
    return (
      <span>
        {user.id} &nbsp;
        {user.image && <img className="img-circle" src={user.image} width="30" height="30" alt="user-image"/>}
      </span>
    );
  }

  renderLoggedSection() {
    const {user, onLogout} = this.props;
    return (
      <Nav pullRight className="logged-nav">
        <NavDropdown eventKey={3} title={this.renderDropDownTitle(user)} id="basic-nav-dropdown">
          <LinkContainer to="/profile">
            <MenuItem eventKey={3.1}><i className="fa fa-address-card"/> &nbsp; Profile</MenuItem>
          </LinkContainer>
          <MenuItem divider/>
          <MenuItem eventKey={3.2} onClick={() => onLogout()}><i className="fa fa-sign-out"/> Logout</MenuItem>
        </NavDropdown>
      </Nav>
    );
  }

  render() {
    const {loggedIn} = this.props;
    return (
      <Navbar fluid collapseOnSelect className="navbar-reatify">
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/" className="navbar-brand">
              ReatifyApp
            </IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <IndexLinkContainer to="/">
              <NavItem eventKey={1}>
                <i className="fa fa-home"/> Home
              </NavItem>
            </IndexLinkContainer>
          </Nav>
          {loggedIn && this.renderLoggedSection()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string
  }).isRequired
};

export default Header;
