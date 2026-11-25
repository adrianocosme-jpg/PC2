
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Activities from "./pages/Activities";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function PrivateLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/activities" element={<Activities />} />
            <Route path="/my-enrollments" element={<MyEnrollments />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to="/activities" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
