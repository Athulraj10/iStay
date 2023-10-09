import React, { useEffect, useState } from 'react';
import MessageList from '../Dashboard/MessageList/MessageList';
import { USERSAPI } from '../../AxiosAPI/AxiosInstance';
import { toast } from 'react-toastify';

const SellerMessageList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await USERSAPI.post("admin/listUser");
        const responseData = res.data.data; // Access the data property
        setData(responseData);
        setLoading(false);
        console.log(data)
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
        <MessageList data={data} />
      )}
    </div>
  );
};

export default SellerMessageList;
