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

import Loader from 'halogen/PulseLoader';

import styled from 'styled-components';

import { makeSelectLogin } from '../../containers/Login/selectors';
import { makeSelectRooms } from '../../globals/room/selectors';
import { makeSelectPersisted } from '../../globals/global/selectors';

import { loadRooms } from '../../globals/room/actions';

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
const RoomTitleContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
  
  display: flex;
  margin: 10px 0;
  justify-content: space-between;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
const RoomTitle = styled.p`
  color: white;
  margin: 0;
`;
const RoomNotiCircle = styled.div`
  width: 10px;
  height: 10px;
  background-color: #0275d8;
  border-radius: 5px;
  margin: 0 10px;
  align-self: center;
`;

class SidebarContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (this.props.persisted) {
      this.initial(this.props);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.persisted === false && nextProps.persisted === true) this.initial(nextProps);
  }
  initial(props) {
    if (props.Login.user) {
      this.props.loadRooms();
    }
  }
  makeRoomName(room) {
    if (room.name) return room.name;
    if (room.users) return room.users.map((user) => user.name).reduce((a, b) => (`${a}, ${b}`));
    return '';
  }
  gotoChat(roomId) {
    browserHistory.push(`/chat/${roomId}`);
  }
  decideShouldNoti(room) {
    if (room.new === null) {
      if (room.new === null && room.lastMessage) {
        if (room.lastCheck === null) return true;
        const lastCheck = new Date(room.lastCheck);
        const lastMessage = new Date(room.lastMessage.time);
        if (lastCheck < lastMessage) return true;
      }
    } else {
      if (browserHistory.getCurrentLocation() === `/chat/${room.id}`) return false;
      return room.new;
    }
    return false;
  }
  renderLeft() {
    const { Login, rooms } = this.props;
    const user = Login.user;
    const username = user ? user.name : null;
    const roomList = rooms ? rooms.keySeq().toArray().map((key) => rooms.get(key).toJS()) : null;
    return (
      <LeftContainer>
        {username ? <HelloUser onClick={() => this.setState({ route: 'home' })} >{username}</HelloUser> : null}
        {rooms ? roomList.map((room, roomIdx) => (
          <RoomTitleContainer key={roomIdx} onClick={() => this.gotoChat(room.id)}>
            <RoomTitle># {this.makeRoomName(room)}</RoomTitle>
            <RoomNotiCircle style={{ backgroundColor: this.decideShouldNoti(room) ? '#0275d8' : 'white' }} />
          </RoomTitleContainer>
        )) : null}
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
  persisted: PropTypes.bool,
  loadRooms: PropTypes.func,
  rooms: PropTypes.object,
};
SidebarContainer.defaultProps = {
  fetching: false,
};

export const mapStateToProps = createStructuredSelector({
  Login: makeSelectLogin(),
  rooms: makeSelectRooms(),
  persisted: makeSelectPersisted(),
});

export const mapDispatchToProps = (dispatch) => ({
  loadRooms: () => dispatch(loadRooms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
