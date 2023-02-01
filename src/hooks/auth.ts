import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { useAppStore } from '../store';
import { Action_Types } from '../store/AppActions';
import { sessionStorageDelete, sessionStorageGet } from '../utils';

/**
 * Hook to detect is current user authenticated or not
 * @returns {boolean} true if user is authenticated, false otherwise
 */
export function useIsAuthenticated() {
  const [state] = useAppStore();
  let result = state.isAuthenticated;

  // TODO: AUTH: add access token verification or other authentication check here
  const token = sessionStorageGet('access_token', '');
  try {
    const decodedToken = jwtDecode(token);
    return result || Boolean(decodedToken);
  } catch (error) {
    return false;
  }
}

/**
 * Hook to detect is current user authenticated or not
 * @returns {User} current user or undefined
 */
export function useCurrentUser() {
  const [state] = useAppStore();
  let result = state.currentUser;

  return result;
}

/**
 * Returns event handler to Logout current user
 * @returns {function} calling this event logs out current user
 */
export function useEventLogout() {
  const [, dispatch] = useAppStore();
  const navigate = useNavigate();

  return useCallback(() => {
    // TODO: AUTH: add auth and tokens cleanup here
    sessionStorageDelete('access_token');
    dispatch({ type: Action_Types.LOG_OUT });
    navigate('/auth/login');
  }, [dispatch, navigate]);
}
