import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { useState, useEffect } from "react";
import Header from '../shared/header'

const ComputerPriceLookup = () => {
    // Example product data, replace with your actual product data
    const computerData = [
        { id: 1, price: 10000, additionalCharge: 1200 },
        { id: 2, price: 20000, additionalCharge: 800 },
        { id: 3, price: 30000, additionalCharge: 300 },
        { id: 4, price: 40000, additionalCharge: 80 },
        { id: 5, price: 50000, additionalCharge: 900 },
        { id: 6, price: 60000, additionalCharge: 40 },
        // Add more product items as needed
    ];

    const [computerId, setComputerId] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        const results = computerData.filter(
            (computer) => computer.id.toString().includes(computerId)
        );
        setSearchResults(results);
    };

    return (
        <div className="container mt-4">
            <h2>Truy vấn giá và phụ thu cho máy</h2>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Mã máy cần tìm thông tin..."
                    value={computerId}
                    onChange={(e) => setComputerId(e.target.value)}
                />
                <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => handleSearch()}
                >
                    Tìm thông tin
                </button>
            </div>

            {searchResults.length > 0 ? (
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Giá</th>
                            <th>Phụ thu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((computer) => (
                            <tr>
                                <td>{computer.price}</td>
                                <td>{computer.additionalCharge}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default ComputerPriceLookup;
