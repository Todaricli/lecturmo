import { Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import PageLayout from './layouts/PageLayout';
import HomePage from './pages/HomePage/HomePage'
import LoginPage from "./pages/LoginPage/LoginPage";
import UserProfilePage from "./pages/ProfilePage/UserProfilePage";
import EditProfilePage from "./pages/ProfilePage/EditProfilePage";

function App() {

  return (
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="edit-profile" element={<EditProfilePage />} />
        </Route>
      </Routes>
  );
}

export default App
