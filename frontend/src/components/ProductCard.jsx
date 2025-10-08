import React from "react";
import { useNavigate } from "react-router";
import { base } from "../app/mainApi";

const ProductCard = ({ product, onWishlistClick, isWishlisted = false }) => {
  const nav = useNavigate();

  const handleCardClick = (e) => {
    // Prevent navigation if wishlist button was clicked
    if (e.target.closest('.wishlist-btn')) {
      return;
    }
    nav(`/product/${product._id}`);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onWishlistClick) {
      onWishlistClick(product._id);
    }
  };

  return (
    <div 
      className="block relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img 
          className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105" 
          src={`${base}/${product.image}`} 
          alt={product.title}
        />
        
        {/* Wishlist Button */}
        <button 
          className={`wishlist-btn absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm border-0 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 ${
            isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
          }`}
          onClick={handleWishlistClick}
          aria-label="Add to wishlist"
        >
          <svg 
            className="w-4 h-4 transition-all duration-300" 
            viewBox="0 0 18 16" 
            xmlns="http://www.w3.org/2000/svg"
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M9.01163699,14.9053769 C8.72930024,14.7740736 8.41492611,14.6176996 8.07646224,14.4366167 C7.06926649,13.897753 6.06198912,13.2561336 5.12636931,12.5170512 C2.52930452,10.4655288 1.00308384,8.09476443 1.00000218,5.44184117 C0.997549066,2.99198843 2.92175104,1.01242822 5.28303025,1.01000225 C6.41066623,1.00972036 7.49184369,1.4629765 8.28270844,2.2678673 L8.99827421,2.9961237 L9.71152148,2.26559643 C10.4995294,1.45849728 11.5791258,1.0023831 12.7071151,1.00000055 L12.7060299,1.00000225 C15.0693815,0.997574983 16.9967334,2.97018759 17.0000037,5.421337 C17.0038592,8.07662382 15.4809572,10.4530151 12.8850542,12.5121483 C11.9520963,13.2521931 10.9477036,13.8951276 9.94340074,14.4354976 C9.60619585,14.6169323 9.29297309,14.7736855 9.01163699,14.9053769 Z"
            />
          </svg>
        </button>
      </div>

      {/* Product Content */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-xs font-semibold uppercase text-gray-500 mb-1 tracking-wider">
          {product.brand}
        </p>
        
        {/* Title/Description */}
        <p className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 leading-5">
          {product.title}
        </p>
        
        {/* Price */}
        <p className="text-base font-bold text-violet-600">
          Rs.{product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;