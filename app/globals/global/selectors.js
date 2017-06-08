

import { createSelector } from 'reselect';

export const makeGlobalDomain = () => (state) => state.get('global');

export const makeSelectGlobal = () => createSelector(
    makeGlobalDomain(),
    (substate) => substate.toJS()
);

export const makeSelectPersisted = () => createSelector(
    makeGlobalDomain(),
    (substate) => substate.get('persisted')
);

export default makeSelectGlobal;
