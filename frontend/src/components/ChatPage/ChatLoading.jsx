import React from "react";
import {
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

const ChatLoading = (data) => {
  return (
    <>
      <Box
        padding="6"
        boxShadow="lg"
        style={{ background: "#213a54", height: "80vh" ,width:'100%',borderRadius:'15px'}}
      >
        <SkeletonCircle size="10" />
        <h1 style={{margin:'10px',textAlign:"center",color:'red',fontSize:"80px"}}>No Data Found</h1>
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
    </>
  );
};

export default ChatLoading;
