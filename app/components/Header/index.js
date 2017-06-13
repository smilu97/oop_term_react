/**
*
* Header
*
*/

import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

// import styled from reactstrap
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

// import actions
import { logout } from '../../containers/Login/actions';

// import selectors
import { makeSelectLogin } from '../../containers/Login/selectors';
import { makeSelectGlobal } from '../../globals/global/selectors';

const MyNavItem = styled(NavItem)`
  border-radius: 5px;
  &:hover {
    background-color: blue;
    color: white;
  }
`;

const connectionStateText = styled.p`
  float: right;
`;

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
    };
  }
  goto(dest) {
    browserHistory.push(dest);
  }
  logout() {
    this.props.logout();
    browserHistory.push('/login');
  }
  renderLink(onClick, title) {
    return (
      <MyNavItem>
        <NavLink onClick={onClick}>{title}</NavLink>
      </MyNavItem>
    );
  }
  render() {
    const whenNotLogin = [
      this.renderLink(() => this.goto('/login'), 'Login'),
      this.renderLink(() => this.goto('/signup'), 'Sign Up'),
    ];
    const whenLogin = [
      this.renderLink(() => this.goto('/contact/list'), 'Contact'),
      this.renderLink(() => this.goto('/chatroom/post'), 'Create Chat'),
      this.renderLink(() => this.logout(), 'Logout'),
    ];
    const list = this.props.Login.user ? whenLogin : whenNotLogin;
    const isConnect = this.props.Global.socketConnected;
    return (
      <Navbar color="faded" light toggleable>
        <NavbarToggler right onClick={() => this.setState({ navOpen: !(this.state.navOpen) })} />
        <NavbarBrand onClick={() => this.goto('/contact/list')}>Book</NavbarBrand>
        <Collapse isOpen={this.state.navOpen} navbar >
          { list.map((item, idx) => (
            <Nav key={idx}>{item}</Nav>
          )) }
        </Collapse>
        <connectionStateText style={{ color: isConnect ? 'blue' : 'red' }}>
          {isConnect ? 'connected' : 'disconnected'}
        </connectionStateText>
      </Navbar>
    );
  }
}

Header.propTypes = {
  Login: PropTypes.object,
  logout: PropTypes.func,
  Global: PropTypes.object,
};

export const mapStateToProps = createStructuredSelector({
  Login: makeSelectLogin(),
  Global: makeSelectGlobal(),
});

export const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
