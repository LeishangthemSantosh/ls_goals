import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { useSelector } from "react-redux";

const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));

const PublicRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/sign-up"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
    </Routes>
  );
};

export default PublicRoute;
