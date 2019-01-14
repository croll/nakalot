// @flow
import type { GetState, Dispatch } from '../reducers/types';

export const SET_INSTANCES_LABEXLS = 'SET_INSTANCES_LABEXLS';
export const SET_INSTANCES_NAKALAQL = 'SET_INSTANCES_NAKALAQL';

export function setInstancesLabexls(value) {
  return {
    type: SET_INSTANCES_LABEXLS,
    value: value,
  };
}

export function setInstancesNakalaql(value) {
  return {
    type: SET_INSTANCES_NAKALAQL,
    value: value,
  };
}
