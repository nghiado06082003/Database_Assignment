import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { useState, useEffect } from "react";
import Header from '../shared/header'
import React, { useState } from 'react';

const ShowBill = () => {
  // Example bill data, replace with your actual bill data
  const billData = [
    { id: 666, amount: 100, date: '2023-01-01', description: 'Groceries' },
    { id: 667, amount: 50, date: '2023-01-05', description: 'Clothing' },
    { id: 668, amount: 200, date: '2023-01-10', description: 'Electronics' },
    // Add more bill items as needed
  ];

  const [searchKey, setSearchKey] = useState('');
  const [filteredBills, setFilteredBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);

  const handleSearch = (e) => {
    const key = e.target.value.toLowerCase();
    setSearchKey(key);

    const results = billData.filter(
      (bill) =>
        bill.id.toString().includes(key) ||
        bill.amount.toString().includes(key) ||
        bill.date.includes(key) ||
        bill.description.toLowerCase().includes(key)
    );

    setFilteredBills(results);
    setSelectedBill(null); // Clear selectedBill when searching
  };

  return (
    <div className="container mt-4">
      <h2>Show Bill Page</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search..."
        value={searchKey}
        onChange={handleSearch}
      />

      {(searchKey === '' ? billData : filteredBills).length > 0 ? (
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
              <th>Show Details</th>
            </tr>
          </thead>
          <tbody>
            {(searchKey === '' ? billData : filteredBills).map((bill) => (
              <tr key={bill.id}>
                <td>{bill.id}</td>
                <td>${bill.amount}</td>
                <td>{bill.date}</td>
                <td>{bill.description}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedBill(bill)}
                  >
                    Show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found.</p>
      )}

      {selectedBill && (
        <div className="mt-4">
          <h3>Bill Details</h3>
          <p>ID: {selectedBill.id}</p>
          <p>Amount: ${selectedBill.amount}</p>
          <p>Date: {selectedBill.date}</p>
          <p>Description: {selectedBill.description}</p>
        </div>
      )}
    </div>
  );
};

export default ShowBill;

