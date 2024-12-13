// client/src/pages/Privacy.js
import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-6 py-12 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Privacy Policy</h1>
      <div className="space-y-4 text-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900">1. Introduction</h2>
        <p>
          We are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">2. Information Collection</h2>
        <p>
          We collect information that you provide to us directly when you create an account, place an order, or contact us. This information may include your name, email address, phone number, and payment details.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">3. Use of Information</h2>
        <p>
          We use your information to provide, maintain, and improve our services, process transactions, and communicate with you. We may also use your information for marketing purposes, with your consent.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">4. Sharing of Information</h2>
        <p>
          We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">5. Security</h2>
        <p>
          We implement a variety of security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">6. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">7. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. We will notify you of any changes by posting the new policy on our website.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
