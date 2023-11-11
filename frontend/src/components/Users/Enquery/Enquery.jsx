import ChatLoading from "../../ChatPage/ChatLoading";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";

const Enquery = () => {
  const [enquery, setEnquery] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        let response = await USERSAPI.get("/users/listenqueryreplyuser");
        if (response.data.enquery) {
          console.log(response.data.userEnquiry)
          setEnquery(response.data.userEnquiry);
        }
      } catch (error) {
        toast.error(error || "Error in ListSeller React");
      }
    };
    fetch();
  }, []);

  return (
    <div className="event-schedule-area-two p-4 rounded " style={{height:'100vh'}}>
      <Container>
        <Row>
          <Col lg={12} md={6} style={{ display: "flex" }}>
            {enquery.length > 0 ? (
              enquery.map((enquery, index) => (
                <Card
                  className="applicationCard"
                  style={{ width: "18rem", margin: "10px" }}
                  key={index}
                >
                  <Card.Body>
                    <Card.Title>Seller : {enquery.name}</Card.Title>
                    <Card.Text>Email : {enquery.email || "No Email"}</Card.Text>
                    <Card.Text>
                      Status:
                      <span
                        style={{ color: "red", textTransform: "capitalize" }}
                      >
                        {enquery.status}
                      </span>
                    </Card.Text>
                    <Card.Text>
                      {enquery.status === "pending" ? (
                        // Display "Message" when status is 'pending'
                        <span
                          className="text-success"
                          style={{ textTransform: "capitalize" }}
                        ><span style={{color:'black'}}>Message : </span>
                           {enquery.message}
                        </span>
                      ) : (
                        // Display "Reply" when status is not 'pending'
                        <span
                          className="text-success"
                          style={{ textTransform: "capitalize" }}
                        >
                          <span style={{color:'black'}}>Reply :</span> {enquery.message}
                        </span>
                      )}
                    </Card.Text>
                    {/* {enquery.isVerified === false ? (
                      <Form
                        onSubmit={(e) => {
                          handleSubmitSellerReply(e, enquery._id);
                        }}
                      >
                        <input
                          type="text"
                          onChange={(e) => setSellerReply(e.target.value)}
                          placeholder="Enter Your Reply"
                          style={{
                            padding: "15px",
                            border: "1px solid black",
                            borderRadius: "10px",
                            marginTop: "10px",
                          }}
                        />

                        <Button type="submit" className="p-2 m-2">
                          Send Reply
                        </Button>
                      </Form>
                    ) : null} */}
                  </Card.Body>
                </Card>
              ))
            ) : (
              <ChatLoading />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Enquery;
