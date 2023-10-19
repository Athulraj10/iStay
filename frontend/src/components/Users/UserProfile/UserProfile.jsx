import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";

export default function UserProfile() {
  const navigate = useNavigate();


  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(storedUserInfo);

    const fetchUserDetails = async () => {
      try {
        const response = await USERSAPI.get("/users/profile")
        // ,{
        //   headers: {
        //     Authorization: `Bearer ${userInfo.token}`, // Add the user's token to the request headers
        //   },
        // });
        if (response.data) {
          console.log(response);
        }
      } catch (error) {
        // if (
        //   error.response &&
        //   error.response.data &&
        //   error.response.data.message
        // ) {
        //   toast.error('catch block first error')
        //   toast.error(error.response.data.message);

        //   if (error.response.data.redirect) {
        //     setTimeout(() => {
        //       navigate(`/${error.response.data.redirect}`);
        //     }, 3000);
        //   }
        // } else {
          toast.error("Please Login");
          // setTimeout(() => {
          //   navigate('/login');
          // }, 8000);
        // }
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="12">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#000", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: "150px", zIndex: "1" }}
                  />
                  <MDBBtn
                    outline
                    color="dark"
                    style={{ height: "36px", overflow: "visible" }}
                  >
                    Edit profile
                  </MDBBtn>
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <MDBTypography tag="h5">Athul raj</MDBTypography>
                  <MDBCardText>Kerala</MDBCardText>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                    <MDBCardText className="font-italic mb-1">
                      Web Developer
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-1">
                      Lives in New York
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-0">
                      Photographer
                    </MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">
                    Recent photos
                  </MDBCardText>
                </div>
                <MDBRow></MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
