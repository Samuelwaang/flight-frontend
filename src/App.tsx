// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import WebNavbar from "./components/WebNavbar";
import LoginPage from "./pages/Login";
import AccountPage from "./pages/Account";
import HomePage from "./pages/Home";

function App() {
  return (
    <Router>
      <AuthProvider>
        <WebNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
