import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen text-zinc-200 font-sans selection:bg-blue-500/30 pb-8">
      <Navbar />
      <main className="pt-4">
        <Outlet />
      </main>
    </div>
  );
};
