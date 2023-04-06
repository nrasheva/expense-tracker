import axios from 'axios';

const timeout = 10000;

export const instance = axios.create({
  baseURL: 'http://192.168.1.15:3000',
  headers: { Authorization: 'Bearer leiskren@gmail.com' },
  timeout: timeout,
});
