import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL ?? 'https://localhost:5001/api'
});

export default instance;
