// Configure routing for the project

import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const AdminConstants = React.lazy(() => import('../pages/AdminSystemConfig.jsx'));
const AdminForm = React.lazy(() => import('../pages/AdminForm.jsx'));
const AdminTitleDetails = React.lazy(() => import('../pages/AdminTitleDetails.jsx'));
import Dashboard from '../pages/Dashboard';
import OnboardingForm from '../pages/OnboardingForm.jsx';
import Unauthorized from '../pages/Unauthorized.jsx'
import RequireAdmin from './RequiresAdmin.jsx';
import BASE_PATH from '../config/BasePath.js';


const RoutesConfig = () => {
  return (
    <Suspense>
      <Routes>
        <Route path={`${BASE_PATH}/unauthorized`} element={<Unauthorized />} />
        <Route path={`${BASE_PATH}`} element={<OnboardingForm />} />
        <Route path={`${BASE_PATH}/form`} element={<OnboardingForm />} />
        <Route path={`${BASE_PATH}/dashboard`} element={
          <RequireAdmin>
            <Dashboard />
          </RequireAdmin>} />
        <Route path={`${BASE_PATH}/admin/title-details`} element={
          <RequireAdmin>
            <AdminTitleDetails />
          </RequireAdmin>} />
        <Route path={`${BASE_PATH}/admin/form`} element={
          <RequireAdmin>
            <AdminForm />
          </RequireAdmin>} />
        <Route path={`${BASE_PATH}/admin/system`} element={
          <RequireAdmin>
            <AdminConstants />
        </RequireAdmin>} />
      </Routes>
    </Suspense>
  );
};

export default RoutesConfig;