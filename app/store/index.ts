// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Action } from "../interface/interface_store";
// import { initGlobal, initTable } from "./reducer";

// export interface RootReducer {
//   [key: string]: (state: any, action: any) => any;
// }

// function combineReducers(reducers: RootReducer) {
//   return (state: any, action: any) => {
//     let nextState = state;
//     Object.keys(reducers).forEach((key) => {
//       nextState = {
//         ...nextState,
//         [key]: reducers[key](nextState[key], action),
//       };
//     });
//     return nextState;
//   };
// }

// const InitState = {
//   globalReducer: initGlobal,
//   tableReducer: initTable,
// };

// function reduceReducers(...reducers: ((state: any, action: any) => any)[]) {
//   return (state: any, action: Action) =>
//     reducers.reduce((acc, nextReducer) => nextReducer(acc, action), state);
// }

// export default combineReducers;
// export { InitState, reduceReducers };
