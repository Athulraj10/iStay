import React,{useEffect} from 'react'

import { useLocation } from 'react-router-dom';
import { USERSAPI } from '../../AxiosAPI/AxiosInstance';
import { toast } from 'react-toastify';


const BookingComformation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // Use the get method to retrieve the values
  const userId = searchParams.get('userId');
  const hostelId = searchParams.get('hostel');

  useEffect(() => {
    const fetchData = async () => {
      const verificationLocalStorage = localStorage.getItem('bookingStarted');
      if (userId && hostelId && verificationLocalStorage === userId) {
        try {
          localStorage.removeItem("bookingStarted");
          const response = await USERSAPI.get('/users/bookingConfirmation', {
            params: { userId, hostelId },
          });          
        } catch (error) {
          toast.error(error)
        }
      }else{
        toast.error("Booking AlreadyCompleted")
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