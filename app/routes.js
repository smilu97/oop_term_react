// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/contact/list',
      name: 'contactList',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ContactList/reducer'),
          import('containers/ContactList/sagas'),
          import('containers/ContactList'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('contactList', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Login'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/signup',
      name: 'signUp',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SignUp/reducer'),
          import('containers/SignUp/sagas'),
          import('containers/SignUp'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('signUp', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/contact/post',
      name: 'postContact',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/PostContact/reducer'),
          import('containers/PostContact/sagas'),
          import('containers/PostContact'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('postContact', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/',
      name: 'home',
      getComponent(location, cb) {
        import('containers/Home')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/contact/:contactId',
      name: 'contactDetail',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ContactDetail/reducer'),
          import('containers/ContactDetail/sagas'),
          import('containers/ContactDetail'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('contactDetail', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/chat/:roomId',
      name: 'chat',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Chat/reducer'),
          import('containers/Chat/sagas'),
          import('containers/Chat'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('chat', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
