import React, { useEffect, useState } from 'react';
import UserList from '../Dashboard/UserList/UserList';
import { USERSAPI } from '../../AxiosAPI/AxiosInstance';
import { toast } from 'react-toastify';

const AdminUserList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await USERSAPI.post("admin/listUser");
        const responseData = res.data;
        setData(responseData); // Set the data in the state
      } catch (error) {
        toast.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Pass the data as a prop to the UserList component */}
      <UserList data={data} />
    </div>
  );
};

export default AdminUserList;
