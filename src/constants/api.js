import axios from 'axios';

const BASE_URL = 'https://gorest.co.in/public-api';

export const getPosts = async () => {
  const response = await axios.get(`${BASE_URL}/posts`);
  return response.data.data;
};

export const getPost = async (id) => {
  const response = await axios.get(`${BASE_URL}/posts/${id}`);
  return response.data.data;
};

export const getComments = async (postId) => {
  const response = await axios.get(`${BASE_URL}/comments?post_id=${postId}`);
  return response.data.data;
};

export const getUser = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}`);
  return response.data.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data.data;
};

export const createUser = async (name) => {
  const response = await axios.post(`${BASE_URL}/users`, { name });
  return response.data.data;
};

export const deleteUser = async (userId) => {
  await axios.delete(`${BASE_URL}/users/${userId}`);
};
