
import { fromJS } from 'immutable';

import { PERSIST } from './constants';

const globalInitialState = fromJS({
  persisted: false,
});

function globalReducer(state = globalInitialState, action) {
  switch (action.type) {
    case PERSIST:
      return state.set('persisted', true);
    default:
      return state;
  }
}

export default globalReducer;
