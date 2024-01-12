/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionTypes,
  GlobalStateInterface,
} from "../../interface/interface_store";

const initGlobal = {
  isLoading: true,
  userLogin: {},
  activeNav: true,
  activeIndexNav: null,
  token: "",
};

const globalReducer = (state: GlobalStateInterface, payload: any) => {
  switch (payload.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: payload.action,
      };
    case ActionTypes.SET_NAV_MENU:
      return {
        ...state,
        activeNav: payload.action,
      };
    case ActionTypes.SET_NAV_INDEX:
      return {
        ...state,
        activeIndexNav: payload.action,
      };
    case ActionTypes.SET_USER_TOKEN:
      return {
        ...state,
        token: payload.action,
      };
    default:
      return state;
  }
};

export default globalReducer;
export { initGlobal };
