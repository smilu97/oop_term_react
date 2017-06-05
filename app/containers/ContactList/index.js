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
import { StickyContainer, Sticky } from 'react-sticky';

// import icons
import { MdChevronRight } from 'react-icons/lib/md';

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
    if (this.props.Login.whoamiCheck) {
      if (this.props.Login.user) {
        this.props.loadContacts();
      } else {
        browserHistory.push('/login');
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.Login.whoamiCheck === false && nextProps.Login.whoamiCheck === true) {
      if (nextProps.Login.user) {
        this.props.loadContacts();
      } else {
        browserHistory.push('/login');
      }
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
          fetching={this.props.contactsFetching || !this.props.Login.whoamiCheck}
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
};

const mapStateToProps = createStructuredSelector({
  contactsFetching: makeSelectContactsFetching(),
  contactsError: makeSelectContactsError(),
  contacts: makeSelectContacts(),
  Login: makeSelectLogin(),
});

const mapDispatchToProps = (dispatch) => ({
  loadContacts: () => dispatch(loadContacts()),
});

export default socketConnect(connect(mapStateToProps, mapDispatchToProps)(HomePage));
