import { useCallback } from 'react';
import { useAppStore } from '../store';
import { Action_Types } from '../store/AppActions';

/**
 * Returns event handler to toggle Dark/Light modes
 * @returns {function} calling this event toggles dark/light mode
 */
export function useEventSwitchDarkMode() {
  const [state, dispatch] = useAppStore();

  return useCallback(() => {
    dispatch({
      type: Action_Types.DARK_MODE,
      payload: !state.darkMode,
    });
  }, [state, dispatch]);
}
