/**
*
* SidebarContainer
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  Button,
} from 'reactstrap';

import { makeSelectLogin } from '../../containers/Login/selectors';

import Loader from 'halogen/PulseLoader';

import styled from 'styled-components';

const LeftContainer = styled.div`
  width: 20em;
  background-color: lightslategray;
  padding: 20px;

  @media( max-width: 768px ) {
    width: 100%;
  }
`;
const RightContainer = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  @media( max-width: 768px ) {
    flex-direction: column;
  }
`;
const HelloUser = styled.p`
  font-size: 30px;
  color: white;

  @media( max-width: 768px ) {
    position: fixed;
    left: -1000px;
  }
`;
const FillCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
class SidebarContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderLeft() {
    const user = this.props.Login.user;
    const username = user ? user.name : null;
    return (
      <LeftContainer>
        {username ? <HelloUser onClick={() => this.setState({ route: 'home' })} >{username}</HelloUser> : null}
        <Button color="primary" onClick={() => browserHistory.push('/contact/list')}>LIST</Button>{'  '}
        <Button color="primary" onClick={() => browserHistory.push('/contact/post')}>NEW CONTACT</Button>
      </LeftContainer>
    );
  }
  renderRight() {
    return (
      <RightContainer style={this.props.style}>
        {this.props.children}
      </RightContainer>
    );
  }
  renderLoading() {
    return (
      <FillCenter>
        <Loader color="#26A65B" size="16px" margin="4px" />
      </FillCenter>
    );
  }
  render() {
    return (
      <ContentContainer>
        {this.renderLeft()}
        {this.props.fetching ? this.renderLoading() : this.renderRight()}
      </ContentContainer>
    );
  }
}

SidebarContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  fetching: PropTypes.bool,
  style: PropTypes.object,
  Login: PropTypes.object,
};
SidebarContainer.defaultProps = {
  fetching: false,
};

export const mapStateToProps = createStructuredSelector({
  Login: makeSelectLogin(),
});

export default connect(mapStateToProps, null)(SidebarContainer);
