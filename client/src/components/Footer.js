// client/src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white shadow-lg mt-8">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Link to="/faq" className="text-gray-600 hover:text-gray-900">
              FAQ
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-gray-900">
              Terms of Service
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold text-red-600">
              Swift shop
            </Link>
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} Swift Shop. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.facebook.com"
              className="text-gray-600 hover:text-blue-600"
              aria-label="Facebook"
            >
              <FaFacebookF className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com"
              className="text-gray-600 hover:text-pink-600"
              aria-label="Instagram"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.tiktok.com"
              className="text-gray-600 hover:text-black"
              aria-label="TikTok"
            >
              <FaTiktok className="h-6 w-6" />
            </a>
            <a
              href="https://www.whatsapp.com"
              className="text-gray-600 hover:text-green-600"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="h-6 w-6" />
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="bg-red-600 text-white px-3 py-2 rounded-full hover:bg-red-700 transition duration-300"
            aria-label="Back to Top"
          >
            <FaArrowUp className="h-6 w-6" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
