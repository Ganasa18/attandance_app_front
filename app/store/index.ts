/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from "../interface/interface_store";
import { initGlobal, initTable } from "./reducer";

const combineReducers =
  (slices: { [key: string]: (state: any, action: Action) => any }) =>
  (state: { [key: string]: any }, action: Action) =>
    Object.keys(slices).reduce(
      (acc, prop) => ({
        ...acc,
        [prop]: slices[prop](acc[prop], action),
      }),
      state
    );

const InitState = {
  globalReducer: initGlobal,
  tableReducer: initTable,
};

function reduceReducers(...reducers: ((state: any, action: Action) => any)[]) {
  return (state: any, action: Action) =>
    reducers.reduce((acc, nextReducer) => nextReducer(acc, action), state);
}

export default combineReducers;
export { InitState, reduceReducers };
