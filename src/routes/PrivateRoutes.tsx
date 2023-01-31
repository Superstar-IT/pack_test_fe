import { Route, Routes } from 'react-router-dom';
import { AboutView, NotFoundView, UserView, WelcomeView } from '../views';
/**
 * List of routes available only for authenticated users
 * Also renders the "Private Layout" composition
 */
const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomeView />} />
      <Route path="welcome" element={<WelcomeView />} />
      <Route path="user" element={<UserView />} />
      <Route path="about" element={<AboutView />} />,
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
};

export default PrivateRoutes;
