
import {
  PERSIST,
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
} from './constants';

export const persist = () => ({
  type: PERSIST,
});

export const socketConnect = () => ({
  type: SOCKET_CONNECT,
});
export const socketDisconnect = () => ({
  type: SOCKET_DISCONNECT,
});
