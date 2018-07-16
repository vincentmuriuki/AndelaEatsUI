import Cookie from 'js-cookie';

const logoutActiveUser = () => {
  Cookie.remove('jwt-token', { path: '/', domain: '.andela.com' });
  window.location.href = '/login';
};

export default logoutActiveUser;