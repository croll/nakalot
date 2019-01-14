// @flow
import type { GetState, Dispatch } from '../reducers/types';

export const SET_PARAMETERS_EMAIL = 'SET_PARAMETERS_EMAIL';
export const SET_PARAMETERS_PASSWORD = 'SET_PARAMETERS_PASSWORD';
export const SET_PARAMETERS_APIKEY = 'SET_PARAMETERS_APIKEY';

export function setParametersEmail(value) {
  return {
    type: SET_PARAMETERS_EMAIL,
    value: value,
  };
}

export function setParametersPassword(value) {
  return {
    type: SET_PARAMETERS_PASSWORD,
    value: value,
  };
}

export function setParametersApiKey(value) {
  return {
    type: SET_PARAMETERS_APIKEY,
    value: value,
  };
}
