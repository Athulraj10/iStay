import React from "react";
import Header from "../Users/Header/Header";
import Routeing from "../../Routeing/Routeing";
import { ChakraProvider } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import LayoutBackgroundImage from "../layouts/Layouts";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer/Footer";
import SellerHeader from "../Sellers/SellerHeader/SellerHeader";
import AdminHeader from "../Admin/AdminHeader/AdminHeader";

const Istay = () => {
  let location = useLocation();
  let seller = location.pathname.startsWith("/seller");
  let admin = location.pathname.startsWith("/admin");
  return (
    <div>
      <ChakraProvider>
        <LayoutBackgroundImage>
          {/* layouts it is used to implement child component and to wrap all
        component into a background image */}
          <ToastContainer />
          {/* is used to show user to implent error message */}
          {admin ? <AdminHeader /> : seller ? <SellerHeader /> : <Header />}
          <Routeing />
          <Footer />
          <Container>
            {/* This is like a box or a container in your web page. 
       t's a component that's used for layout and structuring 
       your content. You can style it, set its size, and control
      how things inside it are arranged. */}
            <Outlet />
            {/* Think of this as an empty space inside the container.
        It's a placeholder for content. When you navigate to different
        pages or routes in your application, the content
      specific to that route will be placed inside this empty space. */}
          </Container>
        </LayoutBackgroundImage>
      </ChakraProvider>
    </div>
  );
};

export default Istay;
