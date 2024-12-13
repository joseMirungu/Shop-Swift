// client/src/pages/About.js
import React from 'react';

const testimonials = [
  {
    name: "Jane D.",
    quote: "Shop-swift has transformed my shopping experience. The variety and quality of products are unmatched!",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "John S.",
    quote: "I love the convenience and customer service at Shop-swift. It's my go-to online store!",
    image: "https://via.placeholder.com/150"
  }
];

const About = () => {
  return (
    <div className="container mx-auto px-6 py-12 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">About Us</h1>
      
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Welcome to <span className="font-semibold text-red-600">Shop-swift</span>, your premier destination for online shopping. We are dedicated to bringing you a seamless and enjoyable shopping experience, whether you're browsing from the comfort of your home or on the go.
      </p>
      
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Story</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        At <span className="font-semibold text-red-600">Shop-swift</span>, we believe in the power of convenience and the joy of discovering unique products. Our journey began with a simple idea: to create a digital platform where customers could find a diverse range of products at competitive prices, all in one place. Today, we take pride in offering a virtual storefront where you can browse, select, and purchase items from various categories with ease.
      </p>
      
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Mission</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Our mission is to provide a convenient, reliable, and enjoyable online shopping experience for our customers. We strive to offer a wide selection of products that cater to the needs and preferences of our diverse customer base. By continuously enhancing our platform, we aim to make your shopping journey as smooth and satisfying as possible.
      </p>
      
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">What We Offer</h2>
      <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed mb-8 space-y-2">
        <li><span className="font-semibold text-red-600">Wide Selection:</span> From fashion wares for both male and female customers to unique finds, we offer a comprehensive range of products to suit every taste and need.</li>
        <li><span className="font-semibold text-red-600">Competitive Pricing:</span> We work hard to ensure that our prices remain competitive, giving you the best value for your money.</li>
        <li><span className="font-semibold text-red-600">Convenience:</span> Shop at your convenience with 24/7 accessibility. No more worrying about store hours or travel constraints.</li>
        <li><span className="font-semibold text-red-600">Global Reach:</span> Our platform allows us to reach customers from diverse geographical regions, bringing the world of shopping to your fingertips.</li>
      </ul>
      
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        We are committed to providing exceptional customer service and fostering a relationship of trust and loyalty with our customers. Your satisfaction is our priority, and we are here to support you every step of the way.
      </p>
      
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">Why Choose Us?</h2>
      <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed mb-8 space-y-2">
        <li><span className="font-semibold text-red-600">Accessibility:</span> Find products that may not be available locally.</li>
        <li><span className="font-semibold text-red-600">Comparative Shopping:</span> Easily compare prices and features across different brands and products.</li>
        <li><span className="font-semibold text-red-600">Customer Engagement:</span> Enjoy personalized shopping experiences, exclusive promotions, and dedicated customer support.</li>
      </ul>
      
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">Join Us</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Join the <span className="font-semibold text-red-600">Shop-swift</span> family today and experience the future of shopping. Whether you're a millennial, a member of Generation Z, or anyone who values convenience and quality, we welcome you to explore our platform and discover everything we have to offer.
      </p>

      <h2 className="text-3xl font-semibold text-gray-900 mb-4">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-600">Customer</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"{testimonial.quote}"</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <a href="#" className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition duration-300">
          Join Our Newsletter
        </a>
        <div className="mt-4">
          <span className="text-gray-700">Follow us on: </span>
          <a href="https://www.facebook.com" className="text-blue-600 hover:text-blue-800 mx-2">
            Facebook
          </a>
          <a href="https://www.instagram.com" className="text-pink-600 hover:text-pink-800 mx-2">
            Instagram
          </a>
          <a href="https://www.tiktok.com" className="text-black hover:text-gray-800 mx-2">
            TikTok
          </a>
          <a href="https://www.whatsapp.com" className="text-green-600 hover:text-green-800 mx-2">
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
