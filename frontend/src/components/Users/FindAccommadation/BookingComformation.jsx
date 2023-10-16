import React,{useEffect} from 'react'

import { useLocation } from 'react-router-dom';
import { USERSAPI } from '../../AxiosAPI/AxiosInstance';


const BookingComformation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // Use the get method to retrieve the values
  const userId = searchParams.get('userId');
  const hostelId = searchParams.get('hostel');

  useEffect(() => {
    const fetchData = async () => {
      // Use userId and hostelId in your API call
      if (userId && hostelId) {
        try {
          // Make your API call using userId and hostelId
          // Example: const response = await fetch(`/api/someEndpoint?userId=${userId}&hostelId=${hostelId}`);
          // Process the response
          // const response =  await USERSAPI.get(`users/bookingConfirmation?userId=${userId}&hostelId=${hostelId}`,)
          const response = await USERSAPI.get('/users/bookingConfirmation', {
            params: { userId, hostelId },
          });          
          console.log(response)
        } catch (error) {
          // Handle errors
        }
      }
    };

    fetchData();
  }, [userId, hostelId]);

  return (
   <>
      <h1>`${userId}`</h1>
      <h1>`${hostelId}`</h1>
   </>
  )
}

export default BookingComformation