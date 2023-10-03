import { getTokenConfig } from '../util/localStorageUtil';
import instance from './instance';

export const getProfile = async username => {
  const response = await instance.get(`/profile/${username}`, getTokenConfig());
  return response.data
}

export const followProfile = async username => {
  const response = await instance.post(`/profile/${username}/follow`, null, getTokenConfig());
  return response.data;
}

export const unfollowProfile = async username => {
  const response = await instance.delete(`/profile/${username}/follow`, getTokenConfig());
  return response.data;
}
