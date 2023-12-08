import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { useState, useEffect } from "react";
import Header from '../shared/header'

function MemberList() {
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    axios.post("/api/member/list", {})
      .then((response) => {
        console.log(response.data.memberList);
        setMemberList(response.data.memberList);
      })
      .catch((err) => { });
  }, [])
  return (
    <>
      <div className="container-md">
        <h3>Quản lý hội viên</h3>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Level</th>
              <th>SĐT</th>
              <th>Số dư</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {memberList.length > 0 && memberList.map((rowData) => (
              <tr key={rowData.name}>
                <td>{rowData.name}</td>
                <td>{rowData.email}</td>
                <td>{rowData.level}</td>
                <td>{rowData.phoneNumber}</td>
                <td>{rowData.balance}</td>
                <td>
                  <button type="button" className="btn btn-info mx-1">
                    Chỉnh sửa
                  </button>
                  <button type="button" className="btn btn-danger mx-1">
                    Xoá hội viên
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default MemberList