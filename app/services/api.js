import { create } from 'apisauce';
import { serverURL } from '../constants';

export const createAPI = (baseURL = serverURL) => {
    // define the api
  const api = create({
    baseURL,
    headers: {
      Accept: 'application/json',
    },
  });
  const res = {};

    // method to set header in api object
  res.setHeader = api.setHeader;
  res.setHeaders = api.setHeaders;

    // start making calls
  res.login = (phoneNumber, password) => api.post('login', { phoneNumber, password });
  res.whoami = () => api.get('whoami');
  res.signup = (name, phoneNumber, password) => api.post('signup', {
    name, phoneNumber, password,
  });
  res.checkuser = (phoneNumber) => api.get(`checkuser/${phoneNumber}`);
  res.postContact = (name, phoneNumber) => api.post('contact', {
    name, phoneNumber,
  });
  res.getContactPage = (page, pageSize = 20) => api.get(`contacts/${page}`, {
    pageSize,
  });
  res.deleteContact = (otherId) => api.delete(`contact/${otherId}`);
  res.loadContactsAll = () => api.get('contacts/all');
  res.loadContact = (contactId) => api.get(`contact/${contactId}`);

  res.loadMessages = (contactId) => api.get(`contact/${contactId}/messages`);
  res.sendMessage = (contactId, content) => api.post(`contact/${contactId}/message`, { content });

  res.loadOtoRoom = (contactId) => api.get(`room/one_to_one/${contactId}`);
  res.loadRoom = (roomId) => api.get(`room/${roomId}`);

  return res;
};

export default createAPI();
