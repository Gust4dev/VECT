import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { Dashboard } from './views/Dashboard';
import { Editor } from './views/Editor';
import { Support } from './views/Support';
import { Contact } from './views/Contact';
import { Settings } from './views/Settings';
import { Profile } from './views/Profile';
import { Notifications } from './views/Notifications';
import { LandingPage } from './views/Landing/LandingPage';
import { Login } from './views/Auth/Login';
import { Register } from './views/Auth/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;