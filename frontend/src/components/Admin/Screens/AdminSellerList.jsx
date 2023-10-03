import React, { useEffect, useState } from 'react';
import ListSeller from '../Dashboard/ListSeller/ListSeller';
import { USERSAPI } from '../../AxiosAPI/AxiosInstance';
import { toast } from 'react-toastify';

const AdminSellerList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await USERSAPI.post("admin/listSellers");
        const responseData = res.data.data; // Access the data property
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
        <ListSeller data={data} />
      )}
    </div>
  );
};

export default AdminSellerList;
