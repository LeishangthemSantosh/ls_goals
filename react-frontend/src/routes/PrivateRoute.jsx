import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const GoalList = lazy(() => import("../pages/app/GoalList"));
const AppLayout = lazy(() => import("../layout/app/AppLayout"));
const Dashboard = lazy(() => import("../pages/app/Dashboard"));

const PrivateRoute = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/goals" element={<GoalList />} />
      </Routes>
    </AppLayout>
  );
};

export default PrivateRoute;
