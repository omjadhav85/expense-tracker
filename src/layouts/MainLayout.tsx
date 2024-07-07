import { Navbar } from '@/components/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Navbar />

      <Outlet />
    </div>
  );
};
