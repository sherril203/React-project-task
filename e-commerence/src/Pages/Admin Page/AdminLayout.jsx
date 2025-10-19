import React from 'react';
import { Outlet, useLocation } from 'react-router';
import Sidebar from './Sidebar';

import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
  const location = useLocation();

  const isAdminHome = location.pathname === '/admin';

  return (
    <div className="w-full h-screen flex">
      <Sidebar />

      <div className="flex-1 h-full flex flex-col">
        <AdminNavbar />
        <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
          {isAdminHome && (
            <h2 className="text-3xl font-bold mt-20 mx-24">Hi Admin!</h2>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
