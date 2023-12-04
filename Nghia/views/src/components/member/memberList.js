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
  // const [greetingFromServer, setGreetingFromServer] = useState(null);
  // useEffect(() => {
  //   axios.get('http://localhost:8080/api/homepage')
  //     .then((respond) => {
  //       setGreetingFromServer(respond.data.greeting);
  //     })
  //     .catch((error) => {
  //       console.error("Error!!!!!!", error);
  //     })
  // }, []);
  // console.log(greetingFromServer);
  const tableData = [
    { name: 1, column1: 'Data 1.1', column2: 'Data 1.2', column3: 'Data 1.3', column4: 'Data 1.4' },
    { name: 2, column1: 'Data 2.1', column2: 'Data 2.2', column3: 'Data 2.3', column4: 'Data 2.4' },
    { name: 3, column1: 'Data 3.1', column2: 'Data 3.2', column3: 'Data 3.3', column4: 'Data 3.4' },
    { name: 4, column1: 'Data 4.1', column2: 'Data 4.2', column3: 'Data 4.3', column4: 'Data 4.4' },
    { name: 5, column1: 'Data 5.1', column2: 'Data 5.2', column3: 'Data 5.3', column4: 'Data 5.4' },
  ];
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
            {tableData.map((rowData) => (
              <tr key={rowData.name}>
                <td>{rowData.name}</td>
                <td>{rowData.column1}</td>
                <td>{rowData.column2}</td>
                <td>{rowData.column3}</td>
                <td>{rowData.column4}</td>
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