import axios from 'axios';

const configAxios = (token) => {
  axios.defaults.headers['x-access-token'] = token || "";
};

export default configAxios;
