/*
 *
 * PostChatRoom
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import { fromJS } from 'immutable';

// import external components
import Scrollbars from 'react-custom-scrollbars';

// import reactstrap components
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
  Jumbotron, Form, FormGroup, Label, Input,
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap';

// import styled components
import {
  MainContainer,
} from './components';

// import selectors
import {
  makeSelectFetching,
  makeSelectError,
  makeSelectRoom,
} from './selectors';

import { makeSelectContactList } from '../ContactList/selectors';
import { makeSelectLogin } from '../Login/selectors';
import { makeSelectPersisted } from '../../globals/global/selectors';

// import actions
import {
  postChatroom,
} from './actions';

import { loadContacts } from '../ContactList/actions';

// import components
import Header from '../../components/Header';
import SidebarContainer from '../../components/SidebarContainer';

export class PostChatRoom extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalMsg: '',
      name: '',
      nameError: '',
      users: fromJS([]),
      usersError: '',
      username: '',
      usernameError: '',
    };
  }
  componentDidMount() {
    if (this.props.persisted) this.initial(this.props);
  }
  componentWillReceiveProps(nextProps) {
    // about posting chat room
    if (this.props.fetching === true && nextProps.fetching === false) {
      if (nextProps.error === null) {
        browserHistory.push('/contact/list');
      } else {
        this.toggleModal(nextProps.error);
      }
    }
    // persist
    if (this.props.persisted === false && nextProps.persisted === true) {
      this.initial(nextProps);
    }
  }
  initial(props) {
    if (props.Login.user) {
      props.loadContacts();
    } else {
      browserHistory.push('/login');
    }
  }
  addUser(user) {
    this.setState({ users: this.state.users.concat([user]), username: '' });
  }
  removeUser(idx) {
    this.setState({ users: this.state.users.remove(idx) });
  }
  postChatroom() {
    const { name, users } = this.state;
    let success = true;
    let nameError = '';
    if (name.length === 0) {
      nameError = '채팅방 이름을 입력해주세요';
      success = false;
    }
    if (success) {
      this.props.postChatroom(name, users.toJS().map((user) => user.id));
    } else {
      this.setState({ nameError });
    }
  }
  handleNameChange(evt) {
    this.setState({ name: evt.target.value });
  }
  handleUsernameChange(evt) {
    this.setState({ username: evt.target.value });
  }
  toggleModal(modalMsg = '') {
    this.setState({ modal: !(this.state.modal), modalMsg });
  }
  renderUserlist() {
    return (
      <ListGroup style={{ marginTop: '30px' }}>
        {this.state.users.map((user, idx) => (
          <ListGroupItem
            style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '5px 0 0 10px' }}
            key={idx}
            onClick={() => this.removeUser(idx)}
            action
          >
            <ListGroupItemHeading>{user.name}</ListGroupItemHeading>
            <ListGroupItemText>
              {user.phoneNumber}
            </ListGroupItemText>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
  renderCandidates() {
    const { username } = this.state;
    const candidates = (this.props.ContactList.contacts || [])
      .filter((contact) => contact.name.includes(username) || contact.phoneNumber.includes(username));
    return (
      <ListGroup>
        {candidates.map((user, idx) => (
          <ListGroupItem
            style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '5px 0 0 10px' }}
            key={idx}
            onClick={() => this.addUser(user)}
            action
          >
            <ListGroupItemHeading>{user.name}</ListGroupItemHeading>
            <ListGroupItemText>
              {user.phoneNumber}
            </ListGroupItemText>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
  renderForm() {
    return (
      <Jumbotron style={{ flex: 1, margin: '0' }}>
        <h1 className="display-3">NEW ROOM</h1>
        <Form style={{ margin: '30px 30px 0 30px' }} >
          <FormGroup>
            <Label>
              NAME
              <Label style={{ marginLeft: '10px', color: 'red' }}>{this.state.nameError}</Label>
            </Label>
            <Input
              type="text" placeholder="NAME"
              value={this.state.name}
              onChange={(e) => this.handleNameChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              ADD USERS
              <Label style={{ marginLeft: '10px', color: 'red' }}>{this.state.usernameError}</Label>
            </Label>
            <div style={{ display: 'flex' }}>
              <Input
                type="text"
                value={this.state.username}
                onChange={(e) => this.handleUsernameChange(e)}
                placeholder="초대할 사람의 이름이나 전화번호를 입력히세요"
              />
            </div>
            {this.state.username.length === 0 ? this.renderUserlist() : this.renderCandidates()}
          </FormGroup>
          <Button outline color="primary" onClick={() => this.postChatroom()}>POST</Button>
        </Form>
      </Jumbotron>
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
    return (
      <MainContainer>
        <Header />
        <SidebarContainer>
          <Scrollbars style={{ flex: 1 }} >
            {this.renderForm()}
          </Scrollbars>
        </SidebarContainer>
        {this.renderModal()}
      </MainContainer>
    );
  }
}

PostChatRoom.propTypes = {
  fetching: PropTypes.bool,
  ContactList: PropTypes.object,
  persisted: PropTypes.bool,
  postChatroom: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  fetching: makeSelectFetching(),
  error: makeSelectError(),
  room: makeSelectRoom(),
  ContactList: makeSelectContactList(),
  Login: makeSelectLogin(),
  persisted: makeSelectPersisted(),
});

function mapDispatchToProps(dispatch) {
  return {
    postChatroom: (name, users) => dispatch(postChatroom(name, users)),
    loadContacts: () => dispatch(loadContacts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostChatRoom);
