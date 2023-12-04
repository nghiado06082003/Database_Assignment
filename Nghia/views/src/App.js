import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import Header from './components/shared/header'
import MemberList from './components/member/memberList';
import NoPage from './components/nopage/nopage';
import SignIn from './components/signin/signin'
import axios from 'axios'
import PrivateRoutes from './components/shared/private_routes';
import ProtectedTest from './components/(test_only)protected_test/protected_test';
import PublicTest from './components/(test_only)public_test/public_test';
import SignUp from './components/signup/signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<MemberList />} />
        <Route path='member'>
          <Route index element={<MemberList />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path='discount'>
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='publicTest' element={<PublicTest />} />
        <Route element={<PrivateRoutes validatePermission={"admin"} />} >
          <Route path='protectedTest' element={<ProtectedTest />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;

