import instance from './instance';

export const getTags = async () => {
  const response = await instance.get('/tags');
  return response.data;
}
