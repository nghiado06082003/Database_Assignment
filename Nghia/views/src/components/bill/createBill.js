import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { useState, useEffect } from "react";
import Header from '../shared/header'

const CreateBill = () => {
    const [formData, setFormData] = useState({
        memberId: '',
        employeeId: '',
    });

    const [searchKey, setSearchKey] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [addedProducts, setAddedProducts] = useState([]);
    const [quantityProduct, setQuantityProduct] = useState(1);
    const [submittedBill, setSubmittedBill] = useState(null);

    // Example product data, replace with your actual product data
    const productData = [
        { id: 1, name: 'Laptop', price: 1200 },
        { id: 2, name: 'Smartphone', price: 800 },
        { id: 3, name: 'Tablet', price: 300 },
        { id: 4, name: 'Headphones', price: 80 },
        // Add more product items as needed
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();

        // Perform a simple string comparison for demonstration
        const results = productData.filter(
            (item) =>
                item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
                String(item.price).includes(searchKey)
        );

        setSearchResults(results);
    };

    const handleAddProduct = (productId) => {
        const selectedProduct = productData.find((product) => product.id === productId);

        if (selectedProduct) {
            setAddedProducts((prevProducts) => [
                ...prevProducts,
                {
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    price: selectedProduct.price,
                    quantity: quantityProduct,
                    intoPrice: selectedProduct.price * quantityProduct
                },
            ]);
            setQuantityProduct(1);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Add your logic to submit the form data along with the added products
        console.log('Form Data:', formData);
        console.log('Added Products:', addedProducts);
        setSubmittedBill({
            id: 666,
            memberId: formData.memberId,
            employeeId: formData.employeeId,
            date: "01/01/2023",
            totalPrice: "Có Backend lấy từ đó sau",
            productList: addedProducts
        })

        // Reset the form and added products after submission
        setFormData({
            memberId: '',
            employeeId: '',
        });
        setAddedProducts([]);
    };

    return (
        <div className="container mt-4">
            <h2>Tạo hoá đơn mới</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="memberId" className="form-label">
                        ID Hội viên
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="memberId"
                        name="memberId"
                        value={formData.memberId}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="employeeId" className="form-label">
                        ID Lễ tân
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="employeeId"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Tạo hoá đơn
                </button>
            </form>

            <hr />

            <form onSubmit={handleSearch} className="mb-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm sản phẩm cần mua..."
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                        Tìm
                    </button>
                </div>
            </form>

            {searchResults.length > 0 && (
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng cần mua</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((result) => (
                            <tr key={result.id}>
                                <td>{result.id}</td>
                                <td>{result.name}</td>
                                <td>{result.price}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={quantityProduct}
                                        onChange={(e) => setQuantityProduct(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleAddProduct(result.id)}
                                    >
                                        Thêm sản phẩm
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <hr />

            {addedProducts.length > 0 && (
                <>
                    <h3>Sản phẩm đã thêm</h3>
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng cần mua</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addedProducts.map((addedProduct) => (
                                <tr key={addedProduct.id}>
                                    <td>{addedProduct.id}</td>
                                    <td>{addedProduct.name}</td>
                                    <td>{addedProduct.price}</td>
                                    <td>{addedProduct.quantity}</td>
                                    <td>{addedProduct.intoPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {submittedBill && (
                <div className="mt-4">
                    <h3>Chi tiết hoá đơn</h3>
                    <p>ID: {submittedBill.id}</p>
                    <p>Hội viên: {submittedBill.memberId}</p>
                    <p>Lễ tân: {submittedBill.employeeId}</p>
                    <p>Ngày thực hiện: {submittedBill.date}</p>
                    <p>Tổng tiền: {submittedBill.totalPrice}</p>
                    <h5>Các sản phẩm đã mua</h5>
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng cần mua</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submittedBill.productList.map((productInBill) => (
                                <tr key={productInBill.id}>
                                    <td>{productInBill.id}</td>
                                    <td>{productInBill.name}</td>
                                    <td>{productInBill.price}</td>
                                    <td>{productInBill.quantity}</td>
                                    <td>{productInBill.intoPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default CreateBill;
