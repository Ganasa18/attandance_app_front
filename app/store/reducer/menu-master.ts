/* eslint-disable import/no-unresolved */
import {
  ActionTypes,
  SetActionMenuMaster,
  SetMenuCountAction,
  SetMenuDataAction,
  SetMenuLoadingAction,
  StateMenuMaster,
} from "~/interface";

export function ReducerMenuMaster(
  state: StateMenuMaster,
  action: SetActionMenuMaster
): StateMenuMaster {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: (action as SetMenuLoadingAction).loading,
      };
    case ActionTypes.SET_COUNT:
      return {
        ...state,
        count: (action as SetMenuCountAction).count,
      };
    case ActionTypes.SET_DATA:
      return {
        ...state,
        data: (action as SetMenuDataAction).data,
      };
    default:
      return state;
  }
}
