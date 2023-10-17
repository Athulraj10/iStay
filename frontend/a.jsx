{reviews && reviews.length > 0 ? (
          
  reviews.map((review, index) => (
    <div
      style={{
        display: "flex"
      }}
    >
      <Card style={{ width: "18rem", margin: "20px" }}>
        <Card.Body>
          {/* <Card.Title>{review.title}</Card.Title> */}
          <Card.Text>{review.content}</Card.Text>
          <Button variant="primary">Review</Button>
        </Card.Body>
      </Card>
    </div>
  ))
) : (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <h1
      style={{
        textAlign: "center",
        marginTop: "20px",
        color: "white",
      }}
    >
      No reviews available
    </h1>
  </div>
)}


{review.images && review.images.length > 0
                  ? review.images.map((image, imageIndex) => (
                      <img
                        key={imageIndex}
                        src={`http://localhost:5000/image/${image}`}
                        alt={`Image`}
                        className="event-image rounded-3"
                        style={{ height: "100px", width: "100px" }}
                      />
                    ))
                  : null}
          