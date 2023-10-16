import React,{useEffect, useState} from 'react'

import { useLocation } from 'react-router-dom';
import { USERSAPI } from '../../AxiosAPI/AxiosInstance';
import { toast } from 'react-toastify';


const BookingComformation = () => {
  const location = useLocation();
  const [hostelData, setHostelData] = useState(null); // Define the state variable
  const searchParams = new URLSearchParams(location.search);
  
  // Use the get method to retrieve the values
  const userId = searchParams.get('userId');
  const hostelId = searchParams.get('hostel');

  useEffect(() => {
    if (hostelData !== null) {
      console.log('hostelData has been updated:', hostelData);
    }
  }, [hostelData]);
  
  useEffect(() => {
    const fetchData = async () => {
      const verificationLocalStorage = localStorage.getItem('bookingStarted');
      if (userId && hostelId && verificationLocalStorage === userId) {
        try {
          localStorage.removeItem('bookingStarted');
          const response = await USERSAPI.get('/users/bookingConfirmation', {
            params: { userId, hostelId },
          });

          if (response.data.bookingCompleted) {
            const responseData = response.data.hostelData;
            setHostelData(responseData);
            toast.success('Booking Completed');
          } else {
            toast.error('Booking Not Completed');
          }
        } catch (error) {
          toast.error(error);
        }
      } else {
        toast.error('Booking Already Completed');
      }
    };

    fetchData();
  }, [userId, hostelId]);

  return (
   <>
      
   </>
  )
}

export default BookingComformation