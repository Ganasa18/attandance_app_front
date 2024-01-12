/* eslint-disable import/no-unresolved */
import {
  ActionDashboard,
  ActionDashboardTypes,
  SetCountAction,
  SetDataAction,
  SetLoadingAction,
  StateDashboard,
} from "~/interface/dashboard_interface";

export function ReducerDashboard(
  state: StateDashboard,
  action: ActionDashboard
): StateDashboard {
  switch (action.type) {
    case ActionDashboardTypes.SET_LOADING:
      return {
        ...state,
        loading: (action as SetLoadingAction).loading,
      };
    case ActionDashboardTypes.SET_COUNT:
      return {
        ...state,
        count: (action as SetCountAction).count,
      };
    case ActionDashboardTypes.SET_DATA:
      return {
        ...state,
        data: (action as SetDataAction).data,
      };
    default:
      return state;
  }
}
