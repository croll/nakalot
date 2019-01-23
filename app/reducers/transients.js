// @flow
import { SET_TRANSIENTS_XLSFILEPATH } from '../actions/transients';
import type { Action } from './types';

export default function transients(state = {xlsfilepath: ''}, action: Action) {
  switch (action.type) {
    case SET_TRANSIENTS_XLSFILEPATH:
      return {
        ...state,
        xlsfilepath: action.value,
      };
    default:
      return state;
  }
}
