/*
 *
 * Home
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

import Loader from 'halogen/PulseLoader';

import styled from 'styled-components';

import { makeSelectLogin } from '../Login/selectors';
import { makeSelectPersisted } from '../../globals/global/selectors';

const MainContainer = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export class Home extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (this.props.persisted) this.initial(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.persisted === false && nextProps.persisted === true) {
      this.initial(nextProps);
    }
  }
  initial(props) {
    if (props.Login.user) {
      browserHistory.push('/contact/list');
    } else {
      browserHistory.push('/login');
    }
  }
  render() {
    return (
      <MainContainer>
        <Loader color="#26A65B" size="32px" margin="4px" />
      </MainContainer>
    );
  }
}

Home.propTypes = {
  persisted: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  Login: makeSelectLogin(),
  persisted: makeSelectPersisted(),
});

export default connect(mapStateToProps, null)(Home);
