/* eslint-disable import/no-unresolved */
import {
  ActionDashboard,
  ActionTypes,
  SetRoleCountAction,
  SetRoleDataAction,
  SetRoleLoadingAction,
  StateDashboard,
} from "~/interface";

export function ReducerDashboard(
  state: StateDashboard,
  action: ActionDashboard
): StateDashboard {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: (action as SetRoleLoadingAction).loading,
      };
    case ActionTypes.SET_COUNT:
      return {
        ...state,
        count: (action as SetRoleCountAction).count,
      };
    case ActionTypes.SET_DATA:
      return {
        ...state,
        data: (action as SetRoleDataAction).data,
      };
    default:
      return state;
  }
}
