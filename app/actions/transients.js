// @flow
import type { GetState, Dispatch } from '../reducers/types';

export const SET_TRANSIENTS_XLSFILEPATH = 'SET_TRANSIENTS_XLSFILEPATH';

export function setTransientsXLSFilepath(value) {
  return {
    type: SET_TRANSIENTS_XLSFILEPATH,
    value: value,
  };
}
