import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = () => {
  const [rating, setRating] = useState(null);
//   const [hover, setHover] = useState(null);

  const handleStarClick = (starValue) => {
    setRating(starValue);
    console.log(rating)
  };


  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (

          <label>
            <input type="radio"
            onClick={()=>setRating(currentRating)} name="rating" 
            value={currentRating} />
            <FaStar className="star"  
            color={currentRating<=(rating) ? 'gold':'white'}
            onMouseEnter={()=>handleStarClick(currentRating)}
            size={30}/>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
