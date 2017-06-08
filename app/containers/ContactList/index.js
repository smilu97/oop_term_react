/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { socketConnect } from 'socket.io-react';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

// import components
import Scrollbars from 'react-custom-scrollbars';

// import icons
import { MdChevronRight, MdAddCircle } from 'react-icons/lib/md';

// import reactstrap components
import {
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

// import selectors
import {
  makeSelectContactsFetching,
  makeSelectContactsError,
  makeSelectContacts,
} from './selectors';

import {
  makeSelectLogin,
} from '../Login/selectors';

import {
  makeSelectPersisted,
} from '../../globals/global/selectors';

// import actions
import {
  loadContacts,
} from './actions';

// import styled components
import {
  MainContainer,
  ContactRow,
  ContactContent,
  ContactOptionContainer,
  ContactName,
  ContactPhoneNumber,
  SearchInput,
  BottomFloatingButton,
} from './components';

// import my components
import Header from '../../components/Header';
import SidebarContainer from '../../components/SidebarContainer';

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalMsg: '',
      search: '',
      scrollTop: 0,
    };
  }
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
      if (props.contacts === null) {
        props.loadContacts();
      }
    } else {
      browserHistory.push('/login');
    }
  }
  handleContactClick(contact) {
    browserHistory.push(`/contact/${contact.id}`);
  }
  handleChangeSearch(e) {
    const search = e.target.value;
    this.setState({ search });
  }
  handleScroll({ top }) {
    this.setState({ scrollTop: top });
  }
  toggleModal(modalMsg = '') {
    this.setState({ modal: !(this.state.modal), modalMsg });
  }
  renderContact(contact, idx) {
    return (
      <ContactRow key={idx} onClick={() => this.handleContactClick(contact)} >
        <ContactContent>
          <ContactName>{contact.name}</ContactName>
          <ContactPhoneNumber>{contact.phoneNumber}</ContactPhoneNumber>
        </ContactContent>
        <ContactOptionContainer>
          <MdChevronRight size={50} />
        </ContactOptionContainer>
      </ContactRow>
    );
  }
  renderContacts() {
    const { contacts } = this.props;
    const { search } = this.state;
    if (contacts) {
      return contacts
        .filter((contact) => contact.name.includes(search) || contact.phoneNumber.includes(search))
        .map((contact, idx) => this.renderContact(contact, idx));
    }
    return null;
  }
  renderModal() {
    return (
      <Modal isOpen={this.state.modal} toggle={() => this.toggleModal()}>
        <ModalHeader toggle={() => this.toggleModal()}>Message</ModalHeader>
        <ModalBody>
          {this.state.modalMsg}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.toggleModal()}>OK</Button>
        </ModalFooter>
      </Modal>
    );
  }
  render() {
    return (
      <MainContainer>
        <Header />
        <SidebarContainer
          fetching={this.props.contacts === null}
        >
          <SearchInput
            style={{ boxShadow: `0 0 ${this.state.scrollTop ? '10px' : '0'} 0` }}
            type="text" onChange={(e) => this.handleChangeSearch(e)}
            value={this.state.search}
            placeholder="SEARCH"
          />
          <Scrollbars style={{ flex: 1 }} onScrollFrame={(e) => this.handleScroll(e)}>
            {this.renderContacts()}
          </Scrollbars>
          <BottomFloatingButton onClick={() => browserHistory.push('/contact/post')}>
            <MdAddCircle size={80} color="#0275d8" />
          </BottomFloatingButton>
        </SidebarContainer>
        {this.renderModal()}
      </MainContainer>
    );
  }
}

HomePage.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  contactsFetching: PropTypes.bool,
  Login: PropTypes.object,
  loadContacts: PropTypes.func,
  persisted: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  contactsFetching: makeSelectContactsFetching(),
  contactsError: makeSelectContactsError(),
  contacts: makeSelectContacts(),
  Login: makeSelectLogin(),
  persisted: makeSelectPersisted(),
});

const mapDispatchToProps = (dispatch) => ({
  loadContacts: () => dispatch(loadContacts()),
});

export default socketConnect(connect(mapStateToProps, mapDispatchToProps)(HomePage));
