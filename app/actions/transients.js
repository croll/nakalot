// @flow
import type { GetState, Dispatch } from '../reducers/types';

export const SET_TRANSIENTS_XLSFILEPATH = 'SET_TRANSIENTS_XLSFILEPATH';
export const SET_TRANSIENTS_BACK = 'SET_TRANSIENTS_BACK';
export const SET_TRANSIENTS_NEXT = 'SET_TRANSIENTS_NEXT';

export function setTransientsXLSFilepath(value: string) {
  return {
    type: SET_TRANSIENTS_XLSFILEPATH,
    value: value,
  };
}

export function setTransientsBack(value) {
  return {
    type: SET_TRANSIENTS_BACK,
    value: value,
  };
}

export function setTransientsNext(value) {
  return {
    type: SET_TRANSIENTS_NEXT,
    value: value,
  };
}

