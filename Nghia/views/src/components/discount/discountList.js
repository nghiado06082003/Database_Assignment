import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { useState, useEffect } from "react";
import Header from '../shared/header'

const DiscountList = () => {
    const [discountList, setDiscountList] = useState([]);
    // Example data, replace with your actual data
    const discountData = [
        {
            id: 1,
            discountName: 'Summer Sale',
            description: 'Enjoy discounts on summer items',
            startDate: '2023-06-01',
            endDate: '2023-06-30',
            condition: 'Applicable on selected items',
            category: 'Seasonal',
            discountValue: '20%',
        },
        {
            id: 2,
            discountName: 'Autumn Sale',
            description: 'Enjoy discounts on autumn items',
            startDate: '2023-09-01',
            endDate: '2023-09-30',
            condition: 'No condition is required',
            category: 'Seasonal',
            discountValue: '30%',
        },
        // Add more discount items as needed
    ];

    useEffect(() => {
        setDiscountList(discountData);
    }, [])

    const handleEdit = (id) => {
        // Add logic to handle edit action
        console.log(`Edit discount with ID ${id}`);
    };

    const handleDelete = (id) => {
        // Add logic to handle delete action
        console.log(`Delete discount with ID ${id}`);
    };

    return (
        <div className="container mt-4">
            <h2>Danh sách khuyến mãi</h2>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Mã khuyến mãi</th>
                        <th>Tên chương trình</th>
                        <th>Mô tả</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                        <th>Điều kiện</th>
                        <th>Loại</th>
                        <th>Mức giảm</th>
                    </tr>
                </thead>
                <tbody>
                    {discountList.length > 0 && discountList.map((discount) => (
                        <tr key={discount.id}>
                            <td>{discount.id}</td>
                            <td>{discount.discountName}</td>
                            <td>{discount.description}</td>
                            <td>{discount.startDate}</td>
                            <td>{discount.endDate}</td>
                            <td>{discount.condition}</td>
                            <td>{discount.category}</td>
                            <td>{discount.discountValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DiscountList;
