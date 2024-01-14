/* eslint-disable import/no-unresolved */
import {
  SetActionRoleMaster,
  ActionTypes,
  StateRoleMaster,
  SetRoleLoadingAction,
  SetRoleCountAction,
  SetRoleDataAction,
} from "~/interface";

export function ReducerRoleMaster(
  state: StateRoleMaster,
  action: SetActionRoleMaster
): StateRoleMaster {
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
