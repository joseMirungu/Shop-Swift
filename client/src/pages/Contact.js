// client/src/pages/Contact.js
import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="container mx-auto px-6 py-12 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Contact Us</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
        We're here to help! If you have any questions, concerns, or feedback, please feel free to reach out to us. We look forward to hearing from you!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">General Inquiries</h2>
            <div className="flex items-center mb-2">
              <FaEnvelope className="text-gray-700 mr-2" />
              <p className="text-gray-700">support@shopswift.com</p>
            </div>
            <div className="flex items-center mb-2">
              <FaPhone className="text-gray-700 mr-2" />
              <p className="text-gray-700">+1 234 567 890</p>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-gray-700 mr-2" />
              <p className="text-gray-700">123 Swift St, Nairobi, Kenya</p>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Follow Us</h2>
            <div className="flex space-x-4 mt-2">
              <a href="https://www.facebook.com" className="text-blue-600 hover:text-blue-800">
                Facebook
              </a>
              <a href="https://www.instagram.com" className="text-pink-600 hover:text-pink-800">
                Instagram
              </a>
              <a href="https://www.tiktok.com" className="text-black hover:text-gray-800">
                TikTok
              </a>
              <a href="https://www.whatsapp.com" className="text-green-600 hover:text-green-800">
                WhatsApp
              </a>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Office Hours</h2>
            <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-700">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-700">Sunday: Closed</p>
          </div>
        </div>
        <form className="bg-gray-100 p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Send Us a Message</h2>
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Your name"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Your email"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="phone" className="text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Your phone number"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="inquiry" className="text-gray-700">Type of Inquiry</label>
            <select
              id="inquiry"
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option>General</option>
              <option>Sales</option>
              <option>Support</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="message" className="text-gray-700">Message</label>
            <textarea
              id="message"
              rows="4"
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
