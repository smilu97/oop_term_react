/**
*
* Header
*
*/

import React from 'react';
// import styled from 'styled-components';

import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor (props) {
    super(props)
    this.state = {
      navOpen: false,
    }
  }
  render() {
    return (
      <Navbar color='faded' light toggleable>
        <NavbarToggler right onClick={() => this.setState({ navOpen: !(this.state.navOpen) })} />
        <NavbarBrand href='/'>Book</NavbarBrand>
        <Collapse isOpen={this.state.navOpen} navbar >
          <Nav>
            <NavItem>
              <NavLink href='/'>Home</NavLink>
            </NavItem>
          </Nav>
          <Nav>
            <NavItem>
              <NavLink href='/login'>Login</NavLink>
            </NavItem>
          </Nav>
          <Nav>
            <NavItem>
              <NavLink href='/signup'>Sign Up</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {

};

export default Header;
