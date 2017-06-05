
import { fromJS } from 'immutable';
import postContactReducer from '../reducer';

describe('postContactReducer', () => {
  it('returns the initial state', () => {
    expect(postContactReducer(undefined, {})).toEqual(fromJS({}));
  });
});
