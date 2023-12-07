import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { useState, useEffect } from "react";
import Header from '../shared/header'

const MemberAdd = () => {
  const [formData, setFormData] = useState({
    account: '',
    password: '',
    memberName: '',
    email: '',
    phoneNumber: '',
    level: '',
    balance: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container mt-4">
      <h2>Thêm hội viên</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="account" className="form-label">
            Tài khoản
          </label>
          <input
            type="text"
            className="form-control"
            id="account"
            name="account"
            value={formData.account}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="memberName" className="form-label">
            Tên
          </label>
          <input
            type="text"
            className="form-control"
            id="memberName"
            name="memberName"
            value={formData.memberName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Số điện thoại
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="level" className="form-label">
            Level
          </label>
          <input
            type="number"
            className="form-control"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="balance" className="form-label">
            Số dư
          </label>
          <input
            type="number"
            className="form-control"
            id="balance"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Thêm hội viên
        </button>
      </form>
    </div>
  );
};

export default MemberAdd;
