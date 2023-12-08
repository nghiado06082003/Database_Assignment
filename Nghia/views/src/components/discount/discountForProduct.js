import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { useState, useEffect } from "react";
import Header from '../shared/header'

const DiscountForProduct = () => {
    const [productId, setProductId] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        axios.post("/api/discount/forProduct", { productId: productId })
            .then((response) => {
                setSearchResults(response.data.discountForProduct)
            })
            .catch((error) => { })
    };

    return (
        <div className="container mt-4">
            <h2>Truy vấn khuyến mãi cho sản phẩm</h2>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Sản phẩm cần tìm khuyến mãi..."
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                />
                <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => handleSearch()}
                >
                    Tìm khuyến mãi
                </button>
            </div>

            {searchResults.length > 0 ? (
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Điều kiện áp dụng</th>
                            <th>Mức giảm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((product) => (
                            <tr>
                                <td>{product.condition}</td>
                                <td>{product.discountValue}</td>
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

export default DiscountForProduct;
