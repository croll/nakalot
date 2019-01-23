// @flow
import type { GetState, Dispatch } from '../reducers/types';

const UserStore = require('electron-store');

const userStore = new UserStore();

export const SET_PARAMETERS_EMAIL = 'SET_PARAMETERS_EMAIL';
export const SET_PARAMETERS_PASSWORD = 'SET_PARAMETERS_PASSWORD';
export const SET_PARAMETERS_APIKEY = 'SET_PARAMETERS_APIKEY';
export const SET_PARAMETERS_PROJECTHANDLE = 'SET_PARAMETERS_PROJECTHANDLE';

export function setParametersEmail(value) {
  userStore.set('email', value);
  return {
    type: SET_PARAMETERS_EMAIL,
    value: value,
  };
}

export function setParametersPassword(value) {
  userStore.set('password', value);
  return {
    type: SET_PARAMETERS_PASSWORD,
    value: value,
  };
}

export function setParametersApiKey(value) {
  userStore.set('apikey', value);
  return {
    type: SET_PARAMETERS_APIKEY,
    value: value,
  };
}

export function setParametersProjectHandle(value) {
  userStore.set('projecthandle', value);
  return {
    type: SET_PARAMETERS_PROJECTHANDLE,
    value: value,
  };
}
