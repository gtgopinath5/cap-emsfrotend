import { Container } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage"; // Ensure you import HomePage
import Attendance from "./pages/Attendance"; // Import the Attendance component
import LeaveApplication from "./pages/LeaveApplication"; // Import the LeaveApplication component
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import LogoutButton from "./components/LogoutButton";
import UpdateProfilePage from './pages/UpdateProfilePage';
import StatusPage from "./pages/StatusPage";

function App() {
  const user = useRecoilValue(userAtom);
  
  return (
    <Container maxW="620px">
      <Routes>
        <Route path="/" element={user ? <HomePage user={user} /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
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
