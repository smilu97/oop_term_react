
import { fromJS } from 'immutable';
import contactDetailReducer from '../reducer';

describe('contactDetailReducer', () => {
  it('returns the initial state', () => {
    expect(contactDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
