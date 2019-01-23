// @flow
import { SET_PARAMETERS_EMAIL, SET_PARAMETERS_PASSWORD, SET_PARAMETERS_APIKEY, SET_PARAMETERS_PROJECTHANDLE } from '../actions/parameters';
import type { Action, Parameters } from './types';

const UserStore = require('electron-store');

const userStore = new UserStore();

const initialState = {
  email: userStore.get('email', ''),
  password: userStore.get('password', ''),
  apikey: userStore.get('apikey', ''),
  projecthandle: userStore.get('11280/4123144a', ''),
}

export default function parameters(state: Parameters = initialState, action: Action) {
  switch (action.type) {
    case SET_PARAMETERS_EMAIL:
      return {
        ...state,
        email: action.value,
      };
      case SET_PARAMETERS_PASSWORD:
      return {
        ...state,
        password: action.value,
      };
      case SET_PARAMETERS_APIKEY:
      return {
        ...state,
        apikey: action.value,
      };
      case SET_PARAMETERS_PROJECTHANDLE:
      return {
        ...state,
        projecthandle: action.value,
      };
    default:
      return state;
  }
}
