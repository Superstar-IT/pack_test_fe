import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import { useCurrentUser, useIsAuthenticated } from '../hooks/auth';
import { useAppStore } from '../store';
import AuthService from '../services/auth.service';
import { Action_Types } from '../store/AppActions';

/**
 * Renders routes depending on Authenticated or Anonymous users
 */
const Routes = () => {
  const [, dispatch] = useAppStore();
  const navigation = useNavigate();
  const isAuthenticated = useIsAuthenticated(); // Variant 2
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (isAuthenticated && !currentUser) {
      AuthService.getMyInfo()
        .then((user) => dispatch({ type: Action_Types.CURRENT_USER, currentUser: user }))
        .catch(() => {
          dispatch({ type: Action_Types.LOG_OUT });
          navigation('/auth/login')
        });
    }
  }, [isAuthenticated, currentUser, dispatch, navigation]);

  return isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />;
};
export default Routes;
