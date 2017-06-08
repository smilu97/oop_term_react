/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { socketConnect } from 'socket.io-react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectLogin } from '../Login/selectors';
import { makeSelectPersisted } from '../../globals/global/selectors';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    socket: React.PropTypes.object,
    persisted: React.PropTypes.bool,
    Login: React.PropTypes.object,
  };

  componentDidMount() {
    window.onbeforeunload = () => {
      if (this.props.Login.user) {
        this.props.socket.emit('user_out', {
          token: this.props.Login.user.token,
        });
      }
      this.props.socket.disconnect();
    };
    if (this.props.persisted) this.initial(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.persisted === false && nextProps.persisted === true) this.initial(nextProps);
    if (this.props.Login.user && nextProps.Login.user === null) {
      this.props.socket.emit('user_out', {
        token: this.props.Login.user.token,
      });
    }
  }

  initial(props) {
    if (props.Login.user) {
      props.socket.emit('user_join', {
        token: props.Login.user.token,
      });
    }
  }

  render() {
    return (
      <div style={{ flex: 1 }} >
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  Login: makeSelectLogin(),
  persisted: makeSelectPersisted(),
});

export const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(socketConnect(App));
