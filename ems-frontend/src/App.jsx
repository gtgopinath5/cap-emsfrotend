import { Container } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Attendance from "./pages/Attendance";
import LeaveApplication from "./pages/LeaveApplication";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import LogoutButton from "./components/LogoutButton";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import StatusPage from "./pages/StatusPage";

function App() {
  const user = useRecoilValue(userAtom);  // Use Recoil for user authentication state
  
  return (
    <Container maxW="620px">
      <Routes>
        {/* If user exists, show HomePage; otherwise, redirect to /auth */}
        <Route path="/" element={user ? <HomePage user={user} /> : <Navigate to="/auth" />} />
        
        {/* Login/Signup Page */}
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
        
        {/* Protected Routes */}
        <Route path="/attendance" element={user ? <Attendance /> : <Navigate to="/auth" />} />
        <Route path="/leave-application" element={user ? <LeaveApplication /> : <Navigate to="/auth" />} />
        <Route path="/updateprofilepage" element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />
        <Route path="/status-page" element={user ? <StatusPage /> : <Navigate to="/auth" />} />
      </Routes>
      {user && <LogoutButton />}
    </Container>
  );
}

export default App;

