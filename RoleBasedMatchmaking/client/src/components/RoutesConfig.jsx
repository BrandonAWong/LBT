import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const AdminForm = React.lazy(() => import('../pages/AdminForm.jsx'));
const AdminTitleDetails = React.lazy(() => import('../pages/AdminTitleDetails.jsx'));
import Dashboard from '../pages/Dashboard';
import OnboardingForm from '../pages/OnboardingForm.jsx';
import BASE_PATH from '../config/BasePath.js';


const RoutesConfig = () => {
  return (
    <Suspense>
      <Routes>
        <Route path={`${BASE_PATH}`} element={<Dashboard />} />
        <Route path={`${BASE_PATH}/dashboard`} element={<Dashboard />} />
        <Route path={`${BASE_PATH}/form`} element={<OnboardingForm />} />
        <Route path={`${BASE_PATH}/admin/title-details`} element={<AdminTitleDetails />} />
        <Route path={`${BASE_PATH}/admin/form`} element={<AdminForm />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesConfig;