// @flow
import type { GetState, Dispatch } from '../reducers/types';

const UserStore = require('electron-store');

const userStore = new UserStore();

export const SET_PARAMETERS_EMAIL = 'SET_PARAMETERS_EMAIL';
export const SET_PARAMETERS_PASSWORD = 'SET_PARAMETERS_PASSWORD';
export const SET_PARAMETERS_APIKEY = 'SET_PARAMETERS_APIKEY';
export const SET_PARAMETERS_USERHANDLE = 'SET_PARAMETERS_USERHANDLE';

export function setParametersEmail(value: string) {
  userStore.set('email', value);
  return {
    type: SET_PARAMETERS_EMAIL,
    value: value,
  };
}

export function setParametersPassword(value: string) {
  userStore.set('password', value);
  return {
    type: SET_PARAMETERS_PASSWORD,
    value: value,
  };
}

export function setParametersApiKey(value: string) {
  userStore.set('apikey', value);
  return {
    type: SET_PARAMETERS_APIKEY,
    value: value,
  };
}

export function setParametersUserHandle(value: string) {
  userStore.set('userhandle', value);
  return {
    type: SET_PARAMETERS_USERHANDLE,
    value: value,
  };
}
