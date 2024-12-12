// client/src/pages/Register.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
    }),
    onSubmit: (values) => {
      fetch('http://localhost:5555/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
        .then(res => res.json())
        .then(data => {
          if (data.token) {
            login(data.user, data.token);
            navigate('/');
          }
        })
        .catch(error => console.error('Error:', error));
    }
  });

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            {...formik.getFieldProps('username')}
            className="w-full px-3 py-2 border rounded"
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-600 mt-1">{formik.errors.username}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            {...formik.getFieldProps('email')}
            className="w-full px-3 py-2 border rounded"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-600 mt-1">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            {...formik.getFieldProps('password')}
            className="w-full px-3 py-2 border rounded"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-600 mt-1">{formik.errors.password}</div>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            {...formik.getFieldProps('confirmPassword')}
            className="w-full px-3 py-2 border rounded"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-600 mt-1">{formik.errors.confirmPassword}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;