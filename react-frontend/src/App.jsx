import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/*" element={user ? <PrivateRoute /> : <PublicRoute />} />
      </Routes>
    </Suspense>
  );
}

export default App;
