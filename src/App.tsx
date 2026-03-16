import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Calls from "./pages/calls";
import { PrivateRoute } from "./shared/components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/calls" element={<PrivateRoute><Calls /></PrivateRoute>} />
    </Routes>
  );
}
export default App;
