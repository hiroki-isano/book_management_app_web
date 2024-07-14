import React from 'react';
import { book_list_path, book_upload_result_path } from '../App';

export const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center bg-blue-500 p-4 text-white">
          <div className="text-xl">Book Management App</div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href={book_list_path} className="hover:underline">・Book List</a></li>
              <li><a href={book_upload_result_path} className="hover:underline">・Upload Book</a></li>
            </ul>
          </nav>
        </header>
      );
};

export default Header;