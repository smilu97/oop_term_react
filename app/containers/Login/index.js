/*
 *
 * Login
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectLogin from './selectors';
import { browserHistory } from 'react-router'

import {
  Container,
  Row, Col,
  Form, FormGroup, Label, Input,
  Button,
  Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem, NavLink,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Jumbotron,
} from 'reactstrap'

import {
  TitleText
} from './components'

import {
  selectLoginFetching,
  selectLoginError,
  selectLogin,
} from './selectors'

import {
  login
} from './actions'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor (props) {
    super(props)
    this.state = {
      phoneNumber: '',
      password: '',
      navOpen: false,
      modal: false,
      modalMsg: '',
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.loginFetching == true && nextProps.loginFetching == false) {
      if (nextProps.loginError == null) {
        browserHistory.push('/')
        console.log('success to login')
      }
      else {
        this.toggleModal(nextProps.loginError)
        console.log('failed to login, error: ' + nextProps.loginError)
      }
    }
  }
  toggleModal (modalMsg) {
    this.setState({ modal: !(this.state.modal), modalMsg })
  }
  login () {
    const { phoneNumber, password } = this.state
    this.props.login(phoneNumber, password)
  }
  goGithub () {
    location.href = 'https://github.com/smilu97/oop_term_react'
  }
  handlePhoneNumberChange (evt) {
    const phoneNumber = evt.target.value
    const lastChar = phoneNumber.charAt(phoneNumber.length-1)
    if ('0' <= lastChar && lastChar <= '9' && phoneNumber.length < 12 || phoneNumber.length == 0)
      this.setState({ phoneNumber })
  }
  renderBanner () {
    return (
      <Jumbotron>
        <h1 className="display-3">Hello! I don't have any weapon</h1>
        <p className="lead">이 웹사이트는 한양대학교 2017년 객체지향설계수업 4번째 프로젝트,<br/> 웹 프로젝트의 일환으로 만들어진 샘플 전화번호부 서비스 입니다!</p>
        <hr className="my-2" />
        <p>본 웹사이트에 있는 모든 서비스는 실제 서비스가 아니며 2017년 12월 전에 닫힐 것입니다. 모든 개인정보는 제 개인 저장소에 보관되며 유출 등의 사고시 책임 지지 않습니다</p>
        <p className="lead">
          <Button color="primary" onClick={this.goGithub.bind(this)}>Go Github</Button>
        </p>
      </Jumbotron>
    )
  }
  renderLoginForm () {
    return (
      <Form style={{ margin: '30px 30px 0 30px' }} >
        <FormGroup>
          <Label>PHONE NUMBER</Label>
          <Input type='text' placeholder='PHONE NUMBER'
            value={this.state.phoneNumber}
            onChange={(e) => this.handlePhoneNumberChange(e) } />
        </FormGroup>
        <FormGroup>
          <Label>PASSWORD</Label>
          <Input type='password' placeholder='PASSWORD'
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })} />
        </FormGroup>
        <Button outline color='primary' onClick={this.login.bind(this)}>LOGIN</Button>
      </Form>
    )
  }
  renderModal () {
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggleModal.bind(this)}>
        <ModalHeader toggle={this.toggleModal.bind(this)}>Message</ModalHeader>
        <ModalBody>
          {this.state.modalMsg}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleModal.bind(this)}>OK</Button>
        </ModalFooter>
      </Modal>
    )
  }
  render () {
    return (
      <div style={{ flex: 1 }} >
        <Header/>
        {this.renderBanner()}
        {this.renderLoginForm()}
        {this.renderModal()}
        <Footer/>
      </div>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginFetching: selectLoginFetching(),
  loginError: selectLoginError(),
  loginState: selectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    login: (phoneNumber, password) => dispatch(login(phoneNumber, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
