export interface State {
  currentOp: string;
  previousOp: string;
  operation: string;
  overwrite? : boolean;
}

export interface Action {
  type: string;
  payload: string;
}

export interface Actions {
  ADD_DIGIT: string;
  CHOOSE_OPERAION: string;
  CLEAR: string;
  DELETE_DIGIT: string;
  EVALUATE: string;
}

export type Reducer = (state: State, action: Action) => void;
export type Dispatch = (action: Action) => void;
