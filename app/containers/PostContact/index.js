/*
 *
 * PostContact
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

import {
  Jumbotron, Form, FormGroup, Label, Input, Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

import {
  MainContainer,
} from './components';

import {
  makeSelectPostContactFetching,
  makeSelectPostContactError,
} from './selectors';

import { makeSelectLogin } from '../Login/selectors';

import {
  postContact,
} from './actions';

import Header from '../../components/Header';
import SidebarContainer from '../../components/SidebarContainer';

export class PostContact extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalMsg: '',
      name: '',
      phoneNumber: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.fetching === true && nextProps.fetching === false) {
      if (nextProps.error == null) {
        browserHistory.push('/contact/list');
      } else {
        this.toggleModal(nextProps.error);
      }
    }
  }
  toggleModal(modalMsg) {
    this.setState({ modal: !(this.state.modal), modalMsg });
  }
  postContact() {
    const { name, phoneNumber } = this.state;
    this.props.postContact(name, phoneNumber);
  }
  handleNameChange(e) {
    const name = e.target.value;
    this.setState({ name });
  }
  handlePhoneNumberChange(e) {
    const phoneNumber = e.target.value;
    const lastCh = phoneNumber.charAt(phoneNumber.length - 1);
    if ((lastCh >= '0' && lastCh <= '9') || phoneNumber.length === 0) {
      this.setState({ phoneNumber });
    }
  }
  renderForm() {
    return (
      <Jumbotron style={{ flex: 1, margin: '0' }}>
        <h1 className="display-3">NEW CONTACT</h1>
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
          <Button outline color="primary" onClick={() => this.postContact()}>POST</Button>
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
        <Header />
        <SidebarContainer>
          {this.renderForm()}
        </SidebarContainer>
        {this.renderModal()}
      </MainContainer>
    );
  }
}

PostContact.propTypes = {
  fetching: PropTypes.bool,
  postContact: PropTypes.func,
  Login: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  fetching: makeSelectPostContactFetching(),
  error: makeSelectPostContactError(),
  Login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    postContact: (name, phoneNumber) => dispatch(postContact(name, phoneNumber)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContact);
