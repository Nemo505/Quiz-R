import React from 'react';

const Navbar = () => {
  return (
    <nav className=" bg-blue-100 p-4 text-black flex items-center justify-between">
      <div className="flex items-center">
        {/* Logo */}
        <img src="" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="font-bold text-lg">Your Logo</span>
      </div>
    </nav>
  );
};

export default Navbar;
