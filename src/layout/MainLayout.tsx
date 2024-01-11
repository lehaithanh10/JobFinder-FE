// import CustomNavbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import NotiToast from "../../utils/NotiToast";

import { Container } from "react-bootstrap";
import NavbarControl from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";

const MainLayout = (props: any) => {
  const { children } = props;

  return (
    <div
      className="d-flex w-100 flex-column"
      style={{ backgroundColor: "#D3D3D3" }}
    >
      <NavbarControl></NavbarControl>
      <Container
        style={{ minHeight: "80vh", height: "auto", maxWidth: "75vw" }}
      >
        {children}
      </Container>

      {/* <NotiToast></NotiToast> */}
      <Footer />
    </div>
  );
};

export default MainLayout;
