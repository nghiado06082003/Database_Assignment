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
import SignUp from './components/signup/signup';
import MemberAdd from './components/member/memberAdd';
import DiscountList from './components/discount/discountList';
import DiscountAdd from './components/discount/discountAdd';
import CreateBill from './components/bill/createBill';
import DiscountForProduct from './components/discount/discountForProduct';
import StoreSupervise from './components/otherServices/storeSupervise';
import ComputerPriceLookup from './components/otherServices/computerPriceLookup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<SignIn />} />
        <Route element={<PrivateRoutes validatePermission={"employee"} />} >
          <Route path='member'>
            <Route index element={<MemberList />} />
            <Route path='addMember' element={<MemberAdd />} />
          </Route>
          <Route path='discount'>
            <Route index element={<DiscountList />} />
            <Route path='addDiscount' element={<DiscountAdd />} />
            <Route path='discountForProduct' element={<DiscountForProduct />} />
          </Route>
          <Route path='bill'>
            <Route path='createBill' element={<CreateBill />} />
          </Route>
          <Route path='otherService'>
            <Route path='storeSupervise' element={<StoreSupervise />} />
            <Route path='computerPriceLookup' element={<ComputerPriceLookup />} />
          </Route>
        </Route>
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;

