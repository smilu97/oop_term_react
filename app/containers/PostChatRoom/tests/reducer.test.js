
import { fromJS } from 'immutable';
import postChatRoomReducer from '../reducer';

describe('postChatRoomReducer', () => {
  it('returns the initial state', () => {
    expect(postChatRoomReducer(undefined, {})).toEqual(fromJS({}));
  });
});
