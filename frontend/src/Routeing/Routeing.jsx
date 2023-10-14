import React from "react";
import { Route, Routes } from "react-router-dom";

// --------------User Panel-----------
import HomeScreen from "../components/Users/Screens/HomeScreen";
import LoginScreen from "../components/Users/Screens/LoginScreen";
import RegisterScreen from "../components/Users/Screens/RegisterScreen";
import OTPScreen from "../components/Users/Screens/OTPScreen";
import ForgetScreenPassword from "../components/Users/Screens/ForgetScreenPassword";
import ResetPassword from "../components/Users/Screens/ResetPasswordScreen";

// --------------Sellers Panel-----------
import SellerRegisterScreen from "../components/Sellers/Screens/SellerRegisterScreen";
import SellerLoginScreen from "../components/Sellers/Screens/SellerLoginScreen";
import SellerDashboardScreen from "../components/Sellers/Screens/SellerDashboardScreen";
import SellerOTPScreen from "../components/Sellers/Screens/SellerOTPScreen";
import SellerForgetScreenPassword from "../components/Sellers/Screens/SellerForgetScreenPassword";
import SellerResetPassword from "../components/Sellers/Screens/SellerResetPasswordScreen";

// --------------Admin  Panel-----------
import AdminLoginScreen from "../components/Admin/Screens/AdminLoginScreen";
import AdminDashboardScreen from "../components/Admin/Screens/AdminDashboardScreen";
import AdminOTPScreen from "../components/Admin/Screens/AdminOTPScreen";
import AdminForgetScreenPassword from "../components/Admin/Screens/AdminForgetScreenPassword";
import AdminResetPassword from "../components/Admin/Screens/AdminResetPasswordScreen";
import AdminUserList from "../components/Admin/Screens/AdminUserList";
import AdminSellerList from "../components/Admin/Screens/AdminSellerList";
import AdminHostelList from "../components/Admin/Screens/AdminHostelList";
import AdminAddHostelScreen from "../components/Admin/Screens/AdminAddHostel";


import SellerHostelList from "../components/Sellers/Screens/SellerHostelList";
import SelllerListEnquery from "../components/Sellers/Screens/SelllerListEnquery";
import SellerMessageList from "../components/Sellers/Screens/SellerMessageList";
import AddHostelSeller from "../components/Sellers/Dashboard/AddHostel/AddHostelSeller";
import SellerHostelEditScreen from "../components/Sellers/Screens/SellerHostelEditScreen";
import FindAccommodationScreen from "../components/Users/Screens/FindAccommodationScreen";
import SinglePageView from "../components/Users/Screens/SinglePageViewScreen";
import AboutPageScreen from "../components/Users/Screens/AboutPageScreen";




const Routeing = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/about" element={<AboutPageScreen />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="/forget" element={<ForgetScreenPassword />} />
      <Route path="/OTP" element={<OTPScreen />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/findAccommodation" element={<FindAccommodationScreen />} />
      <Route path="/findAccommodation/singlePageView" element={<SinglePageView />} />

      {/* -----------Seller Routes---------- */}
      <Route path="/seller/register" element={<SellerRegisterScreen />} />
      <Route path="/seller/login" element={<SellerLoginScreen />} />
      <Route path="/seller" element={<SellerLoginScreen />} />
      <Route path="/seller/dashboard" element={<SellerDashboardScreen />} />
      <Route path="/seller/forget" element={<SellerForgetScreenPassword />} />
      <Route path="/seller/verifyOTP" element={<SellerOTPScreen />} />
      <Route path="/seller/resetPassword" element={<SellerResetPassword />} />
     
      <Route path="/seller/message" element={<SellerMessageList />} />
      <Route path="/seller/listEnquery" element={<SelllerListEnquery />} />
      <Route path="/seller/listHostels" element={<SellerHostelList />} />
      <Route path="/seller/listHostels/addhostel" element={<AddHostelSeller />} />
      <Route path="/seller/listHostels/editHostelDetails" element={<SellerHostelEditScreen />} />





      {/* ------------Admin Panel--------- */}
      <Route path="/admin" element={<AdminLoginScreen />} />
      <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
      <Route path="/admin/forget" element={<AdminForgetScreenPassword />} />
      <Route path="/admin/verifyOTP" element={<AdminOTPScreen />} />
      <Route path="/admin/resetPassword" element={<AdminResetPassword />} />

      <Route path="/admin/listUsers" element={<AdminUserList />} />
      {/* <Route path="/admin/listUser/editUser" element={<AdminEditUserScreen />} /> */}

      <Route path="/admin/listSellers" element={<AdminSellerList />} />
      {/* <Route path="/admin/listSeller/editSeller" element={<AdminEditSellerScreen />} /> */}
    

      <Route path="/admin/listHostels" element={<AdminHostelList />} />
      <Route path="/admin/listHostels/addhostel" element={<AdminAddHostelScreen />} />

      </Routes>
  );
};

export default Routeing;
