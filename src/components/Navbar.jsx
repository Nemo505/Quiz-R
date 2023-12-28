import React from 'react';

const Navbar = () => {
  return (
    <nav className=" bg-blue-100 p-4 text-black flex items-center justify-between">
      <div className="flex items-center">
        {/* Logo */}
        <img src="../../src/assets/images/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="font-bold text-lg">Your Logo</span>
      </div>

      <div className="flex space-x-4">
        {/* Navigation Links */}
        <a href="#" className="hover:text-gray-300">Home</a>
        <a href="#" className="hover:text-gray-300">Contact</a>
        <a href="#" className="hover:text-gray-300">About</a>
        <a href="#" className="hover:text-gray-300">Service</a>
      </div>
    </nav>
  );
};

export default Navbar;
