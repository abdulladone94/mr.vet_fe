import { isBrowser } from './lib';

export const setAuth = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getAuthUser = () => {
  if (isBrowser()) {
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  }
  return false;
};

export const getAccessToken = () => {
  if (isBrowser()) {
    let user = getAuthUser();
    let token = user['access-token'];

    if (token) {
      return token;
    }
  }
  return false;
};

export const isLoggedIn = () => {
  return Boolean(getAccessToken());
};

export const logout = () => {
  localStorage.clear();
};
