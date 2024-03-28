import React from 'react';
import { NalseeLogo } from './Icon';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-0 w-screen bg-white">
      <div className="ml-5 flex size-20 items-center justify-center">
        <NalseeLogo />
      </div>
    </nav>
  );
};

export default Navbar;
