
import { fromJS } from 'immutable';
import { browserHistory } from 'react-router';
import {
  LOAD_ROOMS,
  LOAD_ROOMS_SUCCESS,
  LOAD_ROOMS_FAIL,
  NEW_MESSAGE,
  CHECK_ROOM,
} from './constants';

const initialState = fromJS({
  fetching: false,
  error: null,
  rooms: null,
});

function roomReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ROOMS:
      return state.set('fetching', true)
              .set('error', null);
    case LOAD_ROOMS_SUCCESS:
      return state.set('fetching', false)
              .set('rooms', fromJS(action.rooms.reduce((result, item) => {
                const next = { ...result, [item.id]: item };
                return next;
              }, {})));
    case LOAD_ROOMS_FAIL:
      return state.set('fetching', false)
              .set('error', action.error);
    case NEW_MESSAGE:
      if (browserHistory.getCurrentLocation().pathname === `/chat/${action.roomId}`) return state;
      if (state.get('rooms') === null) return state;
      if (state.get('rooms').get(action.roomId) === null) return state;
      return state.setIn(['rooms', `${action.roomId}`, 'new'], true);
    case CHECK_ROOM:
      if (state.get('rooms') === null) return state;
      if (state.get('rooms').get(action.roomId) === null) return state;
      return state.setIn(['rooms', `${action.roomId}`, 'new'], false);
    default:
      return state;
  }
}

export default roomReducer;
