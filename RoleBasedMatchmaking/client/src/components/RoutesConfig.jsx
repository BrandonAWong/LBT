import AdminForm from '../pages/AdminForm.jsx';
import AdminTitleDetails from '../pages/AdminTitleDetails.jsx';
import Dashboard from '../pages/Dashboard';
import OnboardingForm from '../pages/OnboardingForm.jsx';
import { Routes, Route } from 'react-router-dom';
import BASE_PATH from '../config/BasePath.js';

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path={`${BASE_PATH}`} element={<Dashboard />} />
      <Route path={`${BASE_PATH}/dashboard`} element={<Dashboard />} />
      <Route path={`${BASE_PATH}/form`} element={<OnboardingForm />} />
      <Route path={`${BASE_PATH}/admin/title-details`} element={<AdminTitleDetails />} />
      <Route path={`${BASE_PATH}/admin/form`} element={<AdminForm />} />
    </Routes>
  );
};

export default RoutesConfig;