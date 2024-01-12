/* eslint-disable import/no-unresolved */
import {
  SetActionRoleMaster,
  ActionTypes,
  SetDasboardCountAction,
  SetDasboardLoadingAction,
  SetDashboardDataAction,
  StateRoleMaster,
} from "~/interface";

export function ReducerRoleMaster(
  state: StateRoleMaster,
  action: SetActionRoleMaster
): StateRoleMaster {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: (action as SetDasboardLoadingAction).loading,
      };
    case ActionTypes.SET_COUNT:
      return {
        ...state,
        count: (action as SetDasboardCountAction).count,
      };
    case ActionTypes.SET_DATA:
      return {
        ...state,
        data: (action as SetDashboardDataAction).data,
      };
    default:
      return state;
  }
}
