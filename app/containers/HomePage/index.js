/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectHomePage from './selectors';
import { browserHistory } from 'react-router'

import {
  makeSelectContactsFetching,
  makeSelectContactsError,
  makeSelectContacts,
} from './selectors'

import {
  loadContacts
} from './actions'

import {
  MainContainer,
  ContentContainer,
  LeftContainer,
  RightContainer,
  HelloUser,
  ContactRow,
} from './components'

import {
  Container, Row, Col,
} from 'reactstrap'

import Header from '../../components/Header'

import { Scrollbars } from 'react-custom-scrollbars'

export class HomePage extends React.Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {
    if (this.props.login == false) {
      browserHistory.push('/login')
    }
  }
  componentDidMount () {
    this.props.loadContacts()
  }
  renderContact (contact, idx) {
    return (
      <ContactRow key={idx}>
        <strong>{contact.name}</strong>
        <p>{contact.phoneNumber}</p>
      </ContactRow>
    )
  }
  renderLeft () {
    return (
      <LeftContainer>
        <HelloUser>Hello User</HelloUser>
      </LeftContainer>
    )
  }
  renderHome () {
    return (
      <Scrollbars
        style={{flex:1}}>
        <RightContainer>
          {this.props.contacts ? this.props.contacts.map(this.renderContact.bind(this)) : null}
        </RightContainer>
      </Scrollbars>
    )
  }
  render() {
    return (
      <MainContainer>
        <Header/>
        <ContentContainer>
          {this.renderLeft()}
          {this.renderHome()}
        </ContentContainer>
      </MainContainer>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  contactsFetching: makeSelectContactsFetching(),
  contactsError: makeSelectContactsError(),
  contacts: makeSelectContacts(),
  login: state => state.get('login').get('login'),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  loadContacts: () => dispatch(loadContacts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
