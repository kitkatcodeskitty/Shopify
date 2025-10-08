import React from 'react';
import { useNavigate } from 'react-router';

export default function Footer() {
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        © 2023 Copyright:
        <a 
          className="text-neutral-800 dark:text-neutral-400 ml-1 hover:text-violet-600 cursor-pointer transition-colors duration-200" 
          onClick={handleHomeClick}
        >
          Shopify
        </a>
      </div>
    </footer>
  );
}