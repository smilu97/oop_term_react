/*
 *
 * SignUp
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

import { StickyContainer, Sticky } from 'react-sticky';

import {
  Form, FormGroup, Label, Input, Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Jumbotron,
} from 'reactstrap';

import {
  signup,
} from './actions';

import {
  makeSelectSignUpFetching,
  makeSelectSignUpError,
} from './selectors';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import {
  MainContainer,
} from './components';

export class SignUp extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phoneNumber: '',
      password: '',
      modal: false,
      modalMsg: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.signupFetching === true && nextProps.signupFetching === false) {
      if (nextProps.signupError === null) {
        browserHistory.push('/login');
      } else {
        this.setState({ modal: true, modalMsg: nextProps.signupError });
      }
    }
  }
  signup() {
    const { name, phoneNumber, password } = this.state;
    if (phoneNumber.length !== 10 && phoneNumber.length !== 11) {
      this.setState({ modalMsg: '전화번호는 10자리 혹은 11자리로 구성되어야 합니다', modal: true });
    }
    this.props.signup(name, phoneNumber, password);
  }
  handleNameChange(e) {
    const name = e.target.value;
    if (name.length <= 30) {
      this.setState({ name });
    }
  }
  toggleModal() {
    this.setState({ modal: !(this.state.modal) });
  }
  handlePhoneNumberChange(evt) {
    const phoneNumber = evt.target.value;
    const lastChar = phoneNumber.charAt(phoneNumber.length - 1);
    if ((lastChar >= '0' && lastChar <= '9' && phoneNumber.length < 12) || phoneNumber.length === 0) {
      this.setState({ phoneNumber });
    }
  }
  renderSignupForm() {
    return (
      <Jumbotron style={{ flex: 1 }}>
        <h1 className="display-3">SIGN UP</h1>
        <Form style={{ margin: '30px 30px 0 30px' }} >
          <FormGroup>
            <Label>NAME</Label>
            <Input
              type="text" placeholder="NAME"
              value={this.state.name}
              onChange={(e) => this.handleNameChange(e)}
            />
          </FormGroup>
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
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </FormGroup>
          <Button outline color="primary" onClick={() => this.signup()}>SIGN UP</Button>
        </Form>
      </Jumbotron>
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
      <MainContainer>
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
          {this.renderSignupForm()}
          {this.renderModal()}
          <Footer />
        </StickyContainer>
      </MainContainer>
    );
  }
}

SignUp.propTypes = {
  signupFetching: PropTypes.bool,
  signup: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  signupFetching: makeSelectSignUpFetching(),
  signupError: makeSelectSignUpError(),
});

function mapDispatchToProps(dispatch) {
  return {
    signup: (name, phoneNumber, password) => dispatch(signup(name, phoneNumber, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
