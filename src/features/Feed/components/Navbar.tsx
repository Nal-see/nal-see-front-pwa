import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-screen bg-white">
      <div className="ml-5 flex size-20 items-center justify-center">
        <img src="/public/nalsee.png" alt="Logo" />
      </div>
    </nav>
  );
};

export default Navbar;
