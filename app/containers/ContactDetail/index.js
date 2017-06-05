/*
 *
 * ContactDetail
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

// import components

// import reactstrap components
import {
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

// import styled components
import {
  MainContainer,
  DetailContainer,
  Flex,
} from './components';

// import selectors
import {
  makeSelectFetching,
  makeSelectError,
  makeSelectContact,
  makeSelectDeleting,
  makeSelectDeleteError,
  makeSelectOtoRoom,
  makeSelectFetchingOto,
  makeSelectOtoError,
} from './selectors';

import { makeSelectLogin } from '../Login/selectors';

// import actions
import {
  loadContact,
  deleteContact,
  loadOtoRoom,
} from './actions';

// import my components
import Header from '../../components/Header';
import SidebarContainer from '../../components/SidebarContainer';

export class ContactDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalMsg: '',
    };
  }
  componentDidMount() {
    const { contactId } = this.props.params;
    this.props.loadContact(Number(contactId));
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.deleting === true && nextProps.deleting === false) {
      if (nextProps.deleteError === null) {
        browserHistory.push('/contact/list');
      } else {
        // TODO:
      }
    }
    if (this.props.fetchingOto === true && nextProps.fetchingOto === false) {
      if (nextProps.otoError === null) {
        const { id } = nextProps.otoRoom;
        browserHistory.push(`/chat/${id}`);
      } else {
        this.toggleModal(`일대일 채팅방 로드에 실패했습니다. error: ${nextProps.otoError}`);
      }
    }
  }
  toggleModal(modalMsg = '') {
    this.setState({ modal: !(this.state.modal), modalMsg });
  }
  delete(contactId) {
    this.props.deleteContact(contactId);
  }
  chat(contactId) {
    this.props.loadOtoRoom(contactId);
  }
  renderDetail(contact) {
    if (!contact) return null;
    return (
      <DetailContainer>
        <Flex>
          <h1 className="display-3">{contact.name}</h1>
          <p className="lead">전화번호: {contact.phoneNumber}</p>
        </Flex>
        <Flex>
          <Button color="primary" onClick={() => this.chat(contact.id)}>Chat</Button><br />
          <Button color="danger" onClick={() => this.delete(contact.id)} >DELETE</Button>
        </Flex>
      </DetailContainer>
    );
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
    const { contact } = this.props;
    return (
      <MainContainer>
        <Header />
        <SidebarContainer
          fetching={this.props.fetching} style={{ padding: '30px' }}
        >
          {this.renderDetail(contact)}
        </SidebarContainer>
        {this.renderModal()}
      </MainContainer>
    );
  }
}

ContactDetail.propTypes = {
  params: PropTypes.object,
  fetching: PropTypes.bool,
  contact: PropTypes.object,
  loadContact: PropTypes.func,
  deleting: PropTypes.bool,
  deleteContact: PropTypes.func,
  fetchingOto: PropTypes.bool,
  loadOtoRoom: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  fetching: makeSelectFetching(),
  error: makeSelectError(),
  contact: makeSelectContact(),
  deleting: makeSelectDeleting(),
  deleteError: makeSelectDeleteError(),
  otoRoom: makeSelectOtoRoom(),
  fetchingOto: makeSelectFetchingOto(),
  otoError: makeSelectOtoError(),
  Login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadContact: (contactId) => dispatch(loadContact(contactId)),
    deleteContact: (contactId) => dispatch(deleteContact(contactId)),
    loadOtoRoom: (contactId) => dispatch(loadOtoRoom(contactId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetail);
