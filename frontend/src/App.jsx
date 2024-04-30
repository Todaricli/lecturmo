import { Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import PageLayout from './layouts/PageLayout';
import HomePage from './pages/HomePage/HomePage'
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from './pages/RegisterPage/RegisterPage';
import RegisterProfilePage from "./pages/RegisterPage/RegisterProfilePage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="register/profile" element={<RegisterProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App
