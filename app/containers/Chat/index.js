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

// import components
import Scrollbars from 'react-custom-scrollbars';

// import reactstrap components
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button,
} from 'reactstrap';

// import actions
import {
  loadRoom,
  receiveMessage,
  initAction,
} from './actions';

// import selectors
import {
  makeSelectFetching,
  makeSelectError,
  makeSelectMessages,
  makeSelectRoom,
} from './selectors';

import {
  makeSelectLogin,
} from '../Login/selectors';

// import my components
import Header from '../../components/Header';
import SidebarContainer from '../../components/SidebarContainer';

// import styled components
import {
  SendMessageButton,
  MainContainer,
  MessageInput, MessageInputContainer,
  MessageRow, MessageBox, MessageText,
  Title,
} from './components';

export class Chat extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      modal: false,
      modalMsg: '',
    };
    this.first = true;
  }
  componentDidMount() {
    if (this.props.Login.whoamiCheck) {
      if (this.props.Login.user) {
        this.initial(this.props);
      } else {
        browserHistory.push('/login');
      }
    }
    this.props.socket.removeListener('chat');
    this.props.socket.on('chat', (v) => this.handleGetMessage(v));
  }
  componentWillReceiveProps(nextProps) {
    // about initial loading messages
    if (this.props.fetching === true && nextProps.fetching === false) {
      if (nextProps.error === null) {
        // on fetching success
      } else {
        this.toggleModal(nextProps.error);
      }
    }
    // about whoami
    if (this.props.Login.whoamiCheck === false && nextProps.Login.whoamiCheck === true) {
      if (nextProps.Login.user) {
        this.initial(nextProps);
      } else {
        browserHistory.push('/login');
      }
    }
  }
  componentDidUpdate() {
    if (this.first && this.scroll && this.scroll.scrollToBottom) {
      this.scroll.scrollToBottom();
      this.first = false;
    }
  }
  componentWillUnmount() {
    this.props.socket.emit('leave_chat', {
      roomId: this.props.params.roomId,
    });
  }
  initial(props) {
    props.loadRoom(Number(props.params.roomId));
    const { token } = props.Login.user;
    this.props.socket.emit('enter_chat', {
      token,
      roomId: this.props.params.roomId,
    });
  }
  toggleModal(modalMsg) {
    this.setState({ modal: !(this.state.modal), modalMsg });
  }
  send() {
    const { message } = this.state;
    const { Login, params } = this.props;
    this.props.socket.emit('chat', {
      token: Login.user.token,
      roomId: params.roomId,
      content: message,
    });
    this.setState({ message: '' });
  }
  makeRoomName() {
    if (this.props.room) {
      if (this.props.room.name) {
        return this.props.room.name;
      }
      return this.props.room.users.map((user) => user.name).reduce((t1, t2) => `${t1},${t2}`);
    }
    return '';
  }
  handleGetMessage(evt) {
    this.props.receiveMessage(evt);
    this.scroll.scrollToBottom();
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
  renderMessage(msg, idx) {
    return (
      <MessageRow key={idx}>
        <MessageBox style={{ alignSelf: (msg.userId === Number(this.props.Login.user.id) ? 'flex-end' : 'flex-start') }} >
          <MessageText>{msg.content}</MessageText>
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
  render() {
    return (
      <MainContainer>
        <Header />
        <SidebarContainer
          fetching={this.props.fetching || !this.props.Login.whoamiCheck}
          style={{ padding: '10px' }}
        >
          <Title>{`Chat ${this.makeRoomName()}`}</Title>
          <Scrollbars style={{ flex: 1 }} ref={(t) => (this.scroll = t)}>
            {this.props.messages.map((msg, idx) => this.renderMessage(msg, idx))}
          </Scrollbars>
          <MessageInputContainer>
            <MessageInput
              value={this.state.message}
              onChange={(e) => this.handleMessageChange(e)}
              onKeyPress={(e) => this.handleMessageInputKeyPress(e)}
              type="text"
            />
            <SendMessageButton color="primary" onClick={() => this.send()}>{'SEND'}</SendMessageButton>
          </MessageInputContainer>
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
};

const mapStateToProps = createStructuredSelector({
  Login: makeSelectLogin(),
  fetching: makeSelectFetching(),
  error: makeSelectError(),
  messages: makeSelectMessages(),
  room: makeSelectRoom(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadRoom: (roomId) => dispatch(loadRoom(roomId)),
    receiveMessage: (message) => dispatch(receiveMessage(message)),
    initAction: () => dispatch(initAction()),
  };
}

export default socketConnect(connect(mapStateToProps, mapDispatchToProps)(Chat));
