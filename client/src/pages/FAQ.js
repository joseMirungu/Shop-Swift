// client/src/pages/FAQ.js
import React from 'react';

const faqs = [
  {
    question: "What is Shop-swift?",
    answer: "Shop-swift is an online shopping platform where you can browse, select, and purchase a wide range of products conveniently from your home or on the go."
  },
  {
    question: "How do I place an order?",
    answer: "Placing an order on Shop-swift is easy. Simply browse our product categories, select the items you wish to purchase, add them to your cart, and proceed to checkout. Follow the on-screen instructions to complete your order."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods, including credit/debit cards, PayPal, and other secure online payment options to provide you with a seamless shopping experience."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive a tracking number via email. You can use this tracking number to monitor the status of your delivery on our website or the courier's website."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a hassle-free return policy. If you are not satisfied with your purchase, you can return the product within a specified period for a full refund or exchange. Please refer to our return policy page for more details."
  },
  {
    question: "How can I contact customer support?",
    answer: "Our customer support team is here to help you. You can reach us via email, phone, or live chat. Visit our Contact Us page for more information."
  }
];

const FAQ = () => {
  return (
    <div className="container mx-auto px-6 py-12 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Frequently Asked Questions</h1>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{faq.question}</h2>
            <p className="text-lg text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
