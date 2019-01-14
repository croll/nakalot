// @flow
import { SET_INSTANCES_LABEXLS, SET_INSTANCES_NAKALAQL } from '../actions/instances';
import type { Action } from './types';

export default function instances(state = {labexls: null, nakalaql: null}, action: Action) {
  switch (action.type) {
    case SET_INSTANCES_LABEXLS:
      return {
        ...state,
        labexls: action.value,
      };
      case SET_INSTANCES_NAKALAQL:
      return {
        ...state,
        nakalaql: action.value,
      };
    default:
      return state;
  }
}
