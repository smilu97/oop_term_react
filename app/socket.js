

// import socket
import io from 'socket.io-client';

// Import actions
import { newMessage } from './globals/room/actions';

import {
    socketConnect,
    socketDisconnect,
} from './globals/global/actions';

// Import constants
import { serverURL } from './constants';

export const makeSocket = (store) => {
    // connect socket
  const socket = io.connect(serverURL);

  socket.on('connect', () => {
    console.log('socket connected');
    store.dispatch(socketConnect());
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected');
    store.dispatch(socketDisconnect());
  });

  socket.on('chat', (v) => {
    store.dispatch(newMessage(v.roomId));
  });

  socket.heartbeatTimeout = 20000;

  return socket;
};

export default makeSocket;
