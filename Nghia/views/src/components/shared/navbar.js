import { NavLink, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";


export default function Navbar(props) {
  const [authInfo, setAuthInfo] = useState({
    isLogin: false,
    isAdmin: false,
    isAdminMode: false
  });
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.get('TOKEN');
    console.log(`cookies: token=${token}`);
    if (token === undefined) {
      setAuthInfo(() => ({ isLogin: false, isAdmin: false, isAdminMode: false }));
    }
    else {
      axios
        .post('http://localhost:8080/api/authorization/collab', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response.data);
          setAuthInfo({ isLogin: true, isAdmin: false, isAdminMode: false });
        })
        .catch((error) => {
          console.error(error);
          setAuthInfo({ isLogin: false, isAdmin: false, isAdminMode: false });
        });

      axios
        .post('http://localhost:8080/api/authorization/admin', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response.data);
          setAuthInfo({ isLogin: true, isAdmin: true, isAdminMode: true });
        })
        .catch((error) => {

        });
    }
  }, []);

  const handleSignOut = (e) => {
    if (!authInfo.isLogin) {
      alert('Có lỗi xảy ra!');
      return;
    }
    cookies.remove('TOKEN', {
      path: "/",
    });
    setAuthInfo({ isLogin: false, isAdmin: false, isAdminMode: false });
    navigate('/');
    console.log('Đã đăng xuất');
  }

  let leftNavItem1, leftNavItem2, rightNavItem1, rightNavItem2;
  // if (authInfo.isAdmin && authInfo.isAdminMode) {
  //   leftNavItem1 = (
  //     <li className="nav-item dropdown">
  //       <NavLink
  //         className="nav-link dropdown-toggle"
  //         role="button"
  //         data-bs-toggle="dropdown"
  //         aria-expanded="false"
  //       >
  //         Quản lý hoạt động
  //       </NavLink>
  //       <ul className="dropdown-menu">
  //         <li>
  //           <NavLink className="dropdown-item" to="/feed/event">
  //             Bài viết
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink className="dropdown-item" to="/feed/review">
  //             Review
  //           </NavLink>
  //         </li>
  //       </ul>
  //     </li>
  //   );
  //   leftNavItem2 = (
  //     <li className="nav-item dropdown">
  //       <NavLink
  //         className="nav-link dropdown-toggle"
  //         role="button"
  //         data-bs-toggle="dropdown"
  //         aria-expanded="false"
  //       >
  //         Quản lý tài liệu
  //       </NavLink>
  //       <ul className="dropdown-menu">
  //         <li>
  //           <NavLink className="dropdown-item" to="/library">
  //             Hội viên
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink className="dropdown-item" to="/documentManagement/loan">
  //             Mượn sách
  //           </NavLink>
  //         </li>
  //       </ul>
  //     </li>
  //   );
  //   rightNavItem1 = (
  //     <li className="nav-item">
  //       <NavLink className="nav-link" to="/memberManagement">
  //         Quản lý thành viên
  //       </NavLink>
  //     </li>
  //   );
  //   rightNavItem2 = (
  //     <li className="nav-item dropdown">
  //       <NavLink
  //         className="nav-link dropdown-toggle"
  //         role="button"
  //         data-bs-toggle="dropdown"
  //         aria-expanded="false"
  //       >
  //         Thông tin
  //       </NavLink>
  //       <ul className="dropdown-menu">
  //         <li>
  //           <NavLink className="dropdown-item" to="/">
  //             Người dùng
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink className="dropdown-item" to="/my">
  //             Thông tin cá nhân
  //           </NavLink>
  //         </li>
  //         <li>
  //           <button className="dropdown-item" onClick={handleSignOut}>
  //             Đăng xuất
  //           </button>
  //         </li>
  //       </ul>
  //     </li>
  //   );
  // }
  leftNavItem1 = (
    <li className="nav-item dropdown">
      <NavLink
        className="nav-link dropdown-toggle"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Hội viên
      </NavLink>
      <ul className="dropdown-menu">
        <li>
          <NavLink className="dropdown-item" to="/member">
            Danh sách
          </NavLink>
        </li>
        <li>
          <NavLink className="dropdown-item" to="/member/addMember">
            Thêm hội viên
          </NavLink>
        </li>
      </ul>
    </li>
  );
  leftNavItem2 = (
    <li className="nav-item dropdown">
      <NavLink
        className="nav-link dropdown-toggle"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Khuyến mãi
      </NavLink>
      <ul className="dropdown-menu">
        <li>
          <NavLink className="dropdown-item" to="/discount">
            Danh sách
          </NavLink>
        </li>
        <li>
          <NavLink className="dropdown-item" to="/discount/addDiscount">
            Thêm khuyến mãi
          </NavLink>
        </li>
      </ul>
    </li>
  );

  // if (authInfo.isLogin) {
  //   rightNavItem1 = (
  //     <li className="nav-item">
  //       <NavLink className="nav-link" to="/bookBorrow">
  //         Mượn sách
  //       </NavLink>
  //     </li>
  //   );
  //   rightNavItem2 = (
  //     <li className="nav-item dropdown">
  //       <NavLink
  //         className="nav-link dropdown-toggle"
  //         role="button"
  //         data-bs-toggle="dropdown"
  //         aria-expanded="false"
  //       >
  //         Thông tin
  //       </NavLink>
  //       <ul className="dropdown-menu">
  //         {authInfo.isAdmin && !authInfo.isAdminMode &&
  //           <li>
  //             <NavLink className="dropdown-item" to="/">
  //               Trang quản trị viên
  //             </NavLink>
  //           </li>
  //         }
  //         <li>
  //           <NavLink className="dropdown-item" to="/my">
  //             Thông tin cá nhân
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink className="dropdown-item" to="/my/borrow/list">
  //             Danh sách đăng kí mượn
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink className="dropdown-item" to="/my/borrow/history">
  //             Lịch sử mượn
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink className="dropdown-item" to="/my/feed/review">
  //             Sách đã quyên góp
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink className="dropdown-item" to="/my/post/reviewHistory">
  //             Danh sách review đã gửi
  //           </NavLink>
  //         </li>
  //         <li>
  //           <button className="dropdown-item" onClick={handleSignOut}>
  //             Đăng xuất
  //           </button>
  //         </li>
  //       </ul>
  //     </li>
  //   );
  // }
  // else {
  // rightNavItem1 = (
  //   <li className="nav-item">
  //     <NavLink className="nav-link" to="/signup">
  //       Đăng kí
  //     </NavLink>
  //   </li>
  // );
  // rightNavItem2 = (
  //   <li className="nav-item">
  //     <NavLink className="nav-link" to="/signin">
  //       Đăng nhập
  //     </NavLink>
  //   </li>
  // );

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Quản lý
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {leftNavItem1}
            {leftNavItem2}
          </ul>
        </div>
      </div>
    </nav>

  );
}