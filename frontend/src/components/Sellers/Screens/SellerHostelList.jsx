import React, { useState,useEffect } from 'react'
import ListHostel from '../Dashboard/ListHostel/ListHostel'
import { toast } from 'react-toastify';
import { USERSAPI } from '../../AxiosAPI/AxiosInstance';


const SellerHostelList = () => {

  return (
    <div>
    {/* {loading ? ( */}
      {/* <p>Loading...</p> */}
    {/* ) : ( */}
      {/* <ListHostel data={data} /> */}
       <ListHostel />
       {/* )}  */}
    </div>
  )
}

export default SellerHostelList