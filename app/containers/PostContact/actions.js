/*
 *
 * PostContact actions
 *
 */

import {
  POST_CONTACT,
  POST_CONTACT_SUCCESS,
  POST_CONTACT_FAIL,
} from './constants';

// post Contact
export const postContact = (name, phoneNumber) => ({
  type: POST_CONTACT,
  name,
  phoneNumber,
});
export const postContactSuccess = () => ({
  type: POST_CONTACT_SUCCESS,
});
export const postContactFail = (error) => ({
  type: POST_CONTACT_FAIL,
  error,
});
