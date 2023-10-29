import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { USERSAPI } from "../../../AxiosAPI/AxiosInstance";
import { useNavigate } from "react-router-dom";
import ChatLoading from "../../../ChatPage/ChatLoading";
import { SpinnerChakra } from "../../../loadingState/SpinnerChakra";
import ProgressChakra from "../../../loadingState/ProgressChakra";

function ListSeller() {
  const [enquery, setEnquery] = useState("");
  const [sellerReply, setSellerReply] = useState("");
  const [dataReset, setDataReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitSellerReply = async (e, id) => {
    try {
      setIsLoading(true)
      setDataReset(false);
      e.preventDefault();
      let response = await USERSAPI.get(`/seller/listenqueryreply/${id}`, {
        params: { message: sellerReply },
      });
      if (response.data.updated) {
        setDataReset(true);
        setIsLoading(false)
        toast.success("Response Sented");
      }
    } catch (error) {
      toast.error(error || "Error in ListSeller React");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      try {
        let response = await USERSAPI.get("/seller/listenquery");
        if (response.data.enqueryData) {
          setEnquery(response.data.enqueryData);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error || "Error in ListSeller React");
      }
    };
    fetch();
  }, [dataReset]);

  return isLoading ? (
      <ProgressChakra />
  ) : (
    <div
      className="event-schedule-area-two p-4 rounded"
      style={{ height: "100vh" }}
    >
      <Container>
        <Row>
          <Col lg={12} style={{ display: "flex" }}>
            {enquery.length > 0 ? (
              enquery.map((enquery, index) => (
                <Card
                  className="applicationCard"
                  style={{ width: "18rem", margin: "10px" }}
                  key={index}
                >
                  <Card.Body>
                    <Card.Title>UserName: {enquery.name}</Card.Title>
                    <Card.Text>Email: {enquery.email || "No Email"}</Card.Text>
                    <Card.Text>
                      Status:
                      <span
                        style={{ color: "red", textTransform: "capitalize" }}
                      >
                        {enquery.status}
                      </span>
                    </Card.Text>
                    <Card.Text>
                      Message:
                      <span className="text-success">{enquery.message}</span>
                    </Card.Text>
                    {enquery.isVerified === false ? (
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
                    ) : null}
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
}

export default ListSeller;
