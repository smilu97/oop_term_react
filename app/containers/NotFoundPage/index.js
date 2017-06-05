/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

import {
  Jumbotron,
} from 'reactstrap';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  renderBanner() {
    return (
      <Jumbotron>
        <h1 className="display-3">Page Not Found! ㅠㅠ</h1>
        <p className="lead">페이지를 찾지 못하였습니다.</p>
        <hr className="my-2" />
        <p>본 웹사이트에 있는 모든 서비스는 실제 서비스가 아니며 2017년 12월 전에 닫힐 것입니다. 모든 개인정보는 제 개인 저장소에 보관되며 유출 등의 사고시 책임 지지 않습니다</p>
      </Jumbotron>
    );
  }
  render() {
    return (
      <div style={{ flex: 1 }} >
        <Header />
        {this.renderBanner()}
        <Footer />
      </div>
    );
  }
}
