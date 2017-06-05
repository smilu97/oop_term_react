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

import {
  whoami,
} from '../Login/actions';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    socket: React.PropTypes.object,
    whoami: React.PropTypes.func,
  };

  componentDidMount() {
    window.onbeforeunload = () => {
      this.props.socket.disconnect();
    };
    this.props.whoami();
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

});

export const mapDispatchToProps = (dispatch) => ({
  whoami: () => dispatch(whoami()),
});

export default connect(mapStateToProps, mapDispatchToProps)(socketConnect(App));
