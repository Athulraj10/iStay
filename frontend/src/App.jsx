import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <>
      <Header />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default App;
