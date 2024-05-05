import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import PageLayout from './layouts/PageLayout';
import LoginPage from './pages/LoginPage/LoginPage';
import VerifyEmail from './pages/VerifyEmail';
import HomePage from './pages/HomePage/HomePage';
import QrCode from './pages/QrCode/QrCode';
import QrLandingPage from './pages/QrCode/QrLandingPage';
import VerificationSuccessPage from './pages/ScanVerificationPage/VerificationSuccessPage';
import VerificationErrorPage from './pages/ScanVerificationPage/VerificationErrorPage';
import UserProfilePage from './pages/ProfilePage/UserProfilePage';
import EditProfilePage from './pages/ProfilePage/EditProfilePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import RegisterProfilePage from './pages/RegisterPage/RegisterProfilePage';
import FetchExamplePage from './pages/FetchExamplePage/FetchExamplePage';
import StatsPage from './pages/ProfilePage/StatsPage';
import LecturerPage from './pages/LecturerPage/LecturerPage';
import SinglePostPage from './pages/HomePage/SinglePostPage/SinglePostPage';
import RegisterVerification from "./pages/RegisterPage/RegisterVerification"

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="register/profile" element={<RegisterProfilePage />} />
        <Route path='register/verification' element={<RegisterVerification />} />
        <Route path="profile" element={<UserProfilePage />} />
        <Route path="edit-profile" element={<EditProfilePage />} />
        <Route path="qr" element={<QrCode />} />
        <Route path="qr-landing-page" element={<QrLandingPage />} />
        <Route path="success" element={<VerificationSuccessPage />} />
        <Route path="error" element={<VerificationErrorPage />} />
        <Route path="fetchExample" element={<FetchExamplePage />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="lecturer" element={<LecturerPage />} />
        <Route path="post" element={<SinglePostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
