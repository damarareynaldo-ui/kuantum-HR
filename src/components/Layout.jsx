import React from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <TopNav />
        <main className="p-8 pb-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
