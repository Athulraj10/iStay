   {/* Left Side: Image */}
   <div
   className="event-wrap"
   style={{
     flex: 1,
     marginBottom: "10px",
     width: "100%",
     maxWidth: "100%",
     textAlign: "center",
   }}
 >
   {hostel.images.slice(0, 1).map((image, index) => (
     <img
       key={index}
       src={`http://localhost:5000/images/${image}`}
       alt={`Image ${index}`}
       className="event-image rounded-4"
       style={{ width: "100%", maxHeight: "200px" }}
     />
   )}
 </div>