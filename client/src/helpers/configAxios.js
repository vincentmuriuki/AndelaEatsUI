import axios from 'axios';

const configAxios = (token) => {
  axios.defaults.headers['x-access-token'] = token || "";
  axios.defaults.headers.Authorization = `Bearer ${token}` || "";
};

export default configAxios;
