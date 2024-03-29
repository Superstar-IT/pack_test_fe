import { localStorageSet } from '../utils/localStorage';
import { Action_Types } from './AppActions';
import { AppStoreState } from './AppStore';

/**
 * Reducer for global AppStore using "Redux styled" actions
 * @param {object} state - current/default state
 * @param {string} action.type - unique name of the action
 * @param {*} [action.payload] - optional data object or the function to get data object
 */
const AppReducer: React.Reducer<AppStoreState, any> = (state, action) => {
  // console.log('AppReducer() - action:', action);
  switch (action.type || action.action) {
    case Action_Types.CURRENT_USER:
      return {
        ...state,
        currentUser: action?.currentUser || action?.payload,
      };
    case Action_Types.SIGN_UP:
    case Action_Types.LOG_IN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case Action_Types.LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: undefined, // Also reset previous user data
      };
    case Action_Types.DARK_MODE: {
      const darkMode = action?.darkMode ?? action?.payload;
      localStorageSet('darkMode', darkMode);
      return {
        ...state,
        darkMode,
      };
    }
    default:
      return state;
  }
};

export default AppReducer;
