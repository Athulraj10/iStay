import React, { useEffect, useState } from 'react';
import ListEnquery from '../Dashboard/ListEnquery/ListEnquery';
import { USERSAPI } from '../../AxiosAPI/AxiosInstance';
import { toast } from 'react-toastify';

const SelllerListEnquery = () => {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await USERSAPI.post("admin/listSellers");
  //       const responseData = res.data.data; // Access the data property
  //       setData(responseData);
  //       setLoading(false);
  //     } catch (error) {
  //       toast.error(error.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // },[]);

  return (
    <div>
      {/* {loading ? (
        <p>Loading...</p>
      ) : ( */}
        {/* <ListEnquery data={data} /> */}
        <ListEnquery />
      {/* )} */}
    </div>
  );
};

export default SelllerListEnquery;
