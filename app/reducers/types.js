import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';



export type Parameters = {
  +email: string,
  +password: string,
  +apikey: string
};

export type counterStateType = {
  +counter: number,
  +parameters: Parameters
};

export type Action = {
  +type: string
};


export type GetState = () => counterStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
