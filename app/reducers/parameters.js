// @flow
import { SET_PARAMETERS_EMAIL, SET_PARAMETERS_PASSWORD, SET_PARAMETERS_APIKEY } from '../actions/parameters';
import type { Action } from './types';

export default function parameters(state = {email: '', password: '', apikey: ''}, action: Action) {
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
    default:
      return state;
  }
}
