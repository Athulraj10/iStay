{reviews && reviews.length > 0 ? (
  <div style={{ display: "flex" }}>
    {reviews.map((review, index) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        key={index}
      >
        <Card style={{ width: "18rem", margin: "20px" }}>
          {review.images && review.images.length > 0
            ? review.images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={`http://localhost:5000/image/${image}`}
                  alt={`Image`}
                  className="event-image rounded-3"
                  style={{ height: "100px", width: "100px" }}
                />
              )
            : null}
          <Card.Body>
            <Card.Text>{review.content}</Card.Text>
            <Button variant="primary">Review</Button>
          </Card.Body>
        </Card>
      </div>
    ))}
  </div>
) : (
  <p>No reviews available</p>
)}
