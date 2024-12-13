// client/src/components/PromotionalBanner.js
import React from 'react';

const PromotionalBanner = () => {
  return (
    <div className="promotional-banner relative bg-cover bg-center text-white p-4 text-center font-bold" style={{ backgroundImage: "url('https://example.com/christmas-background.jpg')" }}>
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-75"></div>
      <div className="relative z-10">
        <h2 className="text-2xl sm:text-4xl mb-4 animate-pulse">🎄 Special Christmas Offers! 🎁</h2>
        <p className="mb-4 text-lg sm:text-2xl animate-bounce">Up to 50% off on selected items!</p>
      </div>
    </div>
  );
};

export default PromotionalBanner;
