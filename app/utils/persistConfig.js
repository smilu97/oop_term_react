
import localForage from 'localForage';

// Import transforms
import createEncryptor from 'redux-persist-transform-encrypt';
import { createBlacklistFilter } from 'redux-persist-transform-filter';

export const encryptor = createEncryptor({
  secretKey: 'SuuuuperSecretYuingyeong',
});

export const whoamiCheckBlacklist = createBlacklistFilter(
  'login',
  ['whoamiCheck'],
);

export const persistConfig = {
  // blacklist: [],
  whitelist: ['room', 'login'],
  storage: localForage,
  transforms: [],
  // debounce: 33,
};
