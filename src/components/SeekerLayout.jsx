import React from 'react';
import SeekerSidebar from './SeekerSidebar';
import TopNav from './TopNav';

const SeekerLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-surface">
      <SeekerSidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <TopNav />
        <main className="p-8 pb-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SeekerLayout;
