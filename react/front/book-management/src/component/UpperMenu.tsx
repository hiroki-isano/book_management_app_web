import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center bg-blue-500 p-4 text-white">
          <div className="text-xl">Book Management App</div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#リンク1" className="hover:underline">・Book List</a></li>
              <li><a href="#リンク2" className="hover:underline">・Upload Book</a></li>
            </ul>
          </nav>
        </header>
      );
};

export default Header;