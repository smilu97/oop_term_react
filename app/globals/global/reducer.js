
import { fromJS } from 'immutable';

import {
  PERSIST,
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
} from './constants';

const globalInitialState = fromJS({
  persisted: false,
  socketConnected: false,
});

function globalReducer(state = globalInitialState, action) {
  switch (action.type) {
    case PERSIST:
      return state.set('persisted', true);
    case SOCKET_CONNECT:
      return state.set('socketConnected', true);
    case SOCKET_DISCONNECT:
      return state.set('socketConnected', false);
    default:
      return state;
  }
}

export default globalReducer;
