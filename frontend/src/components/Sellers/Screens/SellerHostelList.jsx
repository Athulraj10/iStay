import React, { useState,useEffect } from 'react'
import ListHostel from '../Dashboard/ListHostel/ListHostel'
import { toast } from 'react-toastify';
import { USERSAPI } from '../../AxiosAPI/AxiosInstance';


const SellerHostelList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await USERSAPI.post("admin/listHostels");
        const responseData = res.data.data;
        setData(responseData);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };
    fetchData();
  },[]);
  return (
    <div>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <ListHostel data={data} />
    )}
    </div>
  )
}

export default SellerHostelList