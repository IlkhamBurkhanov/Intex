import { Routes, Route } from "react-router-dom";
import Forget from "./Pages/Login/Forget";
import Login from "./Pages/Login/Login";
import NewPassword from "./Pages/Login/NewPassword";
import Verification from "./Pages/Login/Verification";

export default function UnAuthentication() {
  return (
    <div>
      <Login />
      <Routes>
        <Route path="/forget" element={<Forget />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/newPassword" element={<NewPassword />} />
      </Routes>
    </div>
  );
}
