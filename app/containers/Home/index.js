/*
 *
 * Home
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export class Home extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (this.props.login) {
      browserHistory.push('/contact/list');
    } else {
      browserHistory.push('/login');
    }
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

Home.propTypes = {
  login: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  login: state.get('login').get('login'),
});

export default connect(mapStateToProps, null)(Home);
