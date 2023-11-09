import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// ------------Error Page Global
import NotFoundScreen from "../components/ErrorPage/ErrorPage";


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
import SellerHostelList from "../components/Sellers/Screens/SellerHostelList";
import SelllerListEnquery from "../components/Sellers/Screens/SelllerListEnquery";
import SellerMessageList from "../components/Sellers/Screens/SellerMessageList";
import AddHostelSeller from "../components/Sellers/Dashboard/AddHostel/AddHostelSeller";
import SellerHostelEditScreen from "../components/Sellers/Screens/SellerHostelEditScreen";
import SellerNotificationScreen from "../components/Sellers/Screens/SellerNotificationScreen";



// --------------Admin  Panel-----------
import AdminLoginScreen from "../components/Admin/Screens/AdminLoginScreen";
import AdminDashboardScreen from "../components/Admin/Screens/AdminDashboardScreen";
import AdminOTPScreen from "../components/Admin/Screens/AdminOTPScreen";
import AdminForgetScreenPassword from "../components/Admin/Screens/AdminForgetScreenPassword";
import AdminResetPassword from "../components/Admin/Screens/AdminResetPasswordScreen";
import AdminUserList from "../components/Admin/Screens/AdminUserList";
import AdminSellerList from "../components/Admin/Screens/AdminSellerList";
import AdminHostelList from "../components/Admin/Screens/AdminHostelList";





const LazyFindAccommodation = React.lazy(() => import("../components/Users/Screens/FindAccommodationScreen"));
import SinglePageView from "../components/Users/Screens/SinglePageViewScreen";
import UserProfileScreen from "../components/Users/Screens/UserProfileScreen";
import BookingConformationScreen from "../components/Users/Screens/BookingConformationScreen";
import MyBookingScreen from "../components/Users/Screens/MyBookingScreen";

// ------------------Chat Components
import UserChats from "../components/ChatPage/UsersChats";
import SellerChat from "../components/Sellers/SellerChat/SellerChat";
import Enquery from "../components/Users/Enquery/Enquery";


const Routeing = () => {
  return (
    <Routes>
      {/* ------------------------------UserScreen */}
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/profile" element={<UserProfileScreen />} />
