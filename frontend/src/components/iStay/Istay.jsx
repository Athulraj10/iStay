import React from "react";
import Header from "../Header/Header";
import Routeing from "../../Routeing/Routeing";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const Istay = () => {
  return (
    <div>
      <Header />
      <Routeing />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Istay;
