import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
const AppLayout = lazy(() => import("../layout/app/AppLayout"));
const Dashboard = lazy(() => import("../pages/app/Dashboard"));

const PrivateRoute = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </AppLayout>
  );
};

export default PrivateRoute;
