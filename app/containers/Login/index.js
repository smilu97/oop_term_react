/*
 *
 * Login
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

// Import components
import { StickyContainer, Sticky } from 'react-sticky';

// Import reactstrap components
import {
  Form, FormGroup, Label, Input,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Jumbotron,
} from 'reactstrap';

// Import selectors
import {
  makeSelectLogin,
} from './selectors';

// Import actions
import {
  login,
} from './actions';

// Import my components
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      password: '',
      navOpen: false,
      modal: false,
      modalMsg: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.Login.loginFetching === true && nextProps.Login.loginFetching === false) {
      if (nextProps.Login.loginError === null) {
        browserHistory.push('/contact/list');
      } else {
        this.toggleModal(nextProps.Login.loginError);
      }
    }
  }
  toggleModal(modalMsg) {
    this.setState({ modal: !(this.state.modal), modalMsg });
  }
  login() {
    const { phoneNumber, password } = this.state;
    this.props.login(phoneNumber, password);
  }
  goGithub() {
    location.href = 'https://github.com/smilu97/oop_term_react';
  }
  handlePhoneNumberChange(evt) {
    const phoneNumber = evt.target.value;
    const lastChar = phoneNumber.charAt(phoneNumber.length - 1);
    if ((lastChar >= '0' && lastChar <= '9' && phoneNumber.length < 12) || phoneNumber.length === 0) {
      this.setState({ phoneNumber });
    }
  }
  handleKeyPress(evt, code, cb) {
    if (evt.charCode === code) {
      cb();
    }
  }
  renderBanner() {
    return (
      <Jumbotron>
        <h1 className="display-3">{"Hello! I don't have any weapon"}</h1>
        <p className="lead">{'이 웹사이트는 한양대학교 2017년 객체지향설계수업 4번째 프로젝트,'}<br />{' 웹 프로젝트의 일환으로 만들어진 샘플 전화번호부 서비스 입니다!'}</p>
        <hr className="my-2" />
        <p>{'본 웹사이트에 있는 모든 서비스는 실제 서비스가 아니며 2017년 12월 전에 닫힐 것입니다. 모든 개인정보는 제 개인 저장소에 보관되며 유출 등의 사고시 책임 지지 않습니다'}</p>
        <p className="lead">
          <Button color="primary" onClick={() => this.goGithub()}>Go Github</Button>
        </p>
      </Jumbotron>
    );
  }
  renderLoginForm() {
    return (
      <Form style={{ margin: '30px 30px 0 30px' }} >
        <FormGroup>
          <Label>PHONE NUMBER</Label>
          <Input
            type="text" placeholder="PHONE NUMBER"
            value={this.state.phoneNumber}
            onChange={(e) => this.handlePhoneNumberChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label>PASSWORD</Label>
          <Input
            type="password" placeholder="PASSWORD"
            value={this.state.password}
            onKeyPress={(e) => this.handleKeyPress(e, 13, () => this.login())}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </FormGroup>
        <Button outline color="primary" onClick={() => this.login()}>LOGIN</Button>
      </Form>
    );
  }
  renderModal() {
    return (
      <Modal isOpen={this.state.modal} toggle={() => this.toggleModal()}>
        <ModalHeader toggle={() => this.toggleModal()}>Message</ModalHeader>
        <ModalBody>
          {this.state.modalMsg}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.toggleModal()}>OK</Button>
        </ModalFooter>
      </Modal>
    );
  }
  render() {
    return (
      <div style={{ flex: 1 }} >
        <StickyContainer>
          <Sticky>
            {
              ({ style }) => (
                <div style={style}>
                  <Header />
                </div>
              )
            }
          </Sticky>
          {this.renderBanner()}
          {this.renderLoginForm()}
          {this.renderModal()}
          <Footer />
        </StickyContainer>
      </div>
    );
  }
}

Login.propTypes = {
  Login: PropTypes.object,
  login: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  Login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: (phoneNumber, password) => dispatch(login(phoneNumber, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
