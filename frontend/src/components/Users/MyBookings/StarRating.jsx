import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { USERSAPI } from "../../AxiosAPI/AxiosInstance";
import { toast } from "react-toastify";

const StarRating = (bookingId) => {
  const [rating, setRating] = useState(null);
//   const [hover, setHover] = useState(null);

  const handleStarClick = (starValue) => {
    const fetchRating = async (rating) =>{
      const response = await USERSAPI.put('/users/rating',{rating},{
        params:{bookingId}
      })
      if(response.data.updated){
        setRating(response.data.ratingValue)
        toast.success(`Rating 5 out of ${response.data.ratingValue}`)
        return;
      }else{
        return toast.error(response.error.data.error)
      }
    } 
    fetchRating(starValue)
  };

  
  useEffect(()=>{
    const fetchRating = async (bookingId) =>{
      const response = await USERSAPI.get('/users/getRating', {
        params: { bookingId }
      });
      
      if(response.data.updated){
        setRating(response.data.ratingValue)
        return;
      }else{
        toast.error(response.error.data.error)
      }
    } 
    fetchRating(bookingId)
  },[])
  
  return (
    // <div className="star-rating">
    //   {[...Array(5)].map((star, index) => {
    //     const currentRating = index + 1;
    //     return (
    //       <label>
    //         <input type="radio"
    //         onClick={()=>setRating(currentRating)} name="rating" 
    //         value={currentRating} />
    //         <FaStar className="star"  
    //         color={currentRating<=(rating) ? 'gold':'white'}
    //         onMouseEnter={()=>handleStarClick(currentRating)}
    //         size={30}/>
    //       </label>
    //     );
    //   })}
    // </div>
    <div className="star-rating">
    {[...Array(5)].map((_, index) => {
      const currentRating = index + 1;
      return (
        <label key={currentRating}>
          <input
            type="radio"
            onClick={() => handleStarClick(currentRating)}
            name="rating"
            value={currentRating}
            className="hidden-radio"
          />
          <FaStar
            className="star"
            color={currentRating <= rating ? 'gold' : 'white'}
            size={30}
            onClick={() => setRating(currentRating)}
          />
        </label>
      );
    })}
  </div>
  );
};

export default StarRating;
