import axios from 'axios';

export const BASE_URL = `https://gotogether.site/api`;
export const accessToken = localStorage.getItem('accessToken');

export const baseAxios = axios.create({
  baseURL: `https://gotogether.site/api`,
});

export const baseTokenAxios = axios.create({
  baseURL: `https://gotogether.site/api`,
  headers: { Authorization: `Bearer ${accessToken}` },
});
