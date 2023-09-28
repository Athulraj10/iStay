import React from "react";
import Header from "../Header/Header";
import Routeing from "../../Routeing/Routeing";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Layout from "../layouts/Layouts";

const Istay = () => {
  return (
    <div>
      <Layout> 
        {/* layouts it is used to implement child component and to wrap all
        component into a background image */}

      <Header />
      <Routeing />
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
      </Layout>
    </div>
  );
};

export default Istay;
