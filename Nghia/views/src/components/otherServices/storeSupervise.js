import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { useState, useEffect } from "react";
import Header from '../shared/header'

const StoreSupervise = () => {
    // Example session data, replace with your actual session data
    const sessionData = [
        { id: 1, startTime: '2023-01-01T10:00:00', computerId: 'A001', memberId: 'M001' },
        { id: 2, startTime: '2023-01-02T15:30:00', computerId: 'A002', memberId: 'M002' },
        { id: 3, startTime: '2023-01-03T12:45:00', computerId: 'A003', memberId: 'M003' },
        { id: 4, startTime: '2023-01-04T12:45:00', computerId: 'A004', memberId: 'M004' },
        { id: 5, startTime: '2023-01-05T12:45:00', computerId: 'A005', memberId: 'M005' },
        { id: 6, startTime: '2023-01-06T12:45:00', computerId: 'A006', memberId: 'M006' },
        // Add more session items as needed
    ];

    const [memberSearchKey, setMemberSearchKey] = useState('');
    const [computerSearchKey, setComputerSearchKey] = useState('');
    const [sessionList, setSessionList] = useState([]);

    useEffect(() => {
        setSessionList(sessionData);
    }, []);

    const handleMemberSearch = () => {
        const results = sessionData.filter(
            (session) =>
                session.memberId.includes(memberSearchKey)
        );

        setSessionList(results);
    };

    const handleComputerSearch = () => {
        const results = sessionData.filter(
            (session) =>
                session.computerId.includes(computerSearchKey)
        );

        setSessionList(results);
    };

    return (
        <div className="container mt-4">
            <h2>Giám sát cửa hàng</h2>
            <h6>Trang này cung cấp thông tin về hội viên nào đang sử dụng máy nào</h6>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm theo mã hội viên..."
                    value={memberSearchKey}
                    onChange={(e) => setMemberSearchKey(e.target.value)}
                />
                <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => handleMemberSearch()}
                >
                    Tìm theo mã hội viên
                </button>
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm theo mã máy tính..."
                    value={computerSearchKey}
                    onChange={(e) => setComputerSearchKey(e.target.value)}
                />
                <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => handleComputerSearch()}
                >
                    Tìm theo mã máy tính
                </button>
            </div>

            {sessionList.length > 0 ? (
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Mã Session</th>
                            <th>Giờ bắt đầu</th>
                            <th>Mã máy tính</th>
                            <th>Tài khoản hội viên</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessionList.map((session) => (
                            <tr key={session.id}>
                                <td>{session.id}</td>
                                <td>{session.startTime}</td>
                                <td>{session.computerId}</td>
                                <td>{session.memberId}</td>
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

export default StoreSupervise;
