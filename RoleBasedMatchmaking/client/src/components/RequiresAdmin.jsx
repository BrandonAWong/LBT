import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BASE_PATH from '../config/BasePath.js';

const RequireAdmin = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return;
  }

  if (!user.admin) {
    return <Navigate to={`${BASE_PATH}/unauthorized`} />;
  }

  return children;
};

export default RequireAdmin;
