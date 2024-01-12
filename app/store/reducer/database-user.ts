/* eslint-disable import/no-unresolved */
import {
  ActionTypes,
  SetActionDatabaseUser,
  SetDatabaseUserCountAction,
  SetDatabaseUserDataAction,
  SetDatabaseUserLoadingAction,
  StateDatabaseUser,
} from "~/interface";

export function ReducerDatabaseUser(
  state: StateDatabaseUser,
  action: SetActionDatabaseUser
): StateDatabaseUser {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: (action as SetDatabaseUserLoadingAction).loading,
      };
    case ActionTypes.SET_COUNT:
      return {
        ...state,
        count: (action as SetDatabaseUserCountAction).count,
      };
    case ActionTypes.SET_DATA:
      return {
        ...state,
        data: (action as SetDatabaseUserDataAction).data,
      };
    default:
      return state;
  }
}
