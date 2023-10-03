import { getTokenConfig } from '../util/localStorageUtil';
import instance from './instance';

export const signin = async user => {
  const response = await instance.post('/user/login', user);
  return response.data;
}

export const signup = async user => {
  const response = await instance.post('/user', user);
  return response.data;
}

export const update = async user => {
  const response = await instance.put('/user', user, getTokenConfig());
  return response.data;
}

export const changePassword = async data => {
  const response = await instance.post('/user/resetpassword', data, getTokenConfig());
  return response.data;
}
