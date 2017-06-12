/*
 *
 * Chat
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { socketConnect } from 'socket.io-react';
import { browserHistory } from 'react-router';
import { fromJS } from 'immutable';

// import components
import Scrollbars from 'react-custom-scrollbars';

// import reactstrap components
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button,
  Nav, NavItem, NavLink,
  Form, FormGroup, Label, Input,
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap';

// import actions
import {
  loadRoom,
  receiveMessage,
  initAction,
  invite,
  exitRoom,
} from './actions';

import { checkRoom } from '../../globals/room/actions';
import { loadContacts } from '../ContactList/actions';

// import selectors
import {
  makeSelectFetching,
  makeSelectError,
  makeSelectMessages,
  makeSelectRoom,
  makeSelectInviting,
  makeSelectInviteError,
  makeSelectExiting,
  makeSelectExitError,
} from './selectors';

import {
  makeSelectLogin,
} from '../Login/selectors';

import { makeSelectPersisted } from '../../globals/global/selectors';

import { makeSelectContactList } from '../ContactList/selectors';

// import my components
import Header from '../../components/Header';
import SidebarContainer from '../../components/SidebarContainer';

// import styled components
import {
  SendMessageButton,
  MainContainer,
  MessageInput, MessageInputContainer,
  MessageRow, MessageBox, MessageText,
  MessageTextBox, MessageThumbBox, MessageUsername,
  MessageThumb,
  Title, TabItemContainer,
} from './components';

export class Chat extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalMsg: '',
      message: '',
      tabIdx: 0,
      username: '',
      usernameError: '',
      inviteList: fromJS([]),
      inviteDict: fromJS({}),
    };
    this.chatListener = (v) => this.handleGetMessage(v);
  }
  componentDidMount() {
    if (this.props.persisted) this.initial(this.props);
  }
  componentWillReceiveProps(nextProps) {
    // about initial loading messages
    if (this.props.fetching === true && nextProps.fetching === false) {
      if (nextProps.error === null) {
        const users = nextProps.room.users;
        const user = users.reduce((result, obj) => ({ ...result, [obj.id]: obj }), {});
        this.setState({ user }, () => this.scroll.scrollToBottom());
      } else {
        this.toggleModal(nextProps.error);
      }
    }
    // persist
    if (this.props.persisted === false && nextProps.persisted === true) {
      this.initial(nextProps);
    }
    // about param
    if (this.props.params.roomId !== nextProps.params.roomId) {
      this.setState({}, () => this.componentDidMount());
    }
    // exit
    if (this.props.exiting === true && nextProps.exiting === false) {
      if (nextProps.exitError === null) {
        browserHistory.push('/contact/list');
      }
    }
    // about changing roomId
    if (this.props.params.roomId !== nextProps.params.roomId) {
      this.props.socket.removeListener('chat', this.chatListener);
    }
  }
  componentWillUnmount() {
    this.props.socket.removeListener('chat', this.chatListener);
  }
  initial(props) {
    if (props.Login.user) {
      props.loadRoom(Number(props.params.roomId));
      props.checkRoom(Number(props.params.roomId));
      props.loadContacts();
      this.props.socket.on('chat', this.chatListener);
    } else {
      browserHistory.push('/login');
    }
  }
  toggleModal(modalMsg) {
    this.setState({ modal: !(this.state.modal), modalMsg });
  }
  send() {
    const { message } = this.state;
    if (message.length === 0) return;
    const { Login, params } = this.props;
    this.props.socket.emit('chat', {
      token: Login.user.token,
      roomId: params.roomId,
      content: message,
    });
    this.scroll.scrollToBottom();
    this.setState({ message: '' });
  }
  makeRoomName() {
    const { room } = this.props;
    if (room) {
      if (room.name) {
        return room.name;
      }
      return room.users.map((user) => user.name).reduce((t1, t2) => `${t1},${t2}`);
    }
    return '';
  }
  gotoTab(tabIdx) {
    this.setState({ tabIdx });
  }
  exit() {
    this.props.exitRoom(this.props.params.roomId);
  }
  pushInviteList(user) {
    this.setState({ inviteList: this.state.inviteList.concat([user]), username: '', inviteDict: this.state.inviteDict.set(user.id, true) });
  }
  removeInviteList(idx) {
    const user = this.state.inviteList.get(idx);
    this.setState({ inviteList: this.state.inviteList.remove(idx), inviteDict: this.state.inviteDict.set(user.id, false) });
  }
  confirmInvites() {
    const { inviteList, inviteDict } = this.state;
    const { params } = this.props;
    this.setState({ inviteList: inviteList.clear(), inviteDict: inviteDict.clear(), username: '' });
    this.props.invite(params.roomId, inviteList.toJS());
  }
  handleGetMessage(msg) {
    if (`${msg.roomId}` === this.props.params.roomId) {
      this.props.receiveMessage(msg);
      this.scroll.scrollToBottom();
    }
  }
  handleMessageChange(e) {
    const message = e.target.value;
    this.setState({ message });
  }
  handleMessageInputKeyPress(e) {
    if (e.charCode === 13) {
      this.send();
    }
  }
  handleUsernameChange(evt) {
    this.setState({ username: evt.target.value });
  }
  renderMessage(msg, idx) {
    const { user } = this.state;
    const mine = (msg.userId === Number(this.props.Login.user.id));
    const username = user ? user[msg.userId].name : '';
    const thumb = (
      <MessageThumbBox>
        <MessageThumb
          src="https://via.placeholder.com/50x50"
          onClick={() => browserHistory.push(`/contact/${msg.userId}`)}
        />
      </MessageThumbBox>
    );
    const text = (
      <MessageTextBox>
        <MessageUsername style={{ textAlign: mine ? 'right' : 'left' }}>{username}</MessageUsername>
        <MessageText>{msg.content}</MessageText>
      </MessageTextBox>
    );
    return (
      <MessageRow key={idx}>
        <MessageBox style={{ alignSelf: mine ? 'flex-end' : 'flex-start' }}>
          {mine ? text : thumb}
          {mine ? thumb : text}
        </MessageBox>
      </MessageRow>
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
  renderChatting() {
    return (
      <TabItemContainer>
        <Title>{this.makeRoomName()}</Title>
        <Scrollbars style={{ flex: 1 }} ref={(t) => (this.scroll = t)}>
          {this.props.messages.map((msg, idx) => this.renderMessage(msg, idx))}
        </Scrollbars>
        <MessageInputContainer>
          <MessageInput
            type="text"
            value={this.state.message}
            onChange={(e) => this.handleMessageChange(e)}
            onKeyPress={(e) => this.handleMessageInputKeyPress(e)}
          />
          <SendMessageButton color="primary" onClick={() => this.send()}>{'SEND'}</SendMessageButton>
        </MessageInputContainer>
      </TabItemContainer>
    );
  }
  renderSetting() {
    return (
      <Scrollbars>
        <h1 className="display-4">{this.makeRoomName()}</h1>
        <Form style={{ margin: '30px 30px 0 30px' }}>
          <FormGroup>
            <Label>
              INVITE USER
              <Label style={{ marginLeft: '10px', color: 'red' }}>{this.state.usernameError}</Label>
            </Label>
            <div style={{ display: 'flex' }}>
              <Input
                type="text" placeholder="USER"
                value={this.state.username}
                onChange={(e) => this.handleUsernameChange(e)}
              />
              <Button style={{ marginLeft: '3px' }} color="info" onClick={() => this.confirmInvites()}>CONFIRM INVITES</Button>
            </div>
            {this.state.username.length === 0 ? this.renderUserlist() : this.renderCandidates()}
          </FormGroup>
          <br /> <Button color="danger" onClick={() => this.exit()}>EXIT</Button>
        </Form>
      </Scrollbars>
    );
  }
  renderUserlist() {
    return (
      <ListGroup style={{ marginTop: '30px' }}>
        {this.state.inviteList.size !== 0 ? <ListGroupItem style={{ backgroundColor: '#31b0d5' }} active>INVITE LIST</ListGroupItem> : null}
        {this.state.inviteList.map((user, idx) => (
          <ListGroupItem
            style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '5px 0 0 10px' }}
            key={idx}
            action
            onClick={() => this.removeInviteList(idx)}
          >
            <ListGroupItemHeading>{user.name}</ListGroupItemHeading>
            <ListGroupItemText>
              {user.phoneNumber}
            </ListGroupItemText>
          </ListGroupItem>
        ))}
        <ListGroupItem active>USER LIST</ListGroupItem>
        {this.props.room ? this.props.room.users.map((user, idx) => (
          <ListGroupItem
            style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '5px 0 0 10px' }}
            key={idx}
            action
          >
            <ListGroupItemHeading>{user.name}</ListGroupItemHeading>
            <ListGroupItemText>
              {user.phoneNumber}
            </ListGroupItemText>
          </ListGroupItem>
        )) : null}
      </ListGroup>
    );
  }
  renderCandidates() {
    const { username } = this.state;
    const candidates = (this.props.ContactList.contacts || [])
      .filter((contact) => contact.name.includes(username) || contact.phoneNumber.includes(username))
      .filter((contact) => this.state.user[contact.id] === undefined)
      .filter((contact) => !(this.state.inviteDict.get(contact.id)));
    return (
      <ListGroup>
        {candidates.map((user, idx) => (
          <ListGroupItem
            style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '5px 0 0 10px' }}
            key={idx}
            onClick={() => this.pushInviteList(user)}
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
  render() {
    const tabs = [
      {
        name: 'CHAT',
        render: this.renderChatting(),
      },
      {
        name: 'SETTING',
        render: this.renderSetting(),
      },
    ];
    return (
      <MainContainer>
        <Header />
        <SidebarContainer
          fetching={this.props.room === null}
          style={{ padding: '10px' }}
        >
          <Nav tabs>
            {tabs.map((tab, tabIdx) => (
              <NavItem key={tabIdx}>
                <NavLink
                  className={this.state.tabIdx === tabIdx ? 'active' : null}
                  onClick={() => this.gotoTab(tabIdx)}
                >
                  {tab.name}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          {tabs[this.state.tabIdx].render}
        </SidebarContainer>
        {this.renderModal()}
      </MainContainer>
    );
  }
}

Chat.propTypes = {
  Login: PropTypes.object,
  socket: PropTypes.object,
  params: PropTypes.object,
  fetching: PropTypes.bool,
  messages: PropTypes.array,
  room: PropTypes.object,
  receiveMessage: PropTypes.func,
  persisted: PropTypes.bool,
  ContactList: PropTypes.object,
  invite: PropTypes.func,
  exitRoom: PropTypes.func,
  exiting: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  Login: makeSelectLogin(),
  fetching: makeSelectFetching(),
  error: makeSelectError(),
  messages: makeSelectMessages(),
  room: makeSelectRoom(),
  persisted: makeSelectPersisted(),
  ContactList: makeSelectContactList(),
  inviting: makeSelectInviting(),
  inviteError: makeSelectInviteError(),
  exiting: makeSelectExiting(),
  exitError: makeSelectExitError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadRoom: (roomId) => dispatch(loadRoom(roomId)),
    receiveMessage: (message) => dispatch(receiveMessage(message)),
    initAction: () => dispatch(initAction()),
    checkRoom: (roomId) => dispatch(checkRoom(roomId)),
    loadContacts: () => dispatch(loadContacts()),
    invite: (roomId, users) => dispatch(invite(roomId, users)),
    exitRoom: (roomId) => dispatch(exitRoom(roomId)),
  };
}

export default socketConnect(connect(mapStateToProps, mapDispatchToProps)(Chat));
