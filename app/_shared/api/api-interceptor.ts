import axios from 'axios';

const { TMDB_API_URL, TMDB_ACCESS_TOKEN } = process.env;
export const $api = axios.create({
  baseURL: TMDB_API_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const { headers } = config;
  if (headers && TMDB_ACCESS_TOKEN) {
    headers.Authorization = `Bearer ${TMDB_ACCESS_TOKEN}`;
  }
  return config;
});
